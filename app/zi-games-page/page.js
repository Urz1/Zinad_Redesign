import React from 'react';
import DemoButton from '../../components/DemoButton';
import DynamicTailgating from '../../components/DynamicTailgating';

export default function ZiGamesPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="section" style={{ paddingBottom: '3.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
            Experiential Learning Engine
          </div>
          <h1 className="hero-title" style={{ maxWidth: '960px', margin: '0 auto 1.5rem' }}>
            Spatial Defense Training. Build <span className="hero-highlight-purple">Tactical Muscle Memory</span>.
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            Harness spatial computing (Meta Quest 3, Apple Vision Pro) and 3D WebGL interactive simulations to turn dry compliance obligations into high-retention security reflexes.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Request VR Enterprise Kit
            </DemoButton>
            <a href="#interactive-challenge" className="btn btn-secondary">
              Play Browser Simulation ❯
            </a>
          </div>
        </div>
      </section>

      {/* In-Browser 3D Interactive Challenge */}
      <section id="interactive-challenge" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <DynamicTailgating />

          {/* Delivery Modalities Grid */}
          <div className="section-header" style={{ marginTop: '5rem' }}>
            <span className="section-tag">Flexible Deployment</span>
            <h2 className="section-title">Three Ways to Deploy Experiential Security</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Model 1 */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem' }}>
              <div style={{ color: 'var(--accent-purple)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                MODALITY 01 // SPATIAL VR
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Turnkey Enterprise VR Kits</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Pre-configured Meta Quest 3 headsets shipped directly to your corporate facilities for security awareness weeks. Zero setup required by local IT teams.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Physical perimeter &amp; clean-desk scenarios</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Tailgating &amp; verbal social engineering drills</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Automated sanitization &amp; fleet management</span>
                </li>
              </ul>
            </div>

            {/* Model 2 */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem' }}>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                MODALITY 02 // WEBGL BROWSER
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>In-Browser 3D Simulations</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Zero installation or hardware requirements. Runs directly inside Chrome, Edge, and Safari at 60 FPS on standard corporate laptops.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Accessible to 100% of remote &amp; hybrid staff</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>3-minute gamified micro-challenges</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Instant SCORM &amp; xAPI gradebook synchronization</span>
                </li>
              </ul>
            </div>

            {/* Model 3 */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem' }}>
              <div style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                MODALITY 03 // TOURNAMENT
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Facilitated Hackathons &amp; Cyber Days</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                ZINAD certified gamification coaches host company-wide tournaments with real-time scoreboards, escape rooms, and departmental awards.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Inter-departmental friendly competition</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>High-energy town hall &amp; cyber month engagement</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Measurable executive participation metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
