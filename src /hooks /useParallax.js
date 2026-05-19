import { useRef, useCallback } from 'react';

/**
 * Returns a ref to attach to the grid container.
 * On mousemove, each child card gets a subtle 3D tilt based on cursor position.
 */
export function useParallax(strength = 6) {
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('[data-parallax]');
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1

    cards.forEach((card) => {
      const depth = parseFloat(card.dataset.parallax) || 1;
      const rotX = -dy * strength * depth * 0.5;
      const rotY = dx * strength * depth * 0.5;
      const tx = dx * 4 * depth;
      const ty = dy * 4 * depth;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate(${tx}px,${ty}px)`;
      card.style.transition = 'transform 0.1s ease-out';
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll('[data-parallax]').forEach((card) => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate(0,0)';
      card.style.transition = 'transform 0.5s ease-out';
    });
  }, []);

  return { containerRef, handleMouseMove, handleMouseLeave };
}
