import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

const PARTICLE_COUNT = 45;
const CONNECTION_DIST = 120;
const MOUSE_RADIUS = 200;
const GRID_SPACING = 60;

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const dims = useRef({ w: 0, h: 0 });
  const rafId = useRef<number>(0);
  const isVisible = useRef(true);

  const initParticles = useCallback((w: number, h: number) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.3 - 0.1, // drift upward
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      baseOpacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, mx: number, my: number) => {
    const offsetX = ((mx - w / 2) / w) * 15;
    const offsetY = ((my - h / 2) / h) * 10;

    ctx.strokeStyle = 'rgba(255, 199, 0, 0.04)';
    ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = -GRID_SPACING; x <= w + GRID_SPACING; x += GRID_SPACING) {
      const shiftedX = x + offsetX;
      ctx.beginPath();
      ctx.moveTo(shiftedX, 0);
      ctx.lineTo(shiftedX, h);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = -GRID_SPACING; y <= h + GRID_SPACING; y += GRID_SPACING) {
      const shiftedY = y + offsetY;
      ctx.beginPath();
      ctx.moveTo(0, shiftedY);
      ctx.lineTo(w, shiftedY);
      ctx.stroke();
    }

    // Brighter crosshair lines through grid intersections near mouse
    ctx.strokeStyle = 'rgba(255, 199, 0, 0.08)';
    ctx.lineWidth = 1;
    const nearX = Math.round((mx - offsetX) / GRID_SPACING) * GRID_SPACING + offsetX;
    const nearY = Math.round((my - offsetY) / GRID_SPACING) * GRID_SPACING + offsetY;
    ctx.beginPath();
    ctx.moveTo(nearX, 0);
    ctx.lineTo(nearX, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, nearY);
    ctx.lineTo(w, nearY);
    ctx.stroke();
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, mx: number, my: number) => {
    const pts = particles.current;

    // Update positions
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Mouse influence — particles gently push away
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const force = (1 - dist / MOUSE_RADIUS) * 0.02;
        p.vx += dx * force;
        p.vy += dy * force;
      }

      // Dampen velocity
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Brighten near mouse
      const brightness = dist < MOUSE_RADIUS ? p.baseOpacity + (1 - dist / MOUSE_RADIUS) * 0.4 : p.baseOpacity;
      p.opacity += (brightness - p.opacity) * 0.05;
    }

    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.strokeStyle = `rgba(255, 199, 0, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of pts) {
      ctx.fillStyle = `rgba(255, 199, 0, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawMouseGlow = useCallback((ctx: CanvasRenderingContext2D, mx: number, my: number) => {
    if (mx < 0 || my < 0) return;
    const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
    gradient.addColorStop(0, 'rgba(255, 199, 0, 0.06)');
    gradient.addColorStop(0.5, 'rgba(255, 92, 0, 0.02)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(mx - MOUSE_RADIUS, my - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
      dims.current = { w: rect.width, h: rect.height };
      if (particles.current.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (isVisible.current) {
        const { w, h } = dims.current;
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const mx = mouse.current.x;
        const my = mouse.current.y;

        drawGrid(ctx, w, h, mx, my);
        drawParticles(ctx, w, h, mx, my);
        drawMouseGlow(ctx, mx, my);
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [initParticles, drawGrid, drawParticles, drawMouseGlow]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-auto"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default HeroCanvas;
