'use client';

import React, { useState } from 'react';
import { useModal } from './ModalContext';

const CLIENT_LOGOS = [
  {
    id: 'gartner',
    name: 'Gartner Peer Insights',
    category: 'Analyst Consensus',
    metric: '4.8 / 5.0 Rating',
    highlight: 'Customer Choice Recognized',
    accent: '#0284c7',
    renderLogo: () => (
      <svg viewBox="0 0 180 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <text x="0" y="30" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="26" letterSpacing="-0.5px">
          Gartner<tspan fill="var(--accent-crimson)">.</tspan>
        </text>
        <text x="116" y="20" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700" letterSpacing="0.8px" fill="var(--text-muted)">
          PEER
        </text>
        <text x="116" y="32" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700" letterSpacing="0.8px" fill="var(--accent-cyan)">
          INSIGHTS™
        </text>
      </svg>
    ),
  },
  {
    id: 'amiviz',
    name: 'AmiViz Enterprise',
    category: 'Cyber Distribution',
    metric: 'GCC & MENA Network',
    highlight: 'Tier-1 Systems Integrators',
    accent: '#e11d48',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <g transform="translate(0, 6)">
          <circle cx="14" cy="16" r="7" fill="var(--accent-crimson)" opacity="0.9" />
          <circle cx="28" cy="9" r="5" fill="var(--accent-cyan)" opacity="0.95" />
          <line x1="14" y1="16" x2="28" y2="9" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
        </g>
        <text x="42" y="30" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="24" letterSpacing="0.5px">
          Ami<tspan fill="var(--accent-crimson)">Viz</tspan>
        </text>
      </svg>
    ),
  },
  {
    id: 'starlink',
    name: 'Starlink (Ooredoo)',
    category: 'Strategic Alliance',
    metric: 'State-Level Telecom',
    highlight: 'Unified Threat Rollout',
    accent: '#06b6d4',
    renderLogo: () => (
      <svg viewBox="0 0 175 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <path d="M14 6 L18 17 L29 17 L20 24 L23 35 L14 28 L5 35 L8 24 L-1 17 L10 17 Z" fill="var(--accent-cyan)" transform="scale(0.9) translate(2, 2)" />
        <text x="36" y="24" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="19" letterSpacing="1px">
          STARLINK
        </text>
        <text x="36" y="35" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600" letterSpacing="0.5px" fill="var(--text-muted)">
          AN OOREDOO COMPANY
        </text>
      </svg>
    ),
  },
  {
    id: 'blackhat',
    name: 'Black Hat USA',
    category: 'Flagship Summit',
    metric: 'Booth #1867 Keynote',
    highlight: 'Adversary Tradecraft Demo',
    accent: '#ffffff',
    renderLogo: () => (
      <svg viewBox="0 0 170 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <path d="M6 26 C12 21, 24 21, 30 26 L28 19 C27 14, 23 11, 18 11 C13 11, 9 14, 8 19 Z" fill="var(--accent-crimson)" />
        <line x1="4" y1="26" x2="32" y2="26" stroke="var(--accent-crimson)" strokeWidth="3" strokeLinecap="round" />
        <text x="40" y="23" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="18" letterSpacing="0.2px">
          black hat
        </text>
        <text x="40" y="35" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700" letterSpacing="1.2px" fill="var(--accent-crimson)">
          USA 2025
        </text>
      </svg>
    ),
  },
  {
    id: 'rsa',
    name: 'RSA Conference',
    category: 'Executive Summit',
    metric: 'Moscone Center SF',
    highlight: 'AI Phishing Breakthroughs',
    accent: '#e11d48',
    renderLogo: () => (
      <svg viewBox="0 0 180 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <g transform="translate(2, 8)">
          <path d="M0 7 L9 0 L18 7 L18 19 L9 26 L0 19 Z" fill="none" stroke="var(--accent-crimson)" strokeWidth="2.5" />
          <circle cx="9" cy="13" r="3.5" fill="var(--accent-crimson)" />
        </g>
        <text x="30" y="25" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="19" letterSpacing="0.5px">
          RS<tspan fill="var(--accent-crimson)">Λ</tspan>
        </text>
        <text x="72" y="25" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600" letterSpacing="1px" fill="var(--text-secondary)">
          CONFERENCE
        </text>
      </svg>
    ),
  },
  {
    id: 'centralbank',
    name: 'Sovereign Central Bank',
    category: 'Financial Regulator',
    metric: 'Tier-1 Sovereign Entity',
    highlight: '100% Regulatory Audit Clean',
    accent: '#10b981',
    renderLogo: () => (
      <svg viewBox="0 0 190 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <g transform="translate(2, 8)">
          <path d="M2 22 L18 22 M10 2 L2 8 L18 8 Z" fill="var(--accent-emerald)" stroke="var(--accent-emerald)" strokeWidth="1.2" />
          <line x1="5" y1="9" x2="5" y2="20" stroke="var(--accent-emerald)" strokeWidth="2" />
          <line x1="10" y1="9" x2="10" y2="20" stroke="var(--accent-emerald)" strokeWidth="2" />
          <line x1="15" y1="9" x2="15" y2="20" stroke="var(--accent-emerald)" strokeWidth="2" />
        </g>
        <text x="28" y="22" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.8px">
          CENTRAL BANK
        </text>
        <text x="28" y="34" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" letterSpacing="0.6px" fill="var(--accent-emerald)">
          SOVEREIGN DEFENSE
        </text>
      </svg>
    ),
  },
  {
    id: 'mannai',
    name: 'Mannai InfoTech',
    category: 'Enterprise ICT',
    metric: 'Enterprise Systems',
    highlight: 'Multi-Country Architecture',
    accent: '#3b82f6',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <polygon points="12,5 22,19 12,33 2,19" fill="var(--accent-cyan)" />
        <polygon points="12,11 18,19 12,27 6,19" fill="currentColor" opacity="0.3" />
        <text x="30" y="26" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="18" letterSpacing="1px">
          MANNAI
        </text>
        <text x="30" y="36" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600" letterSpacing="0.8px" fill="var(--text-muted)">
          INFOTECH
        </text>
      </svg>
    ),
  },
  {
    id: 'nyu',
    name: 'New York University',
    category: 'Higher Education',
    metric: 'Research Partner',
    highlight: 'Cognitive Science Validation',
    accent: '#8b5cf6',
    renderLogo: () => (
      <svg viewBox="0 0 140 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <g transform="translate(2, 7)">
          <path d="M5 16 L10 26 L15 16 Z" fill="var(--accent-purple)" />
          <path d="M10 2 C6 7, 14 9, 10 15 C15 9, 14 6, 10 2 Z" fill="#a78bfa" />
        </g>
        <text x="26" y="27" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="22" letterSpacing="1.5px" fill="var(--accent-purple)">
          NYU
        </text>
      </svg>
    ),
  },
  {
    id: 'petrochem',
    name: 'Global Petrochemical',
    category: 'Critical Infrastructure',
    metric: 'Energy & Refining',
    highlight: 'OT/SCADA Social Eng. Hardening',
    accent: '#f59e0b',
    renderLogo: () => (
      <svg viewBox="0 0 190 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <g transform="translate(2, 8)">
          <path d="M9 2 C9 2 16 9 16 15 A7 7 0 1 1 2 15 C2 9 9 2 9 2 Z" fill="var(--accent-amber)" />
          <path d="M9 8 C9 8 13 12 13 15 A4 4 0 1 1 5 15 C5 12 9 8 9 8 Z" fill="#fde68a" />
        </g>
        <text x="28" y="23" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.8px">
          PETROCHEM
        </text>
        <text x="28" y="34" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600" letterSpacing="0.6px" fill="var(--accent-amber)">
          ENERGY CONGLOMERATE
        </text>
      </svg>
    ),
  },
  {
    id: 'eurotel',
    name: 'EuroTel Telecommunications',
    category: 'Telco & Network',
    metric: '40M+ Subscriber Base',
    highlight: 'Human Endpoint Threat Mesh',
    accent: '#06b6d4',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" fill="currentColor" style={{ height: '42px', width: 'auto' }}>
        <g transform="translate(2, 7)">
          <circle cx="12" cy="15" r="3.5" fill="var(--accent-cyan)" />
          <path d="M6 9 A10 10 0 0 1 18 9" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 4 A16 16 0 0 1 22 4" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" />
        </g>
        <text x="32" y="26" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.8px">
          EUROTEL
        </text>
      </svg>
    ),
  },
];

export default function TrustedByLogos() {
  const { openDemo } = useModal();
  const [hoveredLogo, setHoveredLogo] = useState(null);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      aria-label="Enterprise Trust & Strategic Alliances"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-dark-base)',
        padding: '2.5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 10px var(--accent-emerald)' }}></span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              color: 'var(--text-muted)',
            }}
          >
            TRUSTED BY CRITICAL INFRASTRUCTURE, TIER-1 BANKS &amp; GLOBAL DISTRIBUTORS
          </span>
        </div>
      </div>

      {/* Infinite Logo Marquee Track */}
      <div
        className="trust-marquee-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div
          className="trust-marquee-track"
          style={{
            display: 'flex',
            gap: '3.5rem',
            width: 'max-content',
            animation: 'trustMarquee 38s linear infinite',
            alignItems: 'center',
            padding: '1rem 0',
          }}
        >
          {marqueeItems.map((item, idx) => {
            const isHovered = hoveredLogo === `${item.id}-${idx}`;
            return (
              <div
                key={`${item.id}-${idx}`}
                onMouseEnter={() => setHoveredLogo(`${item.id}-${idx}`)}
                onMouseLeave={() => setHoveredLogo(null)}
                onClick={openDemo}
                title={`${item.name}   ${item.category} (${item.metric})`}
                className="trust-marquee-logo-cell"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.4rem 0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  opacity: isHovered ? 1 : 0.78,
                  filter: isHovered ? `drop-shadow(0 4px 12px ${item.accent}44)` : 'none',
                  color: 'var(--text-primary)',
                  flexShrink: 0,
                }}
              >
                {item.renderLogo()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Under-Marquee Sector Proof Footnote */}
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          marginTop: '1.25rem',
          flexWrap: 'wrap',
          fontSize: '0.76rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <strong style={{ color: 'var(--accent-crimson)' }}>• 1M+</strong> Global Seats Deployed
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <strong style={{ color: 'var(--accent-cyan)' }}>• 25+</strong> Countries Protected
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <strong style={{ color: 'var(--accent-emerald)' }}>• 100%</strong> On-Prem &amp; Sovereign Cloud Support
        </span>
      </div>
    </section>
  );
}
