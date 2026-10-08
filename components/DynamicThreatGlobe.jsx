'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ThreatGlobeSkeleton from './ThreatGlobeSkeleton';

const ThreatGlobe = dynamic(() => import('./ThreatGlobe'), {
  ssr: false,
  loading: () => <ThreatGlobeSkeleton />,
});

export default function DynamicThreatGlobe() {
  return <ThreatGlobe />;
}
