import React from 'react';

export default function TailgatingSkeleton() {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        border: '1px solid var(--border-medium)',
        minHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--bg-dark-surface)',
        borderRadius: 'var(--radius-lg)',
      }}
      aria-label="Loading Interactive 3D Tailgating Simulation"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span className="hero-pill-status"></span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-purple)' }}>
          KINETIC LAB // LEVEL 01 LOADING...
        </span>
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        Tactical Physical Perimeter Simulator
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '440px', textAlign: 'center' }}>
        Preparing WebGL isometric environment and Turnstile collision meshes...
      </p>
    </div>
  );
}
