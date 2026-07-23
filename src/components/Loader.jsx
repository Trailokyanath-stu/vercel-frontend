// src/components/Loader.jsx
import { useEffect, useState } from 'react';

export default function Loader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Small delay so the spin animation is actually visible,
    // then fade the loader out.
    const timer = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${loaded ? 'loaded' : ''}`} aria-hidden={loaded}>
      <div className="loader-mark">
        <svg viewBox="0 0 100 100" className="loader-ring">
          <circle cx="50" cy="50" r="42"></circle>
        </svg>
        <span className="loader-initial">GP</span>
      </div>
      <p className="loader-text">THE GRAND PALETTE</p>
    </div>
  );
}
