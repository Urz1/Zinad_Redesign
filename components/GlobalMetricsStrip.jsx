'use client';

import React from 'react';

const METRICS = [
  {
    value: '1,000,000+',
    label: 'Enterprise Licenses Deployed',
    subtext: 'Active protection across Tier-1 banks, ministries & Fortune 500 enterprises',
    pill: 'GLOBAL SCALE',
    accent: 'var(--accent-crimson)',
  },
  {
    value: '25+',
    label: 'Countries & Regional Desks',
    subtext: 'Operating across US (SF), KSA (Riyadh), and UAE (Dubai) cyber defense hubs',
    pill: 'EXPANDING REACH',
    accent: 'var(--accent-cyan)',
  },
  {
    value: '100+',
    label: 'Annual Red Team Operations',
    subtext: 'Adversary emulation across physical perimeter, executive vishing, and rogue APs',
    pill: 'OFFENSIVE LABS',
    accent: 'var(--accent-purple)',
  },
  {
    value: '8,500,000+',
    label: 'Lines of Code Audited',
    subtext: 'Continuous source-code vulnerability fuzzing and zero-day research validation',
    pill: 'LABS TELEMETRY',
    accent: 'var(--accent-emerald)',
  },
];

export default function GlobalMetricsStrip() {
  return (
    <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-surface)', padding: '2.5rem 0' }}>
      <div className="container">
        {/* Monolithic Borderless Data Ribbon (Zero Card Boxes) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            alignItems: 'flex-start',
          }}
        >
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: metric.accent }}></span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: metric.accent,
                    letterSpacing: '0.05em',
                    fontWeight: 700,
                  }}
                >
                  {metric.pill}
                </span>
              </div>

              <div
                style={{
                  fontSize: 'clamp(2.2rem, 3.2vw, 2.75rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: '0.35rem',
                }}
              >
                {metric.value}
              </div>

              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                }}
              >
                {metric.label}
              </div>

              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
