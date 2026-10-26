import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ExploreContent from '@/components/explore/ExploreContent';
import styles from '@/components/explore/Explore.module.css';

export const metadata: Metadata = {
  title: 'Explore',
  description:
    'One ecosystem. Different reasons to belong. Choose your role to see how Xentro is designed around your place in the entrepreneurial ecosystem.',
};

export default function ExplorePage() {
  return (
    <main>
      {/* HERO */}
      <header className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrow}>Explore Xentro</div>
            <h1>
              One ecosystem.
              <br />
              Different reasons to belong.
            </h1>
            <p className={styles.lead}>
              Choose your role to see how Xentro is designed around your place in
              the entrepreneurial ecosystem.
            </p>
          </div>

          <div className={styles.heroSide}>
            <div className={styles.heroStat}>
              <span>01</span>
              <strong>Founders move with more clarity.</strong>
            </div>
            <div className={styles.heroStat}>
              <span>02</span>
              <strong>Mentors create more focused impact.</strong>
            </div>
            <div className={styles.heroStat}>
              <span>03</span>
              <strong>Investors discover startups earlier.</strong>
            </div>
            <div className={styles.heroStat}>
              <span>04</span>
              <strong>Institutions build stronger ecosystems.</strong>
            </div>
          </div>
        </div>
      </header>

      {/* EXPLORE TABS & CONTENT */}
      <ExploreContent />

      {/* BOTTOM CTA */}
      <section className={styles.ecosystemCta}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>One ecosystem</div>
          <h2>Different roles. Shared progress.</h2>
          <p>
            Founders need the right support. Mentors need the right founders.
            Investors need relevant ventures. Institutions need stronger
            entrepreneurial outcomes. Xentro is designed to bring those needs
            closer together.
          </p>
          <div className={styles.ctaActions}>
            <Link className={styles.primary} href="/join">
              Join Xentro
            </Link>
            <Link
              className={`${styles.secondary} ${styles.darkOutline}`}
              href="/about"
            >
              Why Xentro Exists
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
