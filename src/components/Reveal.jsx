// src/components/Reveal.jsx
// Wraps any content and fades/slides it in once it scrolls into view,
// mirroring the ".reveal" behavior from the original vanilla-JS site.

import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setInView(true), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${inView ? 'in-view' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
