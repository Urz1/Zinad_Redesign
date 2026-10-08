/**
 * Z-ROI CALCULATOR: Enterprise Human Risk & Financial Reduction Engine
 * Calculates estimated breach avoidance, insurance premium discounts, and time savings.
 */

export function initRoiCalculator() {
  const slider = document.getElementById('roi-employee-slider');
  const countDisplay = document.getElementById('roi-employee-count');
  const savingsDisplay = document.getElementById('roi-savings-amount');
  const riskDropDisplay = document.getElementById('roi-risk-drop');
  const hoursSavedDisplay = document.getElementById('roi-hours-saved');

  if (!slider) return;

  function updateMetrics(employees) {
    // Benchmark assumptions (IBM / Ponemon Cost of a Data Breach + Verizon DBIR):
    // Average cost per employee exposure risk: ~$140/yr
    // ZiSoft mitigation rate: ~78%
    const annualSavings = Math.round(employees * 140 * 0.78);
    const hoursSaved = Math.round(employees * 0.28); // 0.28 admin hours saved per employee annually
    
    // Formatting
    if (countDisplay) {
      countDisplay.textContent = Number(employees).toLocaleString();
    }
    if (savingsDisplay) {
      savingsDisplay.textContent = '$' + annualSavings.toLocaleString();
    }
    if (riskDropDisplay) {
      riskDropDisplay.textContent = '78.4%';
    }
    if (hoursSavedDisplay) {
      hoursSavedDisplay.textContent = hoursSaved.toLocaleString() + ' hrs';
    }
  }

  slider.addEventListener('input', (e) => {
    updateMetrics(e.target.value);
  });

  // Initial calculation
  updateMetrics(slider.value || 2500);
}
