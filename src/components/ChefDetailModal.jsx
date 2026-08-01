// src/components/ChefDetailModal.jsx
import { useReservationModal } from '../context/ReservationModalContext.jsx';

export default function ChefDetailModal({ chef, onClose }) {
  const { openModal } = useReservationModal();

  if (!chef) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: '600px' }}>
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={chef.image}
            alt={chef.name}
            style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff173f' }}
          />
          <div>
            <span className="eyebrow" style={{ marginBottom: '4px' }}>{chef.role}</span>
            <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: '#fff' }}>{chef.name}</h3>
            <p style={{ color: '#d9a75c', fontSize: '14px', fontWeight: 600 }}>👩‍🍳 {chef.experience}</p>
          </div>
        </div>

        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
          {chef.about}
        </p>

        {chef.signatureDish && (
          <div style={{ background: 'rgba(255, 23, 63, 0.12)', border: '1px solid rgba(255, 23, 63, 0.3)', borderRadius: '12px', padding: '14px 18px', marginBottom: '16px' }}>
            <span style={{ color: '#ff4d6a', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Signature Recommendation</span>
            <h5 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginTop: '2px' }}>{chef.signatureDish}</h5>
          </div>
        )}

        <div style={{ background: '#121212', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '15px', marginBottom: '10px' }}>Specialties & Expertise</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {chef.specialties.map((s) => (
              <span key={s} style={{ background: '#262628', color: '#ff4d6a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
                ⭐ {s}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={() => {
            onClose();
            openModal();
          }}
        >
          <span>Book Chef's Table Experience</span>
        </button>
      </div>
    </div>
  );
}
