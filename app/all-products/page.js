import React from 'react';
import Link from 'next/link';
import StackExplorer from '../../components/StackExplorer';
import EnterpriseIntegrationsGrid from '../../components/EnterpriseIntegrationsGrid';
import DemoButton from '../../components/DemoButton';

export default function AllProductsPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center">
          <span className="section-tag">System Architecture</span>
          <h1 className="hero-title" style={{ maxWidth: '900px', margin: '0 auto 1.5rem' }}>
            The ZINAD Defense <span className="hero-highlight-purple">Operating System</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            A defensible enterprise architecture integrating behavioral cognitive science, AI-driven attack simulation, and live offensive red teaming into a unified telemetry loop.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Schedule Architecture Briefing
            </DemoButton>
            <a href="#stack-layers" className="btn btn-secondary">
              Explore 4-Tier Stack ❯
            </a>
          </div>
        </div>
      </section>

      {/* Interactive 4-Layer Platform Stack Architecture */}
      <section id="stack-layers" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <StackExplorer />

          {/* Solutions Directory Grid */}
          <div className="section-header">
            <span className="section-tag">Solution Ecosystem</span>
            <h2 className="section-title">Explore Dedicated Product Deep Dives</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* ZiSoft Card */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="section-tag" style={{ background: 'rgba(225, 29, 72, 0.15)', color: 'var(--accent-crimson)' }}>Flagship SaaS</div>
                <h3 style={{ fontSize: '1.45rem', margin: '0.5rem 0 0.75rem' }}>ZiSoft Human Threat Intel</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  AI-driven phishing simulation, automated role-based micro-learning, and ReflexAware 360 bi-directional incident response.
                </p>
              </div>
              <Link href="/product-zisoft" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                View ZiSoft Specifications ❯
              </Link>
            </div>

            {/* ZIGAMES Card */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="section-tag" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>Experiential VR</div>
                <h3 style={{ fontSize: '1.45rem', margin: '0.5rem 0 0.75rem' }}>ZIGAMES Interactive Gaming</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  WebGL 3D in-browser challenges and Meta Quest 3 spatial computing scenarios building muscle-memory security vigilance.
                </p>
              </div>
              <Link href="/zi-games-page" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                View ZIGAMES Platform ❯
              </Link>
            </div>

            {/* Red Teaming Card */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="section-tag" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>Offensive Security</div>
                <h3 style={{ fontSize: '1.45rem', margin: '0.5rem 0 0.75rem' }}>Red Teaming Simulations</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Controlled tactical operations: synthetic voice vishing, rogue Wi-Fi access points, and physical perimeter hardware drops.
                </p>
              </div>
              <Link href="/products-cybersecurity-awarness-campaigns" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                View Red Team Scenarios ❯
              </Link>
            </div>

            {/* CSS Pentesting Card */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>Crowdsourced</div>
                <h3 style={{ fontSize: '1.45rem', margin: '0.5rem 0 0.75rem' }}>CSS Pentesting &amp; Bug Bounty</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Vetted international ethical hackers conducting continuous penetration testing with guaranteed 4-hour triage SLAs.
                </p>
              </div>
              <Link href="/product-css" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                Explore CSS Marketplace ❯
              </Link>
            </div>

            {/* Evenue Platform Card */}
            <div className="glass-panel card-hover" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>Virtual Summits</div>
                <h3 style={{ fontSize: '1.45rem', margin: '0.5rem 0 0.75rem' }}>Evenue Summit Platform</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Host high-energy enterprise cybersecurity awareness weeks with 3D auditoriums, live team CTFs, and automated CPE credits.
                </p>
              </div>
              <Link href="/product-evenue" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                Tour Evenue Platform ❯
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise SIEM/SOAR & Cloud Integrations Grid */}
      <EnterpriseIntegrationsGrid />
    </>
  );
}
