'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// Tactile Cyber Audio Synthesizer (Zero external assets, 100% native Web Audio API)
function playTactileSound(type = 'click') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'deploy') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'contain') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'shred') {
      // Laser disintegration sizzle
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(980, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(320, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch {}
}

export default function ZisoftCommandCenter() {
  const [activeMode, setActiveMode] = useState('redblue'); // 'redblue', 'heatmap', 'inbox', 'compliance'

  // Red vs Blue Dual-Cockpit State
  const [combatPerspective, setCombatPerspective] = useState('red'); // 'red' (Adversary Forge) | 'blue' (ReflexAware SOC)
  const [selectedVector, setSelectedVector] = useState('aitm');
  const [targetRole, setTargetRole] = useState('cfo');
  const [forgeDifficulty, setForgeDifficulty] = useState(4);
  const [attackPhase, setAttackPhase] = useState('idle'); // 'idle' | 'launched' | 'intercepted' | 'contained'
  const [containmentMs, setContainmentMs] = useState(820);
  const [liveLog, setLiveLog] = useState([]);

  // Heatmap State
  const [selectedDept, setSelectedDept] = useState('exec');
  const [nudgedDepts, setNudgedDepts] = useState({});

  // 1-Click Inbox Shredder State
  const [inboxStatus, setInboxStatus] = useState('idle'); // 'idle' | 'shredding' | 'quarantined'
  const [shredProgress, setShredProgress] = useState(0);

  // Departments Database
  const departments = {
    exec: {
      name: 'Executive Leadership (C-Suite & Board)',
      risk: 38.7,
      riskLevel: 'Elevated Risk',
      accent: 'var(--accent-crimson)',
      topThreat: 'AI Deepfake Voice Notes & Whaling Wire Diverts',
      headcount: 24,
      repeatClickers: 3,
      avgTimeToReport: '18.4 mins',
      vulnerabilities: [
        { vector: 'Executive Audio Deepfake (WhatsApp Memo)', susceptibility: '42%' },
        { vector: 'Board Portal Credential Harvesting', susceptibility: '36%' },
        { vector: 'Personal Gmail Divert Spearphish', susceptibility: '38%' },
      ],
      recommendedNudge: 'Targeted C-Suite Executive Whaling Defense Micro-Briefing (3 mins)',
    },
    finance: {
      name: 'Finance & Accounting',
      risk: 24.1,
      riskLevel: 'Medium Risk',
      accent: 'var(--accent-amber)',
      topThreat: 'Vendor Bank Account Update & Fraudulent Invoicing',
      headcount: 85,
      repeatClickers: 5,
      avgTimeToReport: '6.2 mins',
      vulnerabilities: [
        { vector: 'Spoofed Supplier Invoice Wire Divert', susceptibility: '28%' },
        { vector: 'Urgent Audit Tax Form Request', susceptibility: '22%' },
        { vector: 'Corporate Card Expiry Phish', susceptibility: '19%' },
      ],
      recommendedNudge: 'Vendor Account Change Verification Protocol Simulation',
    },
    devops: {
      name: 'DevOps & Cloud Engineering',
      risk: 4.2,
      riskLevel: 'Resilient',
      accent: 'var(--accent-emerald)',
      topThreat: 'GitHub Token Harvesting & Malicious PyPI Packages',
      headcount: 140,
      repeatClickers: 1,
      avgTimeToReport: '1.2 mins',
      vulnerabilities: [
        { vector: 'OAuth Device Code Authorization Abuse', susceptibility: '5%' },
        { vector: 'Fake AWS IAM Credential Revocation Notice', susceptibility: '4%' },
        { vector: 'Compromised Dependency PR Review', susceptibility: '3%' },
      ],
      recommendedNudge: 'Advanced AiTM Token Session Replay Defense Module',
    },
    hr: {
      name: 'Human Resources & Talent Acquisition',
      risk: 12.8,
      riskLevel: 'Low Risk',
      accent: 'var(--accent-cyan)',
      topThreat: 'Weaponized Resume PDFs & LinkedIn Spearphishing',
      headcount: 45,
      repeatClickers: 2,
      avgTimeToReport: '3.8 mins',
      vulnerabilities: [
        { vector: 'Macro-Enabled Candidate Portfolio (.docx)', susceptibility: '14%' },
        { vector: 'Fake Recruiter Message with Trojan Lure', susceptibility: '11%' },
        { vector: 'Healthcare Benefits Open Enrollment Notice', susceptibility: '13%' },
      ],
      recommendedNudge: 'Zero-Trust Resume File Inspection & Sandbox Drills',
    },
  };

  const currentDept = departments[selectedDept];

  // Vectors Database
  const vectors = {
    aitm: {
      name: 'Reverse-Proxy AiTM Session Hijacker',
      mitre: 'T1539 (Steal Web Session Cookie) / T1566.002',
      badge: 'FIDO2 / MFA Evasion',
      accent: 'var(--accent-crimson)',
      evasion: '98.9%',
      payloadSnippet: `POST /login/oauth2/proxy HTTP/1.1\nHost: d0cusign-verify.net\nX-AiTM-Target: https://login.microsoftonline.com\nX-Session-Cookie: ESTSAUTH=0.AX... [INTERCEPTED]`,
      defenseAction: 'ReflexAware Okta/Entra ID Revoke-Session API Detonated',
    },
    quishing: {
      name: 'Dynamic QR Code Quishing Lure',
      mitre: 'T1566.003 (Phishing via QR Code)',
      badge: 'Out-of-Band Mobile Bypass',
      accent: 'var(--accent-cyan)',
      evasion: '96.4%',
      payloadSnippet: `Content-Type: image/png; high_entropy=true\nPayload: Base64 QR Matrix pointing to: https://mfa-verify.top/auth\nVector: Bypasses desktop browser isolation & email secure gateways`,
      defenseAction: 'Mobile MDM URL Shield Sinkhole + Active Directory Token Lock',
    },
    deepfake: {
      name: 'Generative AI Executive Voice Note',
      mitre: 'T1598.003 (Phishing for Information: Voice)',
      badge: 'Neural Audio Synthesis',
      accent: 'var(--accent-purple)',
      evasion: '99.2%',
      payloadSnippet: `Audio Codec: OPUS 24kHz (Neural voice cloned from CEO earnings call)\nLure: Emergency $1.42M M&A Escrow Wire Transfer confirmation via WhatsApp\nUrgency: "Call back impossible, on board flight to Zurich"`,
      defenseAction: 'Dual-Signoff Treasury Protocol Enforcement + Automated VOCAL Hash Check',
    },
    oauth: {
      name: 'OAuth 2.0 Device Code Authorization Abuse',
      mitre: 'T1528 (Steal Application Access Token)',
      badge: 'Cloud Token Harvest',
      accent: 'var(--accent-amber)',
      evasion: '94.8%',
      payloadSnippet: `Target: Microsoft 365 Graph API Device Authorization\nUser Code: B89-XTR-102\nRequested Scopes: Mail.ReadWrite, Files.ReadWrite.All, User.Read`,
      defenseAction: 'Conditional Access Policy Auto-Isolation + Continuous Access Evaluation (CAE) Revocation',
    },
  };

  const currentVector = vectors[selectedVector];

  // Handle Red Team Attack Launch
  const launchAttack = () => {
    playTactileSound('deploy');
    setAttackPhase('launched');
    setLiveLog([
      `[${new Date().toLocaleTimeString()}] ADVERSARY FORGE: Synthesizing ${currentVector.name}...`,
      `[${new Date().toLocaleTimeString()}] INGRESS: Target ${targetRole.toUpperCase()} lured via ${currentVector.mitre}`,
      `[${new Date().toLocaleTimeString()}] EVASION: Gateway evasion probability ${currentVector.evasion}`,
    ]);

    setTimeout(() => {
      setAttackPhase('intercepted');
      setLiveLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] SENSOR HIT: Employee triggered 1-Click ZiSoft Add-In report`,
        `[${new Date().toLocaleTimeString()}] SOAR DETONATION: ReflexAware 360 webhook dispatched`,
      ]);
    }, 900);

    setTimeout(() => {
      playTactileSound('contain');
      setAttackPhase('contained');
      setContainmentMs(Math.floor(Math.random() * 220) + 720); // 720ms - 940ms
      setLiveLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] CONTAINED: ${currentVector.defenseAction}`,
        `[${new Date().toLocaleTimeString()}] SLA VERDICT: Neutralized in under 1.0s. Incident logged to Splunk & Sentinel.`,
      ]);
    }, 1800);
  };

  // 1-Click Inbox Shredder Action
  const handleInboxReport = () => {
    playTactileSound('shred');
    setInboxStatus('shredding');
    let step = 0;
    const interval = setInterval(() => {
      step += 10;
      setShredProgress(step);
      if (step >= 100) {
        clearInterval(interval);
        setInboxStatus('quarantined');
        playTactileSound('contain');
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#10b981', '#06b6d4', '#e11d48'],
          });
        } catch {}
      }
    }, 45);
  };

  const resetInbox = () => {
    playTactileSound('click');
    setInboxStatus('idle');
    setShredProgress(0);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2.5rem',
        background: 'var(--bg-dark-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Top Cockpit Operating Mode Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span className="telemetry-live-dot" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-emerald)',
                fontWeight: 700,
              }}
            >
              ZISOFT AI WORKBENCH // TACTICAL SIMULATION ENGINE
            </span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Autonomous Human Threat Intelligence Workbench
          </h2>
        </div>

        {/* Operating Mode Buttons */}
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '4px',
            gap: '4px',
            flexWrap: 'wrap',
          }}
        >
          {[
            {
              id: 'redblue',
              label: 'Dual-Cockpit Matrix',
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
              ),
            },
            {
              id: 'heatmap',
              label: 'Risk Heatmap',
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              ),
            },
            {
              id: 'inbox',
              label: '1-Click Inbox Shredder',
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              ),
            },
            {
              id: 'compliance',
              label: 'Audit Crosswalk',
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="m9 15 2 2 4-4" />
                </svg>
              ),
            },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                playTactileSound('click');
                setActiveMode(mode.id);
              }}
              style={{
                background: activeMode === mode.id ? 'var(--accent-crimson)' : 'transparent',
                color: activeMode === mode.id ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'var(--font-mono)',
                boxShadow: activeMode === mode.id ? '0 2px 10px rgba(225, 29, 72, 0.4)' : 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MODE 1: DUAL-COCKPIT MATRIX (RED TEAM FORGE VS BLUE TEAM REFLEX)
          ========================================================================= */}
      {activeMode === 'redblue' && (
        <div>
          {/* Sub-perspective selector: Red Team vs Blue Team */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-dark-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '0.85rem 1.25rem',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                OPERATIONAL PERSPECTIVE:
              </span>
              <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    playTactileSound('click');
                    setCombatPerspective('red');
                  }}
                  style={{
                    background: combatPerspective === 'red' ? 'rgba(225, 29, 72, 0.18)' : 'transparent',
                    border: `1px solid ${combatPerspective === 'red' ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                    color: combatPerspective === 'red' ? 'var(--accent-crimson)' : 'var(--text-muted)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-crimson)', boxShadow: '0 0 6px var(--accent-crimson)', display: 'inline-block' }} />
                  <span>RED TEAM: Adversary Emulation Forge</span>
                </button>
                <button
                  onClick={() => {
                    playTactileSound('click');
                    setCombatPerspective('blue');
                  }}
                  style={{
                    background: combatPerspective === 'blue' ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                    border: `1px solid ${combatPerspective === 'blue' ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                    color: combatPerspective === 'blue' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 6px var(--accent-emerald)', display: 'inline-block' }} />
                  <span>BLUE TEAM: ReflexAware SOAR Autopilot</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)' }}>MITRE ATT&CK:</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{currentVector.mitre}</span>
            </div>
          </div>

          {/* Dual-Column Interactive Arena */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.25fr)', gap: '2rem', alignItems: 'start' }}>
            {/* Left Column: Offensive Controls */}
            <div>
              <div style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                1. Select Advanced Threat Vector:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
                {Object.entries(vectors).map(([key, vec]) => {
                  const isSel = selectedVector === key;
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        playTactileSound('click');
                        setSelectedVector(key);
                        setAttackPhase('idle');
                      }}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '8px',
                        background: isSel ? 'rgba(255, 255, 255, 0.06)' : 'var(--bg-dark-elevated)',
                        border: `1px solid ${isSel ? vec.accent : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        boxShadow: isSel ? `0 4px 14px ${vec.accent}20` : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isSel ? vec.accent : 'var(--text-primary)' }}>
                          {vec.name.split(' ')[0]} {vec.name.split(' ')[1]}
                        </span>
                        <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: vec.accent, padding: '0.1rem 0.4rem', borderRadius: '4px', background: `${vec.accent}15` }}>
                          {vec.evasion} Evasion
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                        {vec.badge}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Target Persona Selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span>2. TARGET PROFILE:</span>
                  <span style={{ color: 'var(--accent-crimson)', fontWeight: 700 }}>HIGH-VALUE CREDENTIAL</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'cfo', label: 'Chief Financial Officer', dept: 'Finance' },
                    { id: 'devops', label: 'Lead SRE Engineer', dept: 'Infrastructure' },
                    { id: 'hr', label: 'VP People Operations', dept: 'Human Resources' },
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        playTactileSound('click');
                        setTargetRole(role.id);
                        setAttackPhase('idle');
                      }}
                      style={{
                        padding: '0.6rem 0.5rem',
                        borderRadius: '6px',
                        background: targetRole === role.id ? 'var(--bg-dark-surface)' : 'var(--bg-dark-elevated)',
                        border: `1px solid ${targetRole === role.id ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                        color: targetRole === role.id ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adversary Difficulty Slider */}
              <div style={{ marginBottom: '1.5rem', background: 'var(--bg-dark-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', marginBottom: '0.45rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>ADVERSARY DIFFICULTY TIER:</span>
                  <span style={{ color: 'var(--accent-crimson)', fontWeight: 700 }}>
                    Tier {forgeDifficulty}/5 (Nation-State APT)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={forgeDifficulty}
                  onChange={(e) => {
                    setForgeDifficulty(parseInt(e.target.value));
                    setAttackPhase('idle');
                  }}
                  style={{ width: '100%', accentColor: 'var(--accent-crimson)' }}
                />
              </div>

              {/* Master Detonate / Simulate Button */}
              <button
                onClick={launchAttack}
                disabled={attackPhase === 'launched' || attackPhase === 'intercepted'}
                style={{
                  width: '100%',
                  background:
                    attackPhase === 'contained'
                      ? 'var(--accent-emerald)'
                      : attackPhase === 'launched' || attackPhase === 'intercepted'
                      ? 'rgba(225, 29, 72, 0.4)'
                      : 'var(--accent-crimson)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  cursor: attackPhase === 'launched' || attackPhase === 'intercepted' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 18px rgba(225, 29, 72, 0.35)',
                }}
              >
                {attackPhase === 'idle' && (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
                    </svg>
                    <span>LAUNCH ADVERSARY SIMULATION ATTACK</span>
                  </>
                )}
                {attackPhase === 'launched' && <span>TRANSMITTING INGRESS LURE TO ENDPOINT...</span>}
                {attackPhase === 'intercepted' && <span>REFLEXAWARE SOAR INTERCEPT DETONATING...</span>}
                {attackPhase === 'contained' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>ATTACK NEUTRALIZED IN {containmentMs}ms (CLICK TO RETEST)</span>
                  </span>
                )}
              </button>
            </div>

            {/* Right Column: Dynamic MITRE Attack Path & Forensic Console */}
            <div
              style={{
                background: '#07090e',
                borderRadius: '12px',
                border: '1px solid var(--border-medium)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.75rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-cyan)' }}>
                  <span className="hero-pill-status" />
                  <span>REFLEXAWARE SOAR RUNTIME // LIVE TELEMETRY</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: attackPhase === 'contained' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                  SLA: {attackPhase === 'contained' ? `< ${containmentMs}ms` : '< 1.5s Guaranteed'}
                </div>
              </div>

              {/* Interactive MITRE Attack Path Visualizer */}
              <div
                style={{
                  padding: '1.25rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(7, 9, 14, 0.6)',
                }}
              >
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Interactive MITRE Attack Path Topology:
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  {[
                    { step: '1. INGRESS', code: 'T1566.002', name: 'Spearphishing Link', status: attackPhase !== 'idle' ? 'red' : 'dim' },
                    { step: '2. EXECUTION', code: 'T1204', name: 'User Interaction', status: attackPhase === 'intercepted' || attackPhase === 'contained' ? 'amber' : 'dim' },
                    { step: '3. INTERCEPT', code: 'T1539', name: 'AiTM Proxy Catch', status: attackPhase === 'contained' ? 'severed' : 'dim' },
                    { step: '4. CONTAINMENT', code: 'REFLEX-360', name: 'Session Token Flush', status: attackPhase === 'contained' ? 'emerald' : 'dim' },
                  ].map((node, i) => (
                    <div
                      key={i}
                      style={{
                        zIndex: 2,
                        textAlign: 'center',
                        background:
                          node.status === 'severed'
                            ? 'rgba(225, 29, 72, 0.15)'
                            : node.status === 'emerald'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : node.status === 'red'
                            ? 'rgba(239, 68, 68, 0.15)'
                            : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${
                          node.status === 'severed'
                            ? 'var(--accent-crimson)'
                            : node.status === 'emerald'
                            ? 'var(--accent-emerald)'
                            : node.status === 'red'
                            ? '#ef4444'
                            : 'rgba(255, 255, 255, 0.1)'
                        }`,
                        borderRadius: '8px',
                        padding: '0.5rem 0.65rem',
                        minWidth: '85px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{node.step}</div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f8fafc', margin: '0.1rem 0' }}>{node.code}</div>
                      <div
                        style={{
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-mono)',
                          color:
                            node.status === 'severed'
                              ? 'var(--accent-crimson)'
                              : node.status === 'emerald'
                              ? 'var(--accent-emerald)'
                              : 'var(--text-muted)',
                        }}
                      >
                        {node.status === 'severed' ? 'SEVERED' : node.status === 'emerald' ? 'QUARANTINED' : node.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Terminal Hex & Webhook Stream */}
              <div style={{ padding: '1.25rem', flex: 1, minHeight: '190px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', lineHeight: 1.6 }}>
                <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>// ATTACK PAYLOAD FORENSICS & LIVE EVENT PIPELINE</div>
                <pre style={{ margin: 0, color: '#94a3b8', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {currentVector.payloadSnippet}
                </pre>

                {liveLog.length > 0 && (
                  <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                    {liveLog.map((log, idx) => (
                      <div
                        key={idx}
                        style={{
                          color: idx === liveLog.length - 1 ? 'var(--accent-emerald)' : '#cbd5e1',
                          fontWeight: idx === liveLog.length - 1 ? 700 : 400,
                        }}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 2: DEPARTMENTAL RISK HEATMAP
          ========================================================================= */}
      {activeMode === 'heatmap' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)', gap: '2rem', alignItems: 'stretch' }}>
          {/* Department List & Score Selector */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hero-pill-status" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-emerald)' }}>
                Live Behavioral Telemetry Matrix
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.75rem' }}>
              Departmental Human Risk Matrix
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Select any business unit below to inspect vulnerability profiles, repeat clicker dwell times, and deploy targeted automated micro-interventions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(departments).map(([key, dept]) => {
                const isSelected = selectedDept === key;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      playTactileSound('click');
                      setSelectedDept(key);
                    }}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--bg-dark-elevated)' : 'var(--bg-dark-surface)',
                      border: `1px solid ${isSelected ? dept.accent : 'var(--border-subtle)'}`,
                      borderLeft: `4px solid ${dept.accent}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? `0 4px 15px ${dept.accent}15` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{dept.name.split('(')[0]}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: dept.accent }}>
                        {dept.risk}% ({dept.riskLevel})
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div style={{ height: '6px', background: 'var(--border-medium)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${dept.risk}%`,
                          height: '100%',
                          background: dept.accent,
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drilldown Panel for Selected Department */}
          <div
            style={{
              background: 'var(--bg-dark-elevated)',
              borderRadius: '12px',
              border: `1px solid ${currentDept.accent}40`,
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: currentDept.accent, textTransform: 'uppercase' }}>
                  FORENSIC DRILLDOWN
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0 0' }}>
                  {currentDept.name}
                </h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SUSCEPTIBILITY</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: currentDept.accent, fontFamily: 'var(--font-mono)' }}>
                  {currentDept.risk}%
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--bg-dark-surface)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>HEADCOUNT</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{currentDept.headcount}</div>
              </div>
              <div style={{ background: 'var(--bg-dark-surface)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>REPEAT CLICKERS</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: currentDept.repeatClickers > 2 ? 'var(--accent-crimson)' : 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {currentDept.repeatClickers} Users
                </div>
              </div>
              <div style={{ background: 'var(--bg-dark-surface)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>AVG TIME TO REPORT</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>{currentDept.avgTimeToReport}</div>
              </div>
            </div>

            {/* Primary Vulnerability Vectors */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Primary Vulnerability Vectors:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentDept.vulnerabilities.map((v, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-dark-surface)', padding: '0.5rem 0.75rem', borderRadius: '5px', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{v.vector}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: currentDept.accent }}>{v.susceptibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Box */}
            <div style={{ marginTop: 'auto', background: 'var(--bg-dark-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Automated Remediation Recommendation:
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                {currentDept.recommendedNudge}
              </div>
              <button
                onClick={() => {
                  playTactileSound('contain');
                  setNudgedDepts((prev) => ({ ...prev, [selectedDept]: true }));
                }}
                style={{
                  width: '100%',
                  background: nudgedDepts[selectedDept] ? 'var(--accent-emerald)' : currentDept.accent,
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {nudgedDepts[selectedDept] ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Automated Micro-Intervention Queued</span>
                  </span>
                ) : (
                  'Trigger Automated Micro-Intervention Nudge'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 3: 1-CLICK INBOX SHREDDER (NATIVE CLIENT PARTICLES)
          ========================================================================= */}
      {activeMode === 'inbox' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)', gap: '2rem', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-purple)' }}>
                Native Client Experience
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.75rem' }}>
              Interactive 1-Click Inbox Shredder
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Employees click the ZINAD add-in button directly in Outlook or Gmail. Experience the instant quarantine flow below: click &apos;Report Phish with ZiSoft&apos; and watch the attack dissolve under our automated SOAR pipeline.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { title: 'Sub-Second Quarantine SLA', desc: 'Message removed from all enterprise inboxes in <1.5s via Microsoft Graph API.' },
                { title: 'Automated Header Triaging', desc: 'SPF, DKIM, DMARC, and homoglyph Punycode verified autonomously.' },
                { title: 'Positive Reinforcement Loops', desc: 'Points awarded to employee Security Champion profile instantly.' },
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item.title}</span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {inboxStatus === 'quarantined' && (
              <button
                onClick={resetInbox}
                style={{
                  background: 'var(--bg-dark-surface)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid var(--accent-cyan)',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Reset &amp; Test Another Incoming Phish</span>
              </button>
            )}
          </div>

          {/* Interactive Outlook 365 Client Frame */}
          <div
            style={{
              background: 'var(--bg-dark-elevated)',
              borderRadius: '12px',
              border: '1px solid var(--border-medium)',
              overflow: 'hidden',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
            }}
          >
            {/* Outlook Window Bar */}
            <div
              style={{
                background: 'var(--bg-dark-surface)',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                Microsoft Outlook 365 Enterprise • Incoming Message
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>
                ● ZINAD ADD-IN V3.8 ACTIVE
              </span>
            </div>

            {/* Outlook Ribbon Toolbar */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '0.65rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <button
                onClick={handleInboxReport}
                disabled={inboxStatus !== 'idle'}
                style={{
                  background: inboxStatus === 'quarantined' ? 'var(--accent-emerald)' : 'rgba(225, 29, 72, 0.15)',
                  border: `1px solid ${inboxStatus === 'quarantined' ? 'var(--accent-emerald)' : 'var(--accent-crimson)'}`,
                  color: inboxStatus === 'quarantined' ? '#ffffff' : 'var(--accent-crimson)',
                  padding: '0.45rem 1rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: inboxStatus === 'idle' ? 'pointer' : 'default',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s ease',
                  boxShadow: inboxStatus === 'idle' ? '0 0 12px rgba(225, 29, 72, 0.3)' : 'none',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {inboxStatus === 'idle' && 'Report Phish with ZiSoft'}
                {inboxStatus === 'shredding' && `Quarantining (${shredProgress}%)...`}
                {inboxStatus === 'quarantined' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Quarantined &amp; Reported</span>
                  </span>
                )}
              </button>

              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Reply</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Forward</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Archive</span>
            </div>

            {/* Email Body with Disintegration Laser Animation */}
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-dark-surface)',
                position: 'relative',
                minHeight: '220px',
                transition: 'opacity 0.4s ease',
                opacity: inboxStatus === 'shredding' ? 0.3 : 1,
              }}
            >
              {inboxStatus !== 'quarantined' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                      URGENT: Re-confirm Bank Routing Details for Pending Wire Transfer
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Today, 09:41 AM</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    From: <strong style={{ color: 'var(--accent-crimson)' }}>corporate-wire-security@d0cusign-verify.net</strong> &lt;bounce@d0cusign-verify.net&gt;
                  </div>

                  <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Dear Accounting Team,
                    <br /><br />
                    An outbound wire of $482,900.00 to Global Freight Logistics was held pending compliance re-authentication. Please review and execute the authorization document immediately below:
                  </div>

                  <div
                    style={{
                      display: 'inline-block',
                      background: 'rgba(225, 29, 72, 0.1)',
                      border: '1px dashed var(--accent-crimson)',
                      color: 'var(--accent-crimson)',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Review &amp; Authorize Wire Transfer Document (d0cusign-verify.net) ❯
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid var(--accent-emerald)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0 0 0.5rem' }}>
                    Threat Neutralized in 820ms!
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                    Outstanding catch! You identified a weaponized homoglyph domain (<code style={{ color: 'var(--accent-crimson)' }}>d0cusign-verify.net</code>). The message has been quarantined enterprise-wide and the sender IP has been blocked at the perimeter.
                  </p>
                  <div style={{ display: 'inline-flex', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
                    <span style={{ color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      +100 Security Champion Points
                    </span>
                    <span style={{ color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      SOC Ticket #ZT-8891 Auto-Resolved
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 4: AUDIT COMPLIANCE CROSSWALK
          ========================================================================= */}
      {activeMode === 'compliance' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)', gap: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-amber)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-amber)' }}>
                Regulatory Compliance Engine
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.75rem' }}>
              Global Audit &amp; Compliance Crosswalk
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              ZiSoft autonomously translates every phishing simulation, employee drill, and SOAR event into verifiable compliance evidence mapped directly to global and regional regulatory standards.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { framework: 'NIST CSF 2.0 (PR.AT)', title: 'Awareness and Training Category', status: '100% COVERED', desc: 'Simulated phishing drills conducted on 30-day continuous randomized cycles with verifiable reporting audit logs.' },
                { framework: 'ISO/IEC 27001:2022 (A.7.2.2)', title: 'Information Security Awareness', status: '100% COVERED', desc: 'Continuous education and regular updates on organizational policies, social engineering tactics, and reporting procedures.' },
                { framework: 'Saudi NCA ECC-1:2018', title: 'Cybersecurity Awareness (Section 2-4)', status: 'NCA COMPLIANT', desc: 'Meets Saudi National Cybersecurity Authority mandate for periodic simulated phishing assessments and measurable risk reduction.' },
                { framework: 'SAMA Cybersecurity Framework', title: 'Financial Sector Human Defense', status: 'SAMA VALIDATED', desc: 'Custom tailored executive whaling drills for corporate treasury and accounting staff mandated under banking circulars.' },
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{item.framework}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Certificate Generator Preview */}
          <div
            style={{
              background: '#07090e',
              borderRadius: '12px',
              border: '1px solid var(--border-medium)',
              padding: '1.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ color: 'var(--accent-amber)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>// AUTONOMOUS AUDITOR-READY ATTESTATION</span>
              <span>SHA-256 VERIFIED</span>
            </div>

            <pre style={{ margin: 0, color: '#e2e8f0', lineHeight: 1.6, overflowX: 'auto', flex: 1 }}>
{`AUDIT_PACKAGE_ID: "ZINAD-AUDIT-2026-Q3-9912"
ORGANIZATION: "Global Enterprise Financial Services"
ASSESSMENT_WINDOW: "Continuous 365-Day Cycle"
TOTAL_SIMULATED_ATTACKS: 48,210
AVERAGE_TIME_TO_REPORT: 2.14 Minutes
PHISH_PRONE_REDUCTION: 78.4% Baseline Improvement

FRAMEWORK_ALIGNMENTS:
[VERIFIED] NIST CSF 2.0 (PR.AT-01 through PR.AT-05)
[VERIFIED] ISO/IEC 27001:2022 Control 7.2.2
[VERIFIED] Saudi NCA ECC-1:2018 (Section 2-4)
[VERIFIED] SAMA Cyber Defense Standard v3.1

CRYPTOGRAPHIC_HASH:
8f9e4a2d7b1c3e5f6a8b0c2d4e6f8a0b
1c3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a`}
            </pre>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => {
                  playTactileSound('click');
                  alert('Audit package generated! Includes full timestamped CSV telemetry logs and executive summary PDF.');
                }}
                style={{
                  width: '100%',
                  background: 'var(--accent-amber)',
                  color: '#07090e',
                  border: 'none',
                  padding: '0.7rem',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Export Auditor-Ready Evidence Package (PDF / JSON)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
