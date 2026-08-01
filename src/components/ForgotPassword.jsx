// src/components/ForgotPassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendReset = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      setSuccess('Verification code sent to your email address!');
      setStep(2);
    }, 1000);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSuccess('Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-card">
          <h1>The Grand Palette</h1>
          <h2>Reset Password</h2>
          <p>
            {step === 1
              ? 'Enter your registered email to receive a password reset code.'
              : 'Enter the verification code sent to your email and your new password.'}
          </p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {step === 1 ? (
            <form onSubmit={handleSendReset}>
              <div className="input-box">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Reset Code'}
              </button>

              <div className="register-link">
                Remember your password? <Link to="/login">Login</Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit}>
              <div className="input-box">
                <label>Verification Code (OTP)</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code (e.g. 123456)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <div className="input-box">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-box">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Updating Password...' : 'Reset Password'}
              </button>

              <div className="register-link">
                Back to <Link to="/login">Login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
