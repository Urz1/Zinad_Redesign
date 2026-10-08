# ZINAD — AI-Powered Human Threat Intelligence & Cybersecurity Platform

> **Next-Generation Enterprise Redesign & Interactive Threat Cockpit Suite**  
> Engineered with **Next.js 16 (App Router)**, **React 19**, **Three.js WebGL Spatial Computing**, and real-time interactive cybersecurity simulations.

---

## Executive Overview

**ZINAD** transforms human risk into verifiable organizational cyber resilience. This repository houses the reimagined, state-of-the-art enterprise web platform for ZINAD, featuring interactive security simulations, 3D WebGL visualizations, real-time telemetry dashboards, and an enterprise design system adhering to global SOC and defense-grade aesthetic standards.

### Key Architectural Standards
- **Zero Informal Emojis**: 100% clean, standardized inline enterprise SVG iconography engineered for defense and compliance audits.
- **Dual Visual Themes**: Native Dark (SOC Cockpit) and Clean Light enterprise modes with automatic persistence.
- **Deep MITRE ATT&CK & CVSS 4.0 Alignment**: Threat simulation modules map directly to standardized kill-chains and CVE disclosures.
- **Cross-Component Telemetry Fabric**: Live simulation actions (e.g., neutralizing a phishing payload) propagate across the WebGL Threat Globe and 3D Hero Shield Mesh in real time.

---

## 7 Elevated Interactive Threat Simulations

The platform features seven high-fidelity interactive cyber simulation cockpits built specifically for hands-on enterprise demonstrations:

| Simulation Cockpit | Route | Core Technical Features |
| :--- | :--- | :--- |
| **1. ZiSoft Command Center** | `/product-zisoft` | Dual-cockpit layout (Policy Builder vs. Live SOAR Execution Terminal), 5-phase MITRE ATT&CK kill-chain timeline, laser shredder particle beam quarantine, automated SOC ticketing with incident escalation logs. |
| **2. Tailgating Challenge** | `/` (Interactive Section) | Cinematic CCTV HUD with CRT scanline filters, motion-tracking vector bounding boxes, dynamic badge UV/RFID verifier, audio-reactive haptic feedback, real-time security operator verdict scoring. |
| **3. Tactical RF Doppler Radar** | `/products-cybersecurity-awarness-campaigns` | 360-degree rotating radar sweep with persistent phosphor decay, RF waterfall spectrogram with live dBm visualizer, multi-band frequency triage (Wi-Fi 6E, Zigbee, BLE, LoRaWAN), and electronic countermeasure jamming triggers. |
| **4. CSS Zero-Day Disclosures Chamber** | `/product-css` | Cleanroom detonation chamber with warning containment barriers, CVSS 4.0 multidimensional vulnerability polygon radar, live simulated CPU register state (RAX, RBX, RIP, RSP) monitoring buffer overflow exploitation, and verified vendor patch diff inspection. |
| **5. Venue Explorer & Mini-CTF** | `/zi-games-page` | Playable in-browser terminal with embedded CTF command interpreter (`help`, `recon`, `inspect`, `inject`, `payload`, `mint`), cryptographic SHA-256 certificate generation with digital signature watermark and verifiable proof of completion. |
| **6. Interactive Security Stack** | `/` (Architecture Section) | Multi-layer kinetic security architecture (Endpoint, Network, Identity, Human, Cloud), interactive high-voltage conduit data bus, 0-Day Cascade detonation testing resilient defensive containment across all layers. |
| **7. AI Phishing Sandbox** | `/` (Live Lab Section) | Cross-device chassis mirror (Desktop Workstation vs. Enterprise Smartphone), synchronized telemetry feed with live bidirectional state bridging into the 3D Hero Shield Mesh and WebGL Threat Globe. |

---

## Platform Page Routes

| Route | Page Name | Description |
| :--- | :--- | :--- |
| `/` | **Enterprise Homepage** | 3D Spatial Threat Globe, 3D Hero Shield Mesh, Live Phishing Sandbox, Interactive Security Stack, Global Metrics, and ROI Calculator. |
| `/all-products` | **Platform Architecture** | Comprehensive overview of the 12 unified modules in the ZINAD Human Defense Operating System. |
| `/product-zisoft` | **ZiSoft Platform** | AI-Powered Awareness Management System with live SOAR Orchestrator and interactive policy builder. |
| `/zi-games-page` | **ZIGAMES & Cyber Arenas** | Immersive cyber tournaments, playable Mini-CTF venue explorer, and gamified incident response training. |
| `/product-css` | **Cyber Security Services (CSS)**| Offensive penetration testing, Red Teaming, Code Audit, and Zero-Day Disclosures Detonation Chamber. |
| `/product-evenue` | **Evenue Platform** | Virtual conference, tournament, and enterprise cyber awareness hosting ecosystem. |
| `/products-cybersecurity-awarness-campaigns` | **Awareness Campaigns** | Multi-channel social engineering exercises, simulated vishing/smishing, and Tactical RF Doppler Radar. |
| `/about` | **About ZINAD** | Company heritage, leadership team, defense pedigree, and global office infrastructure. |
| `/careers` | **Careers** | Open engineering, research, and threat intelligence roles with competitive perks and benefits. |
| `/partners` | **Partners & MSSPs** | Global alliance ecosystem, MSSP integration tiers, and co-branded deployment programs. |
| `/support` | **Support & Operations** | 24/7/365 enterprise SOC SLAs, customer success access, and ticketing channels. |
| `/cy-insights` | **CY Insights & Intel** | Threat research briefs, CVE advisories, and behavioral human risk intelligence reports. |

---

## Tech Stack & Dependencies

- **Framework**: Next.js 16.3.8 (App Router)
- **UI & Reactivity**: React 19.2.8 & React DOM
- **3D Spatial Computing**: Three.js (`^0.186.1`)
- **Particle & Event Effects**: `canvas-confetti` (`^1.9.4`)
- **Styling Architecture**: Enterprise CSS Variable Design System with CSS Grid, Flexbox, glassmorphic filters, and GPU-accelerated keyframe animations.
- **Build Engine**: Webpack production compiler (`next build --webpack`)

---

## Directory Structure

```plaintext
├── app/                                    # Next.js App Router Pages & Layouts
│   ├── layout.js                           # Global HTML Shell, Font Links, Metadata & Context Wrappers
│   ├── globals.css                         # Enterprise Design System Tokens, Variables & Utility Classes
│   ├── page.js                             # Flagship Homepage with Interactive Suites
│   ├── all-products/                       # Solutions & Unified Architecture Catalog
│   ├── product-zisoft/                     # ZiSoft SOAR Orchestration & Management
│   ├── zi-games-page/                      # Cyber Arenas & Mini-CTF Venue
│   ├── product-css/                        # Cybersecurity Services & Zero-Day Chamber
│   ├── product-evenue/                     # Evenue Tournament & Venue Platform
│   ├── products-cybersecurity-awarness-campaigns/ # Campaigns & Tactical Doppler Radar
│   ├── about/                              # About ZINAD, Mission & Leadership
│   ├── careers/                            # Global Talent Acquisition & Culture
│   ├── partners/                           # MSSP & Partner Program
│   ├── support/                            # Enterprise Support, Help Center & SLA
│   └── cy-insights/                        # Threat Intelligence & Research Articles
├── components/                             # High-Fidelity Modular React Components
│   ├── Header.jsx                          # Mega-Navigation Bar with Active Links & Theme Switcher
│   ├── Footer.jsx                          # Comprehensive Enterprise Footer with ISO/SOC Badges
│   ├── ZinadLogo.jsx                       # Vector ZINAD Brand Emblem & Typography
│   ├── ThemeContext.jsx                    # SOC Dark & Enterprise Light Theme State Provider
│   ├── ModalContext.jsx                    # Global Interactive Demo Request Modal Manager
│   ├── HeroLiveSection.jsx                 # Dynamic Hero Section with Dual 3D Viewports
│   ├── HeroShieldMesh.jsx                  # Interactive Three.js 3D Geometric Shield
│   ├── ThreatGlobe.jsx                     # Interactive Three.js WebGL Earth with Live Attacks
│   ├── PhishingSandbox.jsx                 # Synchronized Dual-Chassis Workstation & Mobile Sandbox
│   ├── ZisoftCommandCenter.jsx             # Dual-Cockpit SOAR Terminal & Laser Shredder
│   ├── TailgatingChallenge.jsx             # CCTV HUD with UV/RFID Badge Scanner
│   ├── TacticalRadar.jsx                   # 360° Doppler Radar & RF Waterfall Spectrogram
│   ├── CssDisclosures.jsx                  # Zero-Day Detonation Chamber with CPU Register HUD
│   ├── VenueExplorer.jsx                   # Interactive Playable CTF Terminal & SHA-256 Minting
│   ├── StackExplorer.jsx                   # Kinetic Multi-Layer Security Bus & 0-Day Cascade
│   ├── RoiCalculator.jsx                   # Dynamic Breach Financial Impact & ROI Calculator
│   ├── EnterpriseIntegrationsGrid.jsx      # SIEM/SOAR/IdP Ecosystem Connector Matrix
│   └── TrustedByLogos.jsx                  # High-Resolution Enterprise Client & Sector Logos
├── docs/                                   # Architectural Masterplans, Audits & Research
│   ├── zinad Complete site Audit.md        # Comprehensive Audit of Zinad.net Assets & Information Architecture
│   ├── zinad core solutions Transformation masterplan.md # Architectural Blueprint for Simulation Cockpits
│   ├── core Solutions Deep Dive Critique.md# Technical Evaluation & UX Elevation Strategy
│   ├── interactive componenets and #d spatial research.md # 3D WebGL & Interactive Mechanics Research
│   └── scratchpad.md                       # Research Exploration Records & Discovery Log
├── public/                                 # Static Assets & Icons
├── .gitignore                              # Production Git Ignore Configuration
└── package.json                            # Manifest & NPM Build Scripts
```

---

## Getting Started

### Prerequisites
- Node.js 18.17.0+ or Node.js 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Urz1/Zinad_Ridesign.git
cd Zinad_Ridesign

# Install project dependencies
npm install
```

### Running Locally
```bash
# Start the local development server on port 3030
npm run dev
```
Open [http://localhost:3030](http://localhost:3030) in your browser.

### Creating an Optimized Production Build
```bash
# Compile and optimize static pages and assets
npm run build

# Start the production server
npm start
```

---

## Research & Documentation

Detailed technical research, site audits, and interactive simulation blueprints can be accessed directly in the [`docs/`](./docs) directory:
- [ZINAD Complete Site Audit](./docs/zinad%20Complete%20site%20Audit.md)
- [Core Solutions Transformation Masterplan](./docs/zinad%20core%20solutions%20Transformation%20masterplan.md)
- [Solutions Deep Dive Critique](./docs/core%20Solutions%20Deep%20Dive%20Critique.md)
- [3D Spatial & Interactive Components Research](./docs/interactive%20componenets%20and%20%23d%20spatial%20research.md)

---

## License

Private & Proprietary © ZINAD Security Systems. All rights reserved.
