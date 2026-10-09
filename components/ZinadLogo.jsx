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
          width: isCompact ? '28px' : '36px',
          height: isCompact ? '28px' : '36px',
        }}
      >
        {/* Defensive Shockwave Pulse Ring (Fires on lock) */}
        <div className="zinad-lock-shockwave" aria-hidden="true" />

        {/* 3D Volumetric ZINAD Master Shield Emblem */}
        <div className="zinad-emblem-render" aria-hidden="true">
          <img
            src="/assets/images/zinad_emblem.png"
            srcSet="/assets/images/zinad_emblem.png 1x, /assets/images/zinad_emblem_3d.png 2x"
            alt="ZINAD Shield"
            width={isCompact ? 28 : 36}
            height={isCompact ? 28 : 36}
            className="zinad-emblem-img"
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

