// src/components/ServiceDetailModal.jsx
import { useReservationModal } from '../context/ReservationModalContext.jsx';

export default function ServiceDetailModal({ service, onClose }) {
  const { openModal } = useReservationModal();

  if (!service) return null;

  const handleBookService = () => {
    onClose();
    openModal();
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: '560px' }}>
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{service.icon}</div>
        <span className="eyebrow">Our Specialized Services</span>
        <h3 className="modal-title" style={{ marginBottom: '14px' }}>{service.title}</h3>
        
        <p style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
          {service.fullDetails || service.text}
        </p>

        <div style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px', marginBottom: '24px' }}>
          <h4 style={{ color: '#d9a75c', fontSize: '15px', marginBottom: '10px' }}>Key Highlights</h4>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#aaa', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {service.highlights ? (
              service.highlights.map((h, i) => <li key={i}>{h}</li>)
            ) : (
              <>
                <li>Tailored experience crafted by master chefs and barista experts</li>
                <li>Hygienic prep and premium grade ingredients sourced daily</li>
                <li>Customizable options for groups, corporate events, and parties</li>
              </>
            )}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleBookService}>
            <span>Reserve / Book This Service</span>
          </button>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
