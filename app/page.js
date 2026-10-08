import React from 'react';
import Link from 'next/link';
import HeroShieldMesh from '../components/HeroShieldMesh';
import DynamicThreatGlobe from '../components/DynamicThreatGlobe';
import HeroLiveSection from '../components/HeroLiveSection';
import GlobalMetricsStrip from '../components/GlobalMetricsStrip';
import TrustedByLogos from '../components/TrustedByLogos';
import PhishingSandbox from '../components/PhishingSandbox';
import EcosystemModulesGrid from '../components/EcosystemModulesGrid';
import RoiCalculator from '../components/RoiCalculator';
import EnterpriseTestimonials from '../components/EnterpriseTestimonials';
import EnterpriseIntegrationsGrid from '../components/EnterpriseIntegrationsGrid';
import AnnouncementsSection from '../components/AnnouncementsSection';
import CertificationsTrustBar from '../components/CertificationsTrustBar';
import GlobalOfficesSection from '../components/GlobalOfficesSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section with GPU-Accelerated Defense Shield Mesh & 3D Threat Globe */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
        <HeroShieldMesh />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-split">
            <div className="hero-content">
              <div className="hero-badge-strip">
                <div className="hero-pill">
                  <span className="hero-pill-status"></span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>Gartner Peer Insights 4.8</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24" style={{ flexShrink: 0 }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                </div>
                <div className="hero-pill">
                  <span>Black Hat USA 2025 (Booth #1867)</span>
                </div>
                <div className="hero-pill">
                  <span>NIST CSF 2.0 Aligned</span>
                </div>
              </div>

              <h1 className="hero-title">
                Stop Phishing at the <span className="hero-highlight">Human Endpoint</span>.
              </h1>

              <p className="hero-description">
                ZiSoft unites AI-personalized attack simulations with real-time incident response telemetry transforming your workforce from a security liability into an active cyber defense sensor network.
              </p>

              {/* Interactive Client Island: Live Attacks Ticker + Demo CTAs */}
              <HeroLiveSection />
            </div>

            {/* Dynamic 3D Three.js Threat Globe Client Island */}
            <DynamicThreatGlobe />
          </div>
        </div>
      </section>

      {/* 2. Enterprise Customer Trust & Strategic Alliances Infinite Marquee */}
      <TrustedByLogos />

      {/* 3. Global Operational Metrics Strip (1M+ Licenses, 25+ Countries, 100+ Red Team, 8.5M+ LOC) */}
      <GlobalMetricsStrip />

      {/* 3. Interactive 60-Second Phishing Inspection Sandbox */}
      <PhishingSandbox />

      {/* 4. Complete 12-Module Ecosystem Grid (ZiSoft Full Suite) */}
      <EcosystemModulesGrid />

      {/* 5. Executive ROI & Risk Reduction Calculator */}
      <div id="roi-calc">
        <RoiCalculator />
      </div>

      {/* 6. Multi-Sector Enterprise Testimonials & Gartner Peer Insights Dossier */}
      <EnterpriseTestimonials />

      {/* 7. Enterprise SIEM/SOAR & SecOps Ecosystem Integrations */}
      <EnterpriseIntegrationsGrid />

      {/* 8. Industry Summits & Strategic Announcements (Black Hat, RSA, AmiViz) */}
      <AnnouncementsSection />

      {/* 8. Team Certifications & Compliance Trust Bar (OSCP, ISO 20000, Cisco CCIE) */}
      <CertificationsTrustBar />

      {/* 9. Tri-Continental Global Footprint (San Francisco, Riyadh, Dubai) */}
      <GlobalOfficesSection />
    </>
  );
}
