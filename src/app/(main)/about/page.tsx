import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from '@/data/team';
import styles from '@/components/about/About.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Helping founders build with clarity, connect with purpose, and navigate the entrepreneurial ecosystem with confidence.',
};

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.star} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <div className={styles.eyebrow}>Our Motto</div>
              <h1>Your North Star in the Entrepreneurial Journey.</h1>
              <p className={styles.lead}>
                Helping founders build with clarity, connect with purpose, and
                navigate the entrepreneurial ecosystem with confidence.
              </p>
              <a className={styles.scroll} href="#beliefs">
                <i aria-hidden="true" /> Explore our beliefs
              </a>
            </div>
            <div className={styles.heroSide}>
              Xentro is building entrepreneurial infrastructure around a simple
              idea: founders should spend their energy building ventures—not
              searching endlessly for the support required to move forward.
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={`${styles.wrap} ${styles.introGrid}`}>
          <div className={styles.eyebrow}>What Guides Us</div>
          <div>
            <h2>We Believe Entrepreneurship Should Be More Accessible.</h2>
            <p>
              Building a startup is not only about having a great idea. It is
              also about finding the right knowledge, people, opportunities, and
              support at the right time. Our work is guided by five fundamental
              beliefs that shape how we think about the entrepreneurial ecosystem
              and the role Xentro aims to play within it.
            </p>
          </div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className={styles.beliefs} id="beliefs">
        <article className={styles.belief}>
          <div className={styles.beliefCopy}>
            <div className={styles.beliefNum}>
              <span>01</span>
            </div>
            <div className={styles.tag}>Our First Belief</div>
            <h3>Entrepreneurship Should Not Depend on Connections.</h3>
            <p>
              Every founder should have the opportunity to discover relevant
              resources, guidance, and opportunities, regardless of their
              existing network or background.
            </p>
          </div>
          <div className={`${styles.beliefMedia} ${styles.b1}`} role="img" aria-label="Entrepreneurs collaborating in workshop" />
        </article>

        <article className={styles.belief}>
          <div className={styles.beliefCopy}>
            <div className={styles.beliefNum}>
              <span>02</span>
            </div>
            <div className={styles.tag}>Our Second Belief</div>
            <h3>The Right Support Should Be Accessible at the Right Time.</h3>
            <p>
              Founders face different challenges at different stages.
              Entrepreneurial support should be relevant to their current needs,
              not difficult to identify or access.
            </p>
          </div>
          <div className={`${styles.beliefMedia} ${styles.b2}`} role="img" aria-label="Team meeting discussing startup milestones" />
        </article>

        <article className={styles.belief}>
          <div className={styles.beliefCopy}>
            <div className={styles.beliefNum}>
              <span>03</span>
            </div>
            <div className={styles.tag}>Our Third Belief</div>
            <h3>Geography Should Not Define Opportunity.</h3>
            <p>
              A founder’s location should not determine their ability to discover
              meaningful opportunities, connect with ecosystem stakeholders, or
              access entrepreneurial support.
            </p>
          </div>
          <div className={`${styles.beliefMedia} ${styles.b3}`} role="img" aria-label="Connected global network visualization" />
        </article>

        <article className={styles.belief}>
          <div className={styles.beliefCopy}>
            <div className={styles.beliefNum}>
              <span>04</span>
            </div>
            <div className={styles.tag}>Our Fourth Belief</div>
            <h3>Founders Should Not Have to Build Alone.</h3>
            <p>
              Meaningful relationships with mentors, investors, institutions,
              and fellow entrepreneurs can help founders make informed decisions
              and progress through uncertainty.
            </p>
          </div>
          <div className={`${styles.beliefMedia} ${styles.b4}`} role="img" aria-label="Founder discussion with mentors" />
        </article>

        <article className={styles.belief}>
          <div className={styles.beliefCopy}>
            <div className={styles.beliefNum}>
              <span>05</span>
            </div>
            <div className={styles.tag}>Our Fifth Belief</div>
            <h3>Progress Matters More Than Visibility Alone.</h3>
            <p>
              The purpose of an entrepreneurial ecosystem is not simply to create
              connections or exposure. It should help founders learn, take
              meaningful action, and move their ventures forward.
            </p>
          </div>
          <div className={`${styles.beliefMedia} ${styles.b5}`} role="img" aria-label="Data and milestones dashboard showing traction" />
        </article>
      </section>

      {/* SUMMARY */}
      <section className={styles.summary}>
        <div className={styles.wrap}>
          <div className={styles.summaryHead}>
            <h2>
              Five Principles.
              <br />
              One Direction.
            </h2>
          </div>
          <div className={styles.beliefList}>
            <div className={styles.beliefRow}>
              <div className={styles.n}>01</div>
              <strong>Access should not depend on connections.</strong>
              <div className={styles.key}>Access</div>
            </div>
            <div className={styles.beliefRow}>
              <div className={styles.n}>02</div>
              <strong>Support should be relevant to the right moment.</strong>
              <div className={styles.key}>Relevance</div>
            </div>
            <div className={styles.beliefRow}>
              <div className={styles.n}>03</div>
              <strong>Geography should not define opportunity.</strong>
              <div className={styles.key}>Opportunity</div>
            </div>
            <div className={styles.beliefRow}>
              <div className={styles.n}>04</div>
              <strong>Founders should not build alone.</strong>
              <div className={styles.key}>Community</div>
            </div>
            <div className={styles.beliefRow}>
              <div className={styles.n}>05</div>
              <strong>Meaningful progress matters more than visibility.</strong>
              <div className={styles.key}>Progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>Our Belief</div>
          <h2>
            A founder’s journey should be challenging because of the work of
            building—not because support is difficult to find.
          </h2>
          <p>
            Xentro exists to help make that journey more accessible, connected,
            and easier to navigate.
          </p>
          <div className={styles.pillars}>
            <span>BUILD</span>
            <span>NETWORK</span>
            <span>NAVIGATE</span>
          </div>
          <Link className={styles.cta} href="/explore">
            Explore Xentro &rarr;
          </Link>
        </div>
      </section>

      {/* STORY */}
      <section className={styles.story} id="our-story">
        <div className={`${styles.wrap} ${styles.storyGrid}`}>
          <div className={styles.storySticky}>
            <div className={styles.eyebrow}>Our Story</div>
            <h2>
              From trying to find our way through the ecosystem to building a
              better way through it.
            </h2>
            <p className={styles.storyKicker}>
              Xentro began with a founder’s experience of uncertainty, limited
              resources, and a simple question: why is the support entrepreneurs
              need so difficult to discover at the right time?
            </p>
          </div>
          <div>
            <div className={styles.timeline}>
              <div className={styles.moment}>
                <div className={styles.year}>The Decision</div>
                <h3>An unconventional path.</h3>
                <p>
                  After graduating, our founder chose entrepreneurship over the
                  traditional campus placement route. With limited resources, no
                  investors, and only personal savings, the journey began with
                  more questions than answers.
                </p>
              </div>
              <div className={styles.moment}>
                <div className={styles.year}>The Observation</div>
                <h3>Building the product was only part of the challenge.</h3>
                <p>
                  The harder problem was finding the right people, knowledge,
                  programs, opportunities, and support systems required to keep
                  moving forward.
                </p>
              </div>
              <div className={styles.moment}>
                <div className={styles.year}>The Ecosystem</div>
                <h3>The resources existed. Access remained fragmented.</h3>
                <p>
                  Exposure to the startup ecosystem through entrepreneurship
                  programs and the Venture Development Center at GITAM University
                  revealed a broader pattern: mentors were willing to help,
                  institutions were creating programs, investors were looking for
                  ventures, and opportunities existed—but discovery and
                  connection remained fragmented.
                </p>
              </div>
              <div className={styles.moment}>
                <div className={styles.year}>The Question</div>
                <h3>What if the startup ecosystem itself was connected?</h3>
                <p>
                  What if founders did not have to continuously search across
                  different platforms, institutions, networks, and communities
                  to determine what was relevant to them?
                </p>
              </div>
              <div className={styles.moment}>
                <div className={styles.year}>The Foundation</div>
                <h3>That question became Xentro.</h3>
                <p>
                  What started as an attempt to make one startup journey easier
                  evolved into a larger ambition: building infrastructure that
                  makes the entrepreneurial ecosystem easier to navigate and
                  more connected for everyone within it.
                </p>
              </div>
            </div>
            <div className={styles.storyQuote}>
              “We started by trying to find our way through the ecosystem. Now,
              we are building a platform to help others navigate it.”
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className={styles.mission} id="mission">
        <div className={styles.wrap}>
          <div className={styles.missionGrid}>
            <div>
              <div className={styles.eyebrow}>Our Mission</div>
              <h2>Remove friction from the startup journey.</h2>
              <p className={styles.missionLead}>
                Build a connected digital ecosystem that helps people discover
                the right opportunities, build meaningful relationships, and turn
                potential into progress.
              </p>
            </div>
          </div>

          <div className={styles.stakeholders}>
            <div className={styles.stake}>
              <strong>Startups</strong>
              <span>
                Relevant opportunities aligned with their stage, needs, and
                growth.
              </span>
            </div>
            <div className={styles.stake}>
              <strong>Mentors</strong>
              <span>
                Meaningful impact by connecting expertise with founders who can
                benefit from it.
              </span>
            </div>
            <div className={styles.stake}>
              <strong>Investors</strong>
              <span>
                Quality deal flow through more structured discovery of ventures
                aligned with investment focus.
              </span>
            </div>
            <div className={styles.stake}>
              <strong>Institutions</strong>
              <span>
                Stronger entrepreneurial outcomes through connected founders,
                ecosystem partners, and collaboration opportunities.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className={styles.vision} id="vision">
        <div className={`${styles.wrap} ${styles.visionGrid}`}>
          <div>
            <div className={styles.eyebrow} style={{ color: 'var(--ink)' }}>
              Our Vision
            </div>
            <h2>
              Build India’s most connected and inclusive entrepreneurial
              ecosystem.
            </h2>
            <div className={styles.visionCopy}>
              <p>
                Entrepreneurial potential exists everywhere—in major cities,
                emerging towns, universities, small communities, and among
                people who have never had access to established startup
                networks.
              </p>
              <p>
                Our vision is a future where access to opportunity is not
                limited by geography, networks, or privilege; where founders can
                discover the people, resources, and opportunities relevant to
                their journey regardless of where they begin.
              </p>
              <p>
                Our ambition extends beyond connecting users on a platform. We
                aim to build digital entrepreneurial infrastructure that
                connects, strengthens, and scales the startup ecosystem over
                time.
              </p>
            </div>
            <div className={styles.visionBelief}>
              <strong>
                A future where entrepreneurial potential is widespread, access is
                more equitable, and no founder is held back simply because they do
                not know where to begin or whom to approach.
              </strong>
            </div>
          </div>

          <div className={styles.visionMap}>
            <div>
              <div className={styles.eyebrow} style={{ color: 'var(--ink)' }}>
                Scale with density
              </div>
              <h3
                style={{
                  fontSize: '32px',
                  letterSpacing: '-.03em',
                  margin: '14px 0 28px',
                }}
              >
                Local ecosystem &rarr; national infrastructure &rarr; global
                relevance.
              </h3>
            </div>
            <div className={styles.mapPath}>
              <div className={`${styles.mapNode} ${styles.active}`}>
                <div className={styles.dot} />
                <div>
                  <strong>Visakhapatnam</strong>
                  <small>Build the initial network density.</small>
                </div>
              </div>
              <div className={styles.mapNode}>
                <div className={styles.dot} />
                <div>
                  <strong>Andhra Pradesh &amp; Telangana</strong>
                  <small>Expand the connected regional ecosystem.</small>
                </div>
              </div>
              <div className={styles.mapNode}>
                <div className={styles.dot} />
                <div>
                  <strong>South India</strong>
                  <small>Replicate ecosystem infrastructure across markets.</small>
                </div>
              </div>
              <div className={styles.mapNode}>
                <div className={styles.dot} />
                <div>
                  <strong>India</strong>
                  <small>
                    Build connected entrepreneurial infrastructure at national
                    scale.
                  </small>
                </div>
              </div>
              <div className={styles.mapNode}>
                <div className={styles.dot} />
                <div>
                  <strong>Global</strong>
                  <small>
                    Extend the infrastructure model beyond geographic
                    boundaries.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={styles.team} id="team">
        <div className={styles.wrap}>
          <div className={styles.teamHead}>
            <div>
              <div className={styles.eyebrow}>Our Team</div>
              <h2>
                Built by people who understand the journey from inside the
                ecosystem.
              </h2>
            </div>
            <p>
              Xentro is being built by a multidisciplinary leadership team
              working across strategy, operations, finance, product, ecosystem
              development, and growth—with a shared focus on reducing friction in
              the entrepreneurial journey.
            </p>
          </div>

          <div className={styles.leadershipGrid}>
            {teamMembers.map((member) => (
              <article key={member.id} className={styles.leaderCard}>
                <div
                  className={`${styles.leaderPhoto} ${
                    member.aspectRatio === '4/5' ? styles.aspect45 : styles.aspect35
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={member.badge === 'CEO'}
                  />
                  <span>{member.badge}</span>
                </div>
                <div className={styles.leaderInfo}>
                  <div className={styles.leaderRole}>{member.role}</div>
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
