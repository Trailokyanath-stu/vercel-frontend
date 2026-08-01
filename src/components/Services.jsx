// src/components/Services.jsx
import { useState } from 'react';
import Reveal from './Reveal.jsx';
import ServiceDetailModal from './ServiceDetailModal.jsx';

const SERVICES = [
  {
    icon: '☕',
    title: 'Specialty Coffee',
    text: 'Small-batch beans, precision-brewed espresso, and signature roasts made in-house.',
    highlights: ['100% Arabica artisanal roasts', 'Custom milk alternatives (Oat, Almond, Soy)', 'Barista crafted cold brews & signature lattes'],
  },
  {
    icon: '🥗',
    title: 'Healthy & Diet-Friendly Menu',
    text: 'Balanced, nutrient-rich dishes crafted for mindful eating without compromising taste.',
    highlights: ['Keto & low-carb options', 'Fresh organic salads & superfood bowls', 'Gluten-free pasta & sourdough breads'],
  },
  {
    icon: '🍛',
    title: 'Hearty Full Meals',
    text: 'Wholesome, generous meals designed to satisfy — perfect for lunch or dinner.',
    highlights: ['Authentic Indian thalis & biryanis', 'Continental sizzlers & grilled specials', 'Handcrafted sauces and spice blends'],
  },
  {
    icon: '🎉',
    title: 'Custom Catering & Events',
    text: 'Tailored menus and full-service catering for celebrations, big or small.',
    highlights: ['On-site live cooking stations', 'Tailored menu selection for up to 300 guests', 'Dedicated event coordinator & waitstaff'],
  },
  {
    icon: '⚡',
    title: 'Quick Bites & Grab-and-Go',
    text: 'Fresh, fast options for guests on the move — without cutting corners on flavor.',
    highlights: ['Artisanal paninis & wraps', 'Freshly squeezed fruit juices', 'Packaging designed to retain heat & crunch'],
  },
  {
    icon: '🍷',
    title: 'Fine Dining Experience',
    text: 'An elevated evening menu paired with ambience built for special occasions.',
    highlights: ['Candlelight table arrangements', 'Chef special multi-course tasting menu', 'Private dining lounge booking'],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
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
                <button
                  type="button"
                  style={{
                    marginTop: '16px',
                    color: '#ff4d6a',
                    fontWeight: 600,
                    fontSize: '13px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  onClick={() => setSelectedService(s)}
                >
                  Explore Details & Book →
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
