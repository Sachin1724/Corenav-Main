import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isCTA, setIsCTA] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [role="button"], input, .cursor-hover');
      const cta = target.closest('.cta-button, [data-cta]');
      setIsHovering(!!interactive);
      setIsCTA(!!cta);
    };

    const onOut = () => {
      setIsHovering(false);
      setIsCTA(false);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Animation loop — spring-damped follow
    let raf: number;
    const animate = () => {
      const ease = 0.15;
      const ringEase = 0.08;

      pos.current.x += (mouse.current.x - pos.current.x) * ease;
      pos.current.y += (mouse.current.y - pos.current.y) * ease;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ringEase;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ringEase;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  const dotSize = isHovering ? 8 : 5;
  const ringSize = isHovering ? 48 : 32;
  const accentColor = isCTA ? '#FFC700' : '#FF5C00';

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: accentColor,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.3s, height 0.3s, background-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${accentColor}`,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1), height 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s',
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default CustomCursor;
