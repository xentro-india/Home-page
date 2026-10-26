'use client';

import React, { useState, useEffect } from 'react';
import styles from './Careers.module.css';

interface NavItem {
  id: string;
  label: string;
  isSpecial?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'Our work' },
  { id: 'culture', label: 'Culture' },
  { id: 'paths', label: 'Career paths' },
  { id: 'process', label: 'Hiring' },
  { id: 'job-descriptions', label: 'Job descriptions' },
  { id: 'apply', label: 'Apply now ↗', isSpecial: true },
];

export default function CareersSectionNav() {
  const [activeId, setActiveId] = useState<string>('about');

  useEffect(() => {
    const handleScrollSpy = () => {
      const sectionElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
        Boolean
      ) as HTMLElement[];

      if (sectionElements.length === 0) return;

      const scrollPos = window.scrollY + 180; // Offset for navbar + section nav height

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el.offsetTop <= scrollPos) {
          setActiveId(NAV_ITEMS[i].id);
          return;
        }
      }
      setActiveId(NAV_ITEMS[0].id);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState(null, '', `#${id}`);
    }
    setActiveId(id);
  };

  return (
    <nav className={styles.sectionNav} aria-label="Careers sections">
      <div className={styles.sectionNavInner}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.sectionNavLink} ${isActive ? styles.activeSectionLink : ''} ${
                item.isSpecial ? styles.specialSectionLink : ''
              }`}
              aria-current={isActive ? 'true' : undefined}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
