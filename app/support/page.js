'use client';

import React, { useState } from 'react';
import DemoButton from '../../components/DemoButton';

const SLAS = [
  {
    tier: 'Automated ReflexAware SOAR',
    sla: '< 1.5 Seconds',
    accent: 'var(--accent-crimson)',
    desc: 'Sub-second webhook delivery to Splunk, Microsoft Sentinel, and Palo Alto Cortex when phishing reports are submitted.',
  },
  {
    tier: 'Zero-Day Vulnerability Triage',
    sla: '< 4 Hours',
    accent: 'var(--accent-cyan)',
    desc: 'Dedicated human review by certified offensive red teamers for submitted zero-day vectors and anomalous payload detonations.',
  },
  {
    tier: '24/7 Critical SecOps Incident',
    sla: '< 15 Minutes',
    accent: 'var(--accent-emerald)',
    desc: 'Emergency escalation line for live enterprise security breach drills, active campaign lockouts, and SCIM directory synchronization.',
  },
  {
    tier: 'Standard Support & Inquiries',
    sla: '< 4 Business Hours',
    accent: 'var(--accent-purple)',
    desc: 'Campaign scheduling assistance, custom template curation, and compliance audit reporting exports.',
  },
];

export default function SupportPage() {
  const [ticketType, setTicketType] = useState('technical');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center">
          <span className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            24/7 Enterprise Command Desks
          </span>
          <h1 className="hero-title" style={{ maxWidth: '920px', margin: '0 auto 1.5rem' }}>
            Mission-Critical Support &amp; <span className="hero-highlight-red">SecOps Escalation</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            Direct access to senior security engineers, LMS integration specialists, and red teamers across our San Francisco, Riyadh, and Dubai command centers.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#ticket-portal" className="btn btn-primary">
              Submit Technical Ticket ❯
            </a>
            <DemoButton className="btn btn-secondary">
              Request Emergency Hotline
            </DemoButton>
          </div>
        </div>
      </section>

      {/* SLA Commitments Matrix */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-surface)', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Service Level Agreements</span>
            <h2 className="section-title">Contractually Guaranteed Enterprise SLAs</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {SLAS.map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: item.accent, fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                  {item.sla}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>
                  {item.tier}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Support Portal Intake Form */}
      <section id="ticket-portal" className="section">
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }} className="glass-panel">
            <div style={{ padding: '2.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="section-tag">Command Desk Intake</span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: '0.4rem 0' }}>
                  Open an Enterprise Support Request
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Select the subsystem to dispatch your ticket directly to the assigned engineering pod.
                </p>
              </div>

              {submitted ? (
                <div style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-emerald)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="9 12 12 15 16 10" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Ticket Dispatched Successfully</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                    Reference ID: <code>ZN-SR-8921-X</code>. Your assigned SecOps engineer will respond within your contractual SLA window.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      SUBSYSTEM DISPATCH CATEGORY:
                    </label>
                    <div className="responsive-form-row" style={{ gap: '0.75rem' }}>
                      {[
                        { id: 'technical', label: 'ZiSoft SaaS & LMS Sync' },
                        { id: 'outlook', label: 'M365 Outlook Add-in' },
                        { id: 'soar', label: 'ReflexAware SIEM / SOAR' },
                        { id: 'redteam', label: 'Active Campaign Escalation' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setTicketType(cat.id)}
                          style={{
                            padding: '0.65rem 0.85rem',
                            borderRadius: '6px',
                            border: `1px solid ${ticketType === cat.id ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                            background: ticketType === cat.id ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-dark-elevated)',
                            color: ticketType === cat.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            fontWeight: ticketType === cat.id ? 700 : 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="responsive-form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        CORPORATE EMAIL
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="admin@enterprise.com"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-medium)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        ORGANIZATION / TENANT ID
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Acme Corp / ZN-902"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-medium)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      DIAGNOSTIC DETAILS &amp; TRACE LOGS
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the unexpected behavior, include HTTP status codes or incident timestamps..."
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-medium)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.85rem', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem' }}>
                    Dispatch Ticket with Encrypted Telemetry ❯
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Global Command Center Hotlines */}
      <section className="section" style={{ background: 'var(--bg-dark-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container text-center">
          <span className="section-tag">Direct Lines</span>
          <h2 className="section-title">Emergency Regional Desks</h2>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            For critical severity-1 incidents, reach our 24/7 command center hotlines directly:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-crimson)', fontWeight: 700, marginBottom: '0.25rem' }}>
                AMER DESK (SAN FRANCISCO)
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>+1 (917) 297-2087</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>us.support@zinad.net</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: '0.25rem' }}>
                MENA DESK (RIYADH)
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>+966 11 834 9120</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>ksa.support@zinad.net</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.25rem' }}>
                GCC DESK (DUBAI)
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>+971 4 456 7890</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>uae.support@zinad.net</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
