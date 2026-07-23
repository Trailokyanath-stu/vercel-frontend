// src/components/Features.jsx
import Reveal from './Reveal.jsx';
import useCountUp from '../hooks/useCountUp.js';

const FEATURES = [
  { icon: '🔧', title: 'Modern Kitchen Equipment' },
  { icon: '👨‍🍳', title: 'Experienced Chefs' },
  { icon: '🧼', title: 'Clean Environment' },
  { icon: '💰', title: 'Affordable Pricing' },
  { icon: '💛', title: 'Friendly Atmosphere' },
  { icon: '📋', title: 'Daily Fresh Menu' },
];

const COUNTERS = [
  { target: 4500, label: 'Happy Customers' },
  { target: 15, label: 'Expert Chefs' },
  { target: 120, label: 'Menu Items' },
  { target: 980, label: '5-Star Reviews' },
];

function Counter({ target, label }) {
  const [ref, value] = useCountUp(target);
  return (
    <Reveal as="div" className="counter-item">
      <span ref={ref} className="counter-num">
        {value.toLocaleString()}
      </span>
      <span className="counter-suffix">+</span>
      <p className="counter-label">{label}</p>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow center">The Grand Palette Standard</Reveal>
        <Reveal as="h2" className="section-title center">Built On Details That Matter</Reveal>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <Reveal as="div" className="feature-item" key={f.title} delay={(i % 6) * 60}>
              <span className="feature-icon">{f.icon}</span>
              <h4>{f.title}</h4>
            </Reveal>
          ))}
        </div>

        <div className="counters">
          {COUNTERS.map((c) => (
            <Counter key={c.label} target={c.target} label={c.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
