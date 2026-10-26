'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile drawer on route change
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Handle scroll hide/reveal and solid background
  useEffect(() => {
    const updateNav = () => {
      const currentY = window.scrollY;

      if (!mobileOpen) {
        if (currentY > lastScrollY.current && currentY > 90) {
          setNavHidden(true);
          document.documentElement.setAttribute('data-nav-hidden', 'true');
        } else if (currentY < lastScrollY.current || currentY <= 90) {
          setNavHidden(false);
          document.documentElement.setAttribute('data-nav-hidden', 'false');
        }
      } else {
        setNavHidden(false);
        document.documentElement.setAttribute('data-nav-hidden', 'false');
      }

      setNavSolid(currentY > 24);
      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNav);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.removeAttribute('data-nav-hidden');
    };
  }, [mobileOpen]);

  const navClasses = [
    styles.siteNav,
    navHidden ? styles.navHidden : '',
    navSolid ? styles.navSolid : '',
    mobileOpen ? styles.mobileOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/explore', label: 'Explore' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
  ];

  return (
    <nav className={navClasses} id="siteNav" aria-label="Primary navigation">
      <div className={styles.navInner}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Xentro home"
          onClick={() => setMobileOpen(false)}
        >
          xentro
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? styles.active : ''}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className={styles.navActions}>
          <Link
            className={styles.joinBtn}
            href="/join"
            onClick={() => setMobileOpen(false)}
          >
            Join Now
          </Link>
        </div>

        <button
          className={styles.mobileToggle}
          id="mobileToggle"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
