// src/components/CTA.jsx
import Reveal from './Reveal.jsx';
import { useReservationModal } from '../context/ReservationModalContext.jsx';

export default function CTA() {
  const { openModal } = useReservationModal();

  return (
    <section className="cta" id="reserve">
      <div className="cta-glow"></div>
      <div className="section-inner cta-inner">
        <Reveal as="h2" className="cta-title">Savor Every Moment With Us</Reveal>
        <Reveal as="p" className="cta-sub" delay={60}>
          Book your table today and taste the difference craft makes.
        </Reveal>
        <Reveal as="div" delay={120}>
          <button type="button" className="btn btn-primary btn-lg" onClick={openModal}>
            <span>Reserve Your Table</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
