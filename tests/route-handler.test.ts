import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST, GET, PUT, DELETE } from '../src/app/api/careers/apply/route';
import { setCustomTransporter } from '../src/lib/careers-mailer';
import { globalRateLimiter } from '../src/lib/rate-limiter';
import nodemailer from 'nodemailer';

describe('App Router Route Handler: /api/careers/apply', () => {
  beforeEach(() => {
    globalRateLimiter.reset();
    setCustomTransporter(null);
  });

  it('should reject non-POST methods with 405', async () => {
    const getRes = await GET();
    assert.equal(getRes.status, 405);

    const putRes = await PUT();
    assert.equal(putRes.status, 405);

    const delRes = await DELETE();
    assert.equal(delRes.status, 405);
  });

  it('should reject non-multipart Content-Type with 400', async () => {
    const req = new NextRequest('http://localhost:3000/api/careers/apply', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ fullName: 'Test' }),
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /multipart\/form-data/i);
  });

  it('should reject submissions with missing or invalid fields', async () => {
    const formData = new FormData();
    formData.append('fullName', 'John Doe');
    // missing email, phone, department, resume

    const req = new NextRequest('http://localhost:3000/api/careers/apply', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  it('should reject bot submissions with honeypot filled', async () => {
    const formData = new FormData();
    formData.append('fullName', 'Bot User');
    formData.append('email', 'bot@example.com');
    formData.append('phone', '+91 98765 43210');
    formData.append('department', 'Development');
    formData.append('roles', 'Frontend Development');
    formData.append('consent', 'true');
    formData.append('_bot_trap', 'http://spam-site.com');

    const fakePdf = new File([Buffer.from('%PDF-1.4 test')], 'resume.pdf', {
      type: 'application/pdf',
    });
    formData.append('resume', fakePdf);

    const req = new NextRequest('http://localhost:3000/api/careers/apply', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /Invalid submission/i);
  });

  it('should reject files larger than 5 MB with 413 Payload Too Large', async () => {
    const formData = new FormData();
    formData.append('fullName', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+91 98765 43210');
    formData.append('department', 'Development');
    formData.append('roles', 'Frontend Development');
    formData.append('consent', 'true');

    // Create 5.1 MB buffer with PDF header
    const largeBuf = Buffer.alloc(5.1 * 1024 * 1024);
    largeBuf.write('%PDF-1.4', 0);
    const largeFile = new File([largeBuf], 'resume.pdf', { type: 'application/pdf' });
    formData.append('resume', largeFile);

    const req = new NextRequest('http://localhost:3000/api/careers/apply', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    assert.equal(res.status, 413);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /5 MB/i);
  });

  it('should reject fake PDF with invalid file signature', async () => {
    const formData = new FormData();
    formData.append('fullName', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+91 98765 43210');
    formData.append('department', 'Development');
    formData.append('roles', 'Frontend Development');
    formData.append('consent', 'true');

    const fakePdf = new File([Buffer.from('not a real pdf content')], 'resume.pdf', {
      type: 'application/pdf',
    });
    formData.append('resume', fakePdf);

    const req = new NextRequest('http://localhost:3000/api/careers/apply', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /signature/i);
  });

  it('should successfully process valid application and return 200 with mock SMTP', async () => {
    const mockTransporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'windows',
    });
    setCustomTransporter(mockTransporter);

    const formData = new FormData();
    formData.append('fullName', 'Ananya Roy');
    formData.append('email', 'ananya.roy@example.com');
    formData.append('phone', '+91 98765 12345');
    formData.append('department', 'Development');
    formData.append('roles', 'Frontend Development, UI/UX Development');
    formData.append('consent', 'true');

    const validPdf = new File(
      [Buffer.concat([Buffer.from('%PDF-1.7\nSample valid content\n'), Buffer.alloc(100)])],
      'Ananya_Roy_CV.pdf',
      { type: 'application/pdf' }
    );
    formData.append('resume', validPdf);

    const req = new NextRequest('http://localhost:3000/api/careers/apply', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.match(data.message, /successfully submitted to hiring@xentro.in/i);

    setCustomTransporter(null);
  });

  it('should prevent immediate duplicate clicks with 429', async () => {
    const mockTransporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'windows',
    });
    setCustomTransporter(mockTransporter);

    const makeReq = () => {
      const formData = new FormData();
      formData.append('fullName', 'Duplicate Test');
      formData.append('email', 'dup@example.com');
      formData.append('phone', '+91 98765 43210');
      formData.append('department', 'Development');
      formData.append('roles', 'Backend Development');
      formData.append('consent', 'true');
      const validPdf = new File(
        [Buffer.from('%PDF-1.4 sample content')],
        'resume.pdf',
        { type: 'application/pdf' }
      );
      formData.append('resume', validPdf);

      return new NextRequest('http://localhost:3000/api/careers/apply', {
        method: 'POST',
        headers: { 'x-forwarded-for': '198.51.100.1' },
        body: formData,
      });
    };

    const firstRes = await POST(makeReq());
    assert.equal(firstRes.status, 200);

    const secondRes = await POST(makeReq());
    assert.equal(secondRes.status, 429);
    const secondData = await secondRes.json();
    assert.match(secondData.error, /submission with these details was just received/i);

    setCustomTransporter(null);
  });
});
