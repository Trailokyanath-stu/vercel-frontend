// src/components/ReviewModal.jsx
import { useState } from 'react';

export default function ReviewModal({ isOpen, onClose, onAddReview }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    onAddReview({
      text,
      author: name,
      rating,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setText('');
      setRating(5);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: '520px' }}>
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <span className="eyebrow">Share Your Experience</span>
        <h3 className="modal-title" style={{ marginBottom: '16px' }}>Write A Guest Review</h3>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🌟</div>
            <h4 style={{ color: '#d9a75c', fontSize: '20px', marginBottom: '8px' }}>Thank You For Your Feedback!</h4>
            <p style={{ color: '#aaa', fontSize: '14px' }}>Your review has been added to our wall of love.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '8px' }}>Star Rating</label>
              <div style={{ display: 'flex', gap: '8px', fontSize: '24px', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ color: star <= rating ? '#ff173f' : '#444', transition: '0.2s' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="form-field" style={{ marginBottom: '14px' }}>
              <label htmlFor="revName">Your Name</label>
              <input
                type="text"
                id="revName"
                placeholder="e.g. Priya M."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-field" style={{ marginBottom: '20px' }}>
              <label htmlFor="revText">Your Review</label>
              <textarea
                id="revText"
                rows="4"
                placeholder="Tell us about the food, ambience, coffee, or chef's hospitality..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Submit Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
