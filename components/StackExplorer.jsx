'use client';

import React, { useState, useEffect, useRef } from 'react';

const STACK_LAYERS = [
  {
    id: 4,
    code: 'L04',
    name: 'Experiential & Cognitive Delivery',
    roleTag: 'EXPERIENTIAL',
    level: 'Layer 4 • Sensory Endpoint',
    accent: '#8b5cf6',
    subtext: 'ZIGAMES Spatial VR • AWAREA Mobile Micro-Learning • Evenue Summits',
    description: 'Directs immersive cognitive simulations to human endpoints using WebGL 3D, Meta Quest 3 spatial VR, and AWAREA mobile micro-nudges. Feeds sub-second reaction times and stress telemetry back to Layer 3.',
    telemetryIn: 'From L03: Targeted departmental lures & dynamic difficulty calibration vectors',
    telemetryOut: JSON.stringify({
      learner_session: 'vr_sim_sess_9912',
      cognitive_reaction_ms: 780,
      stress_inoculation_index: 0.92,
      audit_status: 'IMMUNIZED_PASS',
      department: 'Corporate Treasury & SWIFT Ops',
      retention_projection_days: 180
    }, null, 2),
    mitreTactics: ['T1204.001 (User Execution: Malicious Link)', 'T1204.002 (Malicious File)'],
    protocols: ['xAPI / SCORM 2004', 'WebGL 2.0 / WebXR', 'Push APNs/FCM'],
    apiEndpoint: 'POST /v1/telemetry/cognitive-feedback',
    latencySla: '0.42 ms',
  },
  {
    id: 3,
    code: 'L03',
    name: 'Core Intelligence & AI Orchestration',
    roleTag: 'ORCHESTRATION',
    level: 'Layer 3 • Central Nervous System',
    accent: '#e11d48',
    subtext: 'ZiSoft Machine Learning Core • UBA Departmental Heatmap • ReflexAware 360',
    description: 'Autonomous neural analytical core. Dynamically profiles departmental vulnerability matrices, generates adaptive 12-month behavioral roadmaps, and triggers sub-second ReflexAware SOAR containment webhooks.',
    telemetryIn: 'From L02: Weaponized scenario detonation telemetry & user click telemetry',
    telemetryOut: JSON.stringify({
      soar_alert_id: 'REFLEX-360-ALERT-9104',
      siem_target: 'splunk_hec_ingest',
      containment_sla_ms: 1100,
      risk_score_delta: -4.8,
      status: 'AUTONOMOUS_CONTAINMENT_DISPATCHED',
      remediation_actions: ['Revoke_OIDC_Tokens', 'Enforce_FIDO2_Hardware_Key']
    }, null, 2),
    mitreTactics: ['T1539 (Steal Web Session Cookie)', 'T1078 (Valid Accounts)'],
    protocols: ['OAuth 2.0 / SCIM 2.0', 'Webhook RFC 7231', 'Apache Kafka / gRPC'],
    apiEndpoint: 'POST /v2/soar/reflexaware-dispatch',
    latencySla: '0.28 ms',
  },
  {
    id: 2,
    code: 'L02',
    name: 'Active Vector Simulation Forge',
    roleTag: 'EMULATION',
    level: 'Layer 2 • Adversary Emulation',
    accent: '#06b6d4',
    subtext: 'AI Phishing Forge (QR Quishing, OAuth Spoofing) • Vishing Audio • Smishing',
    description: 'Compiles real-world adversary attack mechanics into high-fidelity safe enterprise drills, including homoglyph Punycode spoofing, reverse-proxy AiTM session hijacking, and neural speech cloning.',
    telemetryIn: 'From L01: Zero-day CVE vulnerability mechanics & exploit memory primitives',
    telemetryOut: JSON.stringify({
      campaign_id: 'forge_2026_vector_88',
      payload_type: 'OAuth_Device_Code_Phish',
      spoof_domain: 'd0cusign-verify.net',
      evasion_score: 98.4,
      polymorphic_variants_generated: 16,
      sandbox_verdict: 'BENIGN_TACTICAL_LURE'
    }, null, 2),
    mitreTactics: ['T1566.002 (Spearphishing Link)', 'T1566.003 (Spearphishing via Service)'],
    protocols: ['RFC 5322 MIME Synthesizer', 'WebRTC Audio Stream', 'SIP Trunk Relay'],
    apiEndpoint: 'POST /v1/forge/compile-payload',
    latencySla: '0.35 ms',
  },
  {
    id: 1,
    code: 'L01',
    name: 'Foundation Zero-Day Research Labs',
    roleTag: 'GROUND TRUTH',
    level: 'Layer 1 • Foundation Ground Truth',
    accent: '#10b981',
    subtext: 'Elite Red Teaming • Crowdsourced Pentesting (CSS) • Zero-Day Research Labs',
    description: 'ZINAD offensive vulnerability laboratory continuously uncovers undisclosed zero-days (such as CVE-2025-55182 React2Shell and Meta Bug Bounties). Directly supplies raw exploit telemetry upward through the operating system.',
    telemetryIn: 'Continuous Global Threat Surface & Bug Bounty Ingestion Stream',
    telemetryOut: JSON.stringify({
      cve_id: 'CVE-2025-55182',
      cvss_v4_score: 9.8,
      exploit_primitive: 'Prototype_Pollution_RCE',
      upstream_sync: 'ZINAD_RESEARCH_LAB_VERIFIED',
      bounty_reference: 'META-VR-0992-SEC',
      in_the_wild_evidence: true
    }, null, 2),
    mitreTactics: ['T1190 (Exploit Public-Facing Application)', 'T1212 (Exploitation for Credential Access)'],
    protocols: ['CVSS 4.0 Scoring Engine', 'GitLab DevSecOps', 'PGP Encrypted Feeds'],
    apiEndpoint: 'GET /v1/labs/disclosures/feed',
    latencySla: '0.19 ms',
  },
];

const ZERO_DAY_SCENARIOS = [
  {
    id: 'cve-2025-55182',
    name: 'CVE-2025-55182 React2Shell RCE',
    cvss: '9.8 CRITICAL',
    vector: 'Prototype Pollution to Remote Code Execution',
    l1Note: 'Zero-day primitive detected in Server Components',
    l2Note: 'Forged into benign weaponized demonstration lure',
    l3Note: 'UBA identifies 3 engineering teams exposed; pushes SOAR rules',
    l4Note: 'Immersive VR container breakout lab deployed to staff in 18 hrs',
  },
  {
    id: 'aitm-fido2',
    name: 'AiTM EvilProxy FIDO2 Session Steal',
    cvss: '9.1 HIGH',
    vector: 'Reverse-Proxy Device Code Hijacking',
    l1Note: 'Real-time reverse proxy interception disclosed by CSS researchers',
    l2Note: 'DocuSign homoglyph Punycode template compiled',
    l3Note: 'Azure AD Conditional Access rule generated for SOAR push',
    l4Note: 'Mobile AWAREA prompt tests employees on URL domain scrutiny',
  },
  {
    id: 'vishing-deepfake',
    name: 'Neural Voice Clone BEC Wire Fraud',
    cvss: '8.8 HIGH',
    vector: 'C-Suite Audio Synthesis & Urgency Coercion',
    l1Note: 'Red Team exploits voice authentication voiceprints',
    l2Note: 'High-entropy SIP audio vishing drill scheduled for treasury',
    l3Note: 'Dual-approval SWIFT policy lockdown dispatched to ERP',
    l4Note: 'Interactive VR audio call verification challenge activated',
  },
];

const PACKAGES = [
  {
    name: 'Essentials',
    tag: 'Core Compliance',
    layers: [3],
    badge: 'L3 Enabled',
    price: 'Entry Enterprise',
    features: ['ZiSoft LMS Core', 'Automated Phishing Engine', 'NIST CSF & ISO 27001 Crosswalk', 'Standard Email Support'],
  },
  {
    name: 'Advanced Threat',
    tag: 'Automated Defense',
    layers: [2, 3],
    badge: 'L2 + L3 Enabled',
    price: 'Mid-Market Standard',
    features: ['All Essentials Features', 'AI Simulation Forge (Quishing + AiTM)', 'ReflexAware 360 SOAR Webhooks', 'AWAREA Mobile Micro-Learning'],
    popular: true,
  },
  {
    name: 'Defense Suite',
    tag: 'Full Autonomous OS',
    layers: [1, 2, 3, 4],
    badge: 'All 4 Layers Active',
    price: 'Tier-1 Enterprise',
    features: ['All Advanced Features', 'ZIGAMES 3D WebGL & Meta Quest 3 VR Kits', 'Annual Red Team Social Engineering Drill', 'CSS Dedicated Crowdsourced Pentesting'],
  },
];

// Tactile Web Audio Synthesizer
function playBusAudio(freq1 = 440, freq2 = 880, duration = 0.09, type = 'sine') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq1, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration * 1.5);
  } catch {}
}

export default function StackExplorer() {
  const [selectedLayerId, setSelectedLayerId] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [activeTab, setActiveTab] = useState('payload');
  const [selectedTier, setSelectedTier] = useState('Defense Suite');
  const [activeScenarioId, setActiveScenarioId] = useState('cve-2025-55182');
  const [simulationLog, setSimulationLog] = useState([]);
  const [packetsRoutedCount, setPacketsRoutedCount] = useState(482910);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const canvasRef = useRef(null);
  const current = STACK_LAYERS.find((l) => l.id === selectedLayerId) || STACK_LAYERS[1];
  const activeScenario = ZERO_DAY_SCENARIOS.find((s) => s.id === activeScenarioId) || ZERO_DAY_SCENARIOS[0];

  // Canvas-based Animated Kinetic Data Bus Conduit
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = canvas.width = 44;
    let height = canvas.height = 360;

    // Glowing bus particles
    const particles = [];
    for (let i = 0; i < 16; i++) {
      particles.push({
        y: Math.random() * height,
        speed: 0.8 + Math.random() * 1.6,
        size: 2 + Math.random() * 2.5,
        color: ['#10b981', '#06b6d4', '#e11d48', '#8b5cf6'][Math.floor(Math.random() * 4)],
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Vertical bus line rails
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 6, 10);
      ctx.lineTo(width / 2 - 6, height - 10);
      ctx.moveTo(width / 2 + 6, 10);
      ctx.lineTo(width / 2 + 6, height - 10);
      ctx.stroke();

      // Center glowing fiber conduit
      const conduitGrad = ctx.createLinearGradient(0, 0, 0, height);
      conduitGrad.addColorStop(0, 'rgba(139, 92, 246, 0.6)'); // L04 Purple
      conduitGrad.addColorStop(0.35, 'rgba(225, 29, 72, 0.6)'); // L03 Crimson
      conduitGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.6)'); // L02 Cyan
      conduitGrad.addColorStop(1, 'rgba(16, 185, 129, 0.6)'); // L01 Emerald

      ctx.strokeStyle = conduitGrad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(width / 2, 8);
      ctx.lineTo(width / 2, height - 8);
      ctx.stroke();

      // Bus connection nodes at each layer level (4 equidistant anchors)
      const nodes = [height * 0.12, height * 0.38, height * 0.64, height * 0.88];
      nodes.forEach((ny, idx) => {
        const isCurLayer = (4 - idx) === selectedLayerId;
        ctx.fillStyle = isCurLayer ? '#ffffff' : 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(width / 2, ny, isCurLayer ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();

        if (isCurLayer) {
          ctx.strokeStyle = STACK_LAYERS.find(l => l.id === (4 - idx))?.accent || '#06b6d4';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(width / 2, ny, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Flowing data packet photons
      particles.forEach((p) => {
        p.y -= p.speed * (isSimulating ? 2.5 : 1);
        if (p.y < 0) p.y = height;

        p.pulse += 0.05;
        const glow = Math.sin(p.pulse) * 0.4 + 0.6;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isSimulating ? 10 : 5;
        ctx.beginPath();
        ctx.arc(width / 2, p.y, p.size * glow, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedLayerId, isSimulating]);

  // Autonomous 0-Day Scenario Cascade Engine
  const triggerZeroDayCascade = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationLog([]);

    // Sound effect: Start initiation chirp
    playBusAudio(280, 520, 0.12, 'sawtooth');

    // Stage 1: L01 Ground Truth
    setActiveStep(1);
    setSelectedLayerId(1);
    setSimulationLog([
      { time: 'T+0.00s', layer: 'L01 [Labs]', msg: `Zero-day primitive isolated: ${activeScenario.name} (${activeScenario.vector}). CVSS ${activeScenario.cvss}` }
    ]);
    setPacketsRoutedCount((prev) => prev + 142);

    // Stage 2: L02 Emulation Forge
    setTimeout(() => {
      setActiveStep(2);
      setSelectedLayerId(2);
      playBusAudio(420, 680, 0.12, 'triangle');
      setSimulationLog((prev) => [
        ...prev,
        { time: 'T+0.75s', layer: 'L02 [Forge]', msg: `${activeScenario.l2Note} (Benign weaponized template compiled)` }
      ]);
      setPacketsRoutedCount((prev) => prev + 310);

      // Stage 3: L03 AI Orchestration
      setTimeout(() => {
        setActiveStep(3);
        setSelectedLayerId(3);
        playBusAudio(620, 940, 0.12, 'sine');
        setSimulationLog((prev) => [
          ...prev,
          { time: 'T+1.50s', layer: 'L03 [AI ML]', msg: `${activeScenario.l3Note} ReflexAware SIEM/SOAR webhooks pre-armed (<1.2s SLA)` }
        ]);
        setPacketsRoutedCount((prev) => prev + 520);

        // Stage 4: L04 Experiential Delivery
        setTimeout(() => {
          setActiveStep(4);
          setSelectedLayerId(4);
          playBusAudio(840, 1320, 0.22, 'sine');
          setSimulationLog((prev) => [
            ...prev,
            { time: 'T+2.25s', layer: 'L04 [Sensory]', msg: `${activeScenario.l4Note} Entire enterprise immunized in <24 hours!` }
          ]);
          setPacketsRoutedCount((prev) => prev + 890);

          setTimeout(() => {
            setIsSimulating(false);
            setActiveStep(null);
            playBusAudio(1100, 1500, 0.18, 'sine');
          }, 850);
        }, 750);
      }, 750);
    }, 750);
  };

  const handleCopyPayload = () => {
    try {
      navigator.clipboard.writeText(current.telemetryOut);
      setCopiedPayload(true);
      playBusAudio(700, 950, 0.06);
      setTimeout(() => setCopiedPayload(false), 2000);
    } catch {}
  };

  return (
    <div style={{ marginBottom: '4rem' }}>
      {/* 1. KINETIC ARCHITECTURE WORKBENCH */}
      <div
        className="glass-panel"
        style={{
          border: '1px solid var(--border-medium)',
          borderRadius: '14px',
          padding: '1.75rem 2rem',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-dark-surface)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Ambient Top Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '450px',
            height: '280px',
            background: `radial-gradient(ellipse at top right, ${current.accent}18, transparent 70%)`,
            pointerEvents: 'none',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Workbench Header Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.25rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cyan)',
                  background: 'rgba(6, 182, 212, 0.12)',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                }}
              >
                HROS v4.2 • Cybernetic Architecture Topology
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                4 Synchronized Strata
              </span>
            </div>
            <h3 style={{ fontSize: '1.55rem', margin: 0, color: 'var(--text-primary)', fontWeight: 800 }}>
              The ZINAD Human Risk Operating System (HROS)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: '0.35rem 0 0', maxWidth: '680px' }}>
              How real-world zero-day exploit primitives flow upward from offensive research into immediate behavioral workforce reflexes.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-dark-elevated)',
                border: '1px solid var(--border-subtle)',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isSimulating ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
                  boxShadow: `0 0 10px ${isSimulating ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}`,
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Bus: <strong style={{ color: 'var(--text-primary)' }}>{isSimulating ? 'CASCADE ACTIVE' : 'STEADY (0.42ms)'}</strong>
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--bg-dark-elevated)',
                border: '1px solid var(--border-subtle)',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>Packets:</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>{packetsRoutedCount.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* 2-Column Balanced Workbench Body with Live Kinetic Bus Column */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(330px, 1.1fr) minmax(350px, 0.9fr)', gap: '1.75rem', alignItems: 'stretch' }}>
          
          {/* Left Column: Vertical Chassis Rack + Interactive Conduit + Cascade Trigger */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Strata Rack with Conduit */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
              
              {/* Animated Vertical Canvas Bus Spine */}
              <div
                style={{
                  width: '44px',
                  flexShrink: 0,
                  background: 'var(--bg-dark-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                title="Real-time Inter-Layer Data Bus Conduit"
              >
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>

              {/* 4 Stratum Cards (Top = L04 Experiential, Bottom = L01 Ground Truth) */}
              <div
                style={{
                  flex: 1,
                  background: 'var(--bg-dark-elevated)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                }}
              >
                {STACK_LAYERS.map((layer) => {
                  const isSelected = selectedLayerId === layer.id;
                  const isStepActive = activeStep === layer.id;

                  return (
                    <div
                      key={layer.id}
                      onClick={() => {
                        if (!isSimulating) {
                          setSelectedLayerId(layer.id);
                          playBusAudio(380 + layer.id * 100, 480 + layer.id * 100, 0.05);
                        }
                      }}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.7rem 0.95rem',
                        borderRadius: '6px',
                        cursor: isSimulating ? 'default' : 'pointer',
                        background: isStepActive
                          ? `${layer.accent}25`
                          : isSelected
                          ? 'var(--bg-dark-surface)'
                          : 'transparent',
                        border: `1px solid ${
                          isStepActive
                            ? layer.accent
                            : isSelected
                            ? `${layer.accent}80`
                            : 'transparent'
                        }`,
                        transition: 'all 0.18s ease',
                        boxShadow: isStepActive
                          ? `0 0 16px ${layer.accent}40`
                          : isSelected
                          ? `0 2px 10px rgba(0,0,0,0.2)`
                          : 'none',
                      }}
                    >
                      {/* Left: Code badge and title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            background: isSelected ? layer.accent : 'rgba(255,255,255,0.05)',
                            color: isSelected ? '#ffffff' : layer.accent,
                            border: `1px solid ${layer.accent}60`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            flexShrink: 0,
                            boxShadow: isStepActive ? `0 0 12px ${layer.accent}` : 'none',
                          }}
                        >
                          {layer.code}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '0.88rem',
                              fontWeight: 700,
                              color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {layer.name}
                          </div>
                          <div
                            style={{
                              fontSize: '0.71rem',
                              color: 'var(--text-muted)',
                              fontFamily: 'var(--font-mono)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {layer.subtext.split('•')[0].trim()}
                          </div>
                        </div>
                      </div>

                      {/* Right: Tag and active node indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.64rem',
                            fontWeight: 700,
                            color: layer.accent,
                            background: `${layer.accent}15`,
                            padding: '0.15rem 0.45rem',
                            borderRadius: '3px',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {layer.roleTag}
                        </span>
                        <span
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: isStepActive ? '#ffffff' : isSelected ? layer.accent : 'transparent',
                            border: `1px solid ${isSelected ? layer.accent : 'var(--border-medium)'}`,
                            boxShadow: isStepActive ? `0 0 8px ${layer.accent}` : 'none',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zero-Day Cascade Injection Station */}
            <div
              style={{
                background: 'var(--bg-dark-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.9rem 1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {/* Scenario selector strip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Inject Zero-Day Primitive:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {ZERO_DAY_SCENARIOS.map((scen) => (
                    <button
                      key={scen.id}
                      onClick={() => {
                        if (!isSimulating) setActiveScenarioId(scen.id);
                      }}
                      disabled={isSimulating}
                      style={{
                        background: activeScenarioId === scen.id ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-dark-surface)',
                        border: `1px solid ${activeScenarioId === scen.id ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                        color: activeScenarioId === scen.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        cursor: isSimulating ? 'default' : 'pointer',
                        fontWeight: activeScenarioId === scen.id ? 700 : 500,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {scen.id.startsWith('cve') ? 'CVE-2025-55182' : scen.id.includes('aitm') ? 'EvilProxy AiTM' : 'Voice Deepfake'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Master Cascade Button */}
              <button
                onClick={triggerZeroDayCascade}
                disabled={isSimulating}
                style={{
                  background: isSimulating ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  color: '#07090e',
                  border: 'none',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: isSimulating ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem',
                  boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)',
                  transition: 'all 0.18s ease',
                  letterSpacing: '0.02em',
                }}
              >
                {isSimulating ? (
                  <>
                    <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span>Propagating 0-Day Through All 4 Strata...</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>Inject 0-Day Scenario Cascade (L01 → L04)</span>
                  </>
                )}
              </button>

              {/* Cascade Log Stream / Progress */}
              {simulationLog.length > 0 && (
                <div
                  style={{
                    background: '#07090e',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '6px',
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.66rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.25rem' }}>
                    // Autonomous Immunization Pipeline Telemetry:
                  </div>
                  {simulationLog.map((logItem, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start' }}>
                      <span style={{ color: '#64748b', flexShrink: 0 }}>{logItem.time}</span>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, flexShrink: 0 }}>{logItem.layer}</span>
                      <span style={{ color: '#cbd5e1' }}>{logItem.msg}</span>
                    </div>
                  ))}
                  {!isSimulating && (
                    <div style={{ marginTop: '0.3rem', paddingTop: '0.3rem', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>IMMUNIZATION COMPLETE</span>
                      </span>
                      <span>SLA: 18h 42m (Industry Avg: 94 Days)</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Stratum Telemetry Inspector Console */}
          <div
            style={{
              background: 'var(--bg-dark-elevated)',
              border: `1px solid ${current.accent}60`,
              borderRadius: '10px',
              padding: '1.4rem 1.6rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: `0 8px 30px rgba(0,0,0,0.25), 0 0 25px ${current.accent}12`,
              position: 'relative',
            }}
          >
            <div>
              {/* Header Spec Strip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: current.accent,
                      boxShadow: `0 0 10px ${current.accent}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: current.accent,
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                    }}
                  >
                    STRATUM TELEMETRY // {current.code}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-dark-surface)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    SLA: {current.latencySla}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--accent-cyan)',
                      background: 'rgba(6, 182, 212, 0.1)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                    }}
                  >
                    TLS 1.3 / ChaCha20
                  </span>
                </div>
              </div>

              {/* Title & Concise Summary */}
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', margin: '0 0 0.4rem', fontWeight: 800 }}>
                {current.name}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 1rem' }}>
                {current.description}
              </p>

              {/* Console Mode Tabs */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.4rem',
                  marginBottom: '0.85rem',
                }}
              >
                <button
                  onClick={() => setActiveTab('payload')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'payload' ? current.accent : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.5rem',
                    borderBottom: activeTab === 'payload' ? `2px solid ${current.accent}` : '2px solid transparent',
                  }}
                >
                  Telemetry Stream (JSON)
                </button>
                <button
                  onClick={() => setActiveTab('mitre')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'mitre' ? current.accent : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.5rem',
                    borderBottom: activeTab === 'mitre' ? `2px solid ${current.accent}` : '2px solid transparent',
                  }}
                >
                  MITRE ATT&amp;CK Mapping
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'api' ? current.accent : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.5rem',
                    borderBottom: activeTab === 'api' ? `2px solid ${current.accent}` : '2px solid transparent',
                  }}
                >
                  Ingress &amp; APIs
                </button>
              </div>

              {/* Interactive Telemetry Box */}
              {activeTab === 'payload' ? (
                <div
                  style={{
                    background: '#07090e',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.85rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    maxHeight: '140px',
                    overflowY: 'auto',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.68rem' }}>// Real-time Event Stream Output:</span>
                    <button
                      onClick={handleCopyPayload}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: copiedPayload ? 'var(--accent-emerald)' : '#cbd5e1',
                        fontSize: '0.64rem',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {copiedPayload ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Copied</span>
                        </span>
                      ) : (
                        'Copy JSON'
                      )}
                    </button>
                  </div>
                  <pre style={{ margin: 0, color: current.accent, lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
{current.telemetryOut}
                  </pre>
                </div>
              ) : activeTab === 'mitre' ? (
                <div
                  style={{
                    background: 'var(--bg-dark-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.85rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    minHeight: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>INTERCEPTED MITRE ATT&amp;CK TECHNIQUES:</div>
                  {current.mitreTactics.map((tactic, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--bg-dark-elevated)',
                        border: `1px solid ${current.accent}40`,
                        borderRadius: '4px',
                        padding: '0.45rem 0.65rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span style={{ color: current.accent, fontWeight: 700 }}>▸</span>
                      <span style={{ color: 'var(--text-primary)' }}>{tactic}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Automated mapping to Enterprise Matrix v15.1
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: 'var(--bg-dark-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.85rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    minHeight: '140px',
                  }}
                >
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginBottom: '0.15rem' }}>ENDPOINT / INTERFACE:</div>
                  <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.6rem' }}>{current.apiEndpoint}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginBottom: '0.15rem' }}>UPSTREAM INGRESS:</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.74rem' }}>{current.telemetryIn}</div>
                </div>
              )}
            </div>

            {/* Protocol Chips Strip */}
            <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  COMPLIANCE &amp; PROTOCOLS:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {current.protocols.map((proto, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--bg-dark-surface)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                        padding: '0.18rem 0.5rem',
                        borderRadius: '3px',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED ENTERPRISE SUBSCRIPTION PACKAGING */}
      <div style={{ marginTop: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-tag">Tier Packaging</span>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: '0.35rem 0 0.5rem', fontWeight: 800 }}>
            Enterprise Subscription Packaging
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto' }}>
            Choose the operational coverage depth that matches your organization&apos;s risk tolerance and workforce scale.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {PACKAGES.map((pkg) => {
            const isSelected = selectedTier === pkg.name;
            return (
              <div
                key={pkg.name}
                onClick={() => {
                  setSelectedTier(pkg.name);
                  playBusAudio(500, 680, 0.05);
                }}
                style={{
                  background: isSelected ? 'var(--bg-dark-elevated)' : 'var(--bg-dark-surface)',
                  border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                  borderRadius: '12px',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 12px 36px rgba(6, 182, 212, 0.18)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {pkg.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '18px',
                      background: 'var(--accent-crimson)',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}
                  >
                    RECOMMENDED
                  </span>
                )}
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {pkg.tag}
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: '0 0 0.35rem', fontWeight: 800 }}>
                    {pkg.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                    {pkg.badge}
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem', color: 'var(--text-secondary)', padding: 0, margin: 0 }}>
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Tier Profile
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                    {pkg.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
