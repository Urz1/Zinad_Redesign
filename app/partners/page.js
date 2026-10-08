import React from 'react';
import Link from 'next/link';
import DemoButton from '../../components/DemoButton';

export const metadata = {
  title: 'Global Partner Ecosystem & Channel Alliance | ZINAD',
  description: 'Join ZINAD global channel network across North America, Europe, MENA, and Africa. Tiered margins, deal registration, and co-marketing funds.',
};

const PARTNER_TIERS = [
  {
    tier: 'Authorized Partner',
    target: 'Value-Added Resellers & Regional IT Consultants',
    margin: 'Up to 20%',
    badge: 'Entry Tier',
    features: [
      'Standard Deal Registration Protection',
      'Sales & Technical Pre-Sales Certification',
      'Access to Partner Collateral & Battlecards',
      'Standard Channel Desk Support',
    ],
  },
  {
    tier: 'Silver Partner',
    target: 'Specialized Cybersecurity MSPs & Systems Integrators',
    margin: 'Up to 30%',
    badge: 'Growing Volume',
    features: [
      'Guaranteed Deal Registration SLAs (4-hour hold)',
      'Dedicated Channel Account Manager',
      'Quarterly Market Development Funds (MDF)',
      'Direct Technical Tier-2 Support Escalation',
      'ZiSoft Tenant Multi-Org Console Access',
    ],
  },
  {
    tier: 'Gold Partner',
    target: 'Enterprise MSSPs & Multi-National Security Alliances',
    margin: 'Up to 40%',
    badge: 'High Performance',
    popular: true,
    features: [
      'Priority Deal Registration & Price Locking',
      'Co-branded Red Team Simulations & Hackathons',
      'Executive Briefing Center Access (SF, Riyadh, Dubai)',
      'Sub-1.5s SOAR Webhook & API White-labeling',
      'Dedicated Solutions Architect for RFPs',
    ],
  },
  {
    tier: 'Platinum Global Distributor',
    target: 'Tier-1 Security Distributors (e.g. AmiViz, Global SIs)',
    margin: 'Custom Margin Schedule',
    badge: 'Strategic Alliance',
    features: [
      'Exclusive Territory & Regional Market Alignment',
      'Annual Strategic Roadshow Co-Sponsorship',
      'Executive Board Advisory Seat',
      'Direct Integration into Regional Sovereign Clouds',
      'Custom SLA & Escrow Code Guarantees',
    ],
  },
];

const REGIONAL_HUBS = [
  {
    region: 'North America (Americas HQ)',
    desk: 'San Francisco Command Center',
    address: '275 5th Street, Renaissance Center, Suite 410, San Francisco, CA',
    focus: 'Enterprise Tech, Financial Services & Fortune 500 SecOps',
    contact: 'us.partners@zinad.net',
    iso: 'USA',
  },
  {
    region: 'Middle East & GCC (MENA HQ)',
    desk: 'Riyadh Regional Headquarters',
    address: '2975 Prince Ahmed Ibn Abdelaziz, Al Woroud, Riyadh, KSA',
    focus: 'Government, Critical National Infrastructure (CNI) & Banking',
    contact: 'ksa.partners@zinad.net',
    iso: 'KSA',
  },
  {
    region: 'Europe & UK (EMEA Desk)',
    desk: 'European Channel Operations',
    address: 'GDPR & NIS2 Compliance Hub, Frankfurt & London',
    focus: 'NIS2 Directive Compliance, Financial GRC & Privacy Regulations',
    contact: 'eu.partners@zinad.net',
    iso: 'EU',
  },
  {
    region: 'Africa & Emerging Markets',
    desk: 'African Strategic Alliances Hub',
    address: 'Regional Financial & Telecom Gateway',
    focus: 'High-growth FinTech, Mobile Network Operators & Banking',
    contact: 'africa.partners@zinad.net',
    iso: 'AFR',
  },
];

const DISTRIBUTOR_LOGOS = [
  {
    name: 'AmiViz Enterprise',
    tier: 'Platinum Distribution',
    territory: 'GCC & MENA Region',
    renderLogo: () => (
      <svg viewBox="0 0 170 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        <g transform="translate(0, 6)">
          <circle cx="14" cy="16" r="7" fill="var(--accent-crimson)" opacity="0.9" />
          <circle cx="28" cy="9" r="5" fill="var(--accent-cyan)" opacity="0.95" />
          <line x1="14" y1="16" x2="28" y2="9" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
        </g>
        <text x="42" y="30" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="24" letterSpacing="0.5px">
          Ami<tspan fill="var(--accent-crimson)">Viz</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Starlink (Infinigate / Ooredoo)',
    tier: 'Strategic Telco Alliance',
    territory: 'Middle East & Levant',
    renderLogo: () => (
      <svg viewBox="0 0 180 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        <path d="M14 6 L18 17 L29 17 L20 24 L23 35 L14 28 L5 35 L8 24 L-1 17 L10 17 Z" fill="var(--accent-cyan)" transform="scale(0.85) translate(2, 2)" />
        <text x="34" y="24" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.8px">
          STARLINK
        </text>
        <text x="34" y="35" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" letterSpacing="0.5px">
          AN INFINIGATE GROUP CO.
        </text>
      </svg>
    ),
  },
  {
    name: 'Mannai InfoTech',
    tier: 'Enterprise ICT Systems',
    territory: 'State of Qatar & GCC',
    renderLogo: () => (
      <svg viewBox="0 0 170 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        <polygon points="12,5 22,19 12,33 2,19" fill="var(--accent-cyan)" />
        <polygon points="12,11 18,19 12,27 6,19" fill="currentColor" opacity="0.3" />
        <text x="30" y="25" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="800" fontSize="18" letterSpacing="1px">
          MANNAI
        </text>
        <text x="30" y="36" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600" letterSpacing="0.8px">
          INFOTECH
        </text>
      </svg>
    ),
  },
  {
    name: 'CyberKnight Technologies',
    tier: 'Zero Trust Distributor',
    territory: 'UAE, KSA & Egypt',
    renderLogo: () => (
      <svg viewBox="0 0 185 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        <g transform="translate(2, 6)">
          <path d="M12 2 L22 7 L22 17 C22 23 12 27 12 27 C12 27 2 23 2 17 L2 7 Z" stroke="var(--accent-purple)" strokeWidth="2.2" fill="rgba(139, 92, 246, 0.15)" />
          <polyline points="8 14 11 17 17 11" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="32" y="23" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5px">
          CYBER<tspan fill="var(--accent-purple)">KNIGHT</tspan>
        </text>
        <text x="32" y="34" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600" letterSpacing="0.6px">
          ZERO TRUST VAD
        </text>
      </svg>
    ),
  },
  {
    name: 'Ingram Micro Cyber',
    tier: 'Global Distribution Leader',
    territory: 'North America & Europe',
    renderLogo: () => (
      <svg viewBox="0 0 180 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        <g transform="translate(2, 8)">
          <rect x="0" y="2" width="16" height="20" rx="3" fill="#0072ce" />
          <path d="M4 8 L12 8 M4 12 L10 12 M4 16 L12 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </g>
        <text x="26" y="22" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.2px">
          INGRAM <tspan fill="#0072ce">MICRO</tspan>
        </text>
        <text x="26" y="34" fill="var(--accent-cyan)" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="0.6px">
          CYBER DEFENSE
        </text>
      </svg>
    ),
  },
  {
    name: 'Wipro Cyber Security',
    tier: 'Global Systems Integrator',
    territory: 'Worldwide MSSP',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" fill="none" style={{ height: '36px', width: 'auto' }}>
        <g transform="translate(2, 6)">
          <circle cx="12" cy="14" r="11" stroke="#ff8200" strokeWidth="2" fill="none" />
          <circle cx="12" cy="14" r="6" stroke="#78be20" strokeWidth="2" fill="none" />
          <circle cx="12" cy="14" r="2" fill="#0072ce" />
        </g>
        <text x="30" y="24" fill="currentColor" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="18" letterSpacing="0.5px">
          wipro
        </text>
        <text x="30" y="35" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600" letterSpacing="0.8px">
          CYBER ALLIANCE
        </text>
      </svg>
    ),
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center">
          <span className="section-tag">Global Channel Alliance</span>
          <h1 className="hero-title" style={{ maxWidth: '920px', margin: '0 auto 1.5rem' }}>
            Accelerate Growth With The <span className="hero-highlight-red">ZINAD Partner Ecosystem</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            Join our tri-continental network of enterprise MSSPs, distributors, and security consultants. Deliver high-margin human risk intelligence and offensive red teaming with deal registration protection.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Become a Certified Partner ❯
            </DemoButton>
            <a href="#partner-tiers" className="btn btn-secondary">
              View Tier Margins &amp; Benefits
            </a>
          </div>
        </div>
      </section>

      {/* Trust & Channel Metrics */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-surface)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-crimson)', fontFamily: 'var(--font-mono)' }}>20+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Active Partner Countries</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>Up to 40%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Protected Reseller Margin</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>&lt; 4 Hours</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Deal Registration Turnaround</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Channel Conflict Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Authorized Enterprise Distributors & Strategic Alliances Logo Grid */}
      <section style={{ padding: '3.5rem 0', background: 'var(--bg-dark-base)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <span className="section-tag">Tier-1 Distribution</span>
            <h2 className="section-title">Authorized Enterprise Distributors &amp; Alliances</h2>
            <p className="section-subtitle">
              ZINAD partners with premier global and regional cybersecurity distributors to provide local billing, technical onboarding, and guaranteed deal registration.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {DISTRIBUTOR_LOGOS.map((dist, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-dark-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {dist.renderLogo()}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {dist.territory}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    {dist.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tier Program Matrix */}
      <section id="partner-tiers" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Tier Structure</span>
            <h2 className="section-title">Structured For High Partner Profitability</h2>
            <p className="section-subtitle">
              Transparent margin tiers, guaranteed deal protection, and dedicated joint go-to-market funding.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {PARTNER_TIERS.map((tier) => (
              <div
                key={tier.tier}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: tier.popular ? '1px solid var(--accent-crimson)' : '1px solid var(--border-subtle)',
                  boxShadow: tier.popular ? '0 10px 30px rgba(225, 29, 72, 0.15)' : 'none',
                }}
              >
                {tier.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '20px',
                      background: 'var(--accent-crimson)',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}
                  >
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>
                    {tier.badge}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>
                    {tier.tier}
                  </h3>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                    {tier.margin}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '38px' }}>
                    {tier.target}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {tier.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <DemoButton className="btn btn-secondary" style={{ width: '100%', textAlign: 'center', fontSize: '0.82rem' }}>
                    Apply For {tier.tier} ❯
                  </DemoButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Channel Desks */}
      <section className="section" style={{ background: 'var(--bg-dark-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Tri-Continental Hubs</span>
            <h2 className="section-title">Regional Partner Support Desks</h2>
            <p className="section-subtitle">
              Local presence across four key operational hubs ensuring localized compliance and on-site engineering.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {REGIONAL_HUBS.map((hub) => (
              <div key={hub.region} className="glass-panel" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>
                    {hub.iso}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    LOCAL DESK
                  </span>
                </div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 0.35rem' }}>
                  {hub.region}
                </h4>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-crimson)', marginBottom: '0.5rem' }}>
                  {hub.desk}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  {hub.address}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <strong>Focus:</strong> {hub.focus}
                </div>
                <a href={`mailto:${hub.contact}`} style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{hub.contact}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Roadshow Spotlight */}
      <section className="section">
        <div className="container">
          <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(6, 182, 212, 0.3)', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05))' }}>
            <div className="responsive-split-grid">
              <div>
                <span className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                  Executive Tour 2025
                </span>
                <h3 style={{ fontSize: '1.85rem', margin: '0.5rem 0 1rem', color: 'var(--text-primary)' }}>
                  ZINAD Roadshow 2025: Kingdom of Saudi Arabia
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Multi-city partner and enterprise summit across Riyadh, Jeddah, and Al Khobar. Spotlighting human threat intelligence, NCA ECC-1:2018 compliance, and real-time ReflexAware 360 incident response for government and financial institutions.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <DemoButton className="btn btn-primary">
                    Request Roadshow Executive Pass ❯
                  </DemoButton>
                  <a href="mailto:ksa.partners@zinad.net" className="btn btn-secondary">
                    Sponsor Next Summit Desk
                  </a>
                </div>
              </div>
              <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-medium)', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                  // ROADSHOW STOPS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Riyadh Summit</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Al Faisaliah Hotel</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontSize: '0.8rem' }}>COMPLETED</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Jeddah Enterprise</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Hilton Corniche</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.8rem' }}>REGISTRATION OPEN</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Al Khobar Energy</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Kempinski Al Othman</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontSize: '0.8rem' }}>INVITE ONLY</span>
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
