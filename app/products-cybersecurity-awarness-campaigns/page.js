import React from 'react';
import TacticalRadar from '../../components/TacticalRadar';
import DemoButton from '../../components/DemoButton';

export default function RedTeamCampaignsPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="section" style={{ paddingBottom: '3.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ background: 'rgba(225, 29, 72, 0.15)', color: 'var(--accent-crimson)' }}>
            Offensive Security Practice
          </div>
          <h1 className="hero-title" style={{ maxWidth: '960px', margin: '0 auto 1.5rem' }}>
            Offensive Red Team Drills &amp; <span className="hero-highlight-crimson">Behavioral Nudges</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            Audit physical boundaries, executive voice channels, and wireless perimeters with certified ethical social engineering consultants supported by evidence-based environmental nudge systems.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Request Red Team Scope Brief
            </DemoButton>
            <a href="#tactical-scenarios" className="btn btn-secondary">
              Explore Tactical Vectors ❯
            </a>
          </div>
        </div>
      </section>

      {/* Tactical Operations Radar Grid */}
      <section id="tactical-scenarios" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <TacticalRadar />

          {/* 4-Step Methodology Infographic */}
          <div className="section-header" style={{ marginTop: '5rem' }}>
            <span className="section-tag">Engagement Lifecycle</span>
            <h2 className="section-title">The 4-Phase Red Team Methodology</h2>
            <p className="section-subtitle">
              Strictly bound by corporate legal Rules of Engagement (RoE) to ensure safe, ethical, and high-impact human risk discoveries.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '3px solid var(--accent-cyan)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                PHASE 01 // SCOPING
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>OSINT &amp; Threat Modeling</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Reconnaissance on public corporate footprint, employee LinkedIn profiles, and executive travel schedules to craft bespoke attack scenarios.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderTop: '3px solid var(--accent-crimson)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-crimson)', marginBottom: '0.5rem' }}>
                PHASE 02 // EXECUTION
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Controlled Attack Delivery</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Execution of phone vishing calls, rogue Wi-Fi AP deployment, and physical facility entry under pre-approved test windows.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderTop: '3px solid var(--accent-amber)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
                PHASE 03 // EDUCATION
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>In-the-Moment Coaching</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Immediate, empathetic feedback for employees who interacted with test vectors. Transforms failure into lasting behavioral reinforcement.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderTop: '3px solid var(--accent-emerald)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                PHASE 04 // DEBRIEF
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Executive Root-Cause Report</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Board-level findings report detailing systemic policy gaps, credential exposures, and technical mitigation roadmaps.
              </p>
            </div>
          </div>

          {/* Behavioral Nudge Architecture */}
          <div className="glass-panel" style={{ padding: '3rem', background: 'var(--bg-dark-surface)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
                  Environmental Psychology
                </span>
                <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0 1rem', color: 'var(--text-primary)' }}>Behavioral Nudge Architecture</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Digital training fades unless reinforced in physical workspaces. Our behavioral science team designs minimalist, high-impact environmental nudges that anchor daily security habits without corporate clutter.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Clean Desk &amp; Screen Lock visual memory prompts</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Executive Wire Transfer 2-Person Verification Desk Cards</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Digital Signage feeds updated with active zero-day warnings</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel" style={{ background: 'var(--bg-dark-elevated)', padding: '2rem', border: '1px solid var(--border-medium)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>-92%</div>
                <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '0.25rem' }}>Unattended Machine Policy Violations</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Observed across 45,000 corporate workstations following deployment of ZINAD Environmental Nudge Artifacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
