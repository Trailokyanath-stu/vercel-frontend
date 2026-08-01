// src/components/About.jsx
import { useState } from 'react';
import Reveal from './Reveal.jsx';
import StoryModal from './StoryModal.jsx';

const POINTS = [
  {
    icon: '👨‍🍳',
    title: 'Experienced Chefs',
    text: 'A kitchen led by seasoned culinary experts who bring craft to every dish.',
  },
  {
    icon: '🔥',
    title: 'Modern Kitchen Equipment',
    text: 'Precision cooking powered by the latest culinary technology.',
  },
  {
    icon: '✨',
    title: 'Clean & Well Maintained',
    text: 'A spotless, thoughtfully kept space you can relax and enjoy in.',
  },
  {
    icon: '🤝',
    title: 'Warm, Friendly Hospitality',
    text: 'Every guest is treated like family from the moment they walk in.',
  },
  {
    icon: '🍽️',
    title: 'Casual & Fine Dining',
    text: "Whether it's a quick coffee or a celebration dinner, we've got you.",
  },
];

export default function About() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <>
      <section className="about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <Reveal as="div" className="about-visual">
              <div className="about-frame">
                <div className="about-frame-glow"></div>
                <div className="about-frame-img"></div>
                <div className="about-badge">
                  <span className="about-badge-num">12+</span>
                  <span className="about-badge-label">Years of Craft</span>
                </div>
              </div>
            </Reveal>

            <div className="about-copy">
              <Reveal as="p" className="eyebrow">Our Story</Reveal>
              <Reveal as="h2" className="section-title">
                Why Choose <span className="text-accent">The Grand Palette</span> Cafe &amp; Restaurant
              </Reveal>
              <Reveal as="p" className="section-lead">
                We built The Grand Palette around one idea — every plate and every cup should feel
                like it was made for you. Here's what sets our table apart.
              </Reveal>

              <ul className="about-list">
                {POINTS.map((point, i) => (
                  <Reveal as="li" className="about-item" key={point.title} delay={i * 60}>
                    <span className="about-icon">{point.icon}</span>
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal as="div" style={{ marginTop: '28px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStoryOpen(true)}
                >
                  <span>Explore Our Story & Legacy →</span>
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <StoryModal isOpen={storyOpen} onClose={() => setStoryOpen(false)} />
    </>
  );
}
