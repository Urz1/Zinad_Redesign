'use client';

import React from 'react';

const ACCREDITATION_LOGOS = [
  {
    id: 'offsec',
    name: 'Offensive Security',
    creds: 'OSCP • OSCE • OSWE',
    role: 'Elite Offensive Red Teaming',
    accent: '#ef4444',
    renderLogo: () => (
      <svg viewBox="0 0 160 40" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
        <g transform="translate(0, 4)">
          {/* OffSec Dragon Emblem */}
          <path d="M16 2 L22 10 L16 14 L24 22 L14 30 L8 22 L16 16 L10 10 Z" fill="var(--accent-crimson)" />
          <circle cx="16" cy="6" r="2.5" fill="#ffffff" />
        </g>
        <text x="32" y="24" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5px">
          Off<tspan fill="var(--accent-crimson)">Sec</tspan>
        </text>
        <text x="32" y="34" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700" letterSpacing="1px" fill="var(--text-muted)">
          OSCP / OSCE CERTIFIED
        </text>
      </svg>
    ),
  },
  {
    id: 'sans',
    name: 'SANS Institute & GIAC',
    creds: 'GIAC GSEC • GCIA • GPEN',
    role: 'Cyber Defense Forensics',
    accent: '#06b6d4',
    renderLogo: () => (
      <svg viewBox="0 0 170 40" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
        <g transform="translate(2, 4)">
          <polygon points="14,2 26,26 2,26" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" />
          <polygon points="14,9 21,23 7,23" fill="var(--accent-cyan)" opacity="0.6" />
        </g>
        <text x="34" y="22" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="17" letterSpacing="1px">
          SANS
        </text>
        <text x="34" y="33" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="0.8px" fill="var(--accent-cyan)">
          GIAC CERTIFIED LAB
        </text>
      </svg>
    ),
  },
  {
    id: 'iso',
    name: 'ISO / IEC Standards',
    creds: 'ISO 27001 • ISO 20000',
    role: 'Information Security ISMS',
    accent: '#10b981',
    renderLogo: () => (
      <svg viewBox="0 0 165 40" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
        <g transform="translate(2, 4)">
          <circle cx="14" cy="14" r="13" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.2" />
          <ellipse cx="14" cy="14" rx="6" ry="13" fill="none" stroke="var(--accent-emerald)" strokeWidth="1.2" />
          <line x1="1" y1="14" x2="27" y2="14" stroke="var(--accent-emerald)" strokeWidth="1.2" />
        </g>
        <text x="34" y="22" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="17" letterSpacing="1px">
          ISO<tspan fill="var(--accent-emerald)">/IEC</tspan>
        </text>
        <text x="34" y="33" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="0.5px" fill="var(--text-muted)">
          27001 : 2022 ISMS
        </text>
      </svg>
    ),
  },
  {
    id: 'isaca',
    name: 'ISACA Global',
    creds: 'CISM • CISA Certified',
    role: 'Governance & Audit Assurance',
    accent: '#8b5cf6',
    renderLogo: () => (
      <svg viewBox="0 0 155 40" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
        <g transform="translate(2, 5)">
          <polygon points="12,2 22,12 12,22 2,12" fill="var(--accent-purple)" opacity="0.85" />
          <circle cx="12" cy="12" r="4" fill="#ffffff" />
        </g>
        <text x="30" y="22" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="17" letterSpacing="0.8px">
          ISACA
        </text>
        <text x="30" y="33" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="0.6px" fill="var(--accent-purple)">
          CISM / CISA AUDIT
        </text>
      </svg>
    ),
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    creds: 'CCIE Security',
    role: 'Enterprise Network Defense',
    accent: '#0284c7',
    renderLogo: () => (
      <svg viewBox="0 0 160 40" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
        <g transform="translate(2, 6)" fill="var(--accent-cyan)">
          {/* Cisco Iconic Waveform Bridge */}
          <rect x="0" y="8" width="2" height="10" rx="1" />
          <rect x="4" y="4" width="2" height="14" rx="1" />
          <rect x="8" y="0" width="2" height="18" rx="1" />
          <rect x="12" y="4" width="2" height="14" rx="1" />
          <rect x="16" y="8" width="2" height="10" rx="1" />
          <rect x="20" y="4" width="2" height="14" rx="1" />
          <rect x="24" y="0" width="2" height="18" rx="1" />
          <rect x="28" y="4" width="2" height="14" rx="1" />
          <rect x="32" y="8" width="2" height="10" rx="1" />
        </g>
        <text x="42" y="22" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="15" letterSpacing="1.2px">
          CISCO
        </text>
        <text x="42" y="33" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="0.6px" fill="var(--text-muted)">
          CCIE SECURITY
        </text>
      </svg>
    ),
  },
  {
    id: 'eccouncil',
    name: 'EC-Council',
    creds: 'Certified Ethical Hacker (CEH)',
    role: 'Vulnerability Analysis',
    accent: '#e11d48',
    renderLogo: () => (
      <svg viewBox="0 0 165 40" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
        <g transform="translate(2, 4)">
          <path d="M12 2 L22 6 L22 16 C22 22 12 26 12 26 C12 26 2 22 2 16 L2 6 Z" fill="none" stroke="var(--accent-crimson)" strokeWidth="2.2" />
          <path d="M12 7 L12 21" stroke="var(--accent-crimson)" strokeWidth="1.8" />
        </g>
        <text x="30" y="21" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.5px">
          EC-Council
        </text>
        <text x="30" y="32" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="0.6px" fill="var(--accent-crimson)">
          CEH MASTER
        </text>
      </svg>
    ),
  },
  {
    id: 'crest',
    name: 'CREST Accredited',
    creds: 'Penetration Testing & Red Team',
    role: 'International Technical Audit',
    accent: '#f59e0b',
    renderLogo: () => (
      <svg viewBox="0 0 160 40" fill="currentColor" style={{ height: '38px', width: 'auto' }}>
        <g transform="translate(2, 5)">
          <polygon points="12,2 22,9 18,22 6,22 2,9" fill="none" stroke="var(--accent-amber)" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="var(--accent-amber)" />
        </g>
        <text x="30" y="22" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="16" letterSpacing="1px">
          CREST
        </text>
        <text x="30" y="33" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="0.6px" fill="var(--accent-amber)">
          ACCREDITED LAB
        </text>
      </svg>
    ),
  },
];

export default function CertificationsTrustBar() {
  return (
    <section
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-dark-surface)',
      }}
    >
      <div className="container text-center">
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            VERIFIED OFFENSIVE LAB ACCREDITATIONS &amp; INTERNATIONAL STANDARDS
          </span>
        </div>

        {/* Visual Brand Logo Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          {ACCREDITATION_LOGOS.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--bg-dark-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.75rem 1.35rem',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
              title={`${item.name} (${item.creds})`}
            >
              {item.renderLogo()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
