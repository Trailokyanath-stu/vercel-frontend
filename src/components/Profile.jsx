// src/components/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // orders, reservations, settings
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setName(user.name || '');
    setPhone(user.phone || '');

    const localOrders = JSON.parse(localStorage.getItem('gp_orders') || '[]');
    setOrders(localOrders);
  }, [user, navigate]);

  if (!user) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, phone });
    setEditing(false);
    setSavedMsg('Profile updated successfully!');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', padding: '100px 20px 40px' }}>
      <div className="auth-overlay"></div>

      <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#ff4d6a', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
            ← Back to The Grand Palette
          </Link>
          <button
            onClick={() => { logout(); navigate('/'); }}
            style={{ color: '#aaa', background: 'rgba(255,255,255,0.06)', padding: '8px 18px', borderRadius: '20px', fontSize: '13px' }}
          >
            Logout
          </button>
        </div>

        {/* User Card Header */}
        <div
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            padding: '28px',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff173f, #b8002a)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: '#fff', marginBottom: '4px' }}>
              {user.name}
            </h2>
            <p style={{ color: '#aaa', fontSize: '14px' }}>{user.email} · Member since {user.joinDate || '2026'}</p>
          </div>
        </div>

        {/* Profile Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {[
            { id: 'orders', label: '📦 My Orders' },
            { id: 'settings', label: '⚙️ Account Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '14px',
                background: activeTab === tab.id ? '#ff173f' : 'rgba(255,255,255,0.06)',
                color: '#fff',
                border: '1px solid ' + (activeTab === tab.id ? '#ff173f' : 'transparent'),
                transition: '0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '24px',
            }}
          >
            <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '16px' }}>Order History</h3>
            {orders.length === 0 ? (
              <p style={{ color: '#888', fontSize: '14px', padding: '20px 0' }}>No past orders yet. Try ordering from our menu!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      background: '#121212',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '14px',
                      padding: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ color: '#d9a75c', fontWeight: 700, fontSize: '15px' }}>{ord.id}</span>
                      <span style={{ background: '#262628', color: '#ff4d6a', fontSize: '12px', padding: '4px 10px', borderRadius: '12px' }}>
                        {ord.status}
                      </span>
                    </div>

                    <p style={{ color: '#aaa', fontSize: '12px', marginBottom: '10px' }}>{ord.date} · {ord.orderType}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                      {ord.items.map((it) => (
                        <div key={it.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', fontSize: '13.5px' }}>
                          <span>{it.name} x{it.quantity}</span>
                          <span>₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: 700 }}>
                      <span>Total Paid</span>
                      <span style={{ color: '#d9a75c' }}>₹{ord.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '24px',
            }}
          >
            <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '16px' }}>Account Information</h3>
            {savedMsg && <p style={{ color: '#ff4d6a', fontSize: '14px', marginBottom: '14px' }}>{savedMsg}</p>}

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-field">
                <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#1c1c1e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                  required
                />
              </div>

              <div className="form-field">
                <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#121212', color: '#777', border: '1px solid rgba(255,255,255,0.05)' }}
                />
              </div>

              <div className="form-field">
                <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 78480 19826"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#1c1c1e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
