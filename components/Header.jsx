'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from './ModalContext';
import { useTheme } from './ThemeContext';
import ZinadLogo from './ZinadLogo';

export default function Header() {
  const pathname = usePathname();
  const { openDemo } = useModal();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownTimeoutRef = React.useRef(null);

  const handleDropdownOpen = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleDropdownClose = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 180);
  };

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (solutionsOpen) setSolutionsOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, solutionsOpen]);

  const solutionsList = [
    {
      href: '/product-zisoft',
      title: 'ZiSoft AI',
      badge: 'Flagship',
      accentClass: 'sol-crimson',
      badgeBg: 'rgba(225, 29, 72, 0.12)',
      badgeColor: 'var(--accent-crimson)',
      actionLabel: 'Launch Console',
      desc: 'Autonomous phishing simulation, adaptive learning & SOAR response.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.2" />
        </svg>
      ),
    },
    {
      href: '/zi-games-page',
      title: 'ZIGAMES VR',
      badge: 'Spatial 3D',
      accentClass: 'sol-purple',
      badgeBg: 'rgba(168, 85, 247, 0.12)',
      badgeColor: 'var(--accent-purple)',
      actionLabel: 'Play 3D Sim',
      desc: 'Kinetic physical perimeter training & WebGL 3D gamification.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3l-2-2h-4l-2 2H5a2 2 0 0 1-2-2v-4z" fill="currentColor" fillOpacity="0.2" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
          <circle cx="16" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      href: '/products-cybersecurity-awarness-campaigns',
      title: 'Red Teaming',
      badge: 'Offensive',
      accentClass: 'sol-red',
      badgeBg: 'rgba(239, 68, 68, 0.12)',
      badgeColor: '#ef4444',
      actionLabel: 'Simulate Threat',
      desc: 'Simulated phone vishing, rogue Wi-Fi APs & environmental nudges.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
    {
      href: '/product-css',
      title: 'CSS Pentest',
      badge: 'Crowdsourced',
      accentClass: 'sol-emerald',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      badgeColor: 'var(--accent-emerald)',
      actionLabel: 'Live Disclosures',
      desc: 'Continuous crowdsourced pentesting with 4-hr human triage SLA.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.2" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      href: '/product-evenue',
      title: 'Evenue Summit',
      badge: 'Virtual 3D',
      accentClass: 'sol-cyan',
      badgeBg: 'rgba(6, 182, 212, 0.12)',
      badgeColor: 'var(--accent-cyan)',
      actionLabel: 'Explore Arena',
      desc: 'Enterprise cyber wargames, live team CTFs & automated CPE credits.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="currentColor" fillOpacity="0.15" />
        </svg>
      ),
    },
    {
      href: '/all-products',
      title: 'Platform Architecture',
      badge: 'Unified OS',
      accentClass: 'sol-amber',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      badgeColor: 'var(--accent-amber)',
      actionLabel: 'View Stack',
      desc: '4-tier integrated defense architecture across human & technical vectors.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
  ];

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/all-products', label: 'SOLUTIONS', isDropdown: true },
    { href: '/partners', label: 'PARTNERS' },
    { href: '/about', label: 'ABOUT US' },
    { href: '/cy-insights', label: 'CY INSIGHTS' },
    { href: '/careers', label: 'CAREERS' },
    { href: '/support', label: 'SUPPORT' },
  ];

  const mobileNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-products', label: 'Solutions Architecture', badge: 'Stack' },
    { href: '/product-zisoft', label: 'ZiSoft Human Threat Intel' },
    { href: '/zi-games-page', label: 'ZIGAMES Spatial VR' },
    { href: '/products-cybersecurity-awarness-campaigns', label: 'Red Team Campaigns' },
    { href: '/product-css', label: 'CSS Pentest & 0-Day Labs' },
    { href: '/product-evenue', label: 'Evenue Cyber Wargames' },
    { href: '/partners', label: 'Partners' },
    { href: '/about', label: 'About Us' },
    { href: '/cy-insights', label: 'CY Insights' },
    { href: '/careers', label: 'Careers' },
    { href: '/support', label: 'Support & Escalation' },
  ];

  return (
    <>
      <header className="site-header">
        <div className="container header-container">
          <Link href="/" className="logo-wrap" style={{ textDecoration: 'none' }}>
            <ZinadLogo size="default" />
          </Link>

          <nav>
            <ul className="nav-menu">
              {navItems.map((item) => {
                if (item.isDropdown) {
                  const isSolutionsActive =
                    pathname.startsWith('/product') ||
                    pathname.startsWith('/zi-games') ||
                    pathname === '/all-products';

                  return (
                    <li
                      key={item.label}
                      onMouseEnter={handleDropdownOpen}
                      onMouseLeave={handleDropdownClose}
                      style={{ position: 'relative' }}
                    >
                      <button
                        type="button"
                        onClick={() => setSolutionsOpen(!solutionsOpen)}
                        className={`nav-link ${isSolutionsActive ? 'active' : ''}`}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                        aria-expanded={solutionsOpen}
                      >
                        <span>{item.label}</span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{
                            transition: 'transform 0.2s ease',
                            transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Dropdown Panel */}
                      <div className={`nav-dropdown-panel ${solutionsOpen ? 'open' : ''}`}>
                        <div className="nav-dropdown-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="telemetry-live-dot" />
                            <span className="nav-dropdown-category-title">
                              ZINAD DEFENSE ECOSYSTEM // 6 CORE ENGINES
                            </span>
                          </div>
                          <Link
                            href="/all-products"
                            onClick={() => setSolutionsOpen(false)}
                            className="nav-dropdown-stack-link"
                          >
                            Full Architecture Stack ❯
                          </Link>
                        </div>

                        <div className="nav-dropdown-grid">
                          {solutionsList.map((sol) => (
                            <Link
                              key={sol.href}
                              href={sol.href}
                              className={`nav-dropdown-item ${sol.accentClass}`}
                              onClick={() => setSolutionsOpen(false)}
                            >
                              <div className="nav-dropdown-icon-box">
                                {sol.icon}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="nav-dropdown-title-row">
                                  <span className="nav-dropdown-item-title">{sol.title}</span>
                                  <span
                                    className="nav-dropdown-badge"
                                    style={{
                                      borderColor: sol.badgeColor,
                                      color: sol.badgeColor,
                                      backgroundColor: sol.badgeBg,
                                    }}
                                  >
                                    {sol.badge}
                                  </span>
                                </div>
                                <div className="nav-dropdown-desc">{sol.desc}</div>
                                <div className="nav-dropdown-action-hint">
                                  <span>{sol.actionLabel}</span>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Live Interactive Ecosystem Quick-Bar */}
                        <div className="nav-dropdown-footer">
                          <div className="nav-dropdown-footer-telemetry">
                            <span className="pulse-indicator-emerald" />
                            <span>ReflexAware SOAR: <strong>&lt;1.5s Webhook SLA</strong></span>
                            <span className="footer-dot-separator">&bull;</span>
                            <span>Triage: <strong>4-Hr Human SLA</strong></span>
                          </div>
                          <a
                            href="/#interactive-sandbox"
                            onClick={() => setSolutionsOpen(false)}
                            className="nav-dropdown-sandbox-cta"
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                          >
                            <span>Try 60-Sec Sandbox</span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                }

                const isActive = pathname === item.href;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            {/* Dual-Theme Mode Switcher: SOC Dark vs Executive Light */}
            <div className="header-theme-switch">
              <button
                onClick={() => setTheme('dark')}
                className={`theme-pill-btn ${theme === 'dark' ? 'active' : ''}`}
                title="SOC Defense Dark Mode"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>SOC</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`theme-pill-btn ${theme === 'light' ? 'active' : ''}`}
                title="Executive Light Mode"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Executive</span>
              </button>
            </div>

            {/* Unbreakable Single-Line SOC Telemetry Pill */}
            <div className="header-telemetry-capsule d-none-mobile" title="Global Threat Telemetry Network Status: 99.98% Available">
              <span className="telemetry-live-dot" />
              <span className="header-telemetry-txt">
                <span className="header-telemetry-dim">NET:</span> 99.98%
              </span>
            </div>

            <button
              className="btn btn-primary header-cta-desktop"
              onClick={openDemo}
            >
              <span>Book Live Demo</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Navigation Drawer Panel */}
      <aside
        className={`mobile-drawer-panel ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
            <ZinadLogo size="compact" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'none',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              width: '36px',
              height: '36px',
              transition: 'all 0.2s ease',
            }}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Drawer Mode Switcher */}
        <div style={{ margin: '1.25rem 0 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SYSTEM THEME</span>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.06)',
              borderRadius: '20px',
              padding: '2px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => setTheme('dark')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.25rem 0.65rem',
                borderRadius: '16px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                border: 'none',
                background: theme === 'dark' ? 'var(--accent-crimson)' : 'transparent',
                color: theme === 'dark' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span>SOC</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.65rem',
                borderRadius: '16px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                border: 'none',
                background: theme === 'light' ? 'var(--accent-crimson)' : 'transparent',
                color: theme === 'light' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <span>Exec</span>
            </button>
          </div>
        </div>

        {/* Drawer Route Navigation */}
        <ul className="mobile-nav-links" style={{ flex: 1, overflowY: 'auto' }}>
          {mobileNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.badge && <span className="nav-badge">{link.badge}</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Drawer Bottom Actions */}
        <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
            <span className="hero-pill-status"></span>
            <span>Threat Defense Active (99.98%)</span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setMobileMenuOpen(false);
              openDemo();
            }}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1.25rem' }}
          >
            Book Live Demo
          </button>
        </div>
      </aside>
    </>
  );
}
