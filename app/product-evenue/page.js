import React from 'react';
import VenueExplorer from '../../components/VenueExplorer';
import DemoButton from '../../components/DemoButton';

export default function EvenuePage() {
  return (
    <>
      {/* Hero Header */}
      <section className="section" style={{ paddingBottom: '3.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            Experiential Event Platform
          </div>
          <h1 className="hero-title" style={{ maxWidth: '960px', margin: '0 auto 1.5rem' }}>
            Enterprise Virtual Summits &amp; <span className="hero-highlight-cyan">Cyber Wargames</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            The premier purpose-built cybersecurity event platform. Engage thousands of distributed employees with 3D animated halls, live keynote polling, team CTF tournaments, and automated CPE certification.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Schedule 10-Minute Guided Virtual Tour
            </DemoButton>
            <a href="#venue-tour" className="btn btn-secondary">
              Explore 3D Venue Spaces ❯
            </a>
          </div>
        </div>
      </section>

      {/* 3D Virtual Venue Interactive Explorer */}
      <section id="venue-tour" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <VenueExplorer />

          {/* Differentiators: Evenue vs Traditional Video Conferencing */}
          <div className="section-header" style={{ marginTop: '5rem' }}>
            <span className="section-tag">Purpose-Built for Cyber</span>
            <h2 className="section-title">Why Evenue Outperforms Zoom &amp; Teams for Security Events</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-cyan)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="22" y1="12" x2="18" y2="12" />
                  <line x1="6" y1="12" x2="2" y2="12" />
                  <line x1="12" y1="6" x2="12" y2="2" />
                  <line x1="12" y1="22" x2="12" y2="18" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                In-Session Phishing Quizzes
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Unlike passive video webinars, Evenue pushes live anti-cheat comprehension challenges directly into attendee viewports, testing retention during keynote sessions.
              </p>
            </div>

            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-emerald)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Automated CPE Certificates
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Verifies actual dwell time and interactive quiz completion to instantly generate cryptographically signed Continuing Professional Education certificates.
              </p>
            </div>

            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(225, 29, 72, 0.12)', border: '1px solid rgba(225, 29, 72, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-crimson)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Inter-Departmental CTF Arenas
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Host friendly capture-the-flag competitions tailored for non-technical employees (HR, Sales, Finance) alongside advanced code review challenges for developers.
              </p>
            </div>

            <div className="glass-panel card-hover" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-purple)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Enterprise SSO &amp; Role Gating
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Integrates with corporate identity providers (Okta, Azure AD, Ping) to restrict executive keynotes, confidential roadmaps, and VIP lounges to designated roles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
