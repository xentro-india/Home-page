import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CareersSectionNav from '@/components/careers/CareersSectionNav';
import RoleDirectory from '@/components/careers/RoleDirectory';
import CareerForm from '@/components/careers/CareerForm';
import styles from '@/components/careers/Careers.module.css';

export const metadata: Metadata = {
  title: 'Careers — Build What Comes Next | Xentro',
  description:
    'Build with Xentro. Explore our culture, career paths, and 48 role specializations across technology, creative, marketing, and operations.',
};

export default function CareersPage() {
  return (
    <div className={styles.careersPage}>
      {/* 1. HERO SECTION (Under shared frosted Navbar) */}
      <header className={styles.hero} id="home">
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrow}>
              CAREERS AT XENTRO <span className={styles.dash} aria-hidden="true" /> BUILD WITH US
            </div>
            <h1>
              A more connected
              <br />
              <span className={styles.accentText}>tomorrow starts here.</span>
            </h1>
            <p className={styles.heroIntro}>
              We’re building the infrastructure for a more connected entrepreneurial ecosystem. Join
              the people turning that ambition into something real.
            </p>
            <div className={styles.actions}>
              <a href="#apply" className={styles.primaryBtn}>
                Explore opportunities <span aria-hidden="true">&rarr;</span>
              </a>
              <a href="#culture" className={styles.secondaryBtn}>
                Explore our culture &darr;
              </a>
            </div>
            <div className={styles.heroNote}>
              <span className={styles.spark} aria-hidden="true" /> CONNECT PEOPLE. CREATE
              OPPORTUNITY.
            </div>
          </div>

          <div className={styles.heroArt} aria-hidden="true">
            <Image
              src="/assets/careers/brand-symbol.png"
              alt="Xentro"
              width={420}
              height={359}
              priority
              className={styles.symbolImage}
            />
          </div>
        </div>
      </header>

      {/* 2. STICKY SECONDARY SECTION NAVIGATION (Positioned immediately below hero) */}
      <CareersSectionNav />

      {/* 3. MAIN CAREERS SECTIONS */}
      <main>
        {/* 01 — WHAT WE'RE BUILDING */}
        <section id="about" className={`${styles.section} ${styles.lightSection}`}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow} style={{ color: '#4b730f' }}>
              01 — WHAT WE’RE BUILDING
            </div>
            <div className={styles.twoCol}>
              <h2>
                Not just a place to work.
                <br />
                <span>A place to build.</span>
              </h2>
              <div>
                <p className={styles.lead}>
                  Xentro is creating entrepreneurial ecosystem infrastructure that makes it easier
                  for founders to discover opportunities and engage with the people who can help
                  them progress.
                </p>
                <p className={styles.bodyCopy}>
                  We’re bringing founders, mentors, investors and institutions into a more connected
                  environment. Doing that well takes more than writing code or running campaigns: it
                  takes people who question assumptions, work across disciplines and care about
                  outcomes.
                </p>
                <a className={styles.inlineLink} href="#paths">
                  See where you can contribute <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            <div className={styles.pillars}>
              <div>
                <span className={styles.pillarNum}>01</span>
                <h3>Real challenges</h3>
                <p>
                  Work on practical product and ecosystem problems, not just hypothetical
                  assignments.
                </p>
              </div>
              <div>
                <span className={styles.pillarNum}>02</span>
                <h3>Visible contribution</h3>
                <p>Understand how your decisions and deliverables support a growing platform.</p>
              </div>
              <div>
                <span className={styles.pillarNum}>03</span>
                <h3>Room to learn</h3>
                <p>
                  Explore ideas, improve through feedback and build useful skills through action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — LIFE AT XENTRO */}
        <section id="culture" className={`${styles.section} ${styles.softSection}`}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow} style={{ color: '#4b730f' }}>
              02 — LIFE AT XENTRO
            </div>
            <div className={styles.sectionHead}>
              <h2>
                How we work
                <br />
                <span>matters.</span>
              </h2>
              <p>
                We’re an early-stage team. That means curiosity, thoughtful execution and shared
                responsibility matter more than rigid job titles. We value people who are willing to
                learn and contribute.
              </p>
            </div>

            <div className={styles.cultureGrid}>
              <article className={styles.cultureCard}>
                <div className={styles.iconBox} aria-hidden="true">
                  ✳
                </div>
                <h3>Curiosity</h3>
                <p>Ask better questions, challenge assumptions and stay open to new approaches.</p>
              </article>
              <article className={styles.cultureCard}>
                <div className={styles.iconBox} aria-hidden="true">
                  ◎
                </div>
                <h3>Ownership</h3>
                <p>Take responsibility for your work, communicate clearly and follow through.</p>
              </article>
              <article className={styles.cultureCard}>
                <div className={styles.iconBox} aria-hidden="true">
                  ↗
                </div>
                <h3>Collaboration</h3>
                <p>Share knowledge and work with people across different disciplines.</p>
              </article>
              <article className={styles.cultureCard}>
                <div className={styles.iconBox} aria-hidden="true">
                  ◇
                </div>
                <h3>Experimentation</h3>
                <p>Test ideas, learn from outcomes and improve through iteration.</p>
              </article>
            </div>

            <div className={styles.cultureBanner}>
              <span>OUR APPROACH</span>
              <strong>Come with ideas. Leave with things you’ve built.</strong>
            </div>
          </div>
        </section>

        {/* 03 — THE EXPERIENCE (Dark Section) */}
        <section id="experience" className={`${styles.section} ${styles.experience}`}>
          <div className={`${styles.wrap} ${styles.experienceGrid}`}>
            <div>
              <div className={styles.eyebrow}>03 — THE EXPERIENCE</div>
              <h2>
                Closer to the work.
                <br />
                <em>Closer to the impact.</em>
              </h2>
            </div>
            <div>
              <p>
                At Xentro, teams contribute across product development, creative storytelling, user
                growth, events, partnerships and ecosystem engagement. As the company evolves, so
                do the challenges and opportunities to take initiative.
              </p>
              <p>
                We believe practical experience is built by solving meaningful problems with people
                who are committed to learning and execution.
              </p>
            </div>
          </div>
        </section>

        {/* 04 — CAREER PATHS */}
        <section id="paths" className={`${styles.section} ${styles.lightSection}`}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow} style={{ color: '#4b730f' }}>
              04 — CAREER PATHS
            </div>
            <div className={styles.sectionHead}>
              <h2>
                Different skills.
                <br />
                <span>One shared direction.</span>
              </h2>
              <p>
                There are several ways to contribute to Xentro. Explore our four departments below,
                then select the roles that suit your interests in the application form.
              </p>
            </div>

            <div className={styles.departmentGrid}>
              <article className={styles.deptCard}>
                <span className={styles.deptNum}>01 / TECHNOLOGY</span>
                <div className={styles.deptIcon} aria-hidden="true">
                  ⌘
                </div>
                <h3>Development</h3>
                <p>Build and improve the applications, systems and technology that power Xentro.</p>
                <div className={styles.tags}>
                  <span>Frontend</span>
                  <span>Backend</span>
                  <span>AI</span>
                  <span>Databases</span>
                </div>
              </article>

              <article className={styles.deptCard}>
                <span className={styles.deptNum}>02 / CREATIVE</span>
                <div className={styles.deptIcon} aria-hidden="true">
                  ✦
                </div>
                <h3>Media &amp; Design</h3>
                <p>Shape how Xentro looks, communicates and connects with its audiences.</p>
                <div className={styles.tags}>
                  <span>Branding</span>
                  <span>Video</span>
                  <span>Graphics</span>
                  <span>Motion</span>
                </div>
              </article>

              <article className={styles.deptCard}>
                <span className={styles.deptNum}>03 / AUDIENCE</span>
                <div className={styles.deptIcon} aria-hidden="true">
                  ↗
                </div>
                <h3>Marketing &amp; Growth</h3>
                <p>
                  Tell meaningful stories, build communities and help the ecosystem discover
                  Xentro.
                </p>
                <div className={styles.tags}>
                  <span>Content Creator</span>
                  <span>Growth</span>
                  <span>SEO</span>
                </div>
              </article>

              <article className={styles.deptCard}>
                <span className={styles.deptNum}>04 / ECOSYSTEM</span>
                <div className={styles.deptIcon} aria-hidden="true">
                  ◎
                </div>
                <h3>Operations &amp; Partnerships</h3>
                <p>
                  Coordinate execution, events and relationships across the entrepreneurial
                  ecosystem.
                </p>
                <div className={styles.tags}>
                  <span>Event Management</span>
                  <span>Partnerships</span>
                  <span>Operations</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 05 — RECRUITMENT PROCESS */}
        <section id="process" className={`${styles.section} ${styles.softSection}`}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow} style={{ color: '#4b730f' }}>
              05 — RECRUITMENT PROCESS
            </div>
            <div className={styles.sectionHead}>
              <h2>
                A clear path
                <br />
                <span>from interest to impact.</span>
              </h2>
              <p>
                Our selection process is designed to help us understand your interests, experience
                and ability to contribute. Individual steps may vary depending on the role.
              </p>
            </div>

            <div className={styles.steps}>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>01</span>
                <h3>Apply</h3>
                <p>Share your details, preferred roles and resume.</p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>02</span>
                <h3>Review</h3>
                <p>We assess your application against relevant needs.</p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>03</span>
                <h3>Connect</h3>
                <p>Shortlisted candidates may interview or complete a role-specific evaluation.</p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>04</span>
                <h3>Onboard</h3>
                <p>Selected candidates receive next steps and joining details.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — EXPLORE THE ROLES / JOB DESCRIPTIONS */}
        <section id="job-descriptions" className={`${styles.section} ${styles.lightSection}`}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow} style={{ color: '#4b730f' }}>
              06 — EXPLORE THE ROLES
            </div>
            <div className={styles.sectionHead}>
              <h2>
                Find your role.
                <br />
                <span>Know what to expect.</span>
              </h2>
              <p>
                Browse the specializations within each department before applying. Individual job
                descriptions will be published here as they are finalized.
              </p>
            </div>

            <div className={styles.jdNotice}>
              <strong>Internship &amp; career pathways</strong>
              <p>
                Initial intakes are planned as 1–3 month internships. Candidates may be considered
                for part-time opportunities after a three-month internship, or for full-time
                opportunities after a one-month internship followed by two months of structured,
                stipend-supported training. The proposed minimum training stipend is ₹4,000; its
                payment frequency will be confirmed in the formal offer. Progression is subject to
                assessment, role availability, and applicable legal requirements. An internship does
                not guarantee employment.
              </p>
            </div>

            <RoleDirectory />

            <p className={styles.jdFootnote}>
              Job descriptions are currently being prepared. “Coming soon” means no downloadable JD
              is available yet; this is not a confirmation of an open vacancy. Applicants can still
              indicate their interests in the form.
            </p>

            <a className={styles.primaryBtn} href="#apply">
              Continue to application <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* 07 — APPLICATION PREVIEW FORM */}
        <section id="apply" className={`${styles.section} ${styles.softSection}`}>
          <div className={styles.wrap}>
            <div className={styles.applicationHead}>
              <div className={styles.eyebrow} style={{ color: '#4b730f', justifyContent: 'center' }}>
                07 — JOIN XENTRO
              </div>
              <h2>
                Let’s build something
                <br />
                <span>meaningful.</span>
              </h2>
              <p>
                Tell us about yourself, choose the area where you’d like to contribute and attach your
                resume.
              </p>
            </div>

            <div className={styles.formShell}>
              <div className={styles.formTop}>
                <span>CAREER INTEREST APPLICATION</span>
                <span>ALL FIELDS MARKED * ARE REQUIRED</span>
              </div>
              <CareerForm />
            </div>
          </div>
        </section>

        {/* 08 — CLOSING SECTION */}
        <section id="closing" className={styles.closing}>
          <div className={styles.wrap}>
            <div className={styles.eyebrow} style={{ justifyContent: 'center' }}>
              THE NEXT CHAPTER
            </div>
            <h2>
              Good things are built
              <br />
              <span>by people who care.</span>
            </h2>
            <a href="#apply" className={styles.primaryBtn}>
              Join Xentro <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>
      </main>

      {/* 4. CAREERS FOOTER WITH ORIGINAL SYMBOL */}
      <footer className={styles.careersFooter}>
        <div className={`${styles.wrap} ${styles.footerGrid}`}>
          <Link className={styles.footerBrand} href="/" aria-label="Xentro Home">
            <Image
              src="/assets/careers/brand-symbol.png"
              alt=""
              width={34}
              height={29}
              style={{ objectFit: 'contain' }}
            />
            <span className={styles.footerBrandWord}>xentro</span>
          </Link>
          <p>Building a more connected entrepreneurial ecosystem.</p>
          <p>© 2026 Xentro Ventures Pvt. Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
