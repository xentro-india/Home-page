'use client';

import React, { useState, useRef, useId, type FormEvent, type ChangeEvent } from 'react';
import { departments, departmentNames, type Department } from '@/data/careers';
import styles from './Careers.module.css';

function checkResume(file: File | undefined): string {
  if (!file) return 'Please upload your résumé.';
  if (file.size > 5 * 1024 * 1024) return 'Your résumé must be 5 MB or smaller.';
  if (!/\.(pdf|docx)$/i.test(file.name)) return 'Only PDF and DOCX résumés are accepted.';
  return '';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type FormStep = 'form' | 'review' | 'success';

export default function CareerForm() {
  const [step, setStep] = useState<FormStep>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<Department | ''>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [roleError, setRoleError] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const roleErrorId = useId();
  const fileErrorId = useId();

  function changeDepartment(value: Department) {
    setDepartment(value);
    setRoles([]);
    setRoleError(false);
    setFormError('');
  }

  function changeFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    const error = checkResume(file || undefined);
    setFileError(error);
    setSelectedFile(error ? null : file);
    setFormError('');
  }

  function handleReviewClick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    setSubmitError('');

    // Field-level validations
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!trimmedPhone || !/^[+()\d\s-]{8,25}$/.test(trimmedPhone)) {
      setFormError('Please enter a valid phone number (at least 8 digits).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!department) {
      setRoleError(true);
      setFormError('Please select one department.');
      return;
    }

    if (roles.length === 0) {
      setRoleError(true);
      setFormError(`Please select at least one specialization role in ${department}.`);
      return;
    }

    const fileIssue = checkResume(selectedFile || undefined);
    if (fileIssue) {
      setFileError(fileIssue);
      setFormError(fileIssue);
      fileInputRef.current?.focus();
      return;
    }

    if (!consent) {
      setFormError('Please accept the consent terms to proceed.');
      return;
    }

    // Validation passed: transition to review step WITHOUT sending any network request
    setStep('review');
    setTimeout(() => {
      reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  async function handleFinalSubmit() {
    if (isSubmitting) return;

    if (!selectedFile) {
      setSubmitError('The résumé file was lost. Please return to edit and re-select your file.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formData = new FormData();
      formData.append('fullName', fullName.trim());
      formData.append('email', email.trim());
      formData.append('phone', phone.trim());
      formData.append('department', department);
      roles.forEach((r) => formData.append('roles', r));
      formData.append('resume', selectedFile);
      formData.append('consent', consent ? 'true' : 'false');

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStep('success');
        setTimeout(() => {
          successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
      } else {
        const message =
          data?.error ||
          (response.status === 413
            ? 'The résumé file exceeds the 5 MB limit.'
            : 'Unable to submit your application right now. Your details were not sent. Please try again.');
        setSubmitError(message);
      }
    } catch {
      setSubmitError(
        'A network error occurred while connecting to the server. Your application was NOT submitted. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFullName('');
    setEmail('');
    setPhone('');
    setDepartment('');
    setRoles([]);
    setConsent(false);
    setSelectedFile(null);
    setFileError('');
    setRoleError(false);
    setFormError('');
    setSubmitError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setStep('form');
  }

  // --------------------------------------------------------------------------
  // STEP 3: SUCCESS CONFIRMATION
  // --------------------------------------------------------------------------
  if (step === 'success') {
    return (
      <div ref={successRef} className={styles.successContainer} role="status">
        <div className={styles.successIcon} aria-hidden="true">
          ✓
        </div>
        <h3 className={styles.successTitle}>Application Submitted Successfully!</h3>
        <p className={styles.successBody}>
          Thank you, <strong>{fullName}</strong>. Your application and résumé have been securely
          delivered to <strong>hiring@xentro.in</strong>. Our recruitment team will review your
          profile and reach out if there is a strong match for open roles.
        </p>

        <div className={styles.successSummaryBox}>
          <div className={styles.successSummaryRow}>
            <span className={styles.successSummaryLabel}>Department:</span>
            <span className={styles.successSummaryVal}>{department}</span>
          </div>
          <div className={styles.successSummaryRow}>
            <span className={styles.successSummaryLabel}>Specializations:</span>
            <span className={styles.successSummaryVal}>{roles.join(', ')}</span>
          </div>
          <div className={styles.successSummaryRow}>
            <span className={styles.successSummaryLabel}>Attached Résumé:</span>
            <span className={styles.successSummaryVal}>{selectedFile?.name || 'Uploaded document'}</span>
          </div>
          <div className={styles.successSummaryRow}>
            <span className={styles.successSummaryLabel}>Contact:</span>
            <span className={styles.successSummaryVal}>{email}</span>
          </div>
        </div>

        <button type="button" onClick={handleReset} className={styles.primaryBtn}>
          Submit another application
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // STEP 2: REVIEW APPLICATION DETAILS (NO DATA SENT YET)
  // --------------------------------------------------------------------------
  if (step === 'review') {
    return (
      <div ref={reviewRef} className={styles.reviewContainer} aria-label="Review your application">
        <div className={styles.reviewHeader}>
          <h3>Review Your Application</h3>
          <p>
            Please verify your details below. Confirming will transmit your application and attached
            résumé to <strong>hiring@xentro.in</strong>.
          </p>
        </div>

        <div className={styles.reviewGrid}>
          <div className={styles.reviewItem}>
            <div className={styles.reviewItemLabel}>Full Name</div>
            <div className={styles.reviewItemValue}>{fullName}</div>
          </div>

          <div className={styles.reviewItem}>
            <div className={styles.reviewItemLabel}>Phone Number</div>
            <div className={styles.reviewItemValue}>{phone}</div>
          </div>

          <div className={`${styles.reviewItem} ${styles.full}`}>
            <div className={styles.reviewItemLabel}>Email Address</div>
            <div className={styles.reviewItemValue}>{email}</div>
          </div>

          <div className={`${styles.reviewItem} ${styles.full}`}>
            <div className={styles.reviewItemLabel}>Chosen Department & Roles</div>
            <div className={styles.reviewItemValue}>{department}</div>
            <div className={styles.reviewRolesList}>
              {roles.map((r) => (
                <span key={r} className={styles.reviewRoleBadge}>
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className={`${styles.reviewItem} ${styles.full}`}>
            <div className={styles.reviewItemLabel}>Attached Résumé Document</div>
            <div className={styles.reviewFileCard}>
              <span className={styles.reviewFileIcon} aria-hidden="true">
                📄
              </span>
              <div className={styles.reviewFileDetails}>
                <strong>{selectedFile?.name || 'No file selected'}</strong>
                <span>{selectedFile ? formatFileSize(selectedFile.size) : ''}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviewNotice}>
          <strong>Notice:</strong> Your personal information and attached résumé will be delivered
          directly to Xentro&apos;s hiring team at <code>hiring@xentro.in</code> for recruitment
          consideration.
        </div>

        {submitError && (
          <div className={`${styles.formMessage} ${styles.errorMsg}`} role="alert">
            {submitError}
          </div>
        )}

        <div className={styles.reviewActions}>
          <button
            type="button"
            onClick={() => setStep('form')}
            disabled={isSubmitting}
            className={styles.outlineBtn}
          >
            ← Edit application
          </button>

          <button
            type="button"
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className={styles.primaryBtn}
          >
            {isSubmitting ? 'Submitting application...' : 'Submit application →'}
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // STEP 1: INITIAL FORM VIEW
  // --------------------------------------------------------------------------
  return (
    <form
      ref={formRef}
      id="careerForm"
      noValidate
      onSubmit={handleReviewClick}
      onChange={() => setFormError('')}
    >
      <fieldset>
        <legend>
          <span className={styles.formStep}>01</span> Personal information
        </legend>
        <div className={styles.fields}>
          <label className={styles.full}>
            Full name <b>*</b>
            <input
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              required
              maxLength={120}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label>
            Phone number <b>*</b>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              required
              maxLength={25}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label>
            Email address <b>*</b>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className={styles.formStep}>02</span> Choose your career path
        </legend>
        <p className={styles.formHelp}>
          Choose <strong>one department</strong>. You may select multiple roles within that
          department, but not across departments.
        </p>
        <div
          className={styles.departmentOptions}
          role="radiogroup"
          aria-label="Choose one department"
          aria-describedby={roleError ? roleErrorId : undefined}
        >
          {departmentNames.map((name) => (
            <label key={name} className={styles.deptChoice}>
              <input
                type="radio"
                name="department"
                value={name}
                required
                checked={department === name}
                onChange={() => changeDepartment(name)}
              />
              {name}
            </label>
          ))}
        </div>

        {department && (
          <div className={styles.rolePanel}>
            <div className={styles.rolePanelHeader}>
              <h3>{department} specializations</h3>
              <span role="status">{roles.length} selected</span>
            </div>
            <div className={styles.roleOptions}>
              {departments[department].map((role) => (
                <label key={role}>
                  <input
                    type="checkbox"
                    name="roles"
                    value={role}
                    checked={roles.includes(role)}
                    onChange={(event) => {
                      setRoles((current) =>
                        event.target.checked
                          ? [...current, role]
                          : current.filter((value) => value !== role)
                      );
                      setRoleError(false);
                    }}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>
        )}

        {roleError && (
          <p id={roleErrorId} className={styles.error} role="alert">
            Please select at least one role in your chosen department.
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend>
          <span className={styles.formStep}>03</span> Upload your résumé
        </legend>
        <label className={styles.uploadZone} htmlFor="resume">
          <span className={styles.uploadIcon} aria-hidden="true">
            ⇧
          </span>
          <strong>{selectedFile ? selectedFile.name : 'Choose your résumé'}</strong>
          <span>PDF or DOCX · Maximum 5 MB</span>
          <span className={styles.uploadButton}>
            {selectedFile ? 'Change file' : 'Browse files'}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            onChange={changeFile}
            aria-invalid={Boolean(fileError)}
            aria-describedby={fileError ? fileErrorId : undefined}
          />
        </label>
        {fileError && (
          <p id={fileErrorId} className={styles.error} role="alert">
            {fileError}
          </p>
        )}
      </fieldset>

      <label className={styles.consent}>
        <input
          type="checkbox"
          name="consent"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          I consent to Xentro transmitting and using my submitted information and résumé to review
          this application at hiring@xentro.in and contacting me regarding recruitment. <b>*</b>
        </span>
      </label>

      {formError && (
        <div className={`${styles.formMessage} ${styles.errorMsg}`} role="alert">
          {formError}
        </div>
      )}

      <div className={styles.submitRow}>
        <p>
          Next step: Review your application details and attached résumé before submitting to
          hiring@xentro.in.
        </p>
        <button type="submit" className={styles.primaryBtn}>
          Review application <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
