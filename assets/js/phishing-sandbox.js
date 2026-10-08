/**
 * Z-PHISHING SANDBOX: Interactive Threat Inspection Simulator
 * Allows enterprise buyers to experience the ZiSoft employee feedback loop live.
 */

export function initPhishingSandbox() {
  const inspectBtn = document.getElementById('btn-inspect-headers');
  const reportBtn = document.getElementById('btn-report-phish');
  const headerDrawer = document.getElementById('sandbox-header-drawer');
  const resultCard = document.getElementById('sandbox-result');
  const logTerminal = document.getElementById('sandbox-terminal-log');

  if (!reportBtn) return;

  // Web Audio Synth Chime for tactile feedback
  function playSecurityTone(success = true) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = success ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(success ? 587.33 : 220, ctx.currentTime); // D5 or A3
      if (success) {
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // Ramp to A5
      }

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext policy fallback
    }
  }

  // Toggle Header Inspector
  if (inspectBtn && headerDrawer) {
    inspectBtn.addEventListener('click', () => {
      const isVisible = headerDrawer.style.display === 'block';
      headerDrawer.style.display = isVisible ? 'none' : 'block';
      inspectBtn.textContent = isVisible ? 'Inspect RFC 5322 Headers' : 'Hide Raw Headers';
      playSecurityTone(true);
    });
  }

  // Report Phishing Action
  reportBtn.addEventListener('click', () => {
    reportBtn.disabled = true;
    reportBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Analyzing Telemetry...
    `;

    // Step 1: Simulate Real-Time SOAR Pipeline
    setTimeout(() => {
      playSecurityTone(true);

      // Trigger Confetti Celebration
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#10b981', '#06b6d4', '#e11d48']
        });
      }

      // Show Result
      if (resultCard) {
        resultCard.classList.add('active');
        resultCard.innerHTML = `
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
            <div style="width:24px;height:24px;border-radius:50%;background:#10b981;display:flex;align-items:center;justify-content:center;color:#fff;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <strong style="color:#10b981;font-size:1rem;">Spear-Phishing Attack Neutralized</strong>
          </div>
          <p style="font-size:0.85rem;color:#cbd5e1;margin-bottom:0.75rem;">
            Employee detection time: <strong>1.2 seconds</strong>. 
            Homoglyph domain <code>d0cusign-verify.net</code> blocked network-wide. 
            SOAR alert webhook dispatched to SIEM.
          </p>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;font-size:0.75rem;font-family:var(--font-mono);">
            <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:0.2rem 0.5rem;border-radius:4px;">+50 Karma Points</span>
            <span style="background:rgba(6,182,212,0.2);color:#06b6d4;padding:0.2rem 0.5rem;border-radius:4px;">Threat Level: HIGH</span>
            <span style="background:rgba(225,29,72,0.2);color:#e11d48;padding:0.2rem 0.5rem;border-radius:4px;">ReflexAware Hook: DISPATCHED</span>
          </div>
        `;
      }

      // Update Live Terminal
      if (logTerminal) {
        logTerminal.innerHTML = `
          <div>[<span style="color:#10b981;">SUCCESS</span>] Human sensor triggered: user@enterprise.com</div>
          <div>[<span style="color:#06b6d4;">ENRICH</span>] Reverse DNS: 185.220.101.44 (Anonymous Proxy)</div>
          <div>[<span style="color:#e11d48;">BLOCKED</span>] Malicious credential harvester isolated</div>
          <div>[<span style="color:#f59e0b;">METRIC</span>] Organization Risk Score decreased by <strong>1.4%</strong></div>
        `;
      }

      reportBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Reported to SOC & Neutralized
      `;
      reportBtn.classList.remove('btn-primary');
      reportBtn.classList.add('btn-emerald');
    }, 750);
  });
}
