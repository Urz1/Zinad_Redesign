import React from 'react';
import Link from 'next/link';
import DemoButton from '../../components/DemoButton';

export const metadata = {
  title: 'About ZINAD | Human Threat Intelligence & Red Teaming Pioneer',
  description: 'Founded in 2014, ZINAD transforms workforce security through AI-powered human risk management, Gartner-recognized simulations, and elite offensive red teaming.',
};

const MILESTONES = [
  { year: '2014', title: 'Founded as Red Teaming Pioneer', desc: 'Established by offensive security researchers conducting high-assurance penetration tests for financial institutions.' },
  { year: '2017', title: 'Launch of ZiSoft Platform', desc: 'Pioneered behavioral phishing simulations coupled with real-time micro-training, breaking away from static annual compliance.' },
  { year: '2020', title: 'Experiential 3D & VR Lab (ZIGAMES)', desc: 'Invented kinetic and WebGL spatial simulations to train physical perimeter defense and eliminate training fatigue.' },
  { year: '2023', title: 'Gartner SACBT Recognition (4.8 / 5.0 Rating)', desc: 'Recognized on Gartner Peer Insights with 98% customer recommendation rate for SecOps integration.' },
  { year: '2025', title: 'ReflexAware 360 & Zero-Day CVE Disclosures', desc: 'Introduced sub-second SOAR incident hooks and published critical zero-days (including CVE-2025-55182 React2Shell).' },
];

const ACCREDITATIONS = [
  {
    title: 'Gartner Peer Insights',
    subtitle: '4.8 / 5.0 Star Rating',
    desc: 'Verified enterprise SecOps satisfaction in Security Awareness Computer-Based Training.',
    accent: '#0284c7',
    renderLogo: () => (
      <svg viewBox="0 0 165 40" fill="none" style={{ height: '32px', width: 'auto' }}>
        <text x="0" y="26" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="23" letterSpacing="-0.5px">
          Gartner<tspan fill="var(--accent-crimson)">.</tspan>
        </text>
        <text x="96" y="16" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.8px">
          PEER
        </text>
        <text x="96" y="28" fill="var(--accent-cyan)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.8px">
          INSIGHTS™
        </text>
      </svg>
    ),
  },
  {
    title: 'ISO 27001:2022',
    subtitle: 'Certified ISMS System',
    desc: 'Audited information security controls across cloud software development and data storage.',
    accent: '#10b981',
    renderLogo: () => (
      <svg viewBox="0 0 160 40" fill="none" style={{ height: '32px', width: 'auto' }}>
        <g transform="translate(0, 4)">
          <circle cx="16" cy="16" r="15" stroke="var(--accent-emerald)" strokeWidth="2.5" fill="none" />
          <ellipse cx="16" cy="16" rx="7" ry="15" stroke="var(--accent-emerald)" strokeWidth="1.5" fill="none" />
          <line x1="1" y1="16" x2="31" y2="16" stroke="var(--accent-emerald)" strokeWidth="1.5" />
        </g>
        <text x="38" y="24" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="19" letterSpacing="0.5px">
          ISO<tspan fill="var(--accent-emerald)">/IEC</tspan>
        </text>
        <text x="38" y="35" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8" letterSpacing="0.5px">
          27001 : 2022
        </text>
      </svg>
    ),
  },
  {
    title: 'SOC 2 Type II',
    subtitle: 'Annual Third-Party Audit',
    desc: 'Independently audited security, availability, and confidentiality controls.',
    accent: '#8b5cf6',
    renderLogo: () => (
      <svg viewBox="0 0 160 40" fill="none" style={{ height: '32px', width: 'auto' }}>
        <g transform="translate(2, 4)">
          <polygon points="15,2 26,8 26,22 15,28 4,22 4,8" stroke="var(--accent-purple)" strokeWidth="2.5" fill="rgba(139, 92, 246, 0.15)" />
          <text x="15" y="18" textAnchor="middle" fill="var(--accent-purple)" fontFamily="var(--font-mono)" fontWeight="900" fontSize="8">SOC</text>
        </g>
        <text x="36" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.5px">
          AICPA <tspan fill="var(--accent-purple)">SOC 2</tspan>
        </text>
        <text x="36" y="34" fill="var(--accent-purple)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.8px">
          TYPE II AUDITED
        </text>
      </svg>
    ),
  },
  {
    title: 'NIST CSF 2.0 Aligned',
    subtitle: 'PR.AT & DE.CM Crosswalk',
    desc: 'Direct mapping into Awareness & Training and Continuous Monitoring controls.',
    accent: '#06b6d4',
    renderLogo: () => (
      <svg viewBox="0 0 160 40" fill="none" style={{ height: '32px', width: 'auto' }}>
        <g transform="translate(2, 6)">
          <rect x="0" y="0" width="26" height="26" rx="4" fill="rgba(6, 182, 212, 0.15)" stroke="var(--accent-cyan)" strokeWidth="2" />
          <path d="M5 21 L13 6 L21 21" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="8" y1="16" x2="18" y2="16" stroke="var(--accent-cyan)" strokeWidth="2" />
        </g>
        <text x="36" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="18" letterSpacing="1px">
          NIST
        </text>
        <text x="36" y="34" fill="var(--accent-cyan)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.8px">
          CSF 2.0 FRAMEWORK
        </text>
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center">
          <span className="section-tag">Corporate Heritage Since 2014</span>
          <h1 className="hero-title" style={{ maxWidth: '920px', margin: '0 auto 1.5rem' }}>
            Transforming Human Vulnerability Into <span className="hero-highlight-red">Defensive Cyber Telemetry</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            For over a decade, ZINAD has operated at the nexus of elite offensive red teaming and cognitive behavioral science empowering over 500,000 corporate professionals across 20+ countries to outsmart sophisticated adversaries.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Schedule Executive Briefing
            </DemoButton>
            <Link href="/all-products" className="btn btn-secondary">
              Explore 4-Tier Architecture ❯
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className="section" style={{ background: 'var(--bg-dark-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">A Decade of Innovation</span>
            <h2 className="section-title">Milestones in Autonomous Cyber Defense</h2>
          </div>

          <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.5rem 2rem',
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '1.5rem',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-crimson)' }}>
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 0.25rem' }}>
                    {m.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gartner & Accreditations Matrix */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Enterprise Rigor</span>
            <h2 className="section-title">Industry Accreditations &amp; Independent Audits</h2>
            <p className="section-subtitle">
              Built to withstand rigorous third-party audits and compliance regimes across banking, defense, and healthcare.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {ACCREDITATIONS.map((acc, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ color: 'var(--text-primary)' }}>
                      {acc.renderLogo()}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                      VERIFIED
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0 0 0.25rem' }}>
                    {acc.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-crimson)', marginBottom: '0.75rem' }}>
                    {acc.subtitle}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {acc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Cyber Champion Program */}
      <section className="section" style={{ background: 'var(--bg-dark-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(225, 29, 72, 0.06))' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="section-tag" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
                  University &amp; Talent Empowerment
                </span>
                <h3 style={{ fontSize: '1.85rem', margin: '0.5rem 0 1rem', color: 'var(--text-primary)' }}>
                  The Global Cyber Champion Program
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  An international university partnership discovering and nurturing the next generation of cybersecurity defenders. Through live CTFs, hardware reverse-engineering labs, and red teaming mentorship, ZINAD bridges the global 4-million-person cyber skills deficit.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <DemoButton className="btn btn-primary">
                    Nominate Your Institution ❯
                  </DemoButton>
                  <Link href="/careers" className="btn btn-secondary">
                    View Graduate Fellowships
                  </Link>
                </div>
              </div>

              <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-medium)', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
                  // EMPOWERMENT METRICS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', textAlign: 'center' }}>
                  <div style={{ background: 'var(--bg-dark-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>45+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Partner Universities</div>
                  </div>
                  <div style={{ background: 'var(--bg-dark-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>12,000+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Students Mentored</div>
                  </div>
                  <div style={{ background: 'var(--bg-dark-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>88%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Hired into SecOps</div>
                  </div>
                  <div style={{ background: 'var(--bg-dark-surface)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-crimson)', fontFamily: 'var(--font-mono)' }}>100%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Full Tuition Grants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
