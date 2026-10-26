import { departments, departmentNames, type Department } from '../data/careers';

export const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_EXTENSIONS = ['.pdf', '.docx'] as const;
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/x-pdf',
  'application/octet-stream', // Some Windows browsers upload docx or pdf as octet-stream
] as const;

export interface ApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  roles: string[];
  consent: boolean;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  extension?: 'pdf' | 'docx';
  mimeType?: string;
  sanitizedFilename?: string;
}

/**
 * Escapes characters for safe inclusion in HTML emails.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitizes an uploaded filename to prevent directory traversal and remove unsafe characters.
 */
export function sanitizeFilename(originalName: string, extension: 'pdf' | 'docx'): string {
  // Strip paths
  const base = originalName.replace(/^.*[\\/]/, '');
  // Remove extension from base
  const nameWithoutExt = base.replace(/\.[^/.]+$/, '');
  // Sanitize to alphanumeric, hyphen, underscore
  const safeBase = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60) || 'resume';
  return `${safeBase}.${extension}`;
}

/**
 * Validates a résumé file buffer for size, extension, declared MIME type, and file signature.
 */
export function validateResumeBuffer(
  buffer: Buffer,
  originalFilename: string,
  declaredMimeType: string
): FileValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'Résumé file is empty or missing.' };
  }

  if (buffer.length > MAX_RESUME_SIZE) {
    return { valid: false, error: 'Résumé file exceeds the maximum allowed size of 5 MB.' };
  }

  const lowerName = originalFilename.toLowerCase();
  const isPdfExt = lowerName.endsWith('.pdf');
  const isDocxExt = lowerName.endsWith('.docx');

  if (!isPdfExt && !isDocxExt) {
    return { valid: false, error: 'Only PDF (.pdf) and Word (.docx) documents are accepted.' };
  }

  // Magic bytes inspection
  // PDF magic bytes: '%PDF-' (0x25, 0x50, 0x44, 0x46, 0x2D) anywhere in the first 1024 bytes
  const headerSlice = buffer.subarray(0, 1024);
  const pdfMagic = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d]);
  const isPdfMagic = headerSlice.includes(pdfMagic);

  // DOCX magic bytes: ZIP container header 'PK\x03\x04' (0x50, 0x4B, 0x03, 0x04) at byte 0
  const zipMagic = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
  const isZipMagic = buffer.subarray(0, 4).equals(zipMagic);

  if (isPdfExt) {
    if (!isPdfMagic) {
      return {
        valid: false,
        error: 'File content does not match a valid PDF file signature.',
      };
    }
    const sanitized = sanitizeFilename(originalFilename, 'pdf');
    return {
      valid: true,
      extension: 'pdf',
      mimeType: 'application/pdf',
      sanitizedFilename: sanitized,
    };
  }

  if (isDocxExt) {
    if (!isZipMagic) {
      return {
        valid: false,
        error: 'File content does not match a valid DOCX document signature.',
      };
    }
    const sanitized = sanitizeFilename(originalFilename, 'docx');
    return {
      valid: true,
      extension: 'docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      sanitizedFilename: sanitized,
    };
  }

  return { valid: false, error: 'Unsupported file format.' };
}

/**
 * Validates text fields for career applications.
 */
export function validateApplicationInput(input: Partial<ApplicationInput>): ValidationResult {
  const errors: string[] = [];

  // Bot honeypot check - must be empty
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { valid: false, errors: ['Submission rejected.'] };
  }

  // Full Name
  const fullName = input.fullName?.trim() || '';
  if (!fullName) {
    errors.push('Full name is required.');
  } else if (fullName.length < 2 || fullName.length > 120) {
    errors.push('Full name must be between 2 and 120 characters.');
  } else if (/[\r\n\t]/.test(fullName)) {
    errors.push('Full name contains invalid characters.');
  }

  // Email
  const email = input.email?.trim() || '';
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email) {
    errors.push('Email address is required.');
  } else if (email.length > 254 || !emailRegex.test(email)) {
    errors.push('Enter a valid email address.');
  }

  // Phone
  const phone = input.phone?.trim() || '';
  const digitsCount = (phone.match(/\d/g) || []).length;
  if (!phone) {
    errors.push('Phone number is required.');
  } else if (!/^[+()\d\s-]{8,25}$/.test(phone) || digitsCount < 6 || digitsCount > 18) {
    errors.push('Enter a valid phone number (at least 6 digits).');
  }

  // Department
  const dept = input.department?.trim() as Department;
  if (!dept) {
    errors.push('Please select a department.');
  } else if (!departmentNames.includes(dept)) {
    errors.push(`Unrecognized department "${dept}".`);
  }

  // Roles
  const roles = Array.isArray(input.roles) ? input.roles.map((r) => String(r).trim()).filter(Boolean) : [];
  if (roles.length === 0) {
    errors.push('Please select at least one role in your chosen department.');
  } else if (dept && departments[dept]) {
    const allowed = new Set<string>(departments[dept]);
    for (const role of roles) {
      if (!allowed.has(role)) {
        errors.push(`Role "${role}" is not available in department "${dept}".`);
      }
    }
  }

  // Consent
  if (!input.consent) {
    errors.push('You must acknowledge and consent to the submission terms.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
