'use client';

import React from 'react';
import { useModal } from './ModalContext';

const ANNOUNCEMENTS = [
  {
    id: 1,
    date: 'AUG 2025',
    badge: 'GLOBAL FLAGSHIP',
    accent: 'var(--accent-crimson)',
    title: 'Black Hat USA 2025',
    location: 'Mandalay Bay, Las Vegas • Booth #1867',
    summary: 'Showcasing the Human Risk Intelligence Framework and live demonstration of ReflexAware 360 automated SecOps containment pipelines.',
    cta: 'Book Booth Briefing ❯',
    logo: () => (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="var(--accent-crimson)">
        <path d="M4 22 C10 18, 20 18, 26 22 L24 16 C23 12, 19 9, 15 9 C11 9, 7 12, 6 16 Z" />
        <line x1="2" y1="22" x2="28" y2="22" stroke="var(--accent-crimson)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    date: 'APR 2025',
    badge: 'EXECUTIVE SUMMIT',
    accent: 'var(--accent-cyan)',
    title: 'RSA Conference 2025',
    location: 'Moscone Center, San Francisco, CA',
    summary: 'Presenting enterprise breakthroughs in AI-personalized attack simulations and UBA-linked behavioral phishing intelligence.',
    cta: 'View Summit Agenda ❯',
    logo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
        <path d="M4 6 L12 1 L20 6 L20 17 L12 22 L4 17 Z" />
        <circle cx="12" cy="11.5" r="3.5" fill="var(--accent-cyan)" />
      </svg>
    ),
  },
  {
    id: 3,
    date: 'OCT 2025',
    badge: 'STRATEGIC ALLIANCE',
    accent: 'var(--accent-purple)',
    title: 'AmiViz Regional B2B Distribution Alliance',
    location: 'Enterprise Marketplace Expansion (GCC & MENA)',
    summary: 'Expanding delivery of ZINAD’s cyber defense suites across Tier-1 systems integrators and sovereign enterprise clients.',
    cta: 'Read Partnership Details ❯',
    logo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="14" r="5" fill="var(--accent-purple)" opacity="0.85" />
        <circle cx="16" cy="9" r="4" fill="var(--accent-cyan)" opacity="0.9" />
        <line x1="8" y1="14" x2="16" y2="9" stroke="var(--accent-purple)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 4,
    date: 'NOV 2025',
    badge: 'REGIONAL ROADSHOW',
    accent: 'var(--accent-emerald)',
    title: 'Kingdom of Saudi Arabia Enterprise Cyber Tour',
    location: 'Riyadh, KSA • Executive CISO Roundtables',
    summary: 'Closed-door briefings addressing NCA ECC & CSCC compliance standards and localized sovereign threat telemetry.',
    cta: 'Request Executive Invitation ❯',
    logo: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14.5 14.5 0 0 0 0 18M3 12h18" />
      </svg>
    ),
  },
];

export default function AnnouncementsSection() {
  const { openDemo } = useModal();

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-dark-base)', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            Field Operations &amp; Intelligence
          </span>
          <h2 className="section-title">Global Presence &amp; Industry Summits</h2>
          <p className="section-subtitle">
            Connect with ZINAD&apos;s executive leadership and threat researchers at tier-1 security conferences, regional distributor alliances, and closed-door roadshows worldwide.
          </p>
        </div>

        {/* Chronological Field Intelligence Timeline (Zero Card Boxes) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {ANNOUNCEMENTS.map((item, idx) => (
            <div
              key={item.id}
              className="timeline-dispatch-row"
            >
              {/* Date Column */}
              <div>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: item.accent,
                    background: 'var(--bg-dark-surface)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    display: 'inline-block',
                  }}
                >
                  {item.date}
                </span>
              </div>

              {/* Title & Badge with Event Logo */}
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: item.accent, fontWeight: 700, marginBottom: '0.2rem' }}>
                  {item.badge}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ display: 'inline-flex', flexShrink: 0 }}>{item.logo()}</span>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                    {item.title}
                  </h4>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {item.summary}
                </p>
              </div>

              {/* CTA Action */}
              <div className="timeline-action" style={{ textAlign: 'right' }}>
                <button
                  onClick={openDemo}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.78rem',
                    padding: '0.45rem 0.95rem',
                    whiteSpace: 'nowrap',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  {item.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
