'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

const DRILL_SCENARIOS = [
  {
    id: 'courier',
    tag: 'SCENARIO 01',
    title: 'The Overburdened Courier',
    avatarColor: 0x64748b,
    boxColor: 0xd97706,
    hasBox: true,
    dialogue: '"Hey there! My hands are completely full with these heavy server battery units. Could you hold the door for a quick second?"',
    threatCategory: 'Politeness & Helpful Reflex Exploit',
    stressIndex: 74,
    rfidStatus: 'NO RFID TAG FOUND',
    rfidFreq: '125 kHz / 13.56 MHz (Silent)',
    uvWatermarkValid: false,
    uvNotice: 'NO WATERMARK: Generic unprinted blank PVC card.',
    credentialDetails: {
      badgeFound: false,
      badgeText: 'NO CORPORATE CREDENTIAL DETECTED',
      details: 'Individual is carrying commercial boxes with no visible company badge, visitor sticker, or RFID lanyard.',
      manifestCheck: 'Shipping slip is addressed to building next door (Suite 400). Unverified facility access.',
    },
    failExplanation: 'CRITICAL BREACH: You held the door for an unbadged visitor. Social engineers frequently use bulky packages to exploit common workplace courtesy.',
    passExplanation: 'PERIMETER DEFENSE SUCCESS: You directed the courier to the main reception loading dock. The turnstile remained secured against unauthorized entry.',
  },
  {
    id: 'contractor',
    tag: 'SCENARIO 02',
    title: 'The Urgent HVAC Contractor',
    avatarColor: 0xeab308,
    boxColor: 0x334155,
    hasBox: true,
    dialogue: '"Emergency call from Facilities! The server room CRAC chiller is overheating on row 4. I need access to check the condenser immediately."',
    threatCategory: 'Technical Pretexting & Urgency',
    stressIndex: 88,
    rfidStatus: 'EXPIRED CREDENTIAL',
    rfidFreq: '13.56 MHz Mifare Classic (Expired 21d)',
    uvWatermarkValid: false,
    uvNotice: 'UV EXPIRED: Security hologram shows red expiration stamp.',
    credentialDetails: {
      badgeFound: true,
      badgeText: 'BADGE EXPIRED // ESCORT MANDATORY',
      details: 'Badge presented: "ACME Chilling Solutions". Expiration date: 21 days ago.',
      manifestCheck: 'Work order #7819 does not list this technician name. Facilities escort required by policy.',
    },
    failExplanation: 'FACILITY INFILTRATION: You allowed an unverified contractor inside without verifying with Facilities. Urgency was used to bypass standard credential validation.',
    passExplanation: 'PROTOCOL ENFORCED: You insisted on calling the Facilities Helpdesk to verify ticket #7819 before unlocking server room doors. Breach thwarted!',
  },
  {
    id: 'executive',
    tag: 'SCENARIO 03',
    title: 'The Impatient VIP Guest',
    avatarColor: 0x1e293b,
    boxColor: 0x000000,
    hasBox: false,
    dialogue: '"I have a board meeting in 3 minutes with your CFO. I left my badge on the desk at corporate headquarters. Just let me in so I am not late."',
    threatCategory: 'Authority & Executive Intimidation',
    stressIndex: 92,
    rfidStatus: 'UNREGISTERED VISITOR',
    rfidFreq: 'N/A (Refuses Checkpoint)',
    uvWatermarkValid: false,
    uvNotice: 'SECURITY ALERT: Refused security protocol presentation.',
    credentialDetails: {
      badgeFound: false,
      badgeText: 'UNREGISTERED VISITOR // NO BADGE',
      details: 'Individual refuses to provide employee ID or register at reception desk.',
      manifestCheck: 'CFO calendar does not show scheduled visitor. Security checkpoint bypass attempted.',
    },
    failExplanation: 'AUTHORITY EXPLOITATION: Intimidation and VIP status were leveraged to bypass physical perimeter security without verification.',
    passExplanation: 'ZERO-TRUST EXCELLENCE: You politely escorted the individual to the front security desk for executive visitor badge issuance. Policy upheld!',
  },
];

// Tactile Audio Synthesis (Radio transceiver clicks, turnstile hydraulics, alarm sirens)
function playSimSound(type = 'alarm') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'pass') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'fail') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'radio') {
      // Walkie-talkie chirp
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1760, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'rfid') {
      // RFID Scanner chirp
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch {}
}

export default function TailgatingChallenge() {
  const mountRef = useRef(null);
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [decision, setDecision] = useState(null); // 'fail', 'pass', null
  const [badgeInspected, setBadgeInspected] = useState(false);
  const [uvMode, setUvMode] = useState(false);
  const [rfidScanned, setRfidScanned] = useState(false);
  const [solvedScenarios, setSolvedScenarios] = useState({});

  const scenario = DRILL_SCENARIOS[selectedScenarioIdx];

  const sceneStateRef = useRef({
    doorLeftTarget: -3.8,
    doorRightTarget: 3.8,
    intruderZTarget: 16,
    isAlarming: false,
    walkingBob: 0,
    intruderMesh: null,
    boxMesh: null,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = 340;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060913);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(45, 38, 55);
    camera.lookAt(0, 8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 1.4);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    const strobeLight = new THREE.PointLight(0xe11d48, 0, 60);
    strobeLight.position.set(0, 18, 0);
    scene.add(strobeLight);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.7,
      metalness: 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(60, 20, 0x1e293b, 0x0f172a);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // Frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const postLeft = new THREE.Mesh(new THREE.BoxGeometry(2, 22, 2), frameMat);
    postLeft.position.set(-8, 11, 0);
    scene.add(postLeft);

    const postRight = new THREE.Mesh(new THREE.BoxGeometry(2, 22, 2), frameMat);
    postRight.position.set(8, 11, 0);
    scene.add(postRight);

    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(18, 2, 2), frameMat);
    topBeam.position.set(0, 21, 0);
    scene.add(topBeam);

    // Optical Turnstile Doors
    const glassGeo = new THREE.BoxGeometry(7, 18, 0.4);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: 0.8,
    });

    const doorLeft = new THREE.Mesh(glassGeo, glassMat);
    doorLeft.position.set(-3.8, 10, 0);
    scene.add(doorLeft);

    const doorRight = new THREE.Mesh(glassGeo, glassMat);
    doorRight.position.set(3.8, 10, 0);
    scene.add(doorRight);

    // RFID Reader
    const scanner = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 10, 16), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    scanner.position.set(10.5, 5, 4);
    scene.add(scanner);

    const rfidBeaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const rfidBeacon = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), rfidBeaconMat);
    rfidBeacon.position.set(10.5, 10.5, 4);
    scene.add(rfidBeacon);

    // Inside Employee Avatar
    const empGroup = new THREE.Group();
    const empBody = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 9, 12), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
    empBody.position.y = 5.5;
    empGroup.add(empBody);

    const empHead = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
    empHead.position.y = 11.5;
    empGroup.add(empHead);

    const empBadge = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 0.2), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    empBadge.position.set(0, 7, 1.6);
    empGroup.add(empBadge);

    empGroup.position.set(-2, 0, -12);
    scene.add(empGroup);

    // Intruder Avatar
    const intruderGroup = new THREE.Group();
    const intruderBodyMat = new THREE.MeshStandardMaterial({ color: scenario.avatarColor });
    const intruderBody = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, 9.5, 12), intruderBodyMat);
    intruderBody.position.y = 5.8;
    intruderGroup.add(intruderBody);

    const intruderHead = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
    intruderHead.position.y = 12;
    intruderGroup.add(intruderHead);

    const boxMat = new THREE.MeshStandardMaterial({ color: scenario.boxColor });
    const box = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.2, 3.8), boxMat);
    box.position.set(0, 6, -2.8);
    box.visible = scenario.hasBox;
    intruderGroup.add(box);

    intruderGroup.position.set(1, 0, 16);
    scene.add(intruderGroup);

    sceneStateRef.current.intruderMesh = intruderGroup;
    sceneStateRef.current.boxMesh = box;

    let animId;
    let lastTime = performance.now();

    const animate = (time) => {
      animId = requestAnimationFrame(animate);
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // Smooth door sliding
      doorLeft.position.x += (sceneStateRef.current.doorLeftTarget - doorLeft.position.x) * 0.1;
      doorRight.position.x += (sceneStateRef.current.doorRightTarget - doorRight.position.x) * 0.1;

      // Intruder movement
      if (intruderGroup) {
        const curZ = intruderGroup.position.z;
        const targetZ = sceneStateRef.current.intruderZTarget;
        const diff = targetZ - curZ;

        if (Math.abs(diff) > 0.1) {
          intruderGroup.position.z += diff * 0.08;
          sceneStateRef.current.walkingBob += delta * 12;
          intruderGroup.position.y = Math.abs(Math.sin(sceneStateRef.current.walkingBob)) * 0.6;
        } else {
          intruderGroup.position.y = 0;
        }
      }

      // Strobe Light on Breach
      if (sceneStateRef.current.isAlarming) {
        strobeLight.intensity = Math.sin(time * 0.015) > 0 ? 3.5 : 0.2;
        rfidBeaconMat.color.setHex(0xe11d48);
      } else {
        strobeLight.intensity = 0;
        rfidBeaconMat.color.setHex(decision === 'pass' ? 0x10b981 : 0x06b6d4);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedScenarioIdx, scenario, decision]);

  const switchScenario = (idx) => {
    playSimSound('radio');
    setSelectedScenarioIdx(idx);
    setDecision(null);
    setBadgeInspected(false);
    setUvMode(false);
    setRfidScanned(false);
    sceneStateRef.current.doorLeftTarget = -3.8;
    sceneStateRef.current.doorRightTarget = 3.8;
    sceneStateRef.current.intruderZTarget = 16;
    sceneStateRef.current.isAlarming = false;
  };

  const handleDecision = (type) => {
    setDecision(type);
    if (type === 'fail') {
      playSimSound('fail');
      sceneStateRef.current.doorLeftTarget = -9.5;
      sceneStateRef.current.doorRightTarget = 9.5;
      sceneStateRef.current.intruderZTarget = -6;
      sceneStateRef.current.isAlarming = true;
    } else {
      playSimSound('pass');
      sceneStateRef.current.doorLeftTarget = -3.8;
      sceneStateRef.current.doorRightTarget = 3.8;
      sceneStateRef.current.intruderZTarget = 24;
      sceneStateRef.current.isAlarming = false;
      setSolvedScenarios((prev) => ({ ...prev, [selectedScenarioIdx]: true }));
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#10b981', '#06b6d4'],
        });
      } catch {}
    }
  };

  const resetSim = () => {
    playSimSound('radio');
    setDecision(null);
    sceneStateRef.current.doorLeftTarget = -3.8;
    sceneStateRef.current.doorRightTarget = 3.8;
    sceneStateRef.current.intruderZTarget = 16;
    sceneStateRef.current.isAlarming = false;
  };

  const solvedCount = Object.keys(solvedScenarios).length;

  return (
    <div className="glass-panel" style={{ padding: '3rem', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <span className="section-tag" style={{ color: 'var(--accent-purple)', borderColor: 'rgba(139,92,246,0.3)' }}>
          Tactile 3D WebGL Scenario Simulation
        </span>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', margin: '0.4rem 0' }}>
          Physical Perimeter Defense &amp; Tailgating Challenge
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-world physical social engineering scenarios. Test situational awareness against unbadged visitors, urgency coercion, and tailgating traps inside a 3D security operations center.
        </p>
      </div>

      {/* Scenario Switcher Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {DRILL_SCENARIOS.map((scen, i) => {
          const isSelected = i === selectedScenarioIdx;
          const isSolved = solvedScenarios[i];
          return (
            <button
              key={scen.id}
              onClick={() => switchScenario(i)}
              style={{
                background: isSelected ? 'var(--accent-purple)' : 'var(--bg-dark-elevated)',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${isSelected ? 'var(--accent-purple)' : 'var(--border-subtle)'}`,
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>{scen.tag}</span>
              <span>{scen.title}</span>
              {isSolved && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Three.js WebGL Viewport with CCTV Digital HUD */}
        <div style={{ background: '#080c16', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
          {/* Top CCTV Overlay */}
          <div style={{ position: 'absolute', top: '10px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', zIndex: 10, fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.65)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444', animation: 'telemetryPulse 1.5s infinite' }} />
              <span style={{ color: '#ef4444', fontWeight: 800 }}>REC [●] 1080p 60FPS</span>
              <span style={{ color: '#64748b' }}>| CAM_04 // EAST ENTRANCE</span>
            </div>

            <span
              style={{
                color: decision === 'fail' ? '#ef4444' : decision === 'pass' ? '#10b981' : 'var(--accent-cyan)',
                background: 'rgba(0,0,0,0.65)',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontWeight: 700,
              }}
            >
              {decision === 'fail' ? '● PERIMETER: BREACHED' : decision === 'pass' ? '● PERIMETER: SECURE' : '● ACTIVE CONFRONTATION'}
            </span>
          </div>

          {/* CCTV Bounding Box on Target */}
          <div
            style={{
              position: 'absolute',
              top: '28%',
              left: '42%',
              border: `2px solid ${decision === 'fail' ? '#ef4444' : decision === 'pass' ? '#10b981' : 'var(--accent-amber)'}`,
              width: '80px',
              height: '110px',
              zIndex: 9,
              pointerEvents: 'none',
              borderRadius: '4px',
              boxShadow: `0 0 12px ${decision === 'fail' ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.3)'}`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-16px',
                left: '0',
                background: 'rgba(0,0,0,0.8)',
                color: decision === 'fail' ? '#ef4444' : 'var(--accent-amber)',
                fontSize: '0.62rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.1rem 0.3rem',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              AI TARGET: {scenario.stressIndex}% Stress
            </span>
          </div>

          <div ref={mountRef} style={{ width: '100%', height: '340px' }} />

          {/* Dialogue Bar */}
          <div style={{ padding: '0.85rem 1.25rem', background: '#0b101d', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <span style={{ color: '#94a3b8' }}>Operative: </span>
              <em style={{ color: '#f1f5f9' }}>{scenario.dialogue}</em>
            </div>
            <button
              onClick={() => {
                playTactileSound('click');
                setBadgeInspected(!badgeInspected);
              }}
              style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                background: badgeInspected ? 'var(--accent-purple)' : 'rgba(255,255,255,0.08)',
                border: '1px solid var(--border-subtle)',
                color: badgeInspected ? '#ffffff' : 'var(--accent-cyan)',
                padding: '0.35rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              {badgeInspected ? (
                <span>Hide Scanner</span>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Examine Badge Hologram &amp; RFID</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Credential Inspection Terminal (UV Light & RFID Scanner) */}
          {badgeInspected && (
            <div
              style={{
                padding: '1.25rem',
                background: uvMode ? '#1e1b4b' : 'rgba(15, 23, 42, 0.98)',
                borderTop: '1px solid var(--accent-purple)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: '#f8fafc',
                transition: 'background 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-purple)', fontWeight: 800 }}>// FORENSIC BADGE SCANNER &amp; UV BLACKLIGHT</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      playTactileSound('rfid');
                      setRfidScanned(true);
                    }}
                    style={{
                      background: rfidScanned ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.1)',
                      border: '1px solid var(--border-subtle)',
                      color: rfidScanned ? 'var(--accent-emerald)' : '#cbd5e1',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
                    </svg>
                    <span>Scan RFID NFC Chip</span>
                  </button>
                  <button
                    onClick={() => {
                      playTactileSound('click');
                      setUvMode(!uvMode);
                    }}
                    style={{
                      background: uvMode ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)',
                      border: '1px solid var(--accent-purple)',
                      color: '#ffffff',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>{uvMode ? 'UV Blacklight: ON' : 'UV Blacklight: OFF'}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '4px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>RFID PACS VERDICT:</div>
                  <div style={{ color: scenario.credentialDetails.badgeFound ? '#f59e0b' : '#ef4444', fontWeight: 800 }}>
                    {rfidScanned ? scenario.rfidStatus : 'Click "Scan RFID NFC" Above'}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.68rem', marginTop: '0.2rem' }}>
                    {scenario.rfidFreq}
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '4px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>OPTICAL WATERMARK INSPECTOR:</div>
                  <div style={{ color: uvMode ? '#ec4899' : '#cbd5e1', fontWeight: 800 }}>
                    {uvMode ? scenario.uvNotice : 'Toggle UV Blacklight to inspect'}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.68rem', marginTop: '0.2rem' }}>
                    {scenario.credentialDetails.manifestCheck}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls & Learning Psychology */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)' }}>
              TACTICAL EXERCISE ({scenario.threatCategory})
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
              Score: {solvedCount}/3 Mastered
            </span>
          </div>

          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Enforce Perimeter Security Protocol
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Social engineering exploits courtesy and haste reflexes. Over 68% of employees hold secure doors when an unknown person appears polite, rushed, or intimidating.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              onClick={() => handleDecision('fail')}
              style={{
                borderColor: decision === 'fail' ? '#ef4444' : 'var(--border-medium)',
                background: decision === 'fail' ? 'rgba(239,68,68,0.2)' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              Hold Door (Courtesy Trap)
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleDecision('pass')}
              style={{
                background: decision === 'pass' ? 'var(--accent-emerald)' : 'var(--accent-crimson)',
                boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)',
                transition: 'all 0.15s ease',
              }}
            >
              Challenge Credentials Policy
            </button>
            {decision && (
              <button
                onClick={resetSim}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>↺ Reset Drill</span>
              </button>
            )}
          </div>

          {decision === 'fail' && (
            <div style={{ padding: '1.1rem', borderRadius: '8px', background: 'rgba(239,68,68,0.12)', borderLeft: '3px solid #ef4444', fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5, animation: 'fadeIn 0.2s ease-out' }}>
              <strong style={{ color: '#ef4444' }}>SIMULATED BREACH: </strong>
              {scenario.failExplanation}
            </div>
          )}

          {decision === 'pass' && (
            <div style={{ padding: '1.1rem', borderRadius: '8px', background: 'rgba(16,185,129,0.12)', borderLeft: '3px solid var(--accent-emerald)', fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5, animation: 'fadeIn 0.2s ease-out' }}>
              <strong style={{ color: 'var(--accent-emerald)' }}>DEFENSIVE SUCCESS: </strong>
              {scenario.passExplanation}
            </div>
          )}

          <div style={{ marginTop: '1.25rem', background: 'var(--bg-dark-elevated)', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Retention Science: <strong style={{ color: 'var(--text-primary)' }}>Stress Inoculation Training (SIT)</strong> creates kinesthetic neural pathways yielding <strong style={{ color: 'var(--accent-emerald)' }}>84% 6-month retention</strong> vs 12% for video training.
          </div>
        </div>
      </div>
    </div>
  );
}
