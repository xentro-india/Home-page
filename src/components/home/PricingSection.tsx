'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { standardPlans, proPlans } from '@/data/pricing';
import styles from './Home.module.css';

const pricingTabs = ['standard', 'pro'] as const;
type PricingTab = (typeof pricingTabs)[number];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<PricingTab>('standard');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      targetIndex = (index + 1) % pricingTabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      targetIndex = (index - 1 + pricingTabs.length) % pricingTabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = pricingTabs.length - 1;
    }

    if (targetIndex !== -1) {
      const nextTab = pricingTabs[targetIndex];
      setActiveTab(nextTab);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.wrap}>
        <div className={styles.pricingHead}>
          <div>
            <div className={styles.eyebrow}>Pricing</div>
            <h2>Start where you are. Upgrade when you need more.</h2>
          </div>
          <p>
            Xentro offers Standard and Pro access depending on the user type and
            the depth of tools required.
          </p>
        </div>

        <div className={styles.pricingToggleWrap}>
          <div
            className={styles.pricingToggle}
            role="tablist"
            aria-label="Pricing plan type"
          >
            <button
              ref={(el) => {
                tabRefs.current[0] = el;
              }}
              className={activeTab === 'standard' ? styles.active : ''}
              role="tab"
              aria-selected={activeTab === 'standard'}
              aria-controls="price-standard"
              id="tab-standard"
              tabIndex={activeTab === 'standard' ? 0 : -1}
              onClick={() => setActiveTab('standard')}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            >
              Standard
            </button>
            <button
              ref={(el) => {
                tabRefs.current[1] = el;
              }}
              className={activeTab === 'pro' ? styles.active : ''}
              role="tab"
              aria-selected={activeTab === 'pro'}
              aria-controls="price-pro"
              id="tab-pro"
              tabIndex={activeTab === 'pro' ? 0 : -1}
              onClick={() => setActiveTab('pro')}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            >
              Pro
            </button>
          </div>
        </div>

        {/* Standard View */}
        <div
          className={`${styles.priceView} ${
            activeTab === 'standard' ? styles.activeView : ''
          }`}
          id="price-standard"
          role="tabpanel"
          aria-labelledby="tab-standard"
          tabIndex={0}
        >
          <div className={`${styles.priceGrid} ${styles.standardRow}`}>
            {standardPlans.map((plan) => (
              <div key={plan.role} className={styles.priceCard}>
                <div className={styles.priceType}>{plan.role}</div>
                <h3>{plan.tier}</h3>
                <div className={styles.price}>{plan.price}</div>
                <div className={styles.priceNote}>{plan.note}</div>
                <ul className={styles.priceFeatures}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Link className={styles.primary} href={plan.ctaHref}>
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pro View */}
        <div
          className={`${styles.priceView} ${
            activeTab === 'pro' ? styles.activeView : ''
          }`}
          id="price-pro"
          role="tabpanel"
          aria-labelledby="tab-pro"
          tabIndex={0}
        >
          <div className={`${styles.priceGrid} ${styles.singleRow}`}>
            {proPlans.map((plan) => (
              <div
                key={plan.role}
                className={`${styles.priceCard} ${styles.featured}`}
              >
                <div className={styles.priceType}>{plan.role}</div>
                <h3>{plan.tier}</h3>
                {plan.isContactPrice ? (
                  <div className={styles.contactPrice}>{plan.price}</div>
                ) : (
                  <div className={styles.price}>
                    {plan.price}{' '}
                    {plan.oldPrice && (
                      <span className={styles.old}>{plan.oldPrice}</span>
                    )}
                  </div>
                )}
                <div className={styles.priceNote}>{plan.note}</div>
                <ul className={styles.priceFeatures}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Link className={styles.primary} href={plan.ctaHref}>
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
