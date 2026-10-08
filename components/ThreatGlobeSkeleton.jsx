import React from 'react';

export default function ThreatGlobeSkeleton() {
  return (
    <div className="hero-canvas-wrap" aria-label="Loading Threat Globe 3D Canvas">
      {/* 430px Canvas Viewport Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '430px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        {/* Skeleton Top HUD */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            padding: '0.35rem 0.75rem',
            background: 'rgba(7, 11, 20, 0.75)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="hero-pill-status"></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              INITIALIZING SOC THREAT MESH...
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>
            LATENCY: &lt;1ms
          </span>
        </div>

        {/* Center Simulated Globe Ring */}
        <div
          style={{
            width: '210px',
            height: '210px',
            borderRadius: '50%',
            border: '2px dashed rgba(190, 30, 45, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 0 50px rgba(190, 30, 45, 0.15)',
          }}
        >
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              boxShadow: 'inset 0 0 30px rgba(6, 182, 212, 0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            <div style={{ color: 'var(--accent-crimson)', fontWeight: 600, marginBottom: '0.2rem' }}>3D SPATIAL ENGINE</div>
            <div>Streaming Telemetry...</div>
          </div>
        </div>

        <div style={{ height: '10px' }}></div>
      </div>

      {/* Skeleton Bottom Dock */}
      <div className="globe-dock">
        <div style={{ height: '14px', width: '180px', background: 'var(--border-medium)', borderRadius: '4px' }}></div>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              style={{
                height: '24px',
                width: '68px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
