// src/components/StoryModal.jsx
import { useReservationModal } from '../context/ReservationModalContext.jsx';

export default function StoryModal({ isOpen, onClose }) {
  const { openModal } = useReservationModal();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: '640px' }}>
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <span className="eyebrow">Our Journey & Philosophy</span>
        <h3 className="modal-title" style={{ marginBottom: '16px' }}>The Legacy of The Grand Palette</h3>

        <div style={{ color: '#ccc', fontSize: '14.5px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          <p>
            Founded in the heart of Berhampur at Jaydev Vihar, <strong>The Grand Palette</strong> began with a simple passion: to bring world-class coffee craftsmanship and authentic gourmet dining together under one roof.
          </p>
          <p>
            Over the past 12 years, our master roasters and seasoned executive chefs have dedicated themselves to sourcing single-origin beans, fresh local produce, and artisanal ingredients to deliver unforgettable culinary memories.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#121212', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
            <div>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#ff173f', display: 'block' }}>12+</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Years Craft</span>
            </div>
            <div>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#d9a75c', display: 'block' }}>50k+</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Cups Brewed</span>
            </div>
            <div>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#ff173f', display: 'block' }}>4.9 ★</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Guest Rating</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => { onClose(); openModal(); }}>
            <span>Reserve Table & Taste</span>
          </button>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            <span>Close Story</span>
          </button>
        </div>
      </div>
    </div>
  );
}
