// src/components/Hero.jsx
import { useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';
import { useReservationModal } from '../context/ReservationModalContext.jsx';

const FLOATING_ICONS = [
  { icon: '☕', x: '8%', y: '22%', delay: '0s' },
  { icon: '🍃', x: '85%', y: '18%', delay: '1.2s' },
  { icon: '🍽️', x: '12%', y: '72%', delay: '0.6s' },
  { icon: '🫘', x: '90%', y: '68%', delay: '1.8s' },
  { icon: '🍰', x: '48%', y: '85%', delay: '2.4s' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const iconsRef = useRef(null);
  const { openModal } = useReservationModal();

  // Parallax on scroll
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (bgRef.current) bgRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
        if (iconsRef.current) iconsRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  // Subtle mouse parallax on desktop
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const hero = heroRef.current;
    if (!hero) return undefined;

    function onMove(e) {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      if (bgRef.current) bgRef.current.style.marginLeft = `${x * 0.3}px`;
      if (iconsRef.current) {
        iconsRef.current.style.marginLeft = `${x}px`;
        iconsRef.current.style.marginTop = `${y}px`;
      }
    }
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  function scrollToMenu(e) {
    e.preventDefault();
    const target = document.querySelector('#menu');
    if (!target) return;
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg" ref={bgRef}>
        <div className="hero-bg-image"></div>
        <div className="hero-bg-gradient"></div>
        <div className="hero-noise"></div>
      </div>

      <div className="floating-icons" ref={iconsRef} aria-hidden="true">
        {FLOATING_ICONS.map((f, i) => (
          <span
            key={i}
            className="float-icon"
            style={{ '--x': f.x, '--y': f.y, '--delay': f.delay }}
          >
            {f.icon}
          </span>
        ))}
      </div>

      <div className="hero-content">
        <Reveal as="p" className="eyebrow">
          Jaydev Vihar · Berhampur · Odisha
        </Reveal>

        <h1 className="hero-title">
          <Reveal as="span" className="hero-title-line" style={{ display: 'block' }}>
            THE GRAND
          </Reveal>
          <Reveal
            as="span"
            className="hero-title-line hero-title-accent"
            style={{ display: 'block' }}
            delay={80}
          >
            PALETTE
          </Reveal>
        </h1>

        <Reveal as="p" className="hero-tagline" delay={120}>
          "A little bean magic, every day"
        </Reveal>

        <Reveal as="p" className="hero-sub" delay={160}>
          Fresh flavors, warm ambience, and the best dining experience in Berhampur.
        </Reveal>

        <Reveal as="div" className="hero-actions" delay={200}>
          <button type="button" className="btn btn-primary" onClick={openModal}>
            <span>Join Now</span>
          </button>
          <a href="#menu" className="btn btn-outline" onClick={scrollToMenu}>
            <span>View Menu</span>
          </a>
        </Reveal>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-dot"></span>
        <span className="scroll-cue-label">Scroll</span>
      </div>
    </section>
  );
}
