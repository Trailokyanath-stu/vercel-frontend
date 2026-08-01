// src/components/CartModal.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function CartModal() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart, totalAmount, totalItems } = useCart();
  const { user } = useAuth();

  const [orderType, setOrderType] = useState('Dine-In'); // Dine-In, Takeaway, Delivery
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Save to order history if user is logged in
      const pastOrders = JSON.parse(localStorage.getItem('gp_orders') || '[]');
      const newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleString(),
        items: cart,
        total: totalAmount + 25, // including tax/packaging
        orderType,
        tableNumber: orderType === 'Dine-In' ? tableNumber : null,
        address: orderType === 'Delivery' ? address : null,
        status: 'Preparing',
      };
      localStorage.setItem('gp_orders', JSON.stringify([newOrder, ...pastOrders]));

      setTimeout(() => {
        clearCart();
        setIsSubmitted(false);
        closeCart();
      }, 3000);
    }, 1200);
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && closeCart()}>
      <div className="modal-box cart-modal-box" style={{ maxWidth: '640px' }}>
        <button type="button" className="modal-close" onClick={closeCart}>
          &times;
        </button>

        <span className="eyebrow">Your Selection</span>
        <h3 className="modal-title" style={{ marginBottom: '20px' }}>
          Order Tray {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
        </h3>

        {isSubmitted ? (
          <div className="cart-success-state" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h4 style={{ fontSize: '24px', color: '#ff173f', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
              Order Placed Successfully!
            </h4>
            <p style={{ color: '#aaa', marginBottom: '20px' }}>
              Your order has been sent directly to The Grand Palette kitchen. Chef is preparing your delicious meal!
            </p>
            <div style={{ background: '#1c1c1e', padding: '16px', borderRadius: '12px', color: '#d9a75c', fontSize: '14px' }}>
              Order Type: <strong>{orderType}</strong> {orderType === 'Dine-In' ? `(${tableNumber})` : ''}
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍽️</div>
            <p style={{ fontSize: '18px', color: '#ccc', marginBottom: '8px' }}>Your tray is currently empty.</p>
            <p style={{ fontSize: '14px' }}>Explore our live menu and add your favorite gourmet dishes!</p>
          </div>
        ) : (
          <form onSubmit={handleCheckout}>
            <div className="cart-items-list" style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '54px', height: '54px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, marginLeft: '14px' }}>
                    <h5 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{item.name}</h5>
                    <span style={{ fontSize: '12px', color: '#aaa' }}>
                      ₹{item.price} · {item.size}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#262628', borderRadius: '20px', padding: '2px 8px' }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        style={{ color: '#ff4d6a', fontSize: '16px', padding: '2px 6px' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 600, padding: '0 8px', color: '#fff' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        style={{ color: '#ff4d6a', fontSize: '16px', padding: '2px 6px' }}
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#d9a75c', minWidth: '60px', textAlign: 'right' }}>
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{ color: '#6f6f75', fontSize: '18px', marginLeft: '6px' }}
                      title="Remove item"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Preference */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '8px' }}>Order Preference</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Dine-In', 'Takeaway', 'Delivery'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: orderType === type ? '#ff173f' : '#1c1c1e',
                      color: '#fff',
                      border: '1px solid ' + (orderType === type ? '#ff173f' : 'rgba(255,255,255,0.1)'),
                      transition: '0.2s',
                    }}
                  >
                    {type === 'Dine-In' ? '🍽️ Dine-In' : type === 'Takeaway' ? '🛍️ Takeaway' : '🚀 Delivery'}
                  </button>
                ))}
              </div>
            </div>

            {orderType === 'Dine-In' && (
              <div className="form-field" style={{ marginBottom: '16px' }}>
                <label htmlFor="tblNum">Select Table Number</label>
                <select id="tblNum" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)}>
                  <option value="Table 1">Table 1 (Window Side)</option>
                  <option value="Table 2">Table 2 (Cozy Booth)</option>
                  <option value="Table 3">Table 3 (Family Section)</option>
                  <option value="Table 4">Table 4 (Center Garden View)</option>
                  <option value="Table 5">Table 5 (Terrace)</option>
                </select>
              </div>
            )}

            {orderType === 'Delivery' && (
              <div className="form-field" style={{ marginBottom: '16px' }}>
                <label htmlFor="delAddr">Delivery Address</label>
                <input
                  type="text"
                  id="delAddr"
                  placeholder="Street name, House/Flat No, Berhampur"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Price Summary */}
            <div style={{ background: '#121212', padding: '14px', borderRadius: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '13px', marginBottom: '6px' }}>
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>
                <span>Taxes & Kitchen Service Charge</span>
                <span>₹25</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '16px', fontWeight: 700, paddingTop: '8px', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                <span>Total Amount Payable</span>
                <span style={{ color: '#d9a75c' }}>₹{totalAmount + 25}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending to Kitchen…' : `Confirm & Place Order (₹${totalAmount + 25})`}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
