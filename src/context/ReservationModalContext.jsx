// src/context/ReservationModalContext.jsx
// Lets the navbar, hero buttons, and CTA section all open the same
// reservation modal without prop-drilling.

import { createContext, useContext, useState, useCallback } from 'react';

const ReservationModalContext = createContext(null);

export function ReservationModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ReservationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ReservationModalContext.Provider>
  );
}

export function useReservationModal() {
  const ctx = useContext(ReservationModalContext);
  if (!ctx) {
    throw new Error('useReservationModal must be used inside a ReservationModalProvider');
  }
  return ctx;
}
