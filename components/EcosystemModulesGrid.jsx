'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PILLARS = [
  {
    id: 'learning',
    pill: 'PILLAR 01 // COGNITIVE RELEXES',
    name: 'Cognitive Learning & Behavior Adaptation',
    subtitle: 'Move beyond passive annual CBT videos to continuous AI-personalized micro-learning tailored by role, risk profile, and regional language.',
    accent: 'var(--accent-crimson)',
    primaryMetric: '84% Retention Science (vs 12% CBT)',
    compliance: 'NIST CSF PR.AT-1 • ISO 27001 A.7.2.2',
    leadModule: {
      name: 'AI-Powered Adaptive LMS Core',
      desc: 'Machine learning dynamically tunes training difficulty and scenario delivery schedules based on employee past click behavior and job function risk.',
      href: '/product-zisoft',
      badge: 'MOD 001',
    },
    subModules: [
      { id: '002', name: 'AWAREA Mobile App', detail: '60-second micro-quizzes & habit loops for iOS/Android', href: '/product-zisoft' },
      { id: '003', name: 'Zi-Workshops Lab', detail: 'Live instructor-led virtual tradecraft sessions for leadership', href: '/product-zisoft' },
      { id: '004', name: 'Just-in-Time Tips', detail: 'Contextual Outlook & SMS safety alerts matching live zero-days', href: '/product-zisoft' },
    ],
  },
  {
    id: 'offensive',
    pill: 'PILLAR 02 // ADVERSARY EMULATION',
    name: 'Offensive Threat Simulation & Spatial VR',
    subtitle: 'Expose employees to genuine attacker tradecraft from synthetic deepfake vishing to physical turnstile tailgating in 3D WebGL and Meta Quest VR.',
    accent: 'var(--accent-purple)',
    primaryMetric: 'Real-Time CVE Exploit Integration',
    compliance: 'NIST DE.CM-1 • CREST & OSCP Certified',
    leadModule: {
      name: 'The AI Phishing & Quishing Forge',
      desc: 'Autonomous synthesis of zero-day spear-phishing lures, AiTM reverse-proxy portals, and QR-code quishing bypasses.',
      href: '/product-zisoft',
      badge: 'MOD 005',
    },
    subModules: [
      { id: '006', name: 'ZIGAMES Spatial VR', detail: '3D WebGL & Meta Quest 3 physical tailgating simulations', href: '/zi-games-page' },
      { id: '007', name: 'CSS Crowdsourced Pentest', detail: 'Vetted ethical hackers with guaranteed <4hr triage SLAs', href: '/product-css' },
      { id: '008', name: 'Red Team Operations', detail: 'Executive vishing voice clones, rogue APs, and USB drops', href: '/products-cybersecurity-awarness-campaigns' },
    ],
  },
  {
    id: 'governance',
    pill: 'PILLAR 03 // SECOPS AUTOMATION',
    name: 'Human Sensor Telemetry & Governance',
    subtitle: 'Transform 5,000+ employee inboxes into an active threat intelligence radar. 1-click reporting with automated AI triage and sub-second SIEM/SOAR dispatch.',
    accent: 'var(--accent-cyan)',
    primaryMetric: '<1.5s Automated Webhook SLA',
    compliance: 'SOC 2 Type II • EU DORA • PCI-DSS v4.0',
    leadModule: {
      name: 'AI-Powered Email Analyzer & SOAR Bridge',
      desc: '1-click reporting add-in inside Microsoft 365, Google Workspace, and mobile clients with automated payload detonation and SIEM event dispatch.',
      href: '/product-zisoft',
      badge: 'MOD 009',
    },
    subModules: [
      { id: '010', name: 'Cyber Emissaries Guild', detail: 'Decentralized internal peer champion network inside business units', href: '/product-zisoft' },
      { id: '011', name: 'Motivational Economy', detail: 'Karma reward points, team streaks, and positive reinforcement', href: '/product-zisoft' },
      { id: '012', name: 'Policy Governance Engine', detail: 'Automated distribution, digital attestation, and auditor evidence export', href: '/product-zisoft' },
    ],
  },
];

export default function EcosystemModulesGrid() {
  const [activeTab, setActiveTab] = useState('all');
  const [interactiveRole, setInteractiveRole] = useState('engineering');

  const roleProfiles = {
    engineering: {
      label: 'Cloud Engineering & DevOps',
      threat: 'GitHub Personal Access Token harvesting & Malicious NPM/PyPI packages',
      lureDifficulty: 'Tier 4 (Advanced)',
      recommendedModule: 'AiTM OAuth Token Replay Defense',
      riskScore: '4.2% Vulnerability (Resilient)',
    },
    finance: {
      label: 'Finance & Accounts Payable',
      threat: 'Spoofed Supplier Invoice Wire Divert & Urgent Audit Tax Requests',
      lureDifficulty: 'Tier 3 (Targeted)',
      recommendedModule: 'Vendor Account Verification Drill',
      riskScore: '24.1% Vulnerability (Medium)',
    },
    executive: {
      label: 'Executive Leadership (C-Suite)',
      threat: 'Synthetic AI Voice Clone (WhatsApp Memo) & Board Portal Credential Harvesting',
      lureDifficulty: 'Tier 5 (Adversary Whaling)',
      recommendedModule: 'C-Suite Out-of-Band Callback Protocol',
      riskScore: '38.7% Vulnerability (Elevated)',
    },
  };

  const currentRole = roleProfiles[interactiveRole];

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag" style={{ background: 'rgba(225, 29, 72, 0.15)', color: 'var(--accent-crimson)' }}>
            Integrated Platform Architecture
          </span>
          <h2 className="section-title">The Three Pillars of Human Cyber Defense</h2>
          <p className="section-subtitle">
            Rather than a fragmented collection of point tools, ZINAD unifies adaptive behavioral cognitive science, offensive red teaming, and real-time SecOps telemetry into one operating ecosystem.
          </p>

          {/* Strategic Pillar Switcher */}
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--bg-dark-elevated)',
              padding: '0.35rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
              gap: '0.25rem',
            }}
          >
            {[
              { id: 'all', label: 'All 3 Core Pillars' },
              { id: 'learning', label: '01 Cognitive LMS' },
              { id: 'offensive', label: '02 Offensive & VR' },
              { id: 'governance', label: '03 Human Sensors & SOAR' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'var(--accent-crimson)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '0.5rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.15s ease',
                  boxShadow: activeTab === tab.id ? '0 2px 10px rgba(225, 29, 72, 0.4)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Open Architectural Canvas (Completely Eliminates Giant Boxes & Boxitis) */}
        {(activeTab === 'all' || activeTab === 'learning' || activeTab === 'offensive') && (
          <div
            className="open-pillars-layout"
            style={{
              gridTemplateColumns: activeTab === 'all' ? undefined : '1fr',
              marginBottom: '1.5rem',
            }}
          >
            {/* Architectural Column 1: Pillar 1 (Cognitive Learning & LMS) with Live Role-Personalization Telemetry */}
            {(activeTab === 'all' || activeTab === 'learning') && (
              <div
                className={`open-pillar-col ${activeTab === 'all' ? 'pillar-left' : ''}`}
                style={{
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-crimson)' }} />
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-crimson)', fontWeight: 700, letterSpacing: '0.5px' }}>
                      {PILLARS[0].pill}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{PILLARS[0].primaryMetric}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '0.65rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {PILLARS[0].name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                    {PILLARS[0].subtitle}
                  </p>

                  {/* Interactive Micro-Simulator: Dynamic Role-Based Learning Tailoring */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      borderBottom: '1px solid var(--border-subtle)',
                      padding: '1.25rem 0',
                      marginBottom: '1.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                        // AI ROLE-PERSONALIZATION ENGINE
                      </span>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {['engineering', 'finance', 'executive'].map((role) => (
                          <button
                            key={role}
                            onClick={() => setInteractiveRole(role)}
                            style={{
                              background: interactiveRole === role ? 'rgba(225, 29, 72, 0.15)' : 'transparent',
                              border: `1px solid ${interactiveRole === role ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                              color: interactiveRole === role ? 'var(--accent-crimson)' : 'var(--text-secondary)',
                              fontSize: '0.7rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 600,
                              textTransform: 'capitalize',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>Target Persona</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{currentRole.label}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>Active Threat Vector</span>
                        <span style={{ color: 'var(--accent-crimson)', fontWeight: 600, textAlign: 'right', maxWidth: '65%' }}>{currentRole.threat}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>Adaptive Nudge Module</span>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>{currentRole.recommendedModule}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>Current Susceptibility</span>
                        <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{currentRole.riskScore}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Connected Sub-Modules Strip */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
                      INTEGRATED MODALITIES:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.65rem' }}>
                      {PILLARS[0].subModules.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          style={{
                            background: 'var(--bg-dark-surface)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '0.7rem 0.85rem',
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                            display: 'block',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{sub.name}</strong>
                            <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>MOD {sub.id}</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            {sub.detail}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Compliance: {PILLARS[0].compliance}
                  </span>
                  <Link href="/product-zisoft" className="btn btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.78rem' }}>
                    Explore ZiSoft LMS ❯
                  </Link>
                </div>
              </div>
            )}

            {/* Architectural Column 2: Pillar 2 (Offensive Threat Simulation & Spatial VR) */}
            {(activeTab === 'all' || activeTab === 'offensive') && (
              <div
                className="open-pillar-col pillar-right"
                style={{
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontWeight: 700, letterSpacing: '0.5px' }}>
                      {PILLARS[1].pill}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{PILLARS[1].primaryMetric}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '0.65rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {PILLARS[1].name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                    {PILLARS[1].subtitle}
                  </p>

                  {/* Interactive Attack Vector Showcase */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      borderBottom: '1px solid var(--border-subtle)',
                      padding: '1.25rem 0',
                      marginBottom: '1.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontWeight: 700, letterSpacing: '0.5px' }}>
                        // ACTIVE ATTACK VECTOR EMULATION
                      </span>
                      <span style={{ fontSize: '0.68rem', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        ZERO-DAY LABS
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {[
                        { title: 'Dynamic QR-Code Quishing', tag: 'Out-of-Band Mobile Bypass' },
                        { title: 'AiTM Reverse-Proxy Phish', tag: 'MFA Token Hijack' },
                        { title: 'Synthetic Voice Cloning Vishing', tag: 'Executive Wire Divert' },
                        { title: '3D Spatial Turnstile Tailgating', tag: 'Physical Perimeter Intrusion' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.6rem 0',
                            borderBottom: i === 3 ? 'none' : '1px dashed var(--border-subtle)',
                            fontSize: '0.8rem',
                          }}
                        >
                          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.title}</span>
                          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>{item.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connected Sub-Modules */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                      OFFENSIVE PLATFORMS:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {PILLARS[1].subModules.map((sub, i) => (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          style={{
                            padding: '0.65rem 0',
                            borderBottom: i === PILLARS[1].subModules.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div>
                            <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{sub.name}</strong>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{sub.detail}</div>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)' }}>❯</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Audited: {PILLARS[1].compliance}
                  </span>
                  <Link href="/zi-games-page" className="btn btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.78rem' }}>
                    Launch VR Gaming ❯
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Architectural Section 3: Pillar 3 (Human Sensor Telemetry & SecOps Automation) - Open Panoramic Command HUD */}
        {(activeTab === 'all' || activeTab === 'governance') && (
          <div
            className="open-governance-layout"
            style={{
              borderTop: activeTab === 'all' ? '1px solid var(--border-subtle)' : 'none',
              paddingTop: activeTab === 'all' ? '3.5rem' : '0',
              marginTop: activeTab === 'all' ? '2.5rem' : '0',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {PILLARS[2].pill}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>•</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                  {PILLARS[2].primaryMetric}
                </span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.65rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {PILLARS[2].name}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '600px' }}>
                {PILLARS[2].subtitle}
              </p>

              {/* Sub-Modules Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {PILLARS[2].subModules.map((sub) => (
                  <Link
                    key={sub.id}
                    href={sub.href}
                    style={{
                      background: 'var(--bg-dark-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.75rem 0.9rem',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{sub.name}</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>MOD {sub.id}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {sub.detail}
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/product-zisoft" className="btn btn-primary" style={{ padding: '0.55rem 1.35rem', fontSize: '0.82rem' }}>
                  Experience ReflexAware 360 ❯
                </Link>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Standards: {PILLARS[2].compliance}
                </span>
              </div>
            </div>

            {/* Visual Architecture Conduit: Sub-Second Incident Loop Precision HUD */}
            <div style={{ background: '#07090e', border: '1px solid var(--border-medium)', borderRadius: '12px', padding: '1.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.65rem', marginBottom: '1.25rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.5px' }}>// REAL-TIME SECOPS TELEMETRY CONDUIT</span>
                <span style={{ color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }}></span>
                  SLA &lt; 1.5s
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>T+0.0s</span>
                  <span style={{ color: '#ffffff' }}>Employee clicks <strong>&quot;Report Phish with ZiSoft&quot;</strong> in Outlook/Gmail</span>
                </div>
                <div style={{ height: '12px', borderLeft: '2px dashed rgba(6, 182, 212, 0.4)', marginLeft: '1.75rem' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ background: 'rgba(225, 29, 72, 0.2)', color: 'var(--accent-crimson)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>T+0.4s</span>
                  <span style={{ color: '#ffffff' }}>ZiSoft AI Engine inspects RFC 5322 headers &amp; checks AiTM proxy indicators</span>
                </div>
                <div style={{ height: '12px', borderLeft: '2px dashed rgba(225, 29, 72, 0.4)', marginLeft: '1.75rem' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>T+1.1s</span>
                  <span style={{ color: '#ffffff' }}>SOAR Webhook dispatched to Splunk / Sentinel • Threat purged tenant-wide</span>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.7rem' }}>
                <span>Zero Manual Triage Overhead</span>
                <span style={{ color: 'var(--accent-emerald)' }}>+50 Karma Credited to Champion</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
