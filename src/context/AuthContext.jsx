// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gp_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('gp_token') || '');

  useEffect(() => {
    if (user) {
      localStorage.setItem('gp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gp_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('gp_token', token);
    } else {
      localStorage.removeItem('gp_token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const loggedUser = data.user || { name: email.split('@')[0], email };
        setUser(loggedUser);
        setToken(data.token || 'mock-jwt-token');
        return { success: true };
      }
    } catch {
      // Fallback
    }

    // Demo fallback authentication
    const displayName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const mockUser = {
      id: 'usr_' + Date.now(),
      name: formattedName || 'Valued Guest',
      email: email,
      phone: '+91 78480 19826',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      favoriteDishes: ['Grand Hazelnut Latte', 'Chef Special Biryani'],
    };
    setUser(mockUser);
    setToken('demo-token-' + Date.now());
    return { success: true, isDemo: true };
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, message: data.message };
      }
    } catch {
      // Fallback
    }

    // Demo fallback registration
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name,
      email: email,
      phone: '+91 78480 19826',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      favoriteDishes: [],
    };
    setUser(newUser);
    setToken('demo-token-' + Date.now());
    return { success: true, message: 'Registration successful! Welcome to The Grand Palette.' };
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('gp_user');
    localStorage.removeItem('gp_token');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
