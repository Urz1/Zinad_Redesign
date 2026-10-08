'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const SCENARIOS = [
  {
    id: 'homoglyph',
    badge: 'HOMOGLYPH & AiTM',
    deviceType: 'desktop',
    title: 'Executive Stock Grant (DocuSign Lookalike)',
    fromDisplay: 'DocuSign Signature Service',
    fromEmail: 'bounce@d0cusign-verify.net',
    fromDomain: 'd0cusign-verify.net',
    toEmail: 'sarah.jenkins@enterprise-financial.com',
    subject: 'ACTION REQUIRED: Q3 Executive Stock Grant Confirmation',
    urgencyText: 'within 2 business hours',
    urgencyAnalysis: 'Cialdini Urgency & Scarcity trigger: Imposes artificial micro-deadlines (<2 hours) to provoke panic and bypass cognitive scrutiny.',
    homoglyphAnalysis: {
      display: 'd0cusign-verify.net',
      char: '0 (ASCII 0x30 / DIGIT ZERO) vs genuine o (ASCII 0x6F)',
      brand: 'DocuSign Inc.',
      verdict: 'High-Confidence Punycode Homoglyph',
    },
    actionLabel: 'Review & Sign Document ❯',
    documentId: 'DOC-SEC-98214-EXEC',
    exploitTitle: 'Adversary-in-the-Middle (AiTM) Proxy',
    exploitDescription: 'Directs the victim through EvilProxy or Modlishka reverse proxy, capturing active session cookies and defeating FIDO2 MFA tokens.',
    exploitTarget: 'https://d0cusign-verify.net/oauth/authorize',
    payloadName: 'EvilProxy Session Hijacker v3.4',
    headers: [
      '// RFC 5322 Network Header Forensics:',
      'Received: from mail-relay.botnet-node.ru (185.220.101.44)',
      'Authentication-Results: dkim=fail; spf=SoftFail (IP 185.220.101.44 mismatch)',
      'X-Mailer: Python/AsyncIO Exploitation Kit v4.2',
      'Return-Path: <bounce@d0cusign-verify.net>',
      'X-ZiSoft-Risk-Index: 0.94 (CRITICAL RISK)',
    ],
    ioc: {
      senderIp: '185.220.101.44 (AS9009 M247 Ltd)',
      domain: 'd0cusign-verify.net',
      vector: 'AiTM OAuth Session Hijack',
      containment: 'Global DNS Sinkhole + EDR Token Revocation',
    },
  },
  {
    id: 'quishing',
    badge: 'QR CODE QUISHING',
    deviceType: 'mobile',
    title: 'Microsoft 365 MFA Re-Authentication Required',
    fromDisplay: 'Microsoft Identity Governance',
    fromEmail: 'noreply@microsoft-auth-2fa.top',
    fromDomain: 'microsoft-auth-2fa.top',
    toEmail: 'marcus.vance@enterprise-financial.com',
    subject: 'URGENT: Corporate Microsoft Authenticator Token Expired',
    urgencyText: 'before 12:00 PM today to avoid workstation lock',
    urgencyAnalysis: 'Administrative Coercion lure: Threatens IT lockout to force mobile camera scanning outside corporate secure email gateways.',
    homoglyphAnalysis: {
      display: 'microsoft-auth-2fa.top',
      char: 'Top-Level Domain (.top) registered 14 hours ago in Seychelles',
      brand: 'Microsoft Corporation',
      verdict: 'Brand Impersonation & Malicious Redirector',
    },
    actionLabel: 'Scan QR with Corporate Mobile ❯',
    documentId: 'MSFT-MFA-TOKEN-88310',
    isQr: true,
    exploitTitle: 'Out-of-Band Quishing Credential Phish',
    exploitDescription: 'By forcing users to scan a QR code with their mobile phone, the attacker bypasses corporate endpoint browser isolation and secure email gateways.',
    exploitTarget: 'https://microsoft-auth-2fa.top/login/oauth2',
    payloadName: 'QuishForge Mobile Harvester v2.1',
    headers: [
      '// RFC 5322 Network Header Forensics:',
      'Received: from edge-relays.cloud-vps.sg (103.145.13.88)',
      'Authentication-Results: dkim=none; spf=Neutral (IP unverified)',
      'X-Image-Payload: Embedded Base64 PNG with high entropy QR matrix',
      'Return-Path: <sec-ops@microsoft-auth-2fa.top>',
      'X-ZiSoft-Risk-Index: 0.91 (HIGH CRITICALITY)',
    ],
    ioc: {
      senderIp: '103.145.13.88 (Singapore Cloud Node)',
      domain: 'microsoft-auth-2fa.top',
      vector: 'Quishing QR Mobile Bypass',
      containment: 'Mobile MDM URL Shield + Active Directory Lock',
    },
  },
  {
    id: 'vishing',
    badge: 'AI VOICE VISHING',
    deviceType: 'mobile',
    title: 'Encrypted Voice Note: Urgent Wire Transfer (CEO Direct)',
    fromDisplay: 'David Vance (CEO Office)',
    fromEmail: 'ceo-vance@whatsapp-enterprise.sec',
    fromDomain: 'whatsapp-call-relay.net',
    toEmail: 'treasury-desk@enterprise-financial.com',
    subject: 'INCOMING CALL / AUDIO MEMO: M&A Project Falcon Wire Authorization',
    urgencyText: 'immediate release required prior to foreign bank closing in 15 mins',
    urgencyAnalysis: 'Authority & Executive Intimidation lure: Uses executive synthetic voice clone and artificial M&A secrecy to prevent vocal callback verification.',
    homoglyphAnalysis: {
      display: 'whatsapp-call-relay.net',
      char: 'Spoofed VoIP SIP Trunk from bulletproof host',
      brand: 'WhatsApp Enterprise VoIP',
      verdict: 'Synthetic Audio Deepfake Vector',
    },
    actionLabel: 'Play Voice Note (0:24) ❯',
    documentId: 'AUDIO-MEMO-EXEC-0941',
    isAudio: true,
    exploitTitle: 'Neural Voice Clone BEC Wire Fraud',
    exploitDescription: 'Adversary cloned the CEO voice using 3 seconds of keynote speech to authorize a $1,420,000 SWIFT wire into offshore accounts.',
    exploitTarget: 'https://whatsapp-call-relay.net/audio/voip-memo-992.wav',
    payloadName: 'DeepVoice AI Neural Mimic v4',
    headers: [
      '// SIP / VoIP Session Forensics:',
      'Via: SIP/2.0/UDP 94.102.61.12:5060;branch=z9hG4bK882',
      'From: "David Vance" <sip:ceo@whatsapp-call-relay.net>',
      'Audio-Codec: Opus 48kHz (AI Neural Artifacts: 98.4% Confidence)',
      'X-ZiSoft-Risk-Index: 0.98 (CRITICAL BEC THREAT)',
    ],
    ioc: {
      senderIp: '94.102.61.12 (Offshore Bulletproof SIP)',
      domain: 'whatsapp-call-relay.net',
      vector: 'AI Voice Cloning BEC Wire Fraud',
      containment: 'Immediate SWIFT Wire Freeze + Dual-Factor Out-of-Band Call',
    },
  },
  {
    id: 'whaling',
    badge: 'EXECUTIVE WHALING',
    deviceType: 'desktop',
    title: 'Confidential M&A Escrow Authorization (CEO Direct)',
    fromDisplay: 'David Vance (CEO Office)',
    fromEmail: 'david.vance@internal-z1nad.co',
    fromDomain: 'internal-z1nad.co',
    toEmail: 'treasury-ops@enterprise-financial.com',
    subject: 'STRICTLY CONFIDENTIAL: Project Falcon Escrow Wire Transfer ($1.42M)',
    urgencyText: 'execute transfer wire prior to market opening today',
    urgencyAnalysis: 'Authority & Executive Intimidation lure: Uses executive name and confidential M&A secrecy to bypass internal audit protocols.',
    homoglyphAnalysis: {
      display: 'internal-z1nad.co',
      char: 'TLD mismatch (.co vs official .com / .net) registered via Namecheap privacy',
      brand: 'ZINAD Global Enterprise',
      verdict: 'Spear-Whaling Typosquatting',
    },
    actionLabel: 'Authorize Wire Release ($1,420,000) ❯',
    documentId: 'SWIFT-WIRE-AUTH-0994-CONF',
    exploitTitle: 'Business Email Compromise (BEC) Fraud',
    exploitDescription: 'Fraudulent SWIFT wire diversion into attacker-controlled offshore mule accounts with forged signature stamps.',
    exploitTarget: 'https://internal-z1nad.co/treasury/wire-release',
    payloadName: 'BEC SwiftWire Impersonation Chain',
    headers: [
      '// RFC 5322 Network Header Forensics:',
      'Received: from relay-pool.bulletproof-host.nl (94.102.61.12)',
      'Authentication-Results: dkim=fail; spf=Fail (Domain internal-z1nad.co not authorized)',
      'Reply-To: <external-offshore-escrow@gmail.com>',
      'Return-Path: <bounce@internal-z1nad.co>',
      'X-ZiSoft-Risk-Index: 0.97 (MAXIMUM FRAUD LEVEL)',
    ],
    ioc: {
      senderIp: '94.102.61.12 (Offshore Mule Relay)',
      domain: 'internal-z1nad.co',
      vector: 'Executive Whaling BEC Wire Fraud',
      containment: 'Immediate SWIFT Freeze + Out-of-Band Vocal Verification Call',
    },
  },
];

// Tactile Web Audio Synthesizer
function playSandboxAudio(freq1 = 440, freq2 = 880, duration = 0.12, type = 'sine') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq1, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration * 1.5);
  } catch { }
}

export default function PhishingSandbox() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('homoglyph');
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [showHeaders, setShowHeaders] = useState(false);
  const [showHomoglyphDetail, setShowHomoglyphDetail] = useState(false);
  const [showUrgencyDetail, setShowUrgencyDetail] = useState(false);
  const [showExploitModal, setShowExploitModal] = useState(false);
  const [isQuarantining, setIsQuarantining] = useState(false);
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [activeTab, setActiveTab] = useState('soar');
  const [discoveredClues, setDiscoveredClues] = useState(new Set());
  const [isCameraScanning, setIsCameraScanning] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const switchScenario = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    const scen = SCENARIOS.find((s) => s.id === scenarioId);
    if (scen) {
      setDeviceMode(scen.deviceType || 'desktop');
    }
    setIsQuarantined(false);
    setIsQuarantining(false);
    setShowHeaders(false);
    setShowHomoglyphDetail(false);
    setShowUrgencyDetail(false);
    setShowExploitModal(false);
    setIsCameraScanning(false);
    setIsPlayingAudio(false);
    setDiscoveredClues(new Set());
    playSandboxAudio(520, 680, 0.08);
  };

  const registerClue = (clueId) => {
    setDiscoveredClues((prev) => {
      const next = new Set(prev);
      next.add(clueId);
      return next;
    });
    playSandboxAudio(620, 840, 0.08);
  };

  const handleReport = () => {
    if (isQuarantining || isQuarantined) return;
    setIsQuarantining(true);
    setShowExploitModal(false);
    playSandboxAudio(440, 980, 0.2);

    // Cross-Component Event Dispatch: Trigger Hero Shield Mesh Deflection & Threat Globe Intercept
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('zinad-shield-deflect', {
          detail: { scenario: currentScenario.id, title: currentScenario.title }
        }));
        window.dispatchEvent(new CustomEvent('zinad-threat-intercept', {
          detail: { scenario: currentScenario.id, domain: currentScenario.fromDomain }
        }));
      }
    } catch { }

    setTimeout(() => {
      setIsQuarantining(false);
      setIsQuarantined(true);
      playSandboxAudio(880, 1320, 0.25);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#10b981', '#06b6d4', '#38bdf8', '#ffffff'],
        });
      } catch { }
    }, 1100);
  };

  const handleMaliciousClick = (e) => {
    e.preventDefault();
    registerClue('payload');
    setShowExploitModal(true);
    playSandboxAudio(320, 220, 0.2, 'sawtooth');
  };

  const resetSandbox = () => {
    setIsQuarantined(false);
    setIsQuarantining(false);
    setShowHeaders(false);
    setShowHomoglyphDetail(false);
    setShowUrgencyDetail(false);
    setShowExploitModal(false);
    setIsCameraScanning(false);
    setIsPlayingAudio(false);
    setDiscoveredClues(new Set());
    playSandboxAudio(520, 680, 0.1);
  };

  const toggleCameraScan = () => {
    setIsCameraScanning((prev) => !prev);
    registerClue('qr_camera');
    playSandboxAudio(600, 900, 0.1);
  };

  const toggleVoicePlayback = () => {
    setIsPlayingAudio((prev) => !prev);
    registerClue('voice_memo');
    playSandboxAudio(350, 480, 0.12, 'triangle');
  };

  const clueCount = discoveredClues.size;

  return (
    <section id="interactive-sandbox" className="section" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            Tactile Security Operations Sandbox
          </span>
          <h2 className="section-title">Experience the Human Sensor Detection Loop</h2>
          <p className="section-subtitle">
            Interact with live attack vectors across corporate workstation email, mobile QR quishing, and AI voice cloning. Unmask punycode spoofing and trigger sub-second automated SOAR containment synchronized with our global defense mesh.
          </p>
        </div>

        {/* Interactive Scenario Selector Tabs + Device Chassis Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {/* Vector Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {SCENARIOS.map((scen, idx) => {
              const isSelected = scen.id === selectedScenarioId;
              return (
                <button
                  key={scen.id}
                  onClick={() => switchScenario(scen.id)}
                  style={{
                    background: isSelected ? 'var(--accent-cyan)' : 'var(--bg-dark-elevated)',
                    color: isSelected ? '#000000' : 'var(--text-secondary)',
                    border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 800 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.18s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(6, 182, 212, 0.3)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', opacity: isSelected ? 0.9 : 0.6, fontFamily: 'var(--font-mono)' }}>0{idx + 1}</span>
                  <span>{scen.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Device Chassis Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-dark-elevated)', padding: '0.25rem 0.4rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => { setDeviceMode('desktop'); playSandboxAudio(480, 560, 0.05); }}
              style={{
                background: deviceMode === 'desktop' ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                color: deviceMode === 'desktop' ? 'var(--text-primary)' : 'var(--text-muted)',
                padding: '0.3rem 0.65rem',
                borderRadius: '5px',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: deviceMode === 'desktop' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Workstation</span>
            </button>
            <button
              onClick={() => { setDeviceMode('mobile'); playSandboxAudio(560, 640, 0.05); }}
              style={{
                background: deviceMode === 'mobile' ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                color: deviceMode === 'mobile' ? 'var(--text-primary)' : 'var(--text-muted)',
                padding: '0.3rem 0.65rem',
                borderRadius: '5px',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: deviceMode === 'mobile' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span>Smartphone</span>
            </button>
          </div>
        </div>

        {/* Clue Tracker Banner */}
        <div
          style={{
            background: 'var(--bg-dark-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '0.65rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              FORENSIC INVESTIGATION PROGRESS:
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  style={{
                    width: '24px',
                    height: '6px',
                    borderRadius: '2px',
                    background: clueCount >= num ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.1)',
                    boxShadow: clueCount >= num ? '0 0 6px var(--accent-emerald)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: clueCount === 3 ? 'var(--accent-emerald)' : 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {clueCount}/3 CLUES UNCOVERED
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {clueCount === 0 && 'Inspect sender address, urgency lure, or payload.'}
              {clueCount === 1 && 'Good eye! Now check the cryptographic headers or links.'}
              {clueCount === 2 && 'Almost there! 1 more forensic artifact to discover.'}
              {clueCount >= 3 && 'Analysis complete! Ready to quarantine threat.'}
            </span>
            {clueCount > 0 && (
              <button
                onClick={resetSandbox}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  fontSize: '0.68rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* MAIN SANDBOX CHASSIS: DESKTOP vs SMARTPHONE */}
        <div
          className={deviceMode === 'mobile' ? 'sim-phishing-mobile-grid' : ''}
          style={{
            display: 'grid',
            gridTemplateColumns: deviceMode === 'mobile' ? undefined : '1fr',
            gap: '1.75rem',
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >

          {/* DEVICE CONTAINER */}
          {deviceMode === 'desktop' ? (
            /* DESKTOP WORKSTATION CHASSIS */
            <div
              className="glass-panel"
              style={{
                border: '1px solid var(--border-medium)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'var(--bg-dark-surface)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
            >
              {/* Window Title Bar */}
              <div
                style={{
                  background: 'var(--bg-dark-elevated)',
                  borderBottom: '1px solid var(--border-subtle)',
                  padding: '0.65rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                    Corporate Mailbox Client   {currentScenario.toEmail}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setShowHeaders(!showHeaders);
                      registerClue('headers');
                    }}
                    style={{
                      background: showHeaders ? 'var(--accent-cyan)' : 'var(--bg-dark-surface)',
                      color: showHeaders ? '#000000' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    {showHeaders ? 'Hide RFC 5322 Headers' : 'Inspect Raw Headers'}
                  </button>
                </div>
              </div>

              {/* RFC 5322 Header Drawer */}
              {showHeaders && (
                <div
                  style={{
                    background: '#07090e',
                    borderBottom: '1px solid var(--border-subtle)',
                    padding: '0.75rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                  }}
                >
                  {currentScenario.headers.map((h, i) => (
                    <div key={i} style={{ color: h.includes('mismatch') || h.includes('CRITICAL') ? 'var(--accent-crimson)' : '#94a3b8' }}>
                      {h}
                    </div>
                  ))}
                </div>
              )}

              {/* Message Header Strip */}
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 0.35rem', fontWeight: 700 }}>
                      {currentScenario.subject}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentScenario.fromDisplay}</span>
                      <span
                        onClick={() => {
                          setShowHomoglyphDetail(!showHomoglyphDetail);
                          registerClue('sender');
                        }}
                        style={{
                          color: 'var(--accent-crimson)',
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(225, 29, 72, 0.1)',
                          border: '1px solid rgba(225, 29, 72, 0.3)',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                        title="Click to analyze homoglyph lookalike"
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span>&lt;{currentScenario.fromEmail}&gt;</span>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Received: Today at 09:41 AM (UTC+3)
                  </span>
                </div>

                {/* Homoglyph Breakdown Flyout */}
                {showHomoglyphDetail && (
                  <div
                    style={{
                      background: 'rgba(225, 29, 72, 0.08)',
                      border: '1px solid var(--accent-crimson)',
                      borderRadius: '6px',
                      padding: '0.75rem 1rem',
                      marginTop: '0.75rem',
                      fontSize: '0.78rem',
                      animation: 'fadeIn 0.2s ease',
                    }}
                  >
                    <div style={{ color: 'var(--accent-crimson)', fontWeight: 700, marginBottom: '0.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span>HOMOGLYPH LOOKALIKE DETECTED: {currentScenario.homoglyphAnalysis.verdict}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      Character Discrepancy: <strong>{currentScenario.homoglyphAnalysis.char}</strong>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.35rem' }}>
                      Adversary registered this domain to bypass standard eye-glance human scrutiny. Genuine domain: {currentScenario.homoglyphAnalysis.brand}.
                    </div>
                  </div>
                )}
              </div>

              {/* Message Body Content */}
              <div style={{ padding: '1.75rem', position: 'relative' }}>
                {/* Urgency Trigger Highlight */}
                <div
                  onClick={() => {
                    setShowUrgencyDetail(!showUrgencyDetail);
                    registerClue('urgency');
                  }}
                  style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    padding: '0.65rem 0.95rem',
                    borderRadius: '6px',
                    marginBottom: '1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#fbbf24' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>Urgency Lure: Must confirm <strong>{currentScenario.urgencyText}</strong>.</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#fbbf24', textDecoration: 'underline' }}>Analyze Bias ❯</span>
                </div>

                {showUrgencyDetail && (
                  <div
                    style={{
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '6px',
                      padding: '0.75rem 1rem',
                      marginBottom: '1.25rem',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {currentScenario.urgencyAnalysis}
                  </div>
                )}

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                  Dear Sarah,
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                  Please review and execute the executive stock option grant agreement below. To complete verification with corporate legal compliance, your digital signature is required before the deadline.
                </p>

                {/* Simulated DocuSign Action Box */}
                <div
                  style={{
                    background: 'var(--bg-dark-elevated)',
                    border: '1px dashed var(--border-medium)',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    DOCUMENT ID: {currentScenario.documentId}
                  </div>
                  <button
                    onClick={handleMaliciousClick}
                    style={{
                      background: 'var(--accent-crimson)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.65rem 1.5rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)',
                    }}
                  >
                    {currentScenario.actionLabel}
                  </button>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Target: {currentScenario.exploitTarget}
                  </div>
                </div>

                {/* Quarantine & Action Strip */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '1.25rem',
                  }}
                >
                  <button
                    onClick={handleReport}
                    disabled={isQuarantining || isQuarantined}
                    style={{
                      background: isQuarantined ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
                      color: '#000000',
                      border: 'none',
                      padding: '0.65rem 1.4rem',
                      borderRadius: '6px',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: isQuarantining || isQuarantined ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)',
                    }}
                  >
                    {isQuarantining ? (
                      <>
                        <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        <span>Quarantining Threat &amp; Disseminating SOAR...</span>
                      </>
                    ) : isQuarantined ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Threat Quarantined &amp; Neutralized</span>
                      </span>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Report Threat &amp; Trigger SOAR Containment</span>
                      </>
                    )}
                  </button>

                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    ReflexAware SLA: &lt;1.2s to Splunk / Sentinel
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* SMARTPHONE VIEWPORT CHASSIS (iOS/Android Glassmorphic Mirror) */
            <div
              style={{
                width: '100%',
                maxWidth: '380px',
                margin: '0 auto',
                background: '#0a0f1d',
                borderRadius: '36px',
                border: '8px solid #1e293b',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(6, 182, 212, 0.15)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Dynamic Island / Notch */}
              <div
                style={{
                  background: '#020617',
                  padding: '0.65rem 1.25rem 0.4rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#ffffff', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  09:41
                </span>
                {/* Speaker pill notch */}
                <div style={{ width: '80px', height: '16px', background: '#0f172a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1e293b', marginRight: '6px' }} />
                  <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: '#334155' }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span style={{ color: '#ffffff', fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>5G</span>
                  <div style={{ width: '16px', height: '9px', border: '1px solid #ffffff', borderRadius: '2px', padding: '1px', display: 'flex' }}>
                    <div style={{ width: '85%', height: '100%', background: 'var(--accent-emerald)', borderRadius: '1px' }} />
                  </div>
                </div>
              </div>

              {/* Mobile Content Area */}
              <div style={{ padding: '1.25rem', minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {currentScenario.isQr ? (
                  /* QR CODE QUISHING CAMERA SCANNER VIEW */
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        CAMERA VIEWFINDER // OCR
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Scan To Authenticate</span>
                    </div>

                    {/* Camera Targeting Frame */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '240px',
                        background: '#020617',
                        borderRadius: '16px',
                        border: '2px solid rgba(6, 182, 212, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={toggleCameraScan}
                    >
                      {/* Laser scan line */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, transparent, #ef4444, #06b6d4, transparent)',
                          boxShadow: '0 0 10px #06b6d4',
                          animation: 'moveScanline 2s linear infinite',
                          zIndex: 10,
                        }}
                      />

                      {/* Mock QR Pattern (SVG High Entropy) */}
                      <svg width="150" height="150" viewBox="0 0 100 100" fill="none" style={{ background: '#ffffff', padding: '8px', borderRadius: '8px' }}>
                        <rect width="100" height="100" fill="white" />
                        {/* QR Position Squares */}
                        <rect x="5" y="5" width="25" height="25" fill="black" />
                        <rect x="9" y="9" width="17" height="17" fill="white" />
                        <rect x="13" y="13" width="9" height="9" fill="black" />
                        <rect x="70" y="5" width="25" height="25" fill="black" />
                        <rect x="74" y="9" width="17" height="17" fill="white" />
                        <rect x="78" y="13" width="9" height="9" fill="black" />
                        <rect x="5" y="70" width="25" height="25" fill="black" />
                        <rect x="9" y="74" width="17" height="17" fill="white" />
                        <rect x="13" y="78" width="9" height="9" fill="black" />
                        {/* Data Matrix Dots */}
                        <rect x="35" y="10" width="6" height="6" fill="black" />
                        <rect x="45" y="10" width="6" height="6" fill="black" />
                        <rect x="55" y="20" width="6" height="6" fill="black" />
                        <rect x="35" y="35" width="8" height="8" fill="black" />
                        <rect x="50" y="45" width="6" height="6" fill="black" />
                        <rect x="65" y="40" width="6" height="6" fill="black" />
                        <rect x="40" y="60" width="8" height="8" fill="black" />
                        <rect x="60" y="75" width="6" height="6" fill="black" />
                        <rect x="75" y="60" width="8" height="8" fill="black" />
                        <rect x="80" y="80" width="6" height="6" fill="black" />
                      </svg>

                      {/* OCR Overlay Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          right: '12px',
                          background: 'rgba(9, 14, 26, 0.9)',
                          border: '1px solid var(--accent-crimson)',
                          borderRadius: '6px',
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--accent-crimson)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backdropFilter: 'blur(8px)',
                          zIndex: 12,
                        }}
                      >
                        <span>OCR: {currentScenario.fromDomain}</span>
                        <span style={{ color: '#ef4444', fontWeight: 700 }}>PUNYCODE</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.85rem', fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      Adversary exploits mobile cameras to bypass secure email gateways.
                    </div>
                  </div>
                ) : currentScenario.isAudio ? (
                  /* WHATSAPP AI VOICE CLONE MEMO */
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800 }}>
                        DV
                      </div>
                      <div>
                        <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 700 }}>David Vance (CEO)</div>
                        <div style={{ color: 'var(--accent-emerald)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>+1 (415) 882-0199 • Online</div>
                      </div>
                    </div>

                    {/* Voice Memo Audio Card */}
                    <div
                      style={{
                        background: '#1e293b',
                        borderRadius: '14px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={toggleVoicePlayback}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: isPlayingAudio ? 'var(--accent-crimson)' : 'var(--accent-emerald)',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isPlayingAudio ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          )}
                        </button>

                        {/* Animated waveform bars */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flex: 1, height: '24px' }}>
                          {[12, 18, 24, 8, 22, 16, 28, 14, 19, 10, 24, 16, 8, 20, 12].map((h, i) => (
                            <div
                              key={i}
                              style={{
                                width: '3px',
                                height: isPlayingAudio ? `${Math.max(4, (h * (i % 2 === 0 ? 1.2 : 0.7)))}px` : `${h}px`,
                                background: isPlayingAudio ? 'var(--accent-cyan)' : '#64748b',
                                borderRadius: '2px',
                                transition: 'height 0.15s ease',
                              }}
                            />
                          ))}
                        </div>

                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                          0:24
                        </span>
                      </div>

                      {/* Forensic AI Probability Meter */}
                      <div style={{ marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>ZiSoft Neural Forensics:</span>
                        <span style={{ color: 'var(--accent-crimson)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          98.4% AI Voice Clone
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      &quot;Sarah, I&apos;m in a board meeting right now. Wire the $1.42M Falcon escrow immediately before 10 AM. Don&apos;t wait for internal audit.&quot;
                    </div>
                  </div>
                ) : (
                  /* STANDARD MOBILE EMAIL */
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      From: {currentScenario.fromDisplay}
                    </div>
                    <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: '0 0 0.75rem' }}>
                      {currentScenario.subject}
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      Please tap below to complete identity verification within {currentScenario.urgencyText}.
                    </p>
                    <button
                      onClick={handleMaliciousClick}
                      style={{
                        width: '100%',
                        background: 'var(--accent-crimson)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.6rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        marginTop: '1rem',
                        cursor: 'pointer',
                      }}
                    >
                      {currentScenario.actionLabel}
                    </button>
                  </div>
                )}

                {/* Mobile Quarantine Button */}
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <button
                    onClick={handleReport}
                    disabled={isQuarantining || isQuarantined}
                    style={{
                      width: '100%',
                      background: isQuarantined ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
                      color: '#000000',
                      border: 'none',
                      padding: '0.7rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: isQuarantining || isQuarantined ? 'default' : 'pointer',
                    }}
                  >
                    {isQuarantined ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Neutralized by ZINAD Shield</span>
                      </span>
                    ) : (
                      'Report & Shield Device'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TELEMETRY & SOAR DISPATCH PANEL (Right Column when mobile, or docked) */}
          <div
            style={{
              background: 'var(--bg-dark-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isQuarantined ? 'var(--accent-emerald)' : 'var(--accent-cyan)', boxShadow: `0 0 10px ${isQuarantined ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}` }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-cyan)', fontWeight: 800, textTransform: 'uppercase' }}>
                  ReflexAware 360 Autonomous SOAR Dispatch
                </span>
              </div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', margin: '0 0 0.35rem', fontWeight: 800 }}>
                Human Threat Sensor Telemetry
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                When an employee reports suspicious communication, ZINAD dispatches real-time webhooks into SIEM platforms within &lt;1.2 seconds, revoking stolen tokens across the enterprise.
              </p>
            </div>

            {/* Live Indicators Table */}
            <div style={{ background: '#07090e', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>ORIGIN ADVERSARY IP:</span>
                <span style={{ color: 'var(--accent-crimson)', fontWeight: 700 }}>{currentScenario.ioc.senderIp}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>ATTACK VECTOR:</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{currentScenario.ioc.vector}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>CONTAINMENT SLA:</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>0.82s (Target &lt;1.5s)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>DEFENSE ACTION:</span>
                <span style={{ color: '#ffffff' }}>{currentScenario.ioc.containment}</span>
              </div>
            </div>

            {/* Synchronized Feedback Notice */}
            <div
              style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
                </svg>
                <span>SYNCHRONIZED ACROSS PLATFORM:</span>
              </div>
              Reporting this threat updates the <strong>Dynamic Threat Globe</strong> upstairs and triggers a deflection ripple in the <strong>Defense Shield Mesh</strong>.
            </div>
          </div>
        </div>

        {/* EXPLOIT MECHANICS MODAL (Detonation Chamber) */}
        {showExploitModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                background: 'var(--bg-dark-surface)',
                border: '1px solid var(--accent-crimson)',
                borderRadius: '12px',
                maxWidth: '560px',
                width: '100%',
                padding: '2rem',
                boxShadow: '0 25px 60px rgba(225, 29, 72, 0.3)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-crimson)', boxShadow: '0 0 10px var(--accent-crimson)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-crimson)', fontWeight: 800 }}>
                  EXPLOIT DETONATION CHAMBER
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0 0 0.5rem', fontWeight: 800 }}>
                {currentScenario.exploitTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.55, margin: '0 0 1.25rem' }}>
                {currentScenario.exploitDescription}
              </p>

              <div style={{ background: '#07090e', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginBottom: '1.5rem' }}>
                <div style={{ color: '#64748b', marginBottom: '0.25rem' }}>PAYLOAD TOOLKIT: {currentScenario.payloadName}</div>
                <div style={{ color: 'var(--accent-crimson)' }}>TARGET URI: {currentScenario.exploitTarget}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowExploitModal(false)}
                  style={{
                    background: 'var(--bg-dark-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Close Forensics
                </button>
                <button
                  onClick={() => {
                    setShowExploitModal(false);
                    handleReport();
                  }}
                  style={{
                    background: 'var(--accent-emerald)',
                    color: '#000000',
                    border: 'none',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Quarantine Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
