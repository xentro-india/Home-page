import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateApplicationInput,
  validateResumeBuffer,
  sanitizeFilename,
  escapeHtml,
  MAX_RESUME_SIZE,
} from '../src/lib/careers-validation';
import { InMemoryRateLimiter } from '../src/lib/rate-limiter';
import {
  sendApplicationEmail,
  setCustomTransporter,
  FIXED_HIRING_RECIPIENT,
} from '../src/lib/careers-mailer';
import nodemailer, { type SentMessageInfo, type Transporter } from 'nodemailer';

describe('Careers Application Validation & Sanitization', () => {
  it('should accept valid applicant fields', () => {
    const result = validateApplicationInput({
      fullName: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '+91 98765 43210',
      department: 'Development',
      roles: ['Frontend Development', 'Full-Stack Development'],
      consent: true,
    });
    assert.equal(result.valid, true);
    assert.equal(result.errors.length, 0);
  });

  it('should reject missing or blank full name', () => {
    const result = validateApplicationInput({
      fullName: '   ',
      email: 'aarav@example.com',
      phone: '+91 98765 43210',
      department: 'Development',
      roles: ['Frontend Development'],
      consent: true,
    });
    assert.equal(result.valid, false);
    assert.match(result.errors.join(' '), /Full name is required/i);
  });

  it('should reject malformed email addresses', () => {
    const invalidEmails = ['not-an-email', 'aarav@', '@domain.com', 'aarav@domain'];
    for (const email of invalidEmails) {
      const result = validateApplicationInput({
        fullName: 'Aarav Sharma',
        email,
        phone: '+91 98765 43210',
        department: 'Development',
        roles: ['Frontend Development'],
        consent: true,
      });
      assert.equal(result.valid, false, `Expected ${email} to be rejected`);
      assert.match(result.errors.join(' '), /valid email/i);
    }
  });

  it('should reject invalid phone numbers', () => {
    const invalidPhones = ['123', 'abcde', '+++++', '12345'];
    for (const phone of invalidPhones) {
      const result = validateApplicationInput({
        fullName: 'Aarav Sharma',
        email: 'aarav@example.com',
        phone,
        department: 'Development',
        roles: ['Frontend Development'],
        consent: true,
      });
      assert.equal(result.valid, false, `Expected phone "${phone}" to be rejected`);
    }
  });

  it('should reject unrecognized department', () => {
    const result = validateApplicationInput({
      fullName: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '+91 98765 43210',
      department: 'NonExistentDepartment',
      roles: ['Frontend Development'],
      consent: true,
    });
    assert.equal(result.valid, false);
    assert.match(result.errors.join(' '), /Unrecognized department/i);
  });

  it('should reject department and role mismatches', () => {
    const result = validateApplicationInput({
      fullName: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '+91 98765 43210',
      department: 'Development',
      roles: ['Graphic Design'], // Graphic Design belongs to 'Media & Design', not 'Development'
      consent: true,
    });
    assert.equal(result.valid, false);
    assert.match(result.errors.join(' '), /not available in department/i);
  });

  it('should reject submissions without explicit consent', () => {
    const result = validateApplicationInput({
      fullName: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '+91 98765 43210',
      department: 'Development',
      roles: ['Frontend Development'],
      consent: false,
    });
    assert.equal(result.valid, false);
    assert.match(result.errors.join(' '), /consent/i);
  });

  it('should reject bot submissions when honeypot field is filled', () => {
    const result = validateApplicationInput({
      fullName: 'Bot User',
      email: 'bot@example.com',
      phone: '+91 98765 43210',
      department: 'Development',
      roles: ['Frontend Development'],
      consent: true,
      honeypot: 'http://spam-link.com',
    });
    assert.equal(result.valid, false);
    assert.match(result.errors.join(' '), /rejected/i);
  });

  it('should sanitize unsafe filenames and path traversal attempts', () => {
    assert.equal(sanitizeFilename('../../etc/passwd.pdf', 'pdf'), 'passwd.pdf');
    assert.equal(sanitizeFilename('..\\..\\Windows\\System32\\cmd.docx', 'docx'), 'cmd.docx');
    assert.equal(sanitizeFilename('My Résumé & CV! @2026.pdf', 'pdf'), 'My_R_sum____CV___2026.pdf');
  });

  it('should escape HTML characters for safe email rendering', () => {
    const unsafe = '<script>alert("hack")</script> & "special"';
    const escaped = escapeHtml(unsafe);
    assert.equal(escaped.includes('<script>'), false);
    assert.equal(escaped.includes('&lt;script&gt;'), true);
    assert.equal(escaped.includes('&quot;special&quot;'), true);
  });
});

describe('Careers Résumé File Validation', () => {
  it('should accept valid PDF files with valid %PDF- header', () => {
    const validPdfBuffer = Buffer.concat([
      Buffer.from('%PDF-1.7\n%Fake PDF content for test\n'),
      Buffer.alloc(100),
    ]);
    const result = validateResumeBuffer(validPdfBuffer, 'candidate_resume.pdf', 'application/pdf');
    assert.equal(result.valid, true);
    assert.equal(result.extension, 'pdf');
    assert.equal(result.mimeType, 'application/pdf');
    assert.equal(result.sanitizedFilename, 'candidate_resume.pdf');
  });

  it('should accept valid DOCX files with ZIP PK signature', () => {
    const validDocxBuffer = Buffer.concat([
      Buffer.from([0x50, 0x4b, 0x03, 0x04]), // PK\x03\x04
      Buffer.alloc(100),
    ]);
    const result = validateResumeBuffer(
      validDocxBuffer,
      'my_resume.docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    assert.equal(result.valid, true);
    assert.equal(result.extension, 'docx');
    assert.equal(result.sanitizedFilename, 'my_resume.docx');
  });

  it('should reject fake PDF files with incorrect signatures (spoofed MIME type)', () => {
    const fakePdfBuffer = Buffer.from('This is a plain text file pretending to be a pdf');
    const result = validateResumeBuffer(fakePdfBuffer, 'fake.pdf', 'application/pdf');
    assert.equal(result.valid, false);
    assert.match(result.error || '', /signature/i);
  });

  it('should reject fake DOCX files with incorrect signatures', () => {
    const fakeDocxBuffer = Buffer.from('Not a zip archive');
    const result = validateResumeBuffer(
      fakeDocxBuffer,
      'fake.docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    assert.equal(result.valid, false);
    assert.match(result.error || '', /signature/i);
  });

  it('should reject files exceeding the 5 MB limit', () => {
    const largeBuffer = Buffer.alloc(MAX_RESUME_SIZE + 1024);
    // Write valid PDF header so it only fails on size
    largeBuffer.write('%PDF-1.5', 0);
    const result = validateResumeBuffer(largeBuffer, 'large_resume.pdf', 'application/pdf');
    assert.equal(result.valid, false);
    assert.match(result.error || '', /5 MB/i);
  });

  it('should reject unsupported file extensions (e.g. .exe, .png, .txt)', () => {
    const buffer = Buffer.from('test content');
    const exeResult = validateResumeBuffer(buffer, 'resume.exe', 'application/x-msdownload');
    assert.equal(exeResult.valid, false);
    assert.match(exeResult.error || '', /Only PDF/i);

    const pngResult = validateResumeBuffer(buffer, 'resume.png', 'image/png');
    assert.equal(pngResult.valid, false);
    assert.match(pngResult.error || '', /Only PDF/i);
  });
});

describe('Rate Limiter & Abuse Prevention', () => {
  let limiter: InMemoryRateLimiter;

  beforeEach(() => {
    limiter = new InMemoryRateLimiter({
      windowMs: 60 * 1000,
      maxRequests: 3,
      duplicateWindowMs: 5 * 1000,
    });
  });

  it('should allow requests within limit', () => {
    assert.equal(limiter.check('1.2.3.4').allowed, true);
    assert.equal(limiter.check('1.2.3.4').allowed, true);
    assert.equal(limiter.check('1.2.3.4').allowed, true);
  });

  it('should block requests exceeding the rate limit', () => {
    limiter.check('1.2.3.4');
    limiter.check('1.2.3.4');
    limiter.check('1.2.3.4');
    const fourth = limiter.check('1.2.3.4');
    assert.equal(fourth.allowed, false);
    assert.equal(fourth.reason, 'rate_limit');
    assert.ok(typeof fourth.retryAfterSeconds === 'number' && fourth.retryAfterSeconds > 0);
  });

  it('should detect and prevent duplicate clicks with the same fingerprint', () => {
    const fingerprint = 'hash-abc-123';
    const first = limiter.check('1.2.3.4', fingerprint);
    assert.equal(first.allowed, true);

    const immediateDuplicate = limiter.check('1.2.3.4', fingerprint);
    assert.equal(immediateDuplicate.allowed, false);
    assert.equal(immediateDuplicate.reason, 'duplicate');
  });
});

describe('SMTP Mailer Service & Delivery Safety', () => {
  it('should safely fail when SMTP credentials are not configured', async () => {
    // Ensure no custom transporter is set and env is unset
    setCustomTransporter(null);
    const origHost = process.env.SMTP_HOST;
    delete process.env.SMTP_HOST;

    try {
      const result = await sendApplicationEmail({
        fullName: 'Test Candidate',
        email: 'test@example.com',
        phone: '+91 98765 43210',
        department: 'Development',
        roles: ['Frontend Development'],
        resumeBuffer: Buffer.from('%PDF-1.4 sample'),
        resumeFilename: 'test.pdf',
        resumeContentType: 'application/pdf',
      });

      assert.equal(result.success, false);
      assert.equal(result.code, 'CONFIG_MISSING');
      assert.match(result.error || '', /not yet configured/i);
    } finally {
      if (origHost) process.env.SMTP_HOST = origHost;
    }
  });

  it('should successfully deliver application using mocked SMTP transporter', async () => {
    const sentMessages: SentMessageInfo[] = [];

    // Create a mock stream/json transport that does NOT connect to external networks
    const mockTransporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'windows',
    });

    setCustomTransporter(mockTransporter);

    const pdfBuffer = Buffer.from('%PDF-1.5 fake candidate resume data');

    const result = await sendApplicationEmail({
      fullName: 'Radhika Sen',
      email: 'radhika@example.com',
      phone: '+91 99887 76655',
      department: 'Media & Design',
      roles: ['UI/UX Design', 'Motion Graphics & Animation'],
      resumeBuffer: pdfBuffer,
      resumeFilename: 'Radhika_Sen_Resume.pdf',
      resumeContentType: 'application/pdf',
    });

    assert.equal(result.success, true);
    assert.ok(result.messageId);

    // Reset transporter after test
    setCustomTransporter(null);
  });

  it('should handle SMTP transmission failure gracefully', async () => {
    // Mock transporter that throws error
    const failingTransporter = {
      sendMail: async () => {
        throw new Error('Connection refused by SMTP relay');
      },
    } as unknown as Transporter;

    setCustomTransporter(failingTransporter);

    const result = await sendApplicationEmail({
      fullName: 'Fail Candidate',
      email: 'fail@example.com',
      phone: '+91 99887 76655',
      department: 'Development',
      roles: ['Frontend Development'],
      resumeBuffer: Buffer.from('%PDF-1.5 test'),
      resumeFilename: 'resume.pdf',
      resumeContentType: 'application/pdf',
    });

    assert.equal(result.success, false);
    assert.equal(result.code, 'SEND_FAILED');
    assert.match(result.error || '', /Failed to deliver application/i);

    // Verify it did not leak internal SMTP connection error details to client error
    assert.equal((result.error || '').includes('Connection refused'), false);

    setCustomTransporter(null);
  });

  it('should strictly direct all applications to hiring@xentro.in', () => {
    assert.equal(FIXED_HIRING_RECIPIENT, 'hiring@xentro.in');
  });
});
