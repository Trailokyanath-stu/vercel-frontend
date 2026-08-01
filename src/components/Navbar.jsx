// src/components/Navbar.jsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReservationModal } from "../context/ReservationModalContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#chefs", label: "Our Chefs" },
  { href: "#menu", label: "Menu" },
  { href: "#features", label: "Why Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const { openModal } = useReservationModal();
  const { user, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }

    document.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  function handleAnchorClick(e, href) {
    if (window.location.pathname !== "/") {
      return;
    }
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setMenuOpen(false);
  }

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">

        <Link
          to="/"
          className="nav-logo"
          onClick={(e) => handleAnchorClick(e, "#hero")}
        >
          <span className="nav-logo-mark">GP</span>
          <span className="nav-logo-text">The Grand Palette</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>

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

          {/* Cart / Order Tray Trigger */}
          <button
            type="button"
            className="nav-link"
            onClick={() => {
              openCart();
              setMenuOpen(false);
            }}
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>🛒 Order Tray</span>
            {totalItems > 0 && (
              <span
                style={{
                  background: '#ff173f',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  lineHeight: 1,
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

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

          {/* Auth State */}
          {user ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                type="button"
                className="nav-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 23, 63, 0.15)',
                  border: '1px solid rgba(255, 23, 63, 0.4)',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  color: '#fff',
                }}
                onClick={() => setProfileDropdown((v) => !v)}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#ff173f',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span>{user.name ? user.name.split(' ')[0] : 'Account'}</span>
                <span style={{ fontSize: '10px' }}>▼</span>
              </button>

              {profileDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: '#1c1c1e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '8px 0',
                    minWidth: '160px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    zIndex: 100,
                  }}
                >
                  <Link
                    to="/profile"
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      color: '#fff',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                    onClick={() => setProfileDropdown(false)}
                  >
                    👤 My Profile & Orders
                  </Link>
                  <button
                    type="button"
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      color: '#ff4d6a',
                      fontSize: '14px',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onClick={() => {
                      logout();
                      setProfileDropdown(false);
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}

        </nav>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
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