'use client';

import React, { useState, useEffect } from 'react';

export default function ZinadLogo({ size = 'default', showSlogan = true }) {
  const isCompact = size === 'compact';
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // High-precision defense lock mount sequence
    const timer = setTimeout(() => {
      setIsLocked(true);
    }, 180);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`zinad-logo-brand ${isCompact ? 'compact' : ''} ${isLocked ? 'is-locked' : 'is-unlocked'}`}
      aria-label="ZINAD Protection is our profession"
    >
      <div 
        className="zinad-emblem-wrap" 
        style={{
          width: isCompact ? '20px' : '25px',
          height: isCompact ? '32px' : '40px',
        }}
      >
        {/* Defensive Shockwave Pulse Ring (Fires on lock) */}
        <div className="zinad-lock-shockwave" aria-hidden="true" />

        {/* Dynamic Padlock Shackle (Top Arch) */}
        <div className="zinad-emblem-shackle" aria-hidden="true">
          <img
            src="/assets/images/emblem_shackle.png"
            alt=""
            width={isCompact ? 20 : 25}
            height={isCompact ? 9 : 12}
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'fill' }}
          />
        </div>

        {/* Shield Body with dynamic "Z" ribbon */}
        <div className="zinad-emblem-body" aria-hidden="true">
          <img
            src="/assets/images/emblem_body.png"
            alt=""
            width={isCompact ? 20 : 25}
            height={isCompact ? 23 : 28}
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'fill' }}
          />
          {/* Cyber Telemetry Sheen Overlay */}
          <div className="zinad-sheen-slider" />
        </div>
      </div>

      <div className="zinad-logo-text">
        <span className="zinad-brand-name">
          ZINAD
        </span>
        {showSlogan && (
          <span className="zinad-brand-slogan">
            Protection is our profession
          </span>
        )}
      </div>
    </div>
  );
}

