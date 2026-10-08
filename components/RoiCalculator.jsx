'use client';

import React, { useState } from 'react';

// Ponemon Institute & IBM Cost of a Data Breach Benchmark Data
const INDUSTRY_PROFILES = [
  { name: 'Financial Services & Banking', avgBreachCost: 5900000, phishRiskIndex: 1.45 },
  { name: 'Healthcare & Life Sciences', avgBreachCost: 10930000, phishRiskIndex: 1.85 },
  { name: 'Technology & Cloud SaaS', avgBreachCost: 4660000, phishRiskIndex: 1.25 },
  { name: 'Energy, Oil & Utilities', avgBreachCost: 4780000, phishRiskIndex: 1.35 },
  { name: 'Retail, Manufacturing & E-Com', avgBreachCost: 3600000, phishRiskIndex: 1.05 },
  { name: 'Government & Defense', avgBreachCost: 4200000, phishRiskIndex: 1.50 },
];

export default function RoiCalculator() {
  const [employees, setEmployees] = useState(2500);
  const [selectedIndustry, setSelectedIndustry] = useState(0); // Financial default
  const [cadence, setCadence] = useState('continuous'); // annual, quarterly, continuous

  const industry = INDUSTRY_PROFILES[selectedIndustry];

  // Cadence multipliers based on behavioral decay research (Ebbinghaus forgetting curve)
  const cadenceMultiplier = {
    annual: 0.18,       // 18% retention improvement
    quarterly: 0.44,    // 44% retention improvement
    continuous: 0.784,  // 78.4% retention improvement with ZiSoft adaptive AI
  }[cadence];

  // Financial calculations
  const baselineBreachRiskAnnual = 0.279; // 27.9% annual breach probability for 2500+ orgs (Ponemon)
  const clickDropPercentage = cadenceMultiplier;
  
  // Direct capital loss avoided: breach probability reduction * avg breach cost
  const avoidedAnnualBreachLoss = Math.round(
    baselineBreachRiskAnnual * clickDropPercentage * industry.avgBreachCost * (employees / 5000)
  );

  // SOC analyst triage time saved: 14 mins avg triage per reported false alarm / unhandled click
  const simulatedAttacksPerYear = cadence === 'continuous' ? employees * 12 : cadence === 'quarterly' ? employees * 4 : employees;
  const triageHoursSaved = Math.round((simulatedAttacksPerYear * 0.08 * 14) / 60);
  const triageCostSaved = triageHoursSaved * 65; // $65/hr SOC tier-1 blended rate

  // Cyber insurance underwriting credit (typically 12-25% premium discount for verified continuous adaptive drills)
  const estimatedInsuranceSavings = Math.round(employees * 18.5 * (cadence === 'continuous' ? 1.0 : cadence === 'quarterly' ? 0.4 : 0.1));

  // Program cost approximation for net ROI
  const estimatedPlatformCost = Math.round(employees * 22);
  const totalAnnualValue = avoidedAnnualBreachLoss + triageCostSaved + estimatedInsuranceSavings;
  const netRoi = Math.round(((totalAnnualValue - estimatedPlatformCost) / estimatedPlatformCost) * 100);

  return (
    <section id="roi-calculator" className="section" style={{ borderTop: '1px solid var(--border-subtle)', background: 'transparent' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag" style={{ color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            Financial Risk Modeling
          </span>
          <h2 className="section-title">CISO Security Investment ROI Calculator</h2>
          <p className="section-subtitle">
            Calibrated against Ponemon Institute &amp; IBM Security breach cost benchmarks to quantify measurable capital preservation.
          </p>
        </div>

        <div className="calc-box glass-panel">
          {/* Input Controls */}
          <div>
            <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Organization Profile Inputs</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Calibrate metrics according to your vertical sector risk exposure and organizational scale.
            </p>

            {/* Industry Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                INDUSTRY VERTICAL &amp; BASELINE EXPOSURE:
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-dark-elevated)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.88rem' }}
              >
                {INDUSTRY_PROFILES.map((ind, i) => (
                  <option key={i} value={i}>
                    {ind.name} (Avg Breach: ${(ind.avgBreachCost / 1000000).toFixed(1)}M)
                  </option>
                ))}
              </select>
            </div>

            {/* Headcount Slider */}
            <div className="calc-slider-wrap" style={{ marginBottom: '1.25rem' }}>
              <div className="calc-slider-label">
                <span style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>Active Enterprise Headcount:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--accent-crimson)', fontWeight: 700 }}>
                  {employees.toLocaleString()} Users
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="35000"
                step="100"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="slider-input"
                style={{ width: '100%', cursor: 'pointer', margin: '0.4rem 0' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>200 Users</span>
                <span>15,000 Users</span>
                <span>35,000+ Enterprise</span>
              </div>
            </div>

            {/* Campaign Cadence Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                SIMULATION &amp; TRAINING CADENCE:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setCadence('annual')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    background: cadence === 'annual' ? 'rgba(190, 30, 45, 0.15)' : 'var(--bg-dark-elevated)',
                    border: `1px solid ${cadence === 'annual' ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                    color: cadence === 'annual' ? 'var(--accent-crimson)' : 'var(--text-secondary)',
                    fontWeight: cadence === 'annual' ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Legacy Annual
                </button>
                <button
                  type="button"
                  onClick={() => setCadence('quarterly')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    background: cadence === 'quarterly' ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-dark-elevated)',
                    border: `1px solid ${cadence === 'quarterly' ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                    color: cadence === 'quarterly' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    fontWeight: cadence === 'quarterly' ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Quarterly CBT
                </button>
                <button
                  type="button"
                  onClick={() => setCadence('continuous')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    background: cadence === 'continuous' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-dark-elevated)',
                    border: `1px solid ${cadence === 'continuous' ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                    color: cadence === 'continuous' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    transition: 'all 0.15s ease',
                  }}
                >
                  ZiSoft Adaptive AI
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Financial Outputs */}
          <div>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                PROJECTED ANNUAL CAPITAL VALUE
              </span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                IBM Cost of Breach Benchmark
              </span>
            </div>

            <div className="calc-metrics-grid">
              <div className="calc-metric-card">
                <div className="calc-metric-number" style={{ color: 'var(--accent-emerald)' }}>
                  ${(avoidedAnnualBreachLoss / 1000).toFixed(0)}k
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.4rem', fontWeight: 600 }}>
                  Avoided Breach Capital Loss
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Based on {(clickDropPercentage * 100).toFixed(0)}% phish-prone click slash
                </div>
              </div>

              <div className="calc-metric-card">
                <div className="calc-metric-number text-cyan">
                  {triageHoursSaved.toLocaleString()} hrs
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.4rem', fontWeight: 600 }}>
                  SecOps Triage Capacity Recovered
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Equivalent to ${(triageCostSaved / 1000).toFixed(0)}k in SOC analyst labor
                </div>
              </div>

              <div className="calc-metric-card">
                <div className="calc-metric-number text-amber">
                  ${(estimatedInsuranceSavings / 1000).toFixed(0)}k
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.4rem', fontWeight: 600 }}>
                  Cyber Insurance Underwriting Credit
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Continuous telemetry meets carrier mandates
                </div>
              </div>

              <div className="calc-metric-card" style={{ background: 'rgba(190, 30, 45, 0.08)', border: '1px solid var(--border-highlight)' }}>
                <div className="calc-metric-number" style={{ color: 'var(--accent-crimson)' }}>
                  {netRoi > 0 ? `+${netRoi}%` : `${netRoi}%`}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.4rem', fontWeight: 700 }}>
                  Projected Net Program ROI
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Total Annual Value: ${(totalAnnualValue / 1000).toFixed(0)}k
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
