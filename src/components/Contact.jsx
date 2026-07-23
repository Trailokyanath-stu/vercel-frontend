// src/components/Contact.jsx
import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { submitContactMessage } from '../api.js';

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ text: 'Sending…', type: '' });

    try {
      const data = await submitContactMessage(form);
      setFeedback({ text: data.message || 'Message sent!', type: 'success' });
      setForm(initialForm);
    } catch (err) {
      setFeedback({ text: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow center">Get In Touch</Reveal>
        <Reveal as="h2" className="section-title center">Visit The Grand Palette</Reveal>

        <div className="contact-grid">
          <div className="contact-info">
            <Reveal as="div" className="contact-card">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Address</h4>
                <p>Jaydev Vihar, 2nd Lane, Berhampur, Odisha, India</p>
              </div>
            </Reveal>

            <Reveal as="div" className="contact-card" delay={60}>
              <span className="contact-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+917848019826">+91 78480 19826</a></p>
              </div>
            </Reveal>

            <Reveal as="div" className="contact-card" delay={120}>
              <span className="contact-icon">🕒</span>
              <div>
                <h4>Timings</h4>
                <p>We're Open All Day, Every Day</p>
              </div>
            </Reveal>
          </div>

          <Reveal as="div" className="contact-map">
            <iframe
              title="The Grand Palette Location Map"
              src="https://www.google.com/maps?q=Jaydev+Vihar+2nd+Lane+Berhampur+Odisha&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>

        <Reveal as="form" className="contact-form" onSubmit={handleSubmit} noValidate>
          <h3>Send Us A Message</h3>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="cName">Name</label>
              <input
                type="text"
                id="cName"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="cEmail">Email</label>
              <input
                type="email"
                id="cEmail"
                name="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="cPhone">Phone (optional)</label>
              <input
                type="tel"
                id="cPhone"
                name="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="cMessage">Message</label>
            <textarea
              id="cMessage"
              name="message"
              rows="4"
              required
              maxLength={1000}
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            <span>{submitting ? 'Sending…' : 'Send Message'}</span>
          </button>
          <p className={`form-feedback ${feedback.type}`} role="status" aria-live="polite">
            {feedback.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
