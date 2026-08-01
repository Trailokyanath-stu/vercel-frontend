// src/api.js
// Small fetch wrapper for talking to The Grand Palette backend.
//
// In dev, Vite's proxy (see vite.config.js) forwards "/api" requests
// to the Express server on http://localhost:5000.
// In production, this React app's build output is served BY that
// same Express server, so "/api" continues to work unchanged.

const API_BASE = 'https://grand-palette-backend.onrender.com/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }

  return data;
}

export function fetchMenu() {
  return request('/menu');
}

export function submitReservation(payload) {
  return request('/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function submitContactMessage(payload) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
