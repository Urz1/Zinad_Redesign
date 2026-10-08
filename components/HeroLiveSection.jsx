'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function HeroLiveSection() {
  const { openDemo } = useModal();
  const [attacksCount, setAttacksCount] = useState(8421940);

  useEffect(() => {
    const timer = setInterval(() => {
      setAttacksCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero-cta-group">
        <button className="btn btn-primary" onClick={openDemo}>
          Request 1-on-1 Architecture Demo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <a href="#interactive-sandbox" className="btn btn-secondary">
          Try 60-Sec Sandbox
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </div>

      <div className="hero-trust-metrics">
        <div>
          <div className="trust-metric-val text-emerald">78.4%</div>
          <div className="trust-metric-label">Avg. Phish-Prone Reduction</div>
        </div>
        <div>
          <div className="trust-metric-val">{attacksCount.toLocaleString()}</div>
          <div className="trust-metric-label">Simulated Threats Neutralized</div>
        </div>
        <div>
          <div className="trust-metric-val text-cyan">&lt; 1.5s</div>
          <div className="trust-metric-label">ReflexAware SOAR Webhook SLA</div>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('zinad-shield-deflect'));
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '0.35rem 0.85rem',
            color: 'var(--text-secondary)',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Click to test live autonomous ReflexAware zero-day threat deflection"
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)' }} />
          <span>ReflexAware Active Shield: <strong style={{ color: 'var(--accent-cyan)' }}>Simulate 0-Day Interception ❯</strong></span>
        </button>
      </div>
    </>
  );
}
