import React from 'react';
import DemoButton from '../../components/DemoButton';

export const metadata = {
  title: 'Careers at ZINAD | Join The Offensive Cyber Defense Movement',
  description: 'Explore engineering, red teaming, and threat research positions at ZINAD. Work on zero-day discovery, spatial VR training, and AI human risk modeling.',
};

const OPEN_POSITIONS = [
  {
    title: 'Lead Offensive Red Team Operator',
    team: 'Red Teaming & Exploits Labs',
    location: 'Remote (US / EMEA / GCC)',
    type: 'Full-Time',
    desc: 'Lead real-world adversary emulation operations, zero-day research, and physical/voice social engineering drills for Fortune 500 banks.',
    reqs: ['OSCP / OSEP / OSCE certification', 'Demonstrated zero-day disclosure or CVE history', 'Experience building custom C2 frameworks'],
  },
  {
    title: 'Senior AI / ML Research Engineer (Human Risk)',
    team: 'ZiSoft Intelligence Core',
    location: 'San Francisco, CA or Remote',
    type: 'Full-Time',
    desc: 'Develop predictive user behavioral analytics (UBA) models that dynamically tailor phishing lure difficulty and detect department-level compromise early.',
    reqs: ['PyTorch / JAX experience', 'Graph Neural Networks & anomaly detection in time-series telemetry', 'Production LLM agent evaluation'],
  },
  {
    title: 'Staff Full-Stack Engineer (Real-Time Telemetry Bus)',
    team: 'Platform Architecture',
    location: 'Remote (Global)',
    type: 'Full-Time',
    desc: 'Architect high-throughput gRPC/Kafka telemetry streams piping sub-second incident webhooks to enterprise SIEM/SOAR platforms (Splunk, Sentinel, Cortex).',
    reqs: ['Go / Rust / Node.js systems programming', 'Next.js 16 App Router & WebSocket architecture', 'SOC 2 Type II compliant cloud design'],
  },
  {
    title: 'Senior WebGL & Spatial Simulation Engineer',
    team: 'ZIGAMES Experiential VR',
    location: 'Remote (US / EMEA)',
    type: 'Full-Time',
    desc: 'Design browser-based 3D physical security simulations, Meta Quest WebXR challenges, and interactive gamified cyber wargames.',
    reqs: ['Three.js / WebGL 2.0 / WebGPU', 'Shader optimization & 60fps mobile performance', 'Interactive simulation physics'],
  },
  {
    title: 'Enterprise SecOps Solutions Architect',
    team: 'Customer Success & Alliances',
    location: 'Riyadh, KSA or Dubai, UAE',
    type: 'Full-Time',
    desc: 'Partner with regional CISOs and SOC managers to architect ReflexAware 360 bi-directional integrations and automate multi-tenant enterprise deployments.',
    reqs: ['5+ years pre-sales or post-sales SecOps architecture', 'Deep SIEM/SOAR knowledge (Splunk, QRadar, Microsoft Sentinel)', 'Fluent in English & Arabic'],
  },
];

const BENEFITS = [
  { title: 'Global Remote First', desc: 'Work from anywhere with local hub access in San Francisco, Riyadh, and Dubai.' },
  { title: '20% Research & 0-Day Time', desc: 'Dedicated paid working hours reserved for bug bounties, CVE disclosures, and open-source contributions.' },
  { title: 'Competitive Equity', desc: 'Meaningful stock options aligned with fast-growth enterprise ARR milestones.' },
  { title: 'Conference & Hardware Grants', desc: '$5,000 annual budget for Black Hat, DEF CON, RSA conferences and home lab hardware.' },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center">
          <span className="section-tag" style={{ background: 'rgba(225, 29, 72, 0.15)', color: 'var(--accent-crimson)' }}>
            Careers at ZINAD
          </span>
          <h1 className="hero-title" style={{ maxWidth: '920px', margin: '0 auto 1.5rem' }}>
            Build The Future Of <span className="hero-highlight-red">Cognitive Cyber Defense</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            We are hackers, neuroscientists, and systems engineers united by one mission: eliminating human vulnerability through intelligent simulation and real-world offensive research.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#open-roles" className="btn btn-primary">
              View 5 Open Positions ❯
            </a>
            <DemoButton className="btn btn-secondary">
              Submit General Inquiry
            </DemoButton>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-surface)', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Culture &amp; Perks</span>
            <h2 className="section-title">Engineered For Autonomous High Performers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {BENEFITS.map((b, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Active Openings</span>
            <h2 className="section-title">Find Your Next Frontier</h2>
            <p className="section-subtitle">
              We sponsor work authorizations and offer competitive compensation across North America, Europe, and the GCC.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {OPEN_POSITIONS.map((pos, idx) => (
              <div
                key={idx}
                className="glass-panel card-hover"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      {pos.team}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      {pos.location}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {pos.type}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: '0 0 0.5rem', fontWeight: 700 }}>
                    {pos.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1rem' }}>
                    {pos.desc}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {pos.reqs.map((req, rIdx) => (
                      <li key={rIdx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ color: 'var(--accent-crimson)', fontWeight: 800 }}>•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ flexShrink: 0 }}>
                  <DemoButton className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1.25rem' }}>
                    Apply for Position ❯
                  </DemoButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
