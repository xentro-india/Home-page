import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BlogSection from '@/components/blog/BlogSection';
import { editorialPillars } from '@/data/blogs';
import styles from '@/components/blog/Blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — Xentro Journal',
  description:
    'Ideas that help founders move forward. Practical guidance, ecosystem intelligence, founder perspectives, and opportunities.',
};

export default function BlogPage() {
  return (
    <>
      {/* HERO */}
      <header className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrow}>Xentro Journal</div>
            <h1>Ideas that help founders move forward.</h1>
            <p className={styles.lead}>
              Practical guidance, ecosystem intelligence, founder perspectives,
              and opportunities—designed to help entrepreneurs build, network,
              and navigate with greater clarity.
            </p>
          </div>

          <div className={styles.heroSide}>
            <div className={styles.sideLabel}>Content Philosophy</div>
            <div className={styles.sideWord}>Build</div>
            <div className={styles.sideWord}>Network</div>
            <div className={styles.sideWord}>Navigate</div>
          </div>
        </div>
      </header>

      {/* FILTER BAR (BEFORE FEATURED), FEATURED INSIGHT, AND LATEST GRID */}
      <main>
        <BlogSection />

        {/* PERSPECTIVE */}
        <section className={styles.perspective}>
          <div className={`${styles.wrap} ${styles.perspectiveGrid}`}>
            <div>
              <div className={styles.eyebrow}>Xentro Perspective</div>
              <h2>The ecosystem does not have an information shortage.</h2>
            </div>
            <div>
              <p>It has a relevance problem.</p>
              <p>
                Founders are surrounded by programs, people, content, funding
                sources, and opportunities. The difficult part is understanding
                what matters now.
              </p>
              <a
                href="#"
                className={`${styles.readLink} ${styles.light}`}
                aria-label="Explore our perspective (Coming soon)"
              >
                Explore our perspective <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* EDITORIAL PILLARS */}
        <section className={styles.editorial}>
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.compact}`}>
              <div>
                <div className={styles.eyebrow}>What We Write About</div>
                <h2>Six pillars. One objective.</h2>
              </div>
              <p>
                Every piece of Xentro content should help someone understand the
                entrepreneurial journey better or move forward with greater
                clarity.
              </p>
            </div>

            <div className={styles.pillarGrid}>
              {editorialPillars.map((pillar) => (
                <div key={pillar.num} className={styles.pillar}>
                  <span>{pillar.num}</span>
                  <strong>{pillar.name}</strong>
                  <p>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className={styles.newsletter}>
          <div className={`${styles.wrap} ${styles.newsletterGrid}`}>
            <div>
              <div className={styles.eyebrow}>Xentro Brief</div>
              <h2>Less noise. More relevance.</h2>
              <p>
                Get selected founder insights, ecosystem perspectives, and
                opportunities in one concise update.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <div className={styles.footerBrand}>xentro</div>
          <div className={styles.footerCopy}>
            Build with clarity. Connect with purpose. Navigate with confidence.
          </div>
          <Link href="/join" className={styles.primary}>
            Join Xentro
          </Link>
        </div>
      </footer>
    </>
  );
}
