import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import OrbitGraphic from '@/components/home/OrbitGraphic';
import PricingSection from '@/components/home/PricingSection';
import FaqAccordion from '@/components/home/FaqAccordion';
import styles from '@/components/home/Home.module.css';

export const metadata: Metadata = {
  title: 'Xentro — Entrepreneurial Infrastructure',
  description:
    'Xentro helps founders navigate the startup ecosystem with relevant opportunities, meaningful connections, and clearer next steps—all through one connected ecosystem.',
};

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <div className={styles.eyebrow}>Entrepreneurial Infrastructure</div>
              <h1>Know what comes next.</h1>
              <p className={styles.lead}>
                Xentro helps founders navigate the startup ecosystem with relevant
                opportunities, meaningful connections, and clearer next
                steps—all through one connected ecosystem.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primary} href="/join">
                  Join Xentro
                </Link>
                <a className={styles.secondary} href="#what-is-xentro">
                  Explore the Ecosystem
                </a>
              </div>
            </div>
            <div className={styles.heroNote}>
              Built for founders first—and designed to connect mentors,
              investors, institutions, and opportunities around the startup
              journey.
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className={styles.problem}>
        <div className={styles.wrap}>
          <div className={styles.problemGrid}>
            <div>
              <div className={styles.eyebrow}>The Ecosystem</div>
              <h2>
                The opportunities exist. The connections between them are
                fragmented.
              </h2>
            </div>
            <div className={styles.problemCopy}>
              <p>
                The startup ecosystem is full of people, programs,
                opportunities, and resources built to help ventures grow. But
                finding what is relevant often means searching across
                disconnected platforms, networks, and institutions.
              </p>
              <p>
                Founders may struggle to find the right mentor, investor,
                program, or opportunity at the right time. Meanwhile, mentors,
                investors, and institutions face the challenge of discovering the
                right ventures and people to engage with.
              </p>
              <p>
                Xentro is built to make navigating the ecosystem simpler, more
                connected, and more meaningful.
              </p>
            </div>
          </div>

          <div className={styles.frictionGrid}>
            <div className={styles.friction}>
              <div className={styles.num}>01</div>
              <strong>Discovery Friction</strong>
              <p>
                Useful support exists, but founders often do not know where to
                find it.
              </p>
            </div>
            <div className={styles.friction}>
              <div className={styles.num}>02</div>
              <strong>Context Friction</strong>
              <p>
                Information is available, but it is not always clear what applies
                to the startup right now.
              </p>
            </div>
            <div className={styles.friction}>
              <div className={styles.num}>03</div>
              <strong>Connection Friction</strong>
              <p>
                The right people exist, but meaningful introductions rarely
                happen automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS XENTRO */}
      <section className={styles.what} id="what-is-xentro">
        <div className={`${styles.wrap} ${styles.whatGrid}`}>
          <div>
            <div className={styles.eyebrow}>What is Xentro?</div>
            <h2>A connected startup ecosystem built around relevance.</h2>
            <div className={styles.whatCopy}>
              <p>
                Xentro is the startup ecosystem platform built to bring
                entrepreneurs and the people who support them closer together.
              </p>
              <p>
                We connect startups with opportunities and resources through one
                connected ecosystem. Instead of navigating different platforms and
                networks, users can discover what is relevant to them in one
                place.
              </p>
              <p>
                From finding the right mentor to discovering an opportunity or
                connecting with an investor, Xentro helps turn discovery into
                meaningful connections.
              </p>
            </div>
            <div className={styles.whatPillars}>
              <div className={styles.whatPillar}>
                <strong>Build</strong>
                <span>
                  Understand the stage you&apos;re in and the capabilities your
                  startup needs.
                </span>
              </div>
              <div className={styles.whatPillar}>
                <strong>Network</strong>
                <span>
                  Connect with people and organizations that are relevant to your
                  current needs.
                </span>
              </div>
              <div className={styles.whatPillar}>
                <strong>Navigate</strong>
                <span>
                  See what matters now instead of searching through everything
                  at once.
                </span>
              </div>
            </div>
          </div>

          <OrbitGraphic />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.how} id="how-it-works">
        <div className={styles.wrap}>
          <div className={styles.howHead}>
            <div>
              <div className={styles.eyebrow}>How it Works</div>
              <h2>Five steps, start to finish.</h2>
            </div>
            <p>
              Xentro is designed to understand where you are today, surface what
              is relevant, and help you move toward the next meaningful milestone.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>◎</div>
                <h3>Create your profile</h3>
                <p>
                  Create your Xentro profile and complete the details that
                  define who you are, where you are in your journey, and what you
                  are looking for.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>↗</div>
                <h3>Tell us where you are</h3>
                <p>
                  Share the information that helps Xentro understand your current
                  stage, goals, needs, sector, location, and progress.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNum}>03</div>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>✦</div>
                <h3>See what&apos;s relevant</h3>
                <p>
                  Xentro&apos;s intelligence layer analyzes your profile and
                  identifies opportunities, resources, mentors, investors,
                  institutions, and other ecosystem connections that are relevant
                  to you.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNum}>04</div>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>⇄</div>
                <h3>Connect with the right people</h3>
                <p>
                  Discover and connect with the people and organizations that can
                  help you address your current needs and move toward your next
                  milestone.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNum}>05</div>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>✓</div>
                <h3>Take action and track progress</h3>
                <p>
                  Act on the opportunities and connections that matter, while
                  tracking your journey and letting Xentro continuously help
                  identify what comes next.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.howCallout}>
            The more Xentro understands your journey, the more relevant your
            ecosystem becomes.
          </div>
        </div>
      </section>

      {/* RELEVANCE */}
      <section className={styles.relevance}>
        <div className={`${styles.wrap} ${styles.relevanceGrid}`}>
          <div className={styles.relevanceCopy}>
            <div className={styles.eyebrow}>Relevant, not random</div>
            <h2>
              Don&apos;t apply randomly and hope. Understand why it&apos;s
              relevant to you.
            </h2>
            <p>
              Government portals, institutions, and ecosystem websites already
              publish grants, programs, competitions, mentorship opportunities,
              and other resources.
            </p>
            <p>
              The challenge isn&apos;t finding another list of opportunities.
              It&apos;s knowing which ones actually make sense for you.
            </p>
            <p>
              Xentro uses the information in your profile and journey to help
              surface what is relevant to your current stage, needs, and goals—so
              you can spend less time searching and more time taking the right
              action.
            </p>
          </div>

          <div className={styles.relevanceCard}>
            <div>
              <div className={styles.eyebrow}>Opportunity Context</div>
              <h3>See why an opportunity fits before you apply.</h3>
              <div className={styles.filterList}>
                <div className={styles.filter}>
                  <span>Startup stage</span>
                  <strong>Early Stage</strong>
                </div>
                <div className={styles.filter}>
                  <span>Industry</span>
                  <strong>SaaS / Technology</strong>
                </div>
                <div className={styles.filter}>
                  <span>Geography</span>
                  <strong>India</strong>
                </div>
                <div className={styles.filter}>
                  <span>Opportunity type</span>
                  <strong>Grant / Program</strong>
                </div>
                <div className={styles.filter}>
                  <span>Eligibility</span>
                  <strong>Matched</strong>
                </div>
                <div className={styles.filter}>
                  <span>Deadline</span>
                  <strong>Active</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <FaqAccordion />

      {/* FOOTER CTA */}
      <section className={styles.footerCta}>
        <div className={styles.wrap}>
          <h2>Your next step gets clearer as you move.</h2>
          <Link className={styles.primary} href="/join">
            Join Xentro
          </Link>
        </div>
      </section>
    </main>
  );
}
