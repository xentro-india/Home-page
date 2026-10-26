import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  validateApplicationInput,
  validateResumeBuffer,
  MAX_RESUME_SIZE,
} from '@/lib/careers-validation';
import { sendApplicationEmail } from '@/lib/careers-mailer';
import { globalRateLimiter } from '@/lib/rate-limiter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Content-Type. Expected multipart/form-data.' },
        { status: 400 }
      );
    }

    // Rate Limiting Check
    const clientIp = getClientIp(req);

    // Parse form data
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed form data submission.' },
        { status: 400 }
      );
    }

    const fullName = String(formData.get('fullName') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const department = String(formData.get('department') || '');
    const honeypot = String(formData.get('_bot_trap') || '');
    const consentValue = formData.get('consent');
    const consent = consentValue === 'true' || consentValue === 'on' || consentValue === '1';

    // Collect all selected roles (could be multiple entries for 'roles' or comma-separated)
    const rolesRaw = formData.getAll('roles');
    const roles: string[] = [];
    for (const item of rolesRaw) {
      if (typeof item === 'string') {
        // Handle both multiple form keys and comma-delimited string
        const parts = item.split(',').map((p) => p.trim()).filter(Boolean);
        roles.push(...parts);
      }
    }
    // Remove duplicates
    const uniqueRoles = Array.from(new Set(roles));

    // Bot abuse protection (only blocks automated spam bots that inject hidden trap parameters)
    if (honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission.' },
        { status: 400 }
      );
    }

    // Create a fingerprint for duplicate click detection
    const submissionFingerprint = crypto
      .createHash('sha256')
      .update(`${email.toLowerCase()}|${phone}|${department}|${uniqueRoles.sort().join(',')}`)
      .digest('hex');

    const rateLimit = globalRateLimiter.check(clientIp, submissionFingerprint);
    if (!rateLimit.allowed) {
      if (rateLimit.reason === 'duplicate') {
        return NextResponse.json(
          {
            success: false,
            error: 'A submission with these details was just received. Please do not submit repeatedly.',
          },
          { status: 429 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions from this connection. Please try again after ${rateLimit.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    // Server-side field validation
    const inputValidation = validateApplicationInput({
      fullName,
      email,
      phone,
      department,
      roles: uniqueRoles,
      consent,
      honeypot,
    });

    if (!inputValidation.valid) {
      return NextResponse.json(
        { success: false, error: inputValidation.errors.join(' ') },
        { status: 400 }
      );
    }

    // Résumé validation
    const resumeEntry = formData.get('resume');
    if (!resumeEntry || !(resumeEntry instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Please upload a valid résumé document.' },
        { status: 400 }
      );
    }

    const resumeFile = resumeEntry as File;
    if (resumeFile.size === 0) {
      return NextResponse.json(
        { success: false, error: 'The uploaded résumé is empty.' },
        { status: 400 }
      );
    }

    if (resumeFile.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { success: false, error: 'The résumé file exceeds the 5 MB maximum size limit.' },
        { status: 413 }
      );
    }

    // Buffer conversion in-memory
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileValidation = validateResumeBuffer(
      buffer,
      resumeFile.name || 'resume',
      resumeFile.type || ''
    );

    if (!fileValidation.valid) {
      return NextResponse.json(
        { success: false, error: fileValidation.error || 'Invalid résumé file.' },
        { status: 400 }
      );
    }

    // Deliver email via SMTP
    const mailResult = await sendApplicationEmail({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      department: department.trim(),
      roles: uniqueRoles,
      resumeBuffer: buffer,
      resumeFilename: fileValidation.sanitizedFilename || 'resume.pdf',
      resumeContentType: fileValidation.mimeType || 'application/pdf',
    });

    if (!mailResult.success) {
      if (mailResult.code === 'CONFIG_MISSING') {
        return NextResponse.json(
          {
            success: false,
            error:
              'The application email service is temporarily not configured. Please contact hiring@xentro.in directly.',
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error:
            'Unable to deliver your application to the hiring team at this moment. Your details have not been submitted. Please try again.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your application has been successfully submitted to hiring@xentro.in.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Log unexpected errors without exposing sensitive details
    console.error('[Xentro Careers] Unexpected error in apply route:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected server error occurred while processing your application. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Reject any non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
