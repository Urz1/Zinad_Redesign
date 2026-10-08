'use client';

import React, { useState } from 'react';

const TESTIMONIALS = [
  {
    id: 0,
    quote: 'ZiSoft has helped us gather all our cybersecurity awareness needs into a unified command center where we can track employee learning velocity, vulnerability scores, and active defense levels across all branches.',
    author: 'Chief Information Security Officer',
    organization: 'Central Bank',
    sector: 'Banking & Financial Sovereign Entity',
    badge: 'CENTRAL BANKING',
    rating: '5.0 / 5.0',
    impact: '100% Regulatory Audit Compliance',
    logo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2">
          <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
        </svg>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.5px' }}>
          CENTRAL BANK <span style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600 }}>// SOVEREIGN ENTITY</span>
        </span>
      </div>
    ),
  },
  {
    id: 1,
    quote: 'ZINAD provides true security consultation and offensive red teaming capabilities that meet the stringent real-time reliability, performance, and scalability of our mission-critical petrochemical industrial infrastructure.',
    author: 'Head of IT & Infrastructure',
    organization: 'Petrochemical Industrial Corporation',
    sector: 'Critical Energy & SCADA Systems',
    badge: 'OIL & GAS / ENERGY',
    rating: '5.0 / 5.0',
    impact: 'Zero Unplanned SCADA Downtime',
    logo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-amber)">
          <path d="M12 2c1.5 3 4.5 6 4.5 10a4.5 4.5 0 0 1-9 0c0-4 3-7 4.5-10z" />
        </svg>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.5px' }}>
          PETROCHEM INDUSTRIAL <span style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600 }}>// ENERGY INFRASTRUCTURE</span>
        </span>
      </div>
    ),
  },
  {
    id: 2,
    quote: 'ZINAD has proven to be a mission-critical asset from both a reliability and security standpoint. They have enabled our firm to protect customer data with confidence through their solid, highly professional cybersecurity services.',
    author: 'Chief Security Officer',
    organization: 'Tier-1 Telecommunications Operator',
    sector: 'Global Telecom & Cloud ISP',
    badge: 'TELECOM & CLOUD',
    rating: '5.0 / 5.0',
    impact: '-78.4% Phish Click-Rate Reduction',
    logo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
        </svg>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.5px' }}>
          EUROTEL COMMUNICATIONS <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600 }}>// TIER-1 TELCO</span>
        </span>
      </div>
    ),
  },
  {
    id: 3,
    quote: 'The virtual cybersecurity awareness week we hosted using ZINAD’s Evenue platform engaged thousands of distributed ministry employees in virtual workshops, micro-learning challenges, and 3D security gaming in one organized experience.',
    author: 'Cybersecurity Director',
    organization: 'Federal Governmental Ministry',
    sector: 'Public Sector & Sovereign Defense',
    badge: 'GOVERNMENT & DEFENSE',
    rating: '5.0 / 5.0',
    impact: '14,000+ Active Employees Certified',
    logo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-crimson)">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.5px' }}>
          FEDERAL MINISTRY <span style={{ color: 'var(--accent-crimson)', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600 }}>// SOVEREIGN DEFENSE</span>
        </span>
      </div>
    ),
  },
  {
    id: 4,
    quote: 'This product provides an exceptional learning and onboarding experience. It delivers an intuitive user experience with a streamlined flow of user activities, backed by outstanding support that adapts to dynamic enterprise scenarios.',
    author: 'Enterprise Security Architect',
    organization: 'Gartner Peer Insights Verified Review',
    sector: 'Enterprise Software & Services',
    badge: 'GARTNER PEER INSIGHTS',
    rating: '4.8 / 5.0',
    impact: 'Verified Customer Consensus',
    logo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.5px' }}>
          Gartner<span style={{ color: 'var(--accent-crimson)' }}>.</span>
        </span>
        <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.8px' }}>
          PEER INSIGHTS™
        </span>
      </div>
    ),
  },
];

export default function EnterpriseTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = TESTIMONIALS[activeIdx];

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-base)', padding: '5rem 0' }}>
      <div className="container">
        {/* Editorial Sector Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                background: activeIdx === idx ? 'var(--bg-dark-elevated)' : 'transparent',
                border: `1px solid ${activeIdx === idx ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                color: activeIdx === idx ? 'var(--accent-crimson)' : 'var(--text-secondary)',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: activeIdx === idx ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeIdx === idx ? 'var(--accent-crimson)' : 'var(--text-muted)' }}></span>
              <span>{t.badge}</span>
            </button>
          ))}
        </div>

        {/* High-Impact Editorial Pull-Quote Layout (Zero Isolated Box Fatigue) */}
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          {/* Authentic Corporate Logo Display */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.6rem 1.4rem',
                background: 'var(--bg-dark-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {current.logo()}
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--accent-amber)' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {current.rating} Verified Consensus
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-emerald)',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              {current.impact}
            </span>
          </div>

          <blockquote
            style={{
              fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
              lineHeight: 1.5,
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-primary)',
              margin: '0 0 2rem',
              letterSpacing: '-0.01em',
              fontStyle: 'italic',
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              {current.author}
            </strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-crimson)', fontFamily: 'var(--font-mono)' }}>
              {current.organization} • {current.sector}
            </span>
          </div>

          {/* Bottom Pagination Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: activeIdx === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeIdx === i ? 'var(--accent-crimson)' : 'var(--border-medium)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
