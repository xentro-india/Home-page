import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CountdownTimer from '@/components/join/CountdownTimer';
import styles from '@/components/join/Join.module.css';

export const metadata: Metadata = {
  title: 'Join Xentro — Launching Soon',
  description:
    'Something is about to begin. The next chapter of Xentro goes live soon.',
};

export default function JoinPage() {
  return (
    <main className={styles.countdownPage}>
      <div className={`${styles.ambient} ${styles.ambientOne}`} aria-hidden="true" />
      <div className={`${styles.ambient} ${styles.ambientTwo}`} aria-hidden="true" />

      <section className={styles.countdownShell}>
        <header className={styles.brandRow}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Return to Xentro Home">
              xentro
            </Link>
          </div>
          <div className={styles.statusPill}>Launching Soon</div>
        </header>

        <div className={styles.countdownContent}>
          <div className={styles.eyebrow} style={{ color: '#d9ff3f' }}>
            30 September 2026 &middot; 5:00 PM IST
          </div>
          <h1>Something is about to begin.</h1>

          <p className={styles.lead}>The next chapter of Xentro goes live in:</p>

          <CountdownTimer />
        </div>

        <footer className={styles.footerLine}>
          <span>Your North Star in the Entrepreneurial Journey.</span>
          <span>26.09.2026 &middot; 17:00 IST</span>
        </footer>
      </section>
    </main>
  );
}
