'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from './ModalContext';

import ZinadLogo from './ZinadLogo';

export default function Footer() {
  const { openDemo } = useModal();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ marginBottom: '1rem' }}>
              <ZinadLogo size="default" />
            </div>
            <p>
              Global leader in Cybersecurity Awareness, Human Threat Intelligence, and Offensive Red Teaming simulations since 2014.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Solutions</h4>
            <ul className="footer-links">
              <li><Link href="/product-zisoft">ZiSoft Threat Intel</Link></li>
              <li><Link href="/zi-games-page">ZIGAMES VR &amp; WebGL</Link></li>
              <li><Link href="/products-cybersecurity-awarness-campaigns">Red Team Campaigns</Link></li>
              <li><Link href="/product-css">CSS Crowdsourced Pentest</Link></li>
              <li><Link href="/product-evenue">Evenue Event Platform</Link></li>
              <li><Link href="/all-products">Platform Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Company &amp; Ecosystem</h4>
            <ul className="footer-links">
              <li><Link href="/about">About ZINAD Heritage</Link></li>
              <li><Link href="/partners">Partner Program &amp; Tiers</Link></li>
              <li><Link href="/careers">Careers (5 Openings)</Link></li>
              <li><Link href="/about#champion">Global Cyber Champion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Research &amp; Exploit Labs</h4>
            <ul className="footer-links">
              <li><Link href="/cy-insights">CY Insights Research Hub</Link></li>
              <li><Link href="/cy-insights#react2shell">CVE-2025-55182 React2Shell</Link></li>
              <li><Link href="/about#accreditations">Gartner Peer Reviews (4.8 / 5.0)</Link></li>
              <li><Link href="/about#accreditations">SOC 2 &amp; ISO 27001 ISMS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Client Support</h4>
            <ul className="footer-links">
              <li><Link href="/support">Support Hub &amp; Ticket Intake</Link></li>
              <li><Link href="/support#sla">Enterprise SLA Commitments</Link></li>
              <li>
                <button
                  onClick={openDemo}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-crimson)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: 'inherit',
                  }}
                >
                  Book Enterprise Demo ❯
                </button>
              </li>
              <li><a href="mailto:contact@zinad.net">contact@zinad.net</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 ZINAD Security Systems. All rights reserved. Operating across the US and 20+ countries.</div>
          <div className="status-pill">
            <span className="hero-pill-status"></span>
            <span>Telemetry Network: Online (Latency: 28ms)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
