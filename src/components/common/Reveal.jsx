import { useLayoutEffect, useRef } from 'react';

/**
 * Reveals content only when JavaScript, IntersectionObserver, and motion
 * preferences allow it. Without JS the markup remains fully visible, which
 * also keeps prerendered and printed pages intact.
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return undefined;

    element.classList.add('reveal-pending');
    if (delay) element.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
