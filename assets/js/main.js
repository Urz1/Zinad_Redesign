/**
 * Z-CORE CONTROLLER: Main application orchestrator
 */

import { initThreatGlobe } from './threat-globe.js';
import { initPhishingSandbox } from './phishing-sandbox.js';
import { initRoiCalculator } from './roi-calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Homepage Components
  if (document.getElementById('hero-threat-globe')) {
    initThreatGlobe('hero-threat-globe');
  }

  if (document.getElementById('btn-report-phish')) {
    initPhishingSandbox();
  }

  if (document.getElementById('roi-employee-slider')) {
    initRoiCalculator();
  }

  // 2. Generic Tab Switcher Logic
  const tabContainers = document.querySelectorAll('.tabs-wrapper');
  tabContainers.forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const panes = container.querySelectorAll('.tab-pane');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        btns.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = container.querySelector(`#${targetId}`);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  });

  // 3. Dynamic Live Threat Ticker
  const tickerNumber = document.getElementById('live-attacks-blocked');
  if (tickerNumber) {
    let count = 8421940;
    setInterval(() => {
      count += Math.floor(Math.random() * 4) + 1;
      tickerNumber.textContent = count.toLocaleString();
    }, 2800);
  }

  // 4. Modal Triggers
  const demoModal = document.getElementById('demo-modal');
  const demoBtns = document.querySelectorAll('.trigger-demo-modal');
  const closeModals = document.querySelectorAll('.close-modal');

  demoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoModal) demoModal.style.display = 'flex';
    });
  });

  closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
      if (demoModal) demoModal.style.display = 'none';
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === demoModal) {
      demoModal.style.display = 'none';
    }
  });
});
