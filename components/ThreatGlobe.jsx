'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { WORLD_LAND_DOTS } from './worldLandData';

// Defended Enterprise Hubs across ALL continents of the world
const ENTERPRISE_HUBS = [
  { name: 'Riyadh (KSA Hub)', region: 'Middle East', lat: 24.7136, lon: 46.6753, type: 'hq', sensors: '48,200 Nodes', status: 'Active Defense', latency: '0.8ms' },
  { name: 'Dubai (UAE Hub)', region: 'Gulf', lat: 25.2048, lon: 55.2708, type: 'hq', sensors: '18,900 Nodes', status: 'Active Defense', latency: '1.1ms' },
  { name: 'London (UK Hub)', region: 'Europe', lat: 51.5074, lon: -0.1278, type: 'hub', sensors: '14,100 Nodes', status: 'Active Defense', latency: '1.4ms' },
  { name: 'Frankfurt (EU Hub)', region: 'Europe', lat: 50.1109, lon: 8.6821, type: 'hub', sensors: '12,800 Nodes', status: 'Active Defense', latency: '1.2ms' },
  { name: 'San Francisco (US HQ)', region: 'North America', lat: 37.7749, lon: -122.4194, type: 'hq', sensors: '32,500 Nodes', status: 'Active Defense', latency: '0.9ms' },
  { name: 'New York (US East)', region: 'North America', lat: 40.7128, lon: -74.0060, type: 'hub', sensors: '21,400 Nodes', status: 'Active Defense', latency: '1.0ms' },
  { name: 'Tokyo (APAC Hub)', region: 'Asia', lat: 35.6762, lon: 139.6503, type: 'hub', sensors: '16,200 Nodes', status: 'Active Defense', latency: '1.6ms' },
  { name: 'Singapore (ASEAN Hub)', region: 'Asia', lat: 1.3521, lon: 103.8198, type: 'hub', sensors: '9,800 Nodes', status: 'Active Defense', latency: '1.3ms' },
  { name: 'Sydney (Oceania Hub)', region: 'Oceania', lat: -33.8688, lon: 151.2093, type: 'hub', sensors: '8,400 Nodes', status: 'Active Defense', latency: '1.8ms' },
  { name: 'São Paulo (LATAM Hub)', region: 'South America', lat: -23.5505, lon: -46.6333, type: 'hub', sensors: '7,600 Nodes', status: 'Active Defense', latency: '2.1ms' },
  { name: 'Cape Town (Africa Hub)', region: 'Africa', lat: -33.9249, lon: 18.4241, type: 'hub', sensors: '6,100 Nodes', status: 'Active Defense', latency: '2.3ms' },
];

const ATTACK_ORIGINS = [
  { name: 'Botnet Cluster A', lat: 55.7558, lon: 37.6173, targetIndex: 0 },    // Moscow -> Riyadh
  { name: 'Phishing Relay B', lat: 39.9042, lon: 116.4074, targetIndex: 6 },   // Beijing -> Tokyo
  { name: 'AiTM Proxy Node C', lat: 52.3676, lon: 4.9041, targetIndex: 2 },    // Amsterdam -> London
  { name: 'Quishing Gateway D', lat: 19.0760, lon: 72.8777, targetIndex: 1 },   // Mumbai -> Dubai
  { name: 'OAuth Hijacker E', lat: 45.4215, lon: -75.6972, targetIndex: 4 },   // Ottawa -> SF
  { name: 'Rogue AP Beacon F', lat: -26.2041, lon: 28.0473, targetIndex: 10 }, // Jo'burg -> Cape Town
  { name: 'Deepfake Audio G', lat: -34.6037, lon: -58.3816, targetIndex: 9 },  // Buenos Aires -> São Paulo
  { name: 'Credential Stuffer H', lat: -37.8136, lon: 144.9631, targetIndex: 8 }, // Melbourne -> Sydney
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Subtle synthesized Web Audio feedback for tactile feedback
function playCyberAudio(freq1 = 540, freq2 = 820, duration = 0.08) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq1, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 1.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration * 1.5);
  } catch {}
}

export default function ThreatGlobe() {
  const containerRef = useRef(null);
  const [activeHub, setActiveHub] = useState(ENTERPRISE_HUBS[0]); // Default Riyadh
  const [hoveredHub, setHoveredHub] = useState(null); // { hub, x, y }
  const [interceptedCount, setInterceptedCount] = useState(14820);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // References for imperative animation control
  const focusTargetRef = useRef(null);
  const globeGroupRef = useRef(null);
  const isAutoRotateRef = useRef(isAutoRotate);
  isAutoRotateRef.current = isAutoRotate;

  const focusOnHub = (hub) => {
    setActiveHub(hub);
    setIsAutoRotate(false);
    playCyberAudio(440, 880, 0.09);
    
    // Calculate required rotation around Y to face the hub toward camera
    const v = latLonToVector3(hub.lat, hub.lon, 100);
    const angleY = -Math.atan2(v.x, v.z);
    // Subtle tilt around X based on latitude
    const angleX = THREE.MathUtils.clamp(-hub.lat * (Math.PI / 180) * 0.45, -0.4, 0.4);

    focusTargetRef.current = { targetY: angleY, targetX: angleX };
  };

  const toggleAutoRotate = () => {
    setIsAutoRotate((prev) => !prev);
    playCyberAudio(600, 720, 0.05);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    let targetZoom = 210;
    camera.position.set(0, 0, targetZoom);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    // Default initial tilt to display EMEA & Americas nicely
    globeGroup.rotation.x = 0.15;
    globeGroup.rotation.y = -1.2;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const radius = 78;

    // 1. Atmosphere Outer Glow Halo
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.15, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.024, 0.714, 0.831, 1.0) * intensity * 0.75;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    scene.add(new THREE.Mesh(atmosphereGeo, atmosphereMat));

    // 2. High-Definition Earth Base Sphere with Natural Earth Texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/assets/images/earth_dark_map.png');
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const sphereGeo = new THREE.SphereGeometry(radius, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.85,
      metalness: 0.1,
      color: 0xffffff,
      emissive: 0x07111e,
      emissiveIntensity: 0.6,
    });
    const earthMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(earthMesh);

    // 3. Delicate Blueprint Lat/Lon Graticule Lines (Equator, Prime Meridian, Tropics)
    const graticuleGeo = new THREE.SphereGeometry(radius * 1.002, 32, 16);
    const graticuleMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    globeGroup.add(new THREE.Mesh(graticuleGeo, graticuleMat));

    // 4. Exact 3D Geographic Land Dot Matrix (Natural Earth 110m resolution)
    const dotCoords = WORLD_LAND_DOTS.map(([lat, lon]) => latLonToVector3(lat, lon, radius * 1.008));
    const dotGeo = new THREE.BufferGeometry().setFromPoints(dotCoords);
    const dotMat = new THREE.PointsMaterial({
      size: 1.8,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const landDots = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(landDots);

    // 5. Enterprise Defended Hubs on ALL Continents
    const hubGroup = new THREE.Group();
    globeGroup.add(hubGroup);

    const hubElements = [];
    const raycastTargets = [];

    ENTERPRISE_HUBS.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, radius * 1.01);
      
      // Outer tactical pulse ring
      const ringGeo = new THREE.RingGeometry(1.6, 3.0, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.type === 'hq' ? 0xe11d48 : 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      hubGroup.add(ring);

      // Core luminous beacon
      const dotGeo = new THREE.SphereGeometry(1.3, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: hub.type === 'hq' ? 0xffffff : 0x34d399,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos.clone().multiplyScalar(1.015));
      hubGroup.add(dot);

      // Vertical beacon telemetry stem
      const stemPoints = [pos, pos.clone().multiplyScalar(1.09)];
      const stemGeo = new THREE.BufferGeometry().setFromPoints(stemPoints);
      const stemMat = new THREE.LineBasicMaterial({
        color: hub.type === 'hq' ? 0xf43f5e : 0x10b981,
        transparent: true,
        opacity: 0.65,
      });
      const stem = new THREE.Line(stemGeo, stemMat);
      hubGroup.add(stem);

      // Invisible larger hit mesh for direct 3D clicking and hovering
      const hitGeo = new THREE.SphereGeometry(4.8, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(pos.clone().multiplyScalar(1.015));
      hitMesh.userData = { hub, ring, dot };
      hubGroup.add(hitMesh);
      raycastTargets.push(hitMesh);

      hubElements.push({ ring, dot, stem, hitMesh, hub, shockwaveScale: 1 });
    });

    // 6. 3D Parabolic Threat Interception Arcs
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const arcs = [];
    ATTACK_ORIGINS.forEach((origin) => {
      const targetHub = ENTERPRISE_HUBS[origin.targetIndex % ENTERPRISE_HUBS.length];
      const start = latLonToVector3(origin.lat, origin.lon, radius * 1.01);
      const end = latLonToVector3(targetHub.lat, targetHub.lon, radius * 1.01);

      // Calculate parabolic midpoint elevated above sphere
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(radius + Math.max(14, distance * 0.38));

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const curvePoints = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xe11d48,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      arcGroup.add(line);

      // Moving light packet
      const packetGeo = new THREE.SphereGeometry(1.2, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      arcGroup.add(packet);

      arcs.push({ curve, packet, targetIndex: origin.targetIndex % ENTERPRISE_HUBS.length, progress: Math.random() });
    });

    // Ambient and directional lighting for photorealistic depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(150, 100, 150);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe11d48, 1.2);
    dirLight2.position.set(-150, -50, -100);
    scene.add(dirLight2);

    // Interactive Drag with Fluid Physics Damping & Raycasting
    let isDragging = false;
    let dragDistance = 0;
    let prevMouseX = 0, prevMouseY = 0;
    let velX = 0, velY = 0;
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onPointerDown = (e) => {
      isDragging = true;
      dragDistance = 0;
      focusTargetRef.current = null;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      velX = 0;
      velY = 0;
      container.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      // Handle Raycasting when not actively dragging
      if (!isDragging) {
        const rect = container.getBoundingClientRect();
        mouseCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseCoord, camera);
        const intersects = raycaster.intersectObjects(raycastTargets);

        if (intersects.length > 0) {
          const intersectedHub = intersects[0].object.userData.hub;
          container.style.cursor = 'pointer';
          setHoveredHub({
            hub: intersectedHub,
            x: clientX - rect.left,
            y: clientY - rect.top,
          });
        } else {
          container.style.cursor = 'grab';
          setHoveredHub(null);
        }
        return;
      }

      // Dragging logic
      const dx = clientX - prevMouseX;
      const dy = clientY - prevMouseY;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      prevMouseX = clientX;
      prevMouseY = clientY;

      velX = dx * 0.005;
      velY = dy * 0.005;

      globeGroup.rotation.y += velX;
      globeGroup.rotation.x = THREE.MathUtils.clamp(globeGroup.rotation.x + velY, -0.85, 0.85);
    };

    const onPointerUp = (e) => {
      // If pointer was released with negligible drag, check if user tapped/clicked a 3D hub directly
      if (dragDistance < 6) {
        const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
        const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || 0;
        const rect = container.getBoundingClientRect();
        mouseCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseCoord, camera);
        const intersects = raycaster.intersectObjects(raycastTargets);
        if (intersects.length > 0) {
          const clickedHub = intersects[0].object.userData.hub;
          focusOnHub(clickedHub);
        }
      }

      isDragging = false;
      container.style.cursor = 'grab';
    };

    // Smooth Mouse Wheel Zooming
    const onWheel = (e) => {
      e.preventDefault();
      targetZoom = THREE.MathUtils.clamp(targetZoom + e.deltaY * 0.12, 145, 290);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let animId;
    let lastTime = performance.now();

    const animate = (time) => {
      animId = requestAnimationFrame(animate);
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // Smooth camera zoom interpolation
      camera.position.z += (targetZoom - camera.position.z) * 0.1;

      // Handle smooth camera focus target if user clicked a hub
      if (focusTargetRef.current) {
        const { targetY, targetX } = focusTargetRef.current;
        // Interpolate angle with shortest wrap
        let diffY = (targetY - (globeGroup.rotation.y % (Math.PI * 2)));
        while (diffY < -Math.PI) diffY += Math.PI * 2;
        while (diffY > Math.PI) diffY -= Math.PI * 2;

        globeGroup.rotation.y += diffY * 0.07;
        globeGroup.rotation.x += (targetX - globeGroup.rotation.x) * 0.07;

        if (Math.abs(diffY) < 0.004 && Math.abs(targetX - globeGroup.rotation.x) < 0.004) {
          focusTargetRef.current = null;
        }
      } else if (!isDragging) {
        // Apply inertia friction
        velX *= 0.94;
        velY *= 0.94;
        globeGroup.rotation.y += velX;
        globeGroup.rotation.x = THREE.MathUtils.clamp(globeGroup.rotation.x + velY, -0.85, 0.85);

        // Slow cinematic idle rotation if auto-rotate is active
        if (isAutoRotateRef.current && Math.abs(velX) < 0.0005 && Math.abs(velY) < 0.0005) {
          globeGroup.rotation.y += 0.0028;
        }
      }

      // Animate threat packets along arcs
      arcs.forEach((arc) => {
        arc.progress += delta * 0.42;
        if (arc.progress > 1) {
          arc.progress = 0;
          setInterceptedCount((prev) => prev + 1);
          // Trigger micro-shockwave on target hub
          const targetHubElement = hubElements[arc.targetIndex];
          if (targetHubElement) {
            targetHubElement.shockwaveScale = 2.4;
          }
        }
        const point = arc.curve.getPoint(arc.progress);
        arc.packet.position.copy(point);
      });

      // Pulse beacon rings with decay from shockwaves
      const basePulse = 1 + Math.sin(time * 0.004) * 0.25;
      hubElements.forEach((item) => {
        if (item.shockwaveScale > 1.05) {
          item.shockwaveScale += (1 - item.shockwaveScale) * 0.08;
        }
        const currentScale = basePulse * item.shockwaveScale;
        item.ring.scale.set(currentScale, currentScale, currentScale);
      });

      renderer.render(scene, camera);
    };

    animate(performance.now());

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Global Threat Intercept Event Listener (synchronized with PhishingSandbox & Defense Ecosystem)
    const handleGlobalIntercept = (e) => {
      setInterceptedCount((prev) => prev + 1);
      const hubIdx = Math.floor(Math.random() * hubElements.length);
      if (hubElements[hubIdx]) {
        hubElements[hubIdx].shockwaveScale = 3.2;
      }
      playCyberAudio(720, 1150, 0.12);
    };

    window.addEventListener('zinad-threat-intercept', handleGlobalIntercept);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('zinad-threat-intercept', handleGlobalIntercept);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthTexture.dispose();
    };
  }, []);

  return (
    <div className="hero-canvas-wrap">
      {/* 3D Canvas Viewport Area (100% Unobstructed) */}
      <div style={{ position: 'relative', width: '100%', height: '430px' }}>
        {/* Slim Top Floating HUD Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            right: '0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.28rem 0.65rem',
              background: 'rgba(7, 11, 20, 0.85)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: 'var(--radius-full)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-cyan)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
            }}
          >
            <span className="hero-pill-status"></span>
            <span>LIVE THREAT TELEMETRY</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', pointerEvents: 'auto' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-emerald)',
                background: 'rgba(7, 11, 20, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0.28rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              }}
            >
              INTERCEPTED: {interceptedCount.toLocaleString()}
            </span>

            {/* Quick Auto-Rotate Toggle Button */}
            <button
              onClick={toggleAutoRotate}
              title={isAutoRotate ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: isAutoRotate ? 'var(--accent-cyan)' : '#94a3b8',
                background: 'rgba(7, 11, 20, 0.85)',
                padding: '0.28rem 0.55rem',
                borderRadius: '4px',
                border: `1px solid ${isAutoRotate ? 'rgba(6, 182, 212, 0.4)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              {isAutoRotate ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  <span>Orbiting</span>
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Orbit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3D Hover Tooltip HUD Card (Follows cursor over 3D defense hubs) */}
        {hoveredHub && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(hoveredHub.x + 15, 340)}px`,
              top: `${Math.max(hoveredHub.y - 45, 45)}px`,
              zIndex: 20,
              pointerEvents: 'none',
              background: 'rgba(9, 14, 26, 0.95)',
              border: `1px solid ${hoveredHub.hub.type === 'hq' ? 'var(--accent-crimson)' : 'var(--accent-emerald)'}`,
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(10px)',
              minWidth: '160px',
              animation: 'fadeIn 0.15s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <strong style={{ fontSize: '0.78rem', color: '#ffffff' }}>{hoveredHub.hub.name}</strong>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: hoveredHub.hub.type === 'hq' ? 'var(--accent-crimson)' : 'var(--accent-emerald)',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '3px',
                }}
              >
                {hoveredHub.hub.region}
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>{hoveredHub.hub.sensors}</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
              <span>SLA: {hoveredHub.hub.latency}</span>
              <span style={{ color: 'var(--accent-emerald)' }}>Click to Lock ❯</span>
            </div>
          </div>
        )}

        {/* 3D Three.js Globe Container */}
        <div
          ref={containerRef}
          id="hero-threat-globe"
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Dedicated Bottom Telemetry & Continent Quick-Nav Dock (Outside Globe Canvas) */}
      <div className="globe-dock">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              LOCKED DEFENSE HUB:
            </span>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: activeHub.type === 'hq' ? 'var(--accent-crimson)' : 'var(--accent-emerald)' }}></span>
            <strong style={{ color: 'var(--text-primary)' }}>{activeHub.name}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {activeHub.sensors} Active
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              {activeHub.latency} SLA
            </span>
          </div>
        </div>

        {/* Continent & Major Defense Hub Quick-Nav Buttons */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Riyadh (KSA)', hub: ENTERPRISE_HUBS[0] },
            { label: 'London (EU)', hub: ENTERPRISE_HUBS[2] },
            { label: 'San Francisco (US)', hub: ENTERPRISE_HUBS[4] },
            { label: 'Tokyo (APAC)', hub: ENTERPRISE_HUBS[6] },
            { label: 'Sydney (OC)', hub: ENTERPRISE_HUBS[8] },
            { label: 'São Paulo (LATAM)', hub: ENTERPRISE_HUBS[9] },
            { label: 'Cape Town (AF)', hub: ENTERPRISE_HUBS[10] },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => focusOnHub(item.hub)}
              style={{
                background: activeHub.name === item.hub.name ? 'rgba(190, 30, 45, 0.25)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeHub.name === item.hub.name ? 'var(--accent-crimson)' : 'var(--border-subtle)'}`,
                color: activeHub.name === item.hub.name ? 'var(--accent-crimson)' : 'var(--text-secondary)',
                fontWeight: activeHub.name === item.hub.name ? 700 : 500,
                padding: '0.28rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
