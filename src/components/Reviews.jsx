// src/components/Reviews.jsx
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import ReviewModal from './ReviewModal.jsx';

const INITIAL_TESTIMONIALS = [
  {
    text: 'One of the best cafes and restaurants in Berhampur. Talented chefs and a cozy dining experience.',
    author: 'Ananya S.',
    rating: 5,
  },
  {
    text: 'Delicious food, well maintained interiors, and a warm, inviting vibe.',
    author: 'Rohit P.',
    rating: 5,
  },
  {
    text: 'This has become my favorite spot to dine. Highly recommended for family evenings.',
    author: 'Meera D.',
    rating: 5,
  },
];

const AUTOPLAY_MS = 5500;

export default function Reviews() {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [current, setCurrent] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const touchStartX = useRef(0);
  const timerRef = useRef(null);

  function goTo(index) {
    setCurrent((index + testimonials.length) % testimonials.length);
  }

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [current, testimonials.length]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }

  const handleAddReview = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
    setCurrent(0);
  };

  return (
    <>
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
              {testimonials.map((t, idx) => (
                <div className="testimonial-slide" key={`${t.author}-${idx}`}>
                  <div className="stars">
                    {'★'.repeat(t.rating || 5)}
                  </div>
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
                {testimonials.map((t, i) => (
                  <button
                    key={`${t.author}-${i}`}
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

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setReviewModalOpen(true)}
              >
                <span>✍️ Write A Review</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </>
  );
}
