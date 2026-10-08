import React from 'react';
import ZisoftCommandCenter from '../../components/ZisoftCommandCenter';
import EnterpriseIntegrationsGrid from '../../components/EnterpriseIntegrationsGrid';
import DemoButton from '../../components/DemoButton';

export default function ZiSoftPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ background: 'rgba(225, 29, 72, 0.15)', color: 'var(--accent-crimson)' }}>
            Flagship Enterprise Software
          </div>
          <h1 className="hero-title" style={{ maxWidth: '960px', margin: '0 auto 1.5rem' }}>
            ZiSoft Autonomous Human Threat <span className="hero-highlight-crimson">Intelligence &amp; Automation</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            Eliminate 85% of security awareness administration overhead with self-driving adaptive learning journeys, real-time departmental risk heatmaps, and bi-directional SOAR incident containment.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Schedule ZiSoft Architecture Tour
            </DemoButton>
            <a href="#dashboard-tour" className="btn btn-secondary">
              Explore Interactive Console ❯
            </a>
          </div>
        </div>
      </section>

      {/* Command Center Interactive Dashboard Tour */}
      <section id="dashboard-tour" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ZisoftCommandCenter />

          {/* Core Architectural Capabilities Bento */}
          <div className="section-header" style={{ marginTop: '5rem' }}>
            <span className="section-tag">Enterprise Capabilities</span>
            <h2 className="section-title">Engineered for Scaled SecOps Teams</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(225, 29, 72, 0.12)', border: '1px solid rgba(225, 29, 72, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-crimson)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Zero-Touch Automation
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Set annual compliance goals once. ZiSoft automatically paces simulations, dynamically enrolls high-risk employees into micro-modules, and syncs via SCIM with Okta and Azure AD.
              </p>
            </div>

            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-cyan)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Adaptive Difficulty Engine
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Junior engineers and executive assistants receive attack simulations calibrated to their day-to-day threat profiles, preventing training fatigue while challenging critical departments.
              </p>
            </div>

            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-emerald)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Bi-Directional ReflexAware 360
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Pipes employee click reports directly to your SIEM/SOAR in real time, turning the entire workforce into an active detection sensor network with sub-second alert delivery.
              </p>
            </div>

            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-purple)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <path d="m4 8 5-5 5 5 6-6" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Board-Level Risk Scoring
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Translate training telemetry into financial risk reduction and cyber insurance underwriting compliance packages mapped to NIST CSF 2.0 and ISO 27001 standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise SIEM/SOAR & IAM Integrations Grid */}
      <EnterpriseIntegrationsGrid />
    </>
  );
}
