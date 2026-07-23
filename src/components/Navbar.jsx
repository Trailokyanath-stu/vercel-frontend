// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { useReservationModal } from '../context/ReservationModalContext.jsx';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#menu', label: 'Menu' },
  { href: '#features', label: 'Why Us' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useReservationModal();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth-scroll to a section, accounting for the fixed navbar height.
  function handleAnchorClick(e, href) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setMenuOpen(false);
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleAnchorClick(e, '#hero')}
        >
          <span className="nav-logo-mark">GP</span>
          <span className="nav-logo-text">The Grand Palette</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleAnchorClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="nav-link nav-cta"
            onClick={() => {
              openModal();
              setMenuOpen(false);
            }}
          >
            Reserve Table
          </button>
        </nav>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
