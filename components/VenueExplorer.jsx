'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

// Tactile Audio Synthesis for CTF & Wargames
function playWargameAudio(type = 'flag') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'flag') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.2); // D6
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch {}
}

export default function VenueExplorer() {
  const [activeZone, setActiveZone] = useState('keynote');

  // Interactive Polling state for Keynote Stage
  const [pollSelected, setPollSelected] = useState(null);
  const [pollVotes, setPollVotes] = useState({
    sessionHijack: 42,
    quishing: 31,
    deepfakeVoice: 21,
    oauthConsent: 6,
  });
  const [hasVoted, setHasVoted] = useState(false);

  // Interactive CPE Certificate state for Resource Pavilion
  const [attendeeName, setAttendeeName] = useState('Alex Mercer, CISSP');
  const [certIssued, setCertIssued] = useState(false);

  // Live Micro-CTF Challenge state
  const [ctfInput, setCtfInput] = useState('');
  const [ctfSolved, setCtfSolved] = useState(false);
  const [ctfTeams, setCtfTeams] = useState([
    { rank: 1, name: 'CloudSec Guardians (DevOps)', score: 3850, solved: 'OAuth Replay Exploit', status: 'LIVE_FLAG' },
    { rank: 2, name: 'Cyber Sentinels (SOC Tier 2)', score: 3620, solved: 'Memory Dump Hex Extract', status: 'VERIFIED' },
    { rank: 3, name: 'Treasury Defense (Finance)', score: 3190, solved: 'Phish Header Forensic', status: 'VERIFIED' },
    { rank: 4, name: 'Your Team: Security Champions', score: 2840, solved: 'In Progress...', status: 'SOLVING' },
  ]);

  // Audio zone toggles for Atrium
  const [spatialAudioEnabled, setSpatialAudioEnabled] = useState(true);
  const [selectedBooth, setSelectedBooth] = useState('crowdstrike');

  // Zones metadata
  const zones = {
    keynote: {
      id: 'keynote',
      title: 'Auditorium Alpha (Keynote Stage)',
      capacity: '4,200 / 5,000 Capacity',
      status: 'LIVE BROADCAST',
      accent: 'var(--accent-crimson)',
      bgTag: 'Executive Cyber Summit',
      metric: '18ms WebRTC Latency',
      description: 'Stream zero-latency keynote presentations from CISOs and threat researchers with integrated live audience comprehension challenges that measure engagement and verify attendance in real-time.',
    },
    atrium: {
      id: 'atrium',
      title: 'Grand Atrium & Expo Hub',
      capacity: '6,140 / 10,000 Active Avatars',
      status: 'SPATIAL NETWORKING',
      accent: 'var(--accent-cyan)',
      bgTag: 'Exhibition & Vendor Concourse',
      metric: '3D Proximity Audio Mesh',
      description: 'A multi-tier virtual convention center where employees navigate 3D avatars, visit interactive vendor and internal security booths, and connect in proximity-based private voice channels.',
    },
    ctf: {
      id: 'ctf',
      title: 'Wargame Arena & Team CTF',
      capacity: '840 Competitors (140 Teams)',
      status: 'CHAMPIONSHIP IN PROGRESS',
      accent: 'var(--accent-emerald)',
      bgTag: 'Hands-on Social Engineering Battles',
      metric: 'Zero-Install Web Sandbox',
      description: 'Cross-departmental capture-the-flag competitions tailored for both non-technical staff (social engineering defense) and security engineers (defensive log forensics).',
    },
    pavilion: {
      id: 'pavilion',
      title: 'Accreditation & CPE Certification Hall',
      capacity: '3,410 Badges Minted Today',
      status: 'AUTOMATED COMPLIANCE VERIFICATION',
      accent: 'var(--accent-purple)',
      bgTag: 'Continuing Education Credits',
      metric: 'SHA-256 Tamper-Proof Badges',
      description: 'Cryptographically signed Continuing Professional Education (CPE/CEU) certificates issued automatically upon session verification, compliant with ISC2, ISACA, SANS, and NIST requirements.',
    },
  };

  const handleVote = (optionKey) => {
    if (hasVoted) return;
    playWargameAudio('click');
    setPollSelected(optionKey);
    setPollVotes((prev) => ({
      ...prev,
      [optionKey]: prev[optionKey] + 1,
    }));
    setHasVoted(true);
  };

  const handleSolveCtf = (e) => {
    e.preventDefault();
    if (ctfSolved) return;
    playWargameAudio('flag');
    setCtfSolved(true);
    setCtfTeams([
      { rank: 1, name: 'Your Team: Security Champions', score: 4120, solved: 'Base64 Token Decoded (+500 pts)', status: 'FLAG_CAPTURED' },
      { rank: 2, name: 'CloudSec Guardians (DevOps)', score: 3850, solved: 'OAuth Replay Exploit', status: 'VERIFIED' },
      { rank: 3, name: 'Cyber Sentinels (SOC Tier 2)', score: 3620, solved: 'Memory Dump Hex Extract', status: 'VERIFIED' },
      { rank: 4, name: 'Treasury Defense (Finance)', score: 3190, solved: 'Phish Header Forensic', status: 'VERIFIED' },
    ]);
    try {
      confetti({
        particleCount: 60,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#e11d48', '#fbbf24'],
      });
    } catch {}
  };

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-dark-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="telemetry-live-dot" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              EVENUE SPATIAL WARGAMES // 2.5D CONVENTION CAMPUS
            </span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            The Evenue Virtual Summit Environment
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '680px' }}>
            Explore the four interconnected architectural sectors that power high-concurrency enterprise cybersecurity awareness summits for Fortune 500 workforces.
          </p>
        </div>

        {/* Live Concurrency Status Card */}
        <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-medium)', borderRadius: '10px', padding: '0.85rem 1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Concurrent Attendees</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>10,240 <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>● PEAK LOAD</span></div>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border-subtle)' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Global CDN Edge</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>142 Edge PoPs</div>
          </div>
        </div>
      </div>

      {/* Interactive Sector Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
        {Object.entries(zones).map(([key, zone]) => {
          const isActive = activeZone === key;
          return (
            <button
              key={key}
              onClick={() => {
                playWargameAudio('click');
                setActiveZone(key);
              }}
              style={{
                textAlign: 'left',
                background: isActive ? 'var(--bg-dark-elevated)' : 'var(--bg-dark-surface)',
                border: `1px solid ${isActive ? zone.accent : 'var(--border-subtle)'}`,
                borderLeft: `4px solid ${zone.accent}`,
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? `0 4px 20px ${zone.accent}20` : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: zone.accent, fontWeight: 700 }}>
                  SECTOR 0{Object.keys(zones).indexOf(key) + 1}
                </span>
                <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', borderRadius: '3px', background: isActive ? `${zone.accent}25` : 'var(--bg-dark-base)', color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {zone.metric}
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {zone.title.split('(')[0]}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                {zone.capacity}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage & Floor Plan Simulation Console */}
      <div className="sim-cockpit-grid" style={{ alignItems: 'stretch' }}>
        {/* Left: Spatial 2.5D Isometric Architectural Blueprint */}
        <div style={{ background: 'var(--bg-dark-elevated)', borderRadius: '12px', border: '1px solid var(--border-medium)', padding: '1.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              VENUE BLUEPRINT: <span style={{ color: zones[activeZone].accent, fontWeight: 700 }}>SECTOR_{activeZone.toUpperCase()}</span>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="telemetry-live-dot" />
              STREAM SYNC 99.98%
            </span>
          </div>

          {/* SVG 2.5D Isometric Venue Map with dynamic highlights */}
          <div style={{ flex: 1, minHeight: '340px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 600 380" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))' }}>
              {/* Sector 1: Keynote Auditorium (Top Right) */}
              <g onClick={() => setActiveZone('keynote')} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
                <polygon points="440,60 560,120 440,180 320,120" fill={activeZone === 'keynote' ? 'rgba(225, 29, 72, 0.3)' : 'rgba(30, 41, 59, 0.45)'} stroke={activeZone === 'keynote' ? 'var(--accent-crimson)' : 'rgba(255,255,255,0.15)'} strokeWidth={activeZone === 'keynote' ? 2 : 1} />
                <polygon points="320,120 440,180 440,200 320,140" fill="rgba(15, 23, 42, 0.8)" stroke={activeZone === 'keynote' ? 'var(--accent-crimson)' : 'rgba(255,255,255,0.1)'} />
                <polygon points="560,120 440,180 440,200 560,140" fill="rgba(30, 41, 59, 0.6)" stroke={activeZone === 'keynote' ? 'var(--accent-crimson)' : 'rgba(255,255,255,0.1)'} />
                <text x="440" y="128" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">KEYNOTE STAGE</text>
                <text x="440" y="144" textAnchor="middle" fill="var(--accent-crimson)" fontSize="9" fontFamily="var(--font-mono)">LIVE 4,200 STREAMING</text>
              </g>

              {/* Sector 2: Grand Atrium (Top Left) */}
              <g onClick={() => setActiveZone('atrium')} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
                <polygon points="160,60 280,120 160,180 40,120" fill={activeZone === 'atrium' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(30, 41, 59, 0.45)'} stroke={activeZone === 'atrium' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)'} strokeWidth={activeZone === 'atrium' ? 2 : 1} />
                <polygon points="40,120 160,180 160,200 40,140" fill="rgba(15, 23, 42, 0.8)" stroke={activeZone === 'atrium' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)'} />
                <polygon points="280,120 160,180 160,200 280,140" fill="rgba(30, 41, 59, 0.6)" stroke={activeZone === 'atrium' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)'} />
                <text x="160" y="128" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">GRAND ATRIUM</text>
                <text x="160" y="144" textAnchor="middle" fill="var(--accent-cyan)" fontSize="9" fontFamily="var(--font-mono)">SPATIAL AUDIO MESH</text>
              </g>

              {/* Sector 3: Team CTF Arena (Bottom Left) */}
              <g onClick={() => setActiveZone('ctf')} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
                <polygon points="160,200 280,260 160,320 40,260" fill={activeZone === 'ctf' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(30, 41, 59, 0.45)'} stroke={activeZone === 'ctf' ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.15)'} strokeWidth={activeZone === 'ctf' ? 2 : 1} />
                <polygon points="40,260 160,320 160,340 40,280" fill="rgba(15, 23, 42, 0.8)" stroke={activeZone === 'ctf' ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.1)'} />
                <polygon points="280,260 160,320 160,340 280,280" fill="rgba(30, 41, 59, 0.6)" stroke={activeZone === 'ctf' ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.1)'} />
                <text x="160" y="260" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">WARGAME CTF ARENA</text>
                <text x="160" y="276" textAnchor="middle" fill="var(--accent-emerald)" fontSize="9" fontFamily="var(--font-mono)">140 TEAMS BATTLING</text>
              </g>

              {/* Sector 4: Accreditation & CPE Pavilion (Bottom Right) */}
              <g onClick={() => setActiveZone('pavilion')} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
                <polygon points="440,200 560,260 440,320 320,260" fill={activeZone === 'pavilion' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(30, 41, 59, 0.45)'} stroke={activeZone === 'pavilion' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.15)'} strokeWidth={activeZone === 'pavilion' ? 2 : 1} />
                <polygon points="320,260 440,320 440,340 320,280" fill="rgba(15, 23, 42, 0.8)" stroke={activeZone === 'pavilion' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)'} />
                <polygon points="560,260 440,320 440,340 560,280" fill="rgba(30, 41, 59, 0.6)" stroke={activeZone === 'pavilion' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)'} />
                <text x="440" y="260" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">CPE CERTIFICATION</text>
                <text x="440" y="276" textAnchor="middle" fill="var(--accent-purple)" fontSize="9" fontFamily="var(--font-mono)">AUTOMATED AUDIT TRAIL</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Column: Dynamic Feature Sandbox for Selected Zone */}
        <div style={{ background: 'var(--bg-dark-surface)', borderRadius: '12px', border: `1px solid ${zones[activeZone].accent}40`, padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, background: `${zones[activeZone].accent}20`, color: zones[activeZone].accent, border: `1px solid ${zones[activeZone].accent}40` }}>
              {zones[activeZone].status}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {zones[activeZone].metric}
            </span>
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            {zones[activeZone].title}
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
            {zones[activeZone].description}
          </p>

          {/* 1. KEYNOTE AUDITORIUM: Live Polling */}
          {activeZone === 'keynote' && (
            <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-crimson)', textTransform: 'uppercase' }}>
                  Live Keynote Poll (4,200 Attendees)
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Total Votes: {totalVotes}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.85rem' }}>
                &quot;Which emerging threat vector does your department find hardest to detect?&quot;
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { key: 'sessionHijack', label: 'AiTM Reverse-Proxy Session Token Stealing', count: pollVotes.sessionHijack },
                  { key: 'quishing', label: 'Dynamic QR Quishing bypassing E-Mail Gateways', count: pollVotes.quishing },
                  { key: 'deepfakeVoice', label: 'AI Voice Clone Authorization Memos', count: pollVotes.deepfakeVoice },
                  { key: 'oauthConsent', label: 'Malicious OAuth Device Code Consent Abuse', count: pollVotes.oauthConsent },
                ].map((item) => {
                  const pct = Math.round((item.count / totalVotes) * 100);
                  const isUserPick = pollSelected === item.key;
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleVote(item.key)}
                      style={{
                        position: 'relative',
                        padding: '0.65rem 0.9rem',
                        borderRadius: '6px',
                        border: `1px solid ${isUserPick ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                        background: isUserPick ? 'var(--accent-crimson-glow)' : 'var(--bg-dark-surface)',
                        cursor: hasVoted ? 'default' : 'pointer',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${pct}%`,
                          background: isUserPick ? 'rgba(225, 29, 72, 0.25)' : 'rgba(255,255,255,0.05)',
                          zIndex: 0,
                          transition: 'width 0.5s ease',
                        }}
                      />
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', color: isUserPick ? 'var(--accent-crimson)' : 'var(--text-secondary)', fontWeight: isUserPick ? 700 : 500 }}>
                          {item.label}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: isUserPick ? 'var(--accent-crimson)' : 'var(--text-muted)', fontWeight: 700 }}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. GRAND ATRIUM: Proximity Audio Mesh */}
          {activeZone === 'atrium' && (
            <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                  Spatial Proximity Audio Mesh
                </span>
                <span style={{ color: 'var(--accent-emerald)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                  ● 3.5m Proximity Zone
                </span>
              </div>

              <div className="sim-cards-dual" style={{ marginBottom: '1rem' }}>
                {[
                  { id: 'soc', name: 'Internal SOC Booth', attendees: '42 nearby' },
                  { id: 'crowdstrike', name: 'Identity Threat Booth', attendees: '128 nearby' },
                  { id: 'lounge', name: 'VIP Speaker Lounge', attendees: '14 inside' },
                  { id: 'swag', name: 'Digital Swag Bazaar', attendees: '380 visiting' },
                ].map((booth) => (
                  <div
                    key={booth.id}
                    onClick={() => {
                      playWargameAudio('click');
                      setSelectedBooth(booth.id);
                    }}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '6px',
                      background: selectedBooth === booth.id ? 'var(--accent-cyan-glow)' : 'var(--bg-dark-surface)',
                      border: `1px solid ${selectedBooth === booth.id ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: selectedBooth === booth.id ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                      {booth.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                      {booth.attendees}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. WARGAME CTF ARENA: PLAYABLE LIVE MICRO-CHALLENGE */}
          {activeZone === 'ctf' && (
            <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                  Interactive 15-Second Micro-CTF
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>
                  Round 3 of 4
                </span>
              </div>

              {/* Playable Challenge Form */}
              <div style={{ background: '#07090e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
                <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>// CHALLENGE: EXFILTRATED PAYLOAD TOKEN FORENSIC</div>
                <div style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  Base64 Token: <code style={{ color: 'var(--accent-amber)' }}>eyJyb2xlIjoidHJlYXN1cnkiLCJhdXRoIjpmYWxzZX0=</code>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.65rem' }}>
                  Hint: Decodes to JSON. What is the value of <span style={{ color: '#fff' }}>&quot;role&quot;</span>?
                </div>

                {!ctfSolved ? (
                  <form onSubmit={handleSolveCtf} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Type decoded role (e.g. treasury)"
                      value={ctfInput}
                      onChange={(e) => setCtfInput(e.target.value)}
                      style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-medium)',
                        color: '#fff',
                        padding: '0.4rem 0.65rem',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: 'var(--accent-emerald)',
                        color: '#07090e',
                        border: 'none',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '4px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        fontSize: '0.74rem',
                      }}
                    >
                      Submit Flag (+500 pts)
                    </button>
                  </form>
                ) : (
                  <div style={{ color: 'var(--accent-emerald)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>FLAG CAPTURED! Role = &quot;treasury&quot;. +500 points awarded to your team!</span>
                  </div>
                )}
              </div>

              {/* Real-time Tournament Standings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {ctfTeams.map((team) => (
                  <div
                    key={team.rank}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      background: 'var(--bg-dark-surface)',
                      borderRadius: '6px',
                      borderLeft: `3px solid ${team.rank === 1 ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        #{team.rank} {team.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {team.solved}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.85rem', color: team.rank === 1 ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
                        {team.score} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. RESOURCE & CPE PAVILION: Live Certificate Minting */}
          {activeZone === 'pavilion' && (
            <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-purple)', textTransform: 'uppercase' }}>
                  Verified CPE Accreditation Engine
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>ISC2 &amp; SANS Compliant</span>
                </span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Recipient Name &amp; Designation:
                </label>
                <input
                  type="text"
                  value={attendeeName}
                  onChange={(e) => {
                    setAttendeeName(e.target.value);
                    setCertIssued(false);
                  }}
                  style={{
                    width: '100%',
                    background: 'var(--bg-dark-surface)',
                    border: '1px solid var(--border-medium)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              {/* Dynamic Certificate Preview with Holographic Gold Sheen */}
              <div style={{ background: '#0a0d17', border: '2px solid rgba(234, 179, 8, 0.4)', borderRadius: '8px', padding: '1.25rem', position: 'relative', boxShadow: '0 8px 25px rgba(234, 179, 8, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontWeight: 700 }}>
                      CERTIFICATE OF CONTINUING CYBER DEFENSE EDUCATION
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.25rem' }}>
                      {attendeeName || 'Alex Mercer, CISSP'}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Has verified 8.0 CPE hours in Advanced Social Engineering Defense &amp; Incident Triage
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', border: '1px solid rgba(234, 179, 8, 0.5)', borderRadius: '4px', padding: '0.3rem 0.6rem', background: 'rgba(234, 179, 8, 0.1)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#eab308', fontWeight: 800 }}>8.0 CPE</div>
                    <div style={{ fontSize: '0.58rem', color: '#e2e8f0' }}>CREDITS</div>
                  </div>
                </div>

                <div style={{ marginTop: '0.85rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>SHA256: 7f8b9...e2a14</span>
                  <span style={{ color: 'var(--accent-emerald)' }}>VALIDATED BY ZINAD NET</span>
                </div>
              </div>

              <button
                onClick={() => {
                  playWargameAudio('flag');
                  setCertIssued(true);
                }}
                style={{
                  width: '100%',
                  marginTop: '0.85rem',
                  background: certIssued ? 'var(--accent-emerald)' : 'var(--accent-purple)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {certIssued ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Cryptographic Audit Record Exported</span>
                  </span>
                ) : (
                  'Generate & Mint Verified CPE Certificate'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
