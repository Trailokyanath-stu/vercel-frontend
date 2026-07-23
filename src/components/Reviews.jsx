// src/components/Reviews.jsx
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';

const TESTIMONIALS = [
  {
    text: 'One of the best cafes and restaurants in Berhampur. Talented chefs and a cozy dining experience.',
    author: 'Ananya S.',
  },
  {
    text: 'Delicious food, well maintained interiors, and a warm, inviting vibe.',
    author: 'Rohit P.',
  },
  {
    text: 'This has become my favorite spot to dine. Highly recommended for family evenings.',
    author: 'Meera D.',
  },
];

const AUTOPLAY_MS = 5500;

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef(null);

  function goTo(index) {
    setCurrent((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  // Autoplay — restarts whenever the slide changes (manually or automatically)
  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [current]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }

  return (
    <section className="reviews" id="reviews">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow center">Guest Reviews</Reveal>
        <Reveal as="h2" className="section-title center">Loved By Berhampur</Reveal>

        <Reveal as="div" className="testimonial-slider">
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {TESTIMONIALS.map((t) => (
              <div className="testimonial-slide" key={t.author}>
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-author">— {t.author}</p>
              </div>
            ))}
          </div>

          <div className="testimonial-controls">
            <button className="slider-btn" onClick={() => goTo(current - 1)} aria-label="Previous review">
              &#10094;
            </button>
            <div className="slider-dots">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  className={`slider-dot ${i === current ? 'active' : ''}`}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button className="slider-btn" onClick={() => goTo(current + 1)} aria-label="Next review">
              &#10095;
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
