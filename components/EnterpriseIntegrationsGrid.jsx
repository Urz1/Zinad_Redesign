'use client';

import React, { useState } from 'react';
import { useModal } from './ModalContext';

const INTEGRATIONS = [
  {
    id: 'sentinel',
    category: 'SIEM & SOAR',
    name: 'Microsoft Sentinel',
    subtitle: 'Autonomous SIEM Webhook & Playbooks',
    latency: '< 1.1s',
    protocol: 'Azure Logic Apps / Webhook',
    accent: '#0078d4',
    badge: 'Certified Connector',
    renderLogo: () => (
      <svg viewBox="0 0 180 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* Microsoft 4-Square */}
        <g transform="translate(2, 6)">
          <rect x="0" y="0" width="14" height="14" fill="#f25022" rx="1.5" />
          <rect x="16" y="0" width="14" height="14" fill="#7fba00" rx="1.5" />
          <rect x="0" y="16" width="14" height="14" fill="#00a4ef" rx="1.5" />
          <rect x="16" y="16" width="14" height="14" fill="#ffb900" rx="1.5" />
        </g>
        <text x="38" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="15" letterSpacing="-0.2px">
          Microsoft
        </text>
        <text x="38" y="34" fill="var(--accent-cyan)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="9.5" letterSpacing="0.8px">
          SENTINEL SOAR
        </text>
      </svg>
    ),
  },
  {
    id: 'splunk',
    category: 'SIEM & SOAR',
    name: 'Splunk Enterprise Security',
    subtitle: 'Sub-second HEC Event Streaming',
    latency: '< 980ms',
    protocol: 'Splunk HEC (HTTP Event Collector)',
    accent: '#f25c05',
    badge: 'Native App',
    renderLogo: () => (
      <svg viewBox="0 0 170 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* Splunk Angle Bracket & Wordmark */}
        <g transform="translate(2, 8)">
          <path d="M0 14 L12 4 L12 10 L6 14 L12 18 L12 24 Z" fill="#f25c05" />
          <path d="M12 24 L24 14 L24 20 L18 24 L24 28 L24 34 Z" fill="#ea1863" opacity="0.8" />
        </g>
        <text x="32" y="24" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="20" letterSpacing="-0.5px">
          splunk<tspan fill="#f25c05">&gt;</tspan>
        </text>
        <text x="32" y="36" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.6px">
          ENTERPRISE SECURITY
        </text>
      </svg>
    ),
  },
  {
    id: 'cortex',
    category: 'SIEM & SOAR',
    name: 'Palo Alto Networks Cortex',
    subtitle: 'Bi-Directional XSOAR Incident Ingestion',
    latency: '< 1.4s',
    protocol: 'XSOAR REST Integration Pack',
    accent: '#fa582d',
    badge: 'Gold Certified',
    renderLogo: () => (
      <svg viewBox="0 0 195 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* Palo Alto Polygonal Mark */}
        <g transform="translate(2, 6)">
          <path d="M8 2 L18 2 L24 14 L18 26 L8 26 L2 14 Z" stroke="#fa582d" strokeWidth="2.5" fill="none" />
          <circle cx="13" cy="14" r="3.5" fill="#fa582d" />
        </g>
        <text x="34" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="15" letterSpacing="-0.3px">
          palo<tspan fill="#fa582d">alto</tspan>
        </text>
        <text x="34" y="34" fill="var(--accent-crimson)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="9.5" letterSpacing="0.8px">
          CORTEX XSOAR
        </text>
      </svg>
    ),
  },
  {
    id: 'okta',
    category: 'Identity & Access (IAM)',
    name: 'Okta Workforce Identity',
    subtitle: 'Zero-Touch SCIM 2.0 User Lifecycle',
    latency: 'Automated',
    protocol: 'SCIM 2.0 / SAML 2.0 SSO',
    accent: '#007dc1',
    badge: 'Automated Sync',
    renderLogo: () => (
      <svg viewBox="0 0 150 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* Okta Circle Emblem */}
        <g transform="translate(2, 8)">
          <circle cx="14" cy="14" r="12" fill="none" stroke="#007dc1" strokeWidth="4" />
        </g>
        <text x="36" y="24" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="21" letterSpacing="-0.5px">
          okta
        </text>
        <text x="36" y="35" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8" letterSpacing="0.8px">
          IDENTITY CLOUD
        </text>
      </svg>
    ),
  },
  {
    id: 'crowdstrike',
    category: 'Endpoint & XDR',
    name: 'CrowdStrike Falcon',
    subtitle: 'Endpoint Isolation & Adversary Intel',
    latency: '< 850ms',
    protocol: 'CrowdStrike Streaming API',
    accent: '#e01e26',
    badge: 'Adversary Sync',
    renderLogo: () => (
      <svg viewBox="0 0 185 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* CrowdStrike Falcon Wing */}
        <g transform="translate(2, 6)">
          <path d="M2 14 L12 2 L22 8 L16 16 L24 22 L14 26 L8 18 Z" fill="#e01e26" />
        </g>
        <text x="32" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="14" letterSpacing="-0.2px">
          CROWDSTRIKE
        </text>
        <text x="32" y="34" fill="#e01e26" fontFamily="var(--font-mono)" fontWeight="700" fontSize="9.5" letterSpacing="0.8px">
          FALCON PLATFORM
        </text>
      </svg>
    ),
  },
  {
    id: 'aws',
    category: 'Cloud & Infrastructure',
    name: 'AWS Security Hub & EventBridge',
    subtitle: 'Sovereign Regional Cloud Pipelines',
    latency: '< 1.2s',
    protocol: 'Amazon EventBridge & KMS',
    accent: '#ff9900',
    badge: 'GovCloud Ready',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* AWS Emblem */}
        <g transform="translate(2, 6)">
          <rect x="0" y="2" width="22" height="22" rx="4" fill="#232f3e" />
          <path d="M4 18 C10 22 14 22 18 17" stroke="#ff9900" strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="17,16 19,19 15,19" fill="#ff9900" />
        </g>
        <text x="30" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.5px">
          aws
        </text>
        <text x="30" y="34" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.6px">
          SECURITY HUB
        </text>
      </svg>
    ),
  },
  {
    id: 'slack',
    category: 'DevSecOps & Collaboration',
    name: 'Slack Enterprise Grid',
    subtitle: 'Interactive Bot & 1-Click Phish Reporter',
    latency: 'Sub-second',
    protocol: 'Slack Block Kit & Webhooks',
    accent: '#e01e5a',
    badge: 'Workforce Bot',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* Slack 4-color Octothorpe */}
        <g transform="translate(2, 8)">
          <rect x="4" y="0" width="4" height="10" rx="2" fill="#36c5f0" />
          <circle cx="13" cy="2" r="2" fill="#36c5f0" />
          <rect x="12" y="4" width="10" height="4" rx="2" fill="#2eb67d" />
          <circle cx="20" cy="13" r="2" fill="#2eb67d" />
          <rect x="8" y="12" width="4" height="10" rx="2" fill="#e01e5a" />
          <circle cx="3" cy="20" r="2" fill="#e01e5a" />
          <rect x="0" y="8" width="10" height="4" rx="2" fill="#ecb22e" />
          <circle cx="2" cy="3" r="2" fill="#ecb22e" />
        </g>
        <text x="32" y="24" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="20" letterSpacing="-0.5px">
          slack
        </text>
        <text x="32" y="35" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8" letterSpacing="0.8px">
          ENTERPRISE GRID
        </text>
      </svg>
    ),
  },
  {
    id: 'gitlab',
    category: 'DevSecOps & Collaboration',
    name: 'GitLab / Jira SecOps',
    subtitle: 'Vulnerability Ticketing & CI/CD Gateways',
    latency: 'Bidirectional',
    protocol: 'REST API & Webhooks',
    accent: '#fc6d26',
    badge: 'Auto-Triage',
    renderLogo: () => (
      <svg viewBox="0 0 165 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* GitLab Origami Tanuki */}
        <g transform="translate(2, 6)">
          <polygon points="12,2 20,24 4,24" fill="#e24329" />
          <polygon points="12,2 4,24 1,13" fill="#fc6d26" />
          <polygon points="12,2 20,24 23,13" fill="#fc6d26" />
          <polygon points="1,13 4,24 0,24" fill="#fca326" />
          <polygon points="23,13 20,24 24,24" fill="#fca326" />
        </g>
        <text x="32" y="23" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.2px">
          GitLab
        </text>
        <text x="32" y="34" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.6px">
          DEVSECOPS PIPELINE
        </text>
      </svg>
    ),
  },
  {
    id: 'workday',
    category: 'Identity & Access (IAM)',
    name: 'Workday HCM',
    subtitle: 'Automated Employee Org-Chart Hierarchy',
    latency: 'Hourly Sync',
    protocol: 'Workday Enterprise Interface (EIB)',
    accent: '#0875e1',
    badge: 'HRIS Sync',
    renderLogo: () => (
      <svg viewBox="0 0 170 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* Workday Arc Emblem */}
        <g transform="translate(2, 6)">
          <path d="M2 18 C4 8 18 8 20 18" stroke="#0875e1" strokeWidth="3" strokeLinecap="round" />
          <circle cx="11" cy="6" r="3" fill="#f58220" />
        </g>
        <text x="28" y="23" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.2px">
          workday<tspan fill="#f58220">.</tspan>
        </text>
        <text x="28" y="34" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.6px">
          ENTERPRISE HCM
        </text>
      </svg>
    ),
  },
  {
    id: 'gcp',
    category: 'Cloud & Infrastructure',
    name: 'Google Cloud Platform',
    subtitle: 'Chronicle SIEM & Pub/Sub Telemetry',
    latency: '< 920ms',
    protocol: 'Google Cloud Pub/Sub & Chronicle',
    accent: '#4285f4',
    badge: 'Multi-Cloud',
    renderLogo: () => (
      <svg viewBox="0 0 175 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        {/* Google Cloud Hex Emblem */}
        <g transform="translate(2, 6)">
          <polygon points="12,2 22,8 22,20 12,26 2,20 2,8" stroke="#4285f4" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="14" r="4" fill="#ea4335" />
        </g>
        <text x="30" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="15" letterSpacing="-0.2px">
          Google Cloud
        </text>
        <text x="30" y="34" fill="var(--accent-cyan)" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8.5" letterSpacing="0.6px">
          CHRONICLE SIEM
        </text>
      </svg>
    ),
  },
];

const CATEGORIES = [
  'All Integrations (10)',
  'SIEM & SOAR',
  'Identity & Access (IAM)',
  'Endpoint & XDR',
  'Cloud & Infrastructure',
  'DevSecOps & Collaboration',
];

export default function EnterpriseIntegrationsGrid() {
  const { openDemo } = useModal();
  const [selectedCat, setSelectedCat] = useState('All Integrations (10)');
  const [hoveredId, setHoveredId] = useState(null);

  const filteredIntegrations = INTEGRATIONS.filter((item) => {
    if (selectedCat.startsWith('All')) return true;
    return item.category === selectedCat;
  });

  return (
    <section
      aria-label="Enterprise Security & Ecosystem Integrations"
      style={{
        padding: '4.5rem 0',
        background: 'var(--bg-dark-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></span>
            <span className="section-tag" style={{ margin: 0 }}>
              Ecosystem Interoperability
            </span>
          </div>
          <h2 className="section-title">
            Seamlessly Integrated With Your <span className="hero-highlight-cyan">Active SecOps Stack</span>
          </h2>
          <p className="section-subtitle">
            Zero proprietary lock-in. ZINAD pipes high-fidelity employee threat telemetry, phishing reports, and risk scores directly into your existing SIEM, SOAR, IAM, and collaboration tools.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '2.5rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  background: isActive ? 'var(--accent-crimson)' : 'var(--bg-dark-elevated)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-crimson)' : '1px solid var(--border-subtle)',
                  borderRadius: '24px',
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Logos & Connectors Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredIntegrations.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                className="glass-panel"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '10px',
                  border: isHovered ? `1px solid ${item.accent}` : '1px solid var(--border-subtle)',
                  background: 'var(--bg-dark-elevated)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-3px)' : 'none',
                  boxShadow: isHovered ? `0 8px 24px ${item.accent}22` : '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <div>
                  {/* Top Bar: Authentic Brand Logo + Status Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ color: 'var(--text-primary)' }}>
                      {item.renderLogo()}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border-subtle)',
                        color: item.accent,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {item.subtitle}
                  </p>
                </div>

                {/* Footer Telemetry Specs */}
                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '0.9rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <div style={{ color: 'var(--text-muted)' }}>
                    PROTO: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.protocol}</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
                    {item.latency}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration API Callout */}
        <div
          style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            background: 'var(--bg-dark-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Looking for custom webhook receivers or proprietary SOAR endpoints?
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              ZINAD provides documented REST APIs, OpenAPI 3.1 specifications, and Kafka streaming brokers.
            </div>
          </div>
          <button
            onClick={openDemo}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.5rem 1.25rem' }}
          >
            Request API Docs &amp; Webhook Keys ❯
          </button>
        </div>
      </div>
    </section>
  );
}
