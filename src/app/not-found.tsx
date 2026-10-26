import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0c10',
        color: '#fff',
        textAlign: 'center',
        padding: '0 24px',
        fontFamily: 'var(--font-inter), sans-serif',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#d9ff3f',
          marginBottom: '16px',
        }}
      >
        404 &mdash; Page Not Found
      </div>
      <h1
        style={{
          fontSize: 'clamp(48px, 6vw, 84px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          margin: '0 0 24px',
        }}
      >
        Lost in the ecosystem?
      </h1>
      <p
        style={{
          maxWidth: '540px',
          color: 'rgba(255, 255, 255, 0.68)',
          fontSize: '18px',
          lineHeight: '1.6',
          margin: '0 0 36px',
        }}
      >
        The page you are looking for does not exist or has been moved. Return to
        the main platform to continue navigating.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '48px',
          padding: '0 26px',
          borderRadius: '999px',
          background: '#d9ff3f',
          color: '#0b0e13',
          fontSize: '14px',
          fontWeight: 850,
          textDecoration: 'none',
        }}
      >
        Return to Home
      </Link>
    </main>
  );
}
