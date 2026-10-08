'use client';

import React from 'react';
import { useModal } from './ModalContext';

export default function DemoButton({
  children,
  className = 'btn btn-primary',
  style = {},
  onClick,
  ...props
}) {
  const { openDemo } = useModal();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    openDemo();
  };

  return (
    <button className={className} style={style} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
