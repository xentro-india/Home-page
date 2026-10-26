'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { exploreTabs, ExploreTabItem } from '@/data/explore';
import styles from './Explore.module.css';

const validTabs = ['startups', 'mentors', 'investors', 'institutions'] as const;
type TabId = (typeof validTabs)[number];
const DEFAULT_TAB: TabId = 'startups';

export default function ExploreContent() {
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);

  // Sync hash on initial load and handle browser back/forward navigation
  useEffect(() => {
    const handleHashSync = () => {
      const rawHash = window.location.hash.replace('#', '') as TabId;
      if (validTabs.includes(rawHash)) {
        setActiveTab(rawHash);
      } else {
        // Missing or invalid fragment resets consistently to default tab
        setActiveTab(DEFAULT_TAB);
      }
    };

    handleHashSync();

    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);

    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  const handleTabChange = (id: TabId, shouldScroll = true) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#' + id);
      if (shouldScroll && navRef.current && !isFirstRender.current) {
        navRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      targetIndex = (index + 1) % exploreTabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      targetIndex = (index - 1 + exploreTabs.length) % exploreTabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = exploreTabs.length - 1;
    }

    if (targetIndex !== -1) {
      const nextTab = exploreTabs[targetIndex].id;
      handleTabChange(nextTab, false);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const getImageClass = (item: ExploreTabItem) => {
    switch (item.id) {
      case 'startups':
        return styles.startupImage;
      case 'mentors':
        return styles.mentorImage;
      case 'investors':
        return styles.investorImage;
      case 'institutions':
        return styles.institutionImage;
      default:
        return '';
    }
  };

  const getSubpageBackground = (item: ExploreTabItem) => {
    if (item.isDark) return styles.darkPage;
    if (item.id === 'mentors') return styles.subpageMentors;
    if (item.id === 'institutions') return styles.subpageInstitutions;
    return '';
  };

  return (
    <>
      {/* IN-PAGE TABS */}
      <nav
        ref={navRef}
        className={styles.exploreNav}
        aria-label="Explore user types"
      >
        <div
          className={`${styles.wrap} ${styles.exploreNavInner}`}
          role="tablist"
          aria-label="Audience categories"
        >
          {exploreTabs.map((tab, idx) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`subpage-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`${styles.exploreTab} ${
                activeTab === tab.id ? styles.activeTab : ''
              }`}
              onClick={() => handleTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* SUBPAGE CONTENT PANELS */}
      <div className={styles.subpageShell}>
        {exploreTabs.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <section
              key={item.id}
              id={`subpage-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              tabIndex={0}
              className={`${styles.subpage} ${
                isActive ? styles.activeSubpage : ''
              } ${getSubpageBackground(item)}`}
            >
              <div className={styles.wrap}>
                <div className={styles.subpageHero}>
                  <div className={styles.subpageCopy}>
                    <div className={styles.sectionNumber}>
                      {item.sectionNumber}
                    </div>
                    <div className={styles.eyebrow}>{item.eyebrow}</div>
                    <h2>{item.heading}</h2>
                    <p className={styles.sectionLead}>{item.lead}</p>

                    <div className={styles.outcomePair}>
                      <div>
                        <span>Before</span>
                        <strong>{item.before}</strong>
                      </div>
                      <div>
                        <span>With Xentro</span>
                        <strong>{item.withXentro}</strong>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.subpageImage} ${getImageClass(item)}`}
                    role="img"
                    aria-label={item.imageLabel}
                  >
                    <div className={styles.imageLabel}>{item.imageLabel}</div>
                  </div>
                </div>

                <div className={styles.detailGrid}>
                  <div className={styles.problemBlock}>
                    <div className={styles.eyebrow}>
                      {item.problem.eyebrow}
                    </div>
                    <h3>{item.problem.title}</h3>
                    <p>{item.problem.text}</p>
                  </div>

                  <div className={styles.capabilityGrid}>
                    {item.capabilities.map((cap) => (
                      <article key={cap.num} className={styles.capabilityCard}>
                        <span>{cap.num}</span>
                        <h4>{cap.title}</h4>
                        <p>{cap.desc}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className={styles.pricingStrip}>
                  <div>
                    <div className={styles.eyebrow}>{item.pricing.eyebrow}</div>
                    <strong>
                      {item.pricing.primaryText}
                      {item.pricing.note && <em>{item.pricing.note}</em>}
                    </strong>
                    {item.pricing.subText && (
                      <strong>
                        {item.pricing.subText}{' '}
                        {item.pricing.oldPrice && (
                          <small>{item.pricing.oldPrice}</small>
                        )}
                      </strong>
                    )}
                  </div>
                  <Link className={styles.darkBtn} href={item.pricing.ctaHref}>
                    {item.pricing.ctaText}
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
