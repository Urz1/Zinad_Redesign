import React from 'react';
import CssDisclosures from '../../components/CssDisclosures';
import DemoButton from '../../components/DemoButton';

export default function CssPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="section" style={{ paddingBottom: '3.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            Crowdsourced Offensive Security
          </div>
          <h1 className="hero-title" style={{ maxWidth: '960px', margin: '0 auto 1.5rem' }}>
            Continuous Attack Surface Pentesting &amp; <span className="hero-highlight-emerald">Managed Bug Bounties</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            Harness an elite, vetted collective of offensive researchers. Rapid vulnerability discovery with a guaranteed 4-hour human triage SLA and native Jira / GitLab integration.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Scope Enterprise Pentest
            </DemoButton>
            <a href="#toggle-mode" className="btn btn-secondary">
              Explore Researcher Hub ❯
            </a>
          </div>
        </div>
      </section>

      {/* Disclosures & Dual-Persona Component */}
      <div id="zero-days">
        <CssDisclosures />
      </div>
    </>
  );
}
