'use client';

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext({
  isDemoOpen: false,
  openDemo: () => {},
  closeDemo: () => {},
});

export function ModalProvider({ children }) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);

  return (
    <ModalContext.Provider value={{ isDemoOpen, openDemo, closeDemo }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
