// src/components/ItemDetailModal.jsx
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function ItemDetailModal({ item, onClose }) {
  const { addToCart, openCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Standard');
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setSize('Standard');
    setSpiceLevel('Medium');
    setNotes('');
    setAdded(false);
  }, [item]);

  if (!item) return null;

  const calculatedPrice = (item.price * (size === 'Large / Portion for 2' ? 1.5 : 1)) * quantity;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(
      { ...item, price: item.price * (size === 'Large / Portion for 2' ? 1.5 : 1) },
      { quantity, size, spiceLevel, notes }
    );
    setAdded(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 600);
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: '560px' }}>
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '220px', marginBottom: '20px' }}>
          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(5,5,5,0.95), transparent 60%)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: '#ff173f',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
            }}
          >
            {item.category}
          </span>
        </div>

        <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: '#fff', marginBottom: '6px' }}>{item.name}</h3>
        <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '16px' }}>{item.description}</p>

        <form onSubmit={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Portion Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1c1c1e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                <option value="Standard">Standard Portion</option>
                <option value="Large / Portion for 2">Large (+50%)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Spice Preference</label>
              <select value={spiceLevel} onChange={(e) => setSpiceLevel(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1c1c1e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                <option value="Mild">Mild / Less Spicy 🌶️</option>
                <option value="Medium">Medium 🌶️🌶️</option>
                <option value="Chef Special Extra Spicy">Chef Special Spicy 🌶️🌶️🌶️</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Quantity</label>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '25px', padding: '4px 14px' }}>
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={{ color: '#ff4d6a', fontSize: '20px', padding: '0 8px' }}>
                -
              </button>
              <span style={{ fontSize: '16px', fontWeight: 700, padding: '0 12px', color: '#fff' }}>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} style={{ color: '#ff4d6a', fontSize: '20px', padding: '0 8px' }}>
                +
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Special Instructions (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Extra sauce, no onions, extra ice..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1c1c1e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            <span>{added ? '✓ Added to Order Tray!' : `Add to Order Tray • ₹${calculatedPrice}`}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
