'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import TailgatingSkeleton from './TailgatingSkeleton';

const TailgatingChallenge = dynamic(() => import('./TailgatingChallenge'), {
  ssr: false,
  loading: () => <TailgatingSkeleton />,
});

export default function DynamicTailgating() {
  return <TailgatingChallenge />;
}
