// src/components/Services.jsx
import Reveal from './Reveal.jsx';

const SERVICES = [
  { icon: '☕', title: 'Specialty Coffee', text: 'Small-batch beans, precision-brewed espresso, and signature roasts made in-house.' },
  { icon: '🥗', title: 'Healthy & Diet-Friendly Menu', text: 'Balanced, nutrient-rich dishes crafted for mindful eating without compromising taste.' },
  { icon: '🍛', title: 'Hearty Full Meals', text: 'Wholesome, generous meals designed to satisfy — perfect for lunch or dinner.' },
  { icon: '🎉', title: 'Custom Catering & Events', text: 'Tailored menus and full-service catering for celebrations, big or small.' },
  { icon: '⚡', title: 'Quick Bites & Grab-and-Go', text: 'Fresh, fast options for guests on the move — without cutting corners on flavor.' },
  { icon: '🍷', title: 'Fine Dining Experience', text: 'An elevated evening menu paired with ambience built for special occasions.' },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow center">What We Serve</Reveal>
        <Reveal as="h2" className="section-title center">Crafted For Every Craving</Reveal>
        <Reveal as="p" className="section-lead center">
          From your morning espresso to a candle-lit dinner, explore what we do best.
        </Reveal>

        <div className="cards-grid">
          {SERVICES.map((s, i) => (
            <Reveal as="article" className="service-card" key={s.title} delay={(i % 6) * 60}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
