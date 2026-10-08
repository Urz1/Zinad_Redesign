'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

const OFFICES = [
  {
    city: 'San Francisco',
    country: 'United States',
    role: 'Global Headquarters & Research Labs',
    address: '275 5th Street, Renaissance Center, Suite 410, San Francisco, CA 94103',
    tzOffset: -7, // PDT (UTC-7)
    tzCode: 'PST / PDT (UTC-7)',
    email: 'us.hq@zinad.net',
    iso: 'USA',
    regionTag: 'AMER HQ',
    accent: 'var(--accent-crimson)',
  },
  {
    city: 'Riyadh',
    country: 'Kingdom of Saudi Arabia',
    role: 'Regional Headquarters (MENA & GCC)',
    address: '2975 Prince Ahmed Ibn Abdelaziz, Al Woroud District, Riyadh',
    tzOffset: 3, // AST (UTC+3)
    tzCode: 'AST (UTC+3)',
    email: 'ksa@zinad.net',
    iso: 'KSA',
    regionTag: 'MENA HQ',
    accent: 'var(--accent-emerald)',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    role: 'Gulf Operations & Alliances Hub',
    address: 'Dubai Silicon Oasis, G006D, Dubai, UAE',
    tzOffset: 4, // GST (UTC+4)
    tzCode: 'GST (UTC+4)',
    email: 'uae@zinad.net',
    iso: 'UAE',
    regionTag: 'GCC HUB',
    accent: 'var(--accent-cyan)',
  },
];

export default function GlobalOfficesSection() {
  const { openDemo } = useModal();
  const [mounted, setMounted] = useState(false);
  const [currentUtc, setCurrentUtc] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentUtc(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTzTime = (offset) => {
    if (!mounted) return '--:--:--';
    const utcHours = currentUtc.getUTCHours();
    const utcMinutes = currentUtc.getUTCMinutes();
    const utcSeconds = currentUtc.getUTCSeconds();
    const localHours = (utcHours + offset + 24) % 24;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(localHours)}:${pad(utcMinutes)}:${pad(utcSeconds)}`;
  };

  return (
    <section className="section" style={{ background: 'var(--bg-dark-surface)', borderTop: '1px solid var(--border-subtle)', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            Global Operations Footprint
          </span>
          <h2 className="section-title">Tri-Continental Regional Command Desks</h2>
          <p className="section-subtitle">
            Operating across North America, EMEA, and the GCC. Connect directly with our regional cyber defense desks for localized compliance and on-site offensive simulation.
          </p>
        </div>

        {/* Unified Integrated Command Strip (Zero Floating Boxes) */}
        <div
          style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            background: 'var(--bg-dark-elevated)',
            overflow: 'hidden',
          }}
        >
          {/* 3 Regional Desks Row */}
          <div className="command-desks-grid">
            {OFFICES.map((office, idx) => (
              <div
                key={idx}
                className="command-desk-cell"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          padding: '0.18rem 0.45rem',
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.06)',
                          border: `1px solid ${office.accent}40`,
                          color: office.accent,
                        }}
                      >
                        {office.iso}
                      </span>
                      <strong style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{office.city}</strong>
                    </div>
                    <span
                      suppressHydrationWarning
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: office.accent,
                        background: 'rgba(255,255,255,0.06)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {formatTzTime(office.tzOffset)}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: office.accent, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {office.role}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {office.address}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a
                    href={`mailto:${office.email}`}
                    style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>{office.email}</span>
                  </a>
                  <button
                    onClick={openDemo}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: office.accent,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Book Desk ❯
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Executive Communication Bar at Bottom of Command Strip */}
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-dark-base)',
              padding: '1.25rem 2.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                Direct Enterprise Advisory Channels:
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                General Inquiries: <a href="mailto:info@zinad.net" style={{ color: 'var(--accent-cyan)' }}>info@zinad.net</a> • Direct Desk: <a href="tel:+19172972087" style={{ color: 'var(--text-muted)' }}>+1 (917) 297-2087</a>
              </span>
            </div>

            <button
              onClick={openDemo}
              className="btn btn-primary"
              style={{ fontSize: '0.8rem', padding: '0.45rem 1.15rem' }}
            >
              Request 15-Min Executive Briefing ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
