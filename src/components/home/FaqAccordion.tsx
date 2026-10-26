'use client';

import React, { useState } from 'react';
import { faqList } from '@/data/faqs';
import styles from './Home.module.css';

export default function FaqAccordion() {
  // First item open by default matching original index.html
  const [openId, setOpenId] = useState<string | null>(faqList[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.faq} id="faq">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <div>
          <div className={styles.eyebrow}>FAQs</div>
          <h2>Questions, answered clearly.</h2>
          <p className={styles.kicker}>
            The basics about who Xentro is for, how it works, and what to expect
            from the platform.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqList.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
              >
                <button
                  className={styles.faqQ}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div
                  className={styles.faqA}
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
