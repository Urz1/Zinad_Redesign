'use client';

import React, { useEffect, useRef, useState } from 'react';

const RADAR_TARGETS = [
  {
    id: 0,
    angle: 45,
    distance: 0.65,
    label: 'TGT-01 // SPEAR-VISHING',
    title: 'Executive Voice Cloning & Vishing',
    frequency: 'Voice Audio Band (300Hz - 3.4kHz)',
    vector: 'Synthetic Voice Impersonation of CFO',
    description: 'Simulated multi-channel phone calls using generative voice cloning to demand emergency supplier wire transfer authorizations.',
    remediation: 'Multi-factor vocal callback challenge protocol via out-of-band corporate directory.',
    testLabel: 'Voice Synthesizer Waveform',
    rfType: 'ACOUSTIC',
    waveformColor: '#e11d48',
    killChain: ['Target Scraping from Earnings Call', 'Neural Latent Voice Synthesis', 'VoIP Caller ID Spoof', 'Urgent Wire Transfer Demand'],
  },
  {
    id: 1,
    angle: 135,
    distance: 0.45,
    label: 'TGT-02 // ROGUE WI-FI AP',
    title: 'Rogue Access Point (Evil Twin Beacon)',
    frequency: '2.4GHz / 5GHz 802.11ax Beacon Spoof',
    vector: 'Corporate Guest Network Impersonation',
    description: 'Deploying controlled Wi-Fi access beacons in physical office perimeters to audit employee auto-connect hygiene and captive portal credential leakage.',
    remediation: 'Enforce 802.1X certificate-based WPA3 Enterprise profiles across managed MDM devices.',
    testLabel: 'SSID Beacon Inspector',
    rfType: 'RF_802_11',
    waveformColor: '#06b6d4',
    killChain: ['Perimeter RF Survey', 'SSID Karma Attack', 'Captive Portal Spoof', 'MFA Token Harvest'],
  },
  {
    id: 2,
    angle: 220,
    distance: 0.75,
    label: 'TGT-03 // USB HARDWARE DROP',
    title: 'Weaponized Physical Hardware Injection',
    frequency: 'USB HID Emulation (Rubber Ducky & O.MG)',
    vector: 'Dispersed Labeled Flash Drives',
    description: 'Placing tracked, benign hardware drives in parking structures and communal lounges to audit physical endpoint USB policy enforcement.',
    remediation: 'OS-level USB mass storage lockdown and automated immediate endpoint isolation.',
    testLabel: 'Keystroke Injection Payload',
    rfType: 'USB_HID',
    waveformColor: '#f59e0b',
    killChain: ['Parking Lot Dispersal', 'Curiosity Baiting Label', 'Keystroke Emulation', 'Beacon Callback'],
  },
  {
    id: 3,
    angle: 310,
    distance: 0.55,
    label: 'TGT-04 // PHYSICAL PERIMETER',
    title: 'Turnstile Intrusion & Tailgating',
    frequency: '13.56 MHz RFID / 125 kHz Proximity Badge',
    vector: 'Courier & Contractor Disguise',
    description: 'Certified social engineering operatives testing facility doors, turnstiles, and badge-checking vigilance under pre-approved enterprise RoE.',
    remediation: 'Mandatory badge-challenge culture and anti-passback turnstile enforcement.',
    testLabel: 'Anti-Passback Event Stream',
    rfType: 'PHYSICAL_RFID',
    waveformColor: '#10b981',
    killChain: ['Perimeter Drone Recon', 'Badge Proximity Sniff', 'Turnstile Courtesy Lure', 'Server Room Ingress'],
  },
];

// Tactical Sonar & RF Demodulator Audio Tone
function playTacticalSignal(type = 'sonar', freq = 660) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'sonar') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'demod') {
      // RF carrier demodulation chirp
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch {}
}

export default function TacticalRadar() {
  const radarCanvasRef = useRef(null);
  const waterfallCanvasRef = useRef(null);
  const [selectedTargetId, setSelectedTargetId] = useState(0);
  const [isDemodulating, setIsDemodulating] = useState(false);
  const [killChainStep, setKillChainStep] = useState(0);

  const selectedTarget = RADAR_TARGETS[selectedTargetId];

  const selectTarget = (id) => {
    setSelectedTargetId(id);
    setKillChainStep(0);
    setIsDemodulating(false);
    playTacticalSignal('sonar', 600 + id * 80);
  };

  const handleDemodulate = () => {
    setIsDemodulating(true);
    playTacticalSignal('demod', 880);
    setTimeout(() => setIsDemodulating(false), 2400);
  };

  // Radar Animation Loop
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let sweepAngle = 0;

    const renderRadar = () => {
      animId = requestAnimationFrame(renderRadar);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) - 20;

      // Dark persistent backdrop
      ctx.fillStyle = 'rgba(6, 10, 18, 0.25)';
      ctx.fillRect(0, 0, w, h);

      // Concentric Radar Rings
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.22)';
      ctx.lineWidth = 1;

      [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * ratio, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs & Degree Markers
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweeping Beam
      sweepAngle += 0.025;
      const sweepEndAngle = sweepAngle;
      const sweepStartAngle = sweepAngle - 0.45;

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.0)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.35)');

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, sweepStartAngle, sweepEndAngle, false);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Sweeping Line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepEndAngle) * radius, cy + Math.sin(sweepEndAngle) * radius);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Targets
      RADAR_TARGETS.forEach((tgt) => {
        const rad = (tgt.angle * Math.PI) / 180;
        const tx = cx + Math.cos(rad) * (radius * tgt.distance);
        const ty = cy + Math.sin(rad) * (radius * tgt.distance);
        const isSelected = tgt.id === selectedTargetId;

        // Target Blip
        ctx.beginPath();
        ctx.arc(tx, ty, isSelected ? 6.5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#e11d48' : '#10b981';
        ctx.shadowColor = isSelected ? '#e11d48' : '#10b981';
        ctx.shadowBlur = isSelected ? 15 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Target Lock HUD Box
        if (isSelected) {
          ctx.strokeStyle = '#e11d48';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(tx, ty, 14, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeRect(tx - 18, ty - 18, 36, 36);

          ctx.fillStyle = '#fff';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText(`TARGET LOCKED // 0${tgt.id + 1}`, tx + 18, ty - 8);
        }
      });
    };

    renderRadar();

    return () => cancelAnimationFrame(animId);
  }, [selectedTargetId]);

  // Waterfall Spectrogram Canvas Loop
  useEffect(() => {
    const canvas = waterfallCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let offset = 0;

    const renderWaterfall = () => {
      animId = requestAnimationFrame(renderWaterfall);
      offset += 0.05;

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = 'rgba(7, 11, 20, 0.3)';
      ctx.fillRect(0, 0, w, h);

      // Frequency bars / spectrogram lines
      const bars = 32;
      const barWidth = w / bars;

      for (let i = 0; i < bars; i++) {
        const freqAmp = Math.sin(i * 0.3 + offset * 2) * 0.5 + 0.5;
        const noise = Math.random() * 0.25;
        const heightMultiplier = isDemodulating ? 0.9 : 0.45;
        const barHeight = (freqAmp + noise) * h * heightMultiplier;

        ctx.fillStyle = isDemodulating ? selectedTarget.waveformColor : 'rgba(6, 182, 212, 0.45)';
        ctx.fillRect(i * barWidth, h - barHeight, barWidth - 2, barHeight);
      }
    };

    renderWaterfall();

    return () => cancelAnimationFrame(animId);
  }, [selectedTargetId, isDemodulating, selectedTarget.waveformColor]);

  return (
    <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-dark-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span className="telemetry-live-dot" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              SIGINT &amp; ELECTRONIC WARFARE // 360° ADVERSARY RECON
            </span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Tactical Multi-Vector War Room &amp; Doppler Radar
          </h2>
        </div>

        {/* Live Vector Selector Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {RADAR_TARGETS.map((tgt) => (
            <button
              key={tgt.id}
              onClick={() => selectTarget(tgt.id)}
              style={{
                background: selectedTargetId === tgt.id ? 'var(--accent-crimson)' : 'var(--bg-dark-elevated)',
                color: selectedTargetId === tgt.id ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${selectedTargetId === tgt.id ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tgt.label.split('//')[1]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.35fr)', gap: '2rem', alignItems: 'start' }}>
        {/* Left Column: Sweeping Doppler Radar Canvas */}
        <div style={{ background: '#060a12', borderRadius: '12px', border: '1px solid var(--border-medium)', padding: '1.25rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            <span>BAND: 2.4 - 5.8 GHz &amp; ACOUSTIC</span>
            <span style={{ color: 'var(--accent-emerald)' }}>SWEEP: 360° CONTINUOUS</span>
          </div>

          <canvas ref={radarCanvasRef} width={420} height={380} style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', cursor: 'crosshair' }} />

          <div style={{ marginTop: '0.75rem', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Bearing: <strong style={{ color: '#f8fafc' }}>{selectedTarget.angle}°</strong> • Distance: <strong style={{ color: 'var(--accent-cyan)' }}>{(selectedTarget.distance * 100).toFixed(0)}m Range</strong> • Status: <strong style={{ color: 'var(--accent-crimson)' }}>LOCKED</strong>
          </div>
        </div>

        {/* Right Column: RF & Acoustic Spectrogram Waterfall + Demodulator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Target Profile Card */}
          <div style={{ background: 'var(--bg-dark-elevated)', border: `1px solid ${selectedTarget.waveformColor}40`, borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: selectedTarget.waveformColor, fontWeight: 700 }}>
                {selectedTarget.label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', background: `${selectedTarget.waveformColor}20`, color: selectedTarget.waveformColor, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                {selectedTarget.frequency}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>
              {selectedTarget.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5, margin: '0 0 1rem' }}>
              {selectedTarget.description}
            </p>

            {/* Live RF Waterfall Spectrogram Canvas */}
            <div style={{ background: '#060a12', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>// REAL-TIME RF SPECTRUM &amp; ACOUSTIC FFT</span>
                <span>{isDemodulating ? 'DEMODULATING CARRIER...' : 'PASSIVE MONITORING'}</span>
              </div>
              <canvas ref={waterfallCanvasRef} width={480} height={70} style={{ width: '100%', height: '70px', display: 'block', borderRadius: '4px' }} />
            </div>

            {/* Demodulate Button */}
            <button
              onClick={handleDemodulate}
              style={{
                width: '100%',
                background: isDemodulating ? selectedTarget.waveformColor : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${selectedTarget.waveformColor}`,
                color: isDemodulating ? '#ffffff' : selectedTarget.waveformColor,
                padding: '0.65rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isDemodulating ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>Carrier Audio Stream Demodulated (Listen)</span>
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Demodulate {selectedTarget.testLabel}</span>
                </span>
              )}
            </button>
          </div>

          {/* 4-Stage Tactical Kill-Chain Progression */}
          <div style={{ background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Adversary Kill-Chain Progression:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.85rem' }}>
              {selectedTarget.killChain.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setKillChainStep(idx)}
                  style={{
                    background: killChainStep === idx ? 'rgba(225, 29, 72, 0.15)' : 'var(--bg-dark-surface)',
                    border: `1px solid ${killChainStep === idx ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                    borderRadius: '6px',
                    padding: '0.6rem 0.5rem',
                    fontSize: '0.68rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }}>PHASE 0{idx + 1}</div>
                  <div style={{ color: killChainStep === idx ? 'var(--accent-crimson)' : 'var(--text-secondary)', fontWeight: 700, marginTop: '0.2rem' }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', background: 'rgba(16, 185, 129, 0.08)', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
              </svg>
              <span>Remediation Countermeasure: <strong>{selectedTarget.remediation}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
