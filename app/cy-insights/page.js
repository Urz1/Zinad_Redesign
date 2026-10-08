'use client';

import React, { useState } from 'react';
import DemoButton from '../../components/DemoButton';

const RESEARCH_ARTICLES = [
  {
    id: 'react2shell',
    title: 'React2Shell (CVE-2025-55182): Prototype Pollution RCE in React Server Components',
    category: 'Zero-Day Research',
    cve: 'CVE-2025-55182',
    cvss: '9.8 CRITICAL',
    date: '2025-11-14',
    author: 'ZINAD Offensive Security Labs',
    summary: 'Discovery of an unauthenticated remote code execution chain leveraging prototype function constructors and thenables in streaming React Server Components.',
    highlights: [
      'Discovered during zero-day audit of modern SSR application boundaries.',
      'Exploits JSON-like flight data serialization streams.',
      'Responsible disclosure coordinated with upstream maintainers.',
    ],
    readTime: '8 min read',
    tags: ['RCE', 'CVE Disclosure', 'React Server Components', 'Prototype Pollution'],
  },
  {
    id: 'meta-spark-ar',
    title: 'Meta Bug Bounty: Arbitrary Code Execution in Spark AR Studio Package Manager',
    category: 'Bug Bounty Disclosures',
    cve: 'Meta Hall of Fame',
    cvss: '8.8 HIGH',
    date: '2025-08-22',
    author: 'ZINAD Vulnerability Research Team',
    summary: 'A critical vulnerability in Spark AR Studio allowing local and remote attackers to execute arbitrary shell commands via unsanitized Node.js lifecycle scripts in custom AR packages.',
    highlights: [
      'Awarded top-tier bounty from Meta Bug Bounty Program.',
      'Bypassed sandboxed packaging checks using symlinked manifest files.',
      'Patched across all active versions of Meta Spark AR Studio.',
    ],
    readTime: '11 min read',
    tags: ['Meta', 'Bug Bounty', 'Command Injection', 'Node.js Security'],
  },
  {
    id: 'netconsd-trilogy',
    title: 'Meta Netconsd Fuzzing Trilogy: Finding Memory Corruption in High-Throughput Linux Daemons',
    category: 'Vulnerability Research',
    cve: 'Meta Security Report',
    cvss: '8.2 HIGH',
    date: '2025-06-10',
    author: 'ZINAD Binary Forensics Division',
    summary: 'A comprehensive 3-part technical series detailing custom LibFuzzer harnesses, differential packet mutations, and KLEE symbolic execution against Meta open-source netconsd daemon.',
    highlights: [
      'Engineered high-throughput UDP packet synthesizer with zero syscall overhead.',
      'Uncovered multiple heap out-of-bounds reads and race conditions.',
      'Open-sourced the fuzzing harness for Linux network maintainers.',
    ],
    readTime: '15 min read',
    tags: ['Fuzzing', 'LibFuzzer', 'Linux Kernel', 'Memory Safety'],
  },
  {
    id: 'deepfake-25m',
    title: 'The $25M Video Call: Forensic Autopsy of Executive Deepfake Impersonation',
    category: 'Threat Intelligence',
    cve: 'BEC Forensic Case',
    cvss: 'FINANCIAL FRAUD',
    date: '2025-04-18',
    author: 'ZINAD Cognitive Psychology Lab',
    summary: 'Detailed forensic breakdown of a multinational corporation losing $25.6M after an employee attended a multi-person video conference where every single participant was an AI deepfake avatar.',
    highlights: [
      'Analyzed facial micro-inconsistencies and audio harmonic spectral patterns.',
      'Engineered new ZiSoft Deepfake ReflexAware challenge modules.',
      'Formulated the 3-step dual-channel out-of-band CFO verification protocol.',
    ],
    readTime: '7 min read',
    tags: ['Deepfakes', 'BEC Fraud', 'Generative AI', 'Social Engineering'],
  },
  {
    id: 'rsc-serialization',
    title: 'Render. Serialize. Compromise: Modern Serialization Flaws in Web Frameworks',
    category: 'Vulnerability Research',
    cve: 'Technical Whitepaper',
    cvss: 'DEFENSE BRIEFING',
    date: '2025-02-04',
    author: 'ZINAD Application Security Group',
    summary: 'Why modern client-server boundary serialization formats (RSC, Next.js Server Actions, tRPC) introduce new attack surfaces for desynchronization and gadget execution.',
    highlights: [
      'Comparative taxonomy of Python pickle, Java deserialization, and JS Flight payloads.',
      'WAF bypass techniques using chunked transfer encoding.',
      'Guidelines for SecOps teams auditing Next.js enterprise applications.',
    ],
    readTime: '9 min read',
    tags: ['Web Security', 'Next.js', 'Serialization', 'AppSec'],
  },
  {
    id: 'phishing-ai-personalization',
    title: 'Beyond the Click Rate: Why Traditional Phishing Training Fails (And How AI Fixes It)',
    category: 'Human Risk Analytics',
    cve: 'Industry Report',
    cvss: 'RESEARCH PAPER',
    date: '2025-01-12',
    author: 'ZINAD Behavioral Science Group',
    summary: 'Empirical study across 240,000 corporate simulation events showing why blanket monthly phishing tests create employee training fatigue rather than genuine behavioral vigilance.',
    highlights: [
      'Correlation between departmental stress cycles and credential susceptibility.',
      'Adaptive difficulty algorithms reduce false-positive helpdesk reports by 78%.',
      'Positive reinforcement and Reflex Karma drive 4x faster incident notification.',
    ],
    readTime: '6 min read',
    tags: ['Human Risk', 'ZiSoft', 'Machine Learning', 'Behavioral Economics'],
  },
];

const CATEGORIES = ['All Research', 'Zero-Day Research', 'Bug Bounty Disclosures', 'Threat Intelligence', 'Vulnerability Research', 'Human Risk Analytics'];

export default function CyInsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Research');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = RESEARCH_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All Research' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center">
          <span className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            CY Insights &amp; Exploit Labs
          </span>
          <h1 className="hero-title" style={{ maxWidth: '920px', margin: '0 auto 1.5rem' }}>
            Offensive Intelligence Informs <span className="hero-highlight-red">Frontline Defense</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '760px', margin: '0 auto 2.5rem' }}>
            Our security awareness content is not generic compliance theory. It is engineered from real zero-day discoveries, high-severity CVE disclosures, and Meta Bug Bounties uncovered by our offensive research team.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <DemoButton className="btn btn-primary">
              Subscribe to Threat Advisory Feed ❯
            </DemoButton>
            <a href="#research-catalog" className="btn btn-secondary">
              Browse CVE Disclosures
            </a>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section id="research-catalog" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-surface)', padding: '1.75rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'var(--accent-crimson)' : 'var(--bg-dark-elevated)',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                    border: `1px solid ${selectedCategory === cat ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search CVEs, zero-days, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'var(--bg-dark-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                padding: '0.45rem 0.95rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                minWidth: '260px',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </section>

      {/* Research Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.12)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                      {item.cve}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: item.cvss.includes('CRITICAL') ? '#ef4444' : 'var(--accent-emerald)', fontWeight: 700 }}>
                      {item.cvss}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0 0 0.65rem', lineHeight: 1.4, fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {item.summary}
                  </p>

                  <div style={{ borderLeft: '2px solid var(--accent-crimson)', paddingLeft: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>KEY RESEARCH HIGHLIGHT:</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{item.highlights[0]}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {item.tags.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--bg-dark-surface)', border: '1px solid var(--border-subtle)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <span>{item.date} • {item.readTime}</span>
                  <DemoButton className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}>
                    Read Disclosure ❯
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
