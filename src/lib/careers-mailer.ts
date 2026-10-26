import nodemailer, { type Transporter } from 'nodemailer';
import { escapeHtml } from './careers-validation';

export const FIXED_HIRING_RECIPIENT = 'hiring@xentro.in';

export interface SendApplicationEmailParams {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  roles: string[];
  resumeBuffer: Buffer;
  resumeFilename: string;
  resumeContentType: string;
}

export interface MailerResult {
  success: boolean;
  messageId?: string;
  error?: string;
  code?: 'CONFIG_MISSING' | 'SEND_FAILED';
}

/**
 * Returns whether SMTP credentials are fully configured.
 */
export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  );
}

// In-memory or injected transporter for testing
let customTransporter: Transporter | null = null;

export function setCustomTransporter(transporter: Transporter | null): void {
  customTransporter = transporter;
}

/**
 * Creates or retrieves the Nodemailer transport based on environment configuration.
 */
export function createMailTransporter(): Transporter | null {
  if (customTransporter) {
    return customTransporter;
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Reasonable timeouts
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Formats and delivers a candidate's application and attached résumé to hiring@xentro.in.
 */
export async function sendApplicationEmail(params: SendApplicationEmailParams): Promise<MailerResult> {
  const transporter = createMailTransporter();

  if (!transporter) {
    // Fail safely if SMTP settings are not yet configured in environment
    console.warn(
      '[Xentro Careers] SMTP configuration is incomplete. Submission cannot be sent. Please configure SMTP_HOST, SMTP_USER, and SMTP_PASSWORD.'
    );
    return {
      success: false,
      code: 'CONFIG_MISSING',
      error: 'The career application email service is not yet configured on this server. Please contact hiring@xentro.in directly.',
    };
  }

  // Format the sender display name so it shows "Candidate Name (via Xentro Careers)"
  // while retaining the authorized Zoho Mail domain in the address to pass SPF/DMARC.
  const baseFrom = process.env.SMTP_FROM || process.env.SMTP_USER || 'hiring@xentro.in';
  const emailMatch = baseFrom.match(/<([^>]+)>/);
  const pureSenderEmail = emailMatch ? emailMatch[1] : baseFrom.replace(/"/g, '').trim();
  const safeName = params.fullName.replace(/[<>"'\r\n]/g, '').trim();
  const fromAddress = `"${safeName} (via Xentro Careers)" <${pureSenderEmail}>`;
  const submittedAt = new Date().toUTCString();

  const plainText = [
    `NEW CAREER APPLICATION — XENTRO`,
    `================================`,
    `Submitted at: ${submittedAt}`,
    ``,
    `CANDIDATE DETAILS:`,
    `Full Name:   ${params.fullName}`,
    `Email:       ${params.email}`,
    `Phone:       ${params.phone}`,
    ``,
    `ROLE SELECTION:`,
    `Department:      ${params.department}`,
    `Specialization:  ${params.roles.join(', ')}`,
    ``,
    `ATTACHMENT:`,
    `Résumé:      ${params.resumeFilename} (${Math.round(params.resumeBuffer.length / 1024)} KB)`,
    ``,
    `Reply directly to this email to contact the applicant (${params.email}).`,
  ].join('\n');

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Career Application: ${escapeHtml(params.fullName)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111827; background-color: #f9fafb; padding: 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background-color: #0b0e13; padding: 24px 32px; border-bottom: 3px solid #d9ff3f;">
        <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 800; letter-spacing: -0.02em;">
          Xentro Careers Application
        </h1>
        <p style="color: #9ca3af; font-size: 13px; margin: 4px 0 0 0;">Received on ${submittedAt}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
          Candidate Details
        </h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td width="140" style="color: #6b7280; font-weight: 600;">Full Name:</td>
            <td style="color: #111827; font-weight: 700;">${escapeHtml(params.fullName)}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-weight: 600;">Email:</td>
            <td><a href="mailto:${escapeHtml(params.email)}" style="color: #3b82f6; text-decoration: none;">${escapeHtml(params.email)}</a></td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-weight: 600;">Phone:</td>
            <td><a href="tel:${escapeHtml(params.phone)}" style="color: #111827; text-decoration: none;">${escapeHtml(params.phone)}</a></td>
          </tr>
        </table>

        <h2 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
          Selected Roles
        </h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td width="140" style="color: #6b7280; font-weight: 600;">Department:</td>
            <td style="color: #111827; font-weight: 700;">${escapeHtml(params.department)}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-weight: 600; vertical-align: top;">Specializations:</td>
            <td style="color: #111827;">
              ${params.roles
                .map(
                  (r) =>
                    `<span style="display: inline-block; background-color: #f3f4f6; color: #1f2937; padding: 3px 8px; border-radius: 4px; margin: 2px 4px 2px 0; font-size: 13px;">${escapeHtml(
                      r
                    )}</span>`
                )
                .join('')}
            </td>
          </tr>
        </table>

        <h2 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
          Attached Résumé
        </h2>
        <p style="font-size: 14px; color: #374151; margin: 0;">
          📎 <strong>${escapeHtml(params.resumeFilename)}</strong> (${Math.round(params.resumeBuffer.length / 1024)} KB)
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f9fafb; padding: 16px 32px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; text-align: center;">
        This application was submitted via the official Xentro Careers page. Reply directly to this email to contact the applicant.
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: FIXED_HIRING_RECIPIENT,
      replyTo: params.email,
      subject: `New Application: ${params.fullName} — ${params.department} (${params.roles.join(', ')})`,
      text: plainText,
      html: htmlContent,
      attachments: [
        {
          filename: params.resumeFilename,
          content: params.resumeBuffer,
          contentType: params.resumeContentType,
        },
      ],
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    // Log safe error without exposing credentials or applicant payload
    const errorMessage = err instanceof Error ? err.message : 'Unknown mail error';
    console.error('[Xentro Careers] Mail dispatch error:', errorMessage);

    return {
      success: false,
      code: 'SEND_FAILED',
      error: 'Failed to deliver application email to the hiring inbox.',
    };
  }
}
