'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function DemoModal() {
  const { isDemoOpen, closeDemo } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [headcount, setHeadcount] = useState('500 - 2,500 Employees');
  const [interest, setInterest] = useState('ZiSoft AI Phishing & LMS');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDemoOpen) {
        closeDemo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoOpen, closeDemo]);

  if (!isDemoOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeDemo();
    }, 2800);
  };

  return (
    <div
      id="demo-modal"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 9, 14, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target.id === 'demo-modal') closeDemo();
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(225, 29, 72, 0.15)',
        }}
      >
        <button
          className="close-modal"
          onClick={closeDemo}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--text-secondary)',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            lineHeight: 1,
          }}
          aria-label="Close modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hero-pill-status"></span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-crimson)', textTransform: 'uppercase' }}>
                Direct Architect Consultation
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Schedule Architecture Demo
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Speak directly with a Senior Cybersecurity Architect. Tour ZiSoft live and review your organization&apos;s custom threat profile.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Corporate Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ciso@enterprise.com"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'var(--bg-dark-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Organization Headcount
                </label>
                <select
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'var(--bg-dark-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  <option>100 - 500 Employees</option>
                  <option>500 - 2,500 Employees</option>
                  <option>2,500 - 10,000 Employees</option>
                  <option>10,000+ Enterprise</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Primary Area of Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'var(--bg-dark-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  <option>ZiSoft AI Phishing & LMS</option>
                  <option>ReflexAware 360 SOAR Integration</option>
                  <option>ZIGAMES VR Experiential Scenarios</option>
                  <option>Elite Red Teaming Social Engineering</option>
                  <option>Complete Enterprise Defense Suite</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}>
                Confirm & Schedule Session
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Demo Request Received!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              A Senior Security Architect will contact <strong style={{ color: 'var(--text-primary)' }}>{email}</strong> within 4 business hours with custom calendar invites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
