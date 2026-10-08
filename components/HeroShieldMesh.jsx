'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroShieldMesh() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [telemetryAlert, setTelemetryAlert] = useState(null);
  const [isEngaged, setIsEngaged] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates (default to center-right of hero where threat globe sits)
    let mouse = { x: -1000, y: -1000, active: false, radius: 180 };

    // Threat particles and deflection ripples
    const threatParticles = [];
    const deflectionRipples = [];
    let shockwaves = [];
    let frameCount = 0;

    // Detect theme
    const getIsLight = () => document.documentElement.getAttribute('data-theme') === 'light';

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse interaction listeners
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // Hexagon lattice dimensions
    const hexRadius = 42;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius * 0.75;

    // Spawn a threat particle
    const spawnThreat = () => {
      if (threatParticles.length > 14) return;
      // Spawn from perimeter edges heading toward center
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -20 : width + 20;
      const startY = Math.random() * height;
      const targetX = width * 0.45 + (Math.random() - 0.5) * 200;
      const targetY = height * 0.5 + (Math.random() - 0.5) * 200;

      const angle = Math.atan2(targetY - startY, targetX - startX);
      const speed = 1.6 + Math.random() * 1.4;

      threatParticles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        targetX,
        targetY,
        intercepted: false,
        life: 0,
        maxLife: 320,
        type: Math.random() > 0.4 ? 'quishing' : 'zero-day',
      });
    };

    // Manual deflection trigger handler
    const triggerManualDeflection = (e) => {
      setIsEngaged(true);
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      shockwaves.push({
        x: centerX,
        y: centerY,
        radius: 20,
        maxRadius: Math.max(width, height) * 0.85,
        alpha: 0.9,
      });

      // Intercept all current threats
      threatParticles.forEach((p) => {
        p.intercepted = true;
        deflectionRipples.push({
          x: p.x,
          y: p.y,
          radius: 12,
          maxRadius: 65,
          alpha: 1,
          color: '#10b981',
        });
      });

      const types = ['OAuth AiTM Device Hijack', 'Zero-Day React2Shell Quish', 'Deepfake Audio Vishing Lure'];
      const picked = types[Math.floor(Math.random() * types.length)];
      setTelemetryAlert({
        title: 'ACTIVE DEFENSE SHIELD TRIGGERED',
        desc: `Autonomous ReflexAware 360 Deflection: ${picked} intercepted at human endpoint in 0.82s. SIEM Webhook dispatched.`,
      });

      setTimeout(() => {
        setIsEngaged(false);
      }, 900);

      setTimeout(() => {
        setTelemetryAlert(null);
      }, 4200);
    };

    window.addEventListener('zinad-shield-deflect', triggerManualDeflection);

    // IntersectionObserver to pause rendering when scrolled past hero
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (container) observer.observe(container);

    // Draw single hexagon
    const drawHexagon = (cx, cy, r, strokeStyle, fillStyle, lineWidth = 1) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      frameCount++;
      const isLight = getIsLight();
      const time = frameCount * 0.015;

      // Clear with transparency
      ctx.clearRect(0, 0, width, height);

      // Periodically spawn threats
      if (frameCount % 110 === 0) {
        spawnThreat();
      }

      // Base grid colors
      const baseGridStroke = isLight ? 'rgba(100, 116, 139, 0.12)' : 'rgba(6, 182, 212, 0.07)';
      const activeCyan = isLight ? 'rgba(2, 132, 199, ' : 'rgba(6, 182, 212, ';
      const activeEmerald = isLight ? 'rgba(16, 185, 129, ' : 'rgba(16, 185, 129, ';

      // 1. Render Hexagonal Defense Lattice
      const cols = Math.ceil(width / hexWidth) + 2;
      const rows = Math.ceil(height / hexHeight) + 2;

      for (let r = -1; r < rows; r++) {
        const rowY = r * hexHeight;
        const xOffset = (r % 2 === 0 ? 0 : hexWidth / 2);

        for (let c = -1; c < cols; c++) {
          const colX = c * hexWidth + xOffset;

          // Distance from cursor
          let cursorDist = 9999;
          if (mouse.active) {
            const dx = colX - mouse.x;
            const dy = rowY - mouse.y;
            cursorDist = Math.sqrt(dx * dx + dy * dy);
          }

          // Ambient node wave
          const ambientWave = Math.sin(time + colX * 0.005 + rowY * 0.005) * 0.5 + 0.5;

          if (cursorDist < mouse.radius) {
            // Localized Defense Dome around cursor
            const intensity = 1 - cursorDist / mouse.radius;
            const strokeColor = `${activeCyan}${0.2 + intensity * 0.65})`;
            const fillColor = `${activeCyan}${0.03 + intensity * 0.12})`;
            drawHexagon(colX, rowY, hexRadius * (1 + intensity * 0.1), strokeColor, fillColor, 1.5 + intensity * 1.5);
          } else if (ambientWave > 0.82) {
            // Ambient subtle telemetry node pulse
            const strokeColor = `${activeCyan}${0.1 + (ambientWave - 0.82) * 0.5})`;
            drawHexagon(colX, rowY, hexRadius, strokeColor, null, 1);
          } else {
            // Idle background lattice
            drawHexagon(colX, rowY, hexRadius, baseGridStroke, null, 1);
          }
        }
      }

      // 2. Render & Update Threat Particles
      for (let i = threatParticles.length - 1; i >= 0; i--) {
        const p = threatParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Check distance to mouse or center defense zone
        const distToCenter = Math.hypot(p.x - width * 0.5, p.y - height * 0.5);
        const distToMouse = mouse.active ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : 9999;

        // Threat reaches perimeter -> INTERCEPTED!
        if (!p.intercepted && (distToCenter < 240 || distToMouse < mouse.radius)) {
          p.intercepted = true;
          p.vx *= -0.3; // Deflect back
          p.vy *= -0.3;

          // Trigger emerald absorption ripple
          deflectionRipples.push({
            x: p.x,
            y: p.y,
            radius: 8,
            maxRadius: 55,
            alpha: 1,
            color: '#10b981',
          });
        }

        // Draw particle trail & head
        if (!p.intercepted) {
          // Adversary Crimson Threat Vector
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? '#dc2626' : '#e11d48';
          ctx.shadowColor = '#e11d48';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Threat line
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 8, p.y - p.vy * 8);
          ctx.strokeStyle = isLight ? 'rgba(220, 38, 38, 0.45)' : 'rgba(225, 29, 72, 0.55)';
          ctx.lineWidth = 1.8;
          ctx.stroke();
        } else {
          // Deflected & Neutralized Security Emerald
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Cull dead particles
        if (p.life > p.maxLife || p.x < -60 || p.x > width + 60 || p.y < -60 || p.y > height + 60) {
          threatParticles.splice(i, 1);
        }
      }

      // 3. Render Deflection Shockwave Ripples
      for (let i = deflectionRipples.length - 1; i >= 0; i--) {
        const r = deflectionRipples[i];
        r.radius += 1.8;
        r.alpha -= 0.035;

        if (r.alpha <= 0) {
          deflectionRipples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 4. Render Global Manual Shockwaves (Engagement Mode)
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 14;
        sw.alpha -= 0.022;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${sw.alpha * 0.75})`;
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius * 0.92, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${sw.alpha * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('zinad-shield-deflect', triggerManualDeflection);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        observer.disconnect();
      }
    };
  }, []);

  const triggerDeflectionFromButton = () => {
    window.dispatchEvent(new CustomEvent('zinad-shield-deflect'));
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'auto',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Tactical Telemetry HUD Toast */}
      {telemetryAlert && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            background: 'var(--bg-dark-elevated)',
            border: '1px solid var(--accent-emerald)',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.25)',
            borderRadius: '8px',
            padding: '0.75rem 1.25rem',
            maxWidth: '560px',
            width: '90%',
            animation: 'fadeInUp 0.3s ease forwards',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-emerald)',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--accent-emerald)',
                letterSpacing: '0.06em',
              }}
            >
              {telemetryAlert.title}
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                lineHeight: 1.45,
                marginTop: '0.2rem',
              }}
            >
              {telemetryAlert.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
