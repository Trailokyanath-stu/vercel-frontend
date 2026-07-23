// src/components/Footer.jsx
const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#menu', label: 'Menu' },
  { href: '#features', label: 'Why Us' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

const SOCIALS = [
  { label: 'Facebook', symbol: 'f' },
  { label: 'Instagram', symbol: '◎' },
  { label: 'Twitter / X', symbol: '𝕏' },
  { label: 'WhatsApp', symbol: '☏' },
];

export default function Footer() {
  function handleAnchorClick(e, href) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="section-inner footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo" onClick={(e) => handleAnchorClick(e, '#hero')}>
            <span className="nav-logo-mark">GP</span>
            <span className="nav-logo-text">The Grand Palette</span>
          </a>
          <p>A little bean magic, every day.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          {QUICK_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📍 Jaydev Vihar, 2nd Lane, Berhampur, Odisha</p>
          <p>📞 +91 78480 19826</p>
          <p>🕒 Open All Day, Every Day</p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="social-icon">
                {s.symbol}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Grand Palette. All rights reserved.</p>
      </div>
    </footer>
  );
}
