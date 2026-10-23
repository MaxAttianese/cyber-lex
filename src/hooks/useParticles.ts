import { useEffect, type RefObject } from 'react';

interface Particle {
  /** Position along the base trajectory, unaffected by the mouse. */
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  /** Displacement caused by repulsion, smoothly eased back to 0. */
  offsetX: number;
  offsetY: number;
  radius: number;
  color: string;
}

export interface ParticleOptions {
  /** Number of particles; if omitted, it is computed from the surface area. */
  count?: number;
  /** Maximum distance (px) within which two particles get linked. */
  maxDistance?: number;
  speed?: number;
}

interface Point {
  x: number;
  y: number;
}

/** purple-500, fuchsia-500, pink-500 (RGB channels for rgba()). */
const PALETTE = ['168, 85, 247', '217, 70, 239', '236, 72, 153'];
const LINK_COLOR = '168, 85, 247';

const MOUSE_REPEL_RADIUS = 130;
const MOUSE_REPEL_STRENGTH = 60;
const MOUSE_LINK_RADIUS = 180;
const REPEL_EASING = 0.08;

const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min);

const createParticle = (width: number, height: number, speed: number): Particle => ({
  baseX: Math.random() * width,
  baseY: Math.random() * height,
  vx: randomBetween(-speed, speed),
  vy: randomBetween(-speed, speed),
  offsetX: 0,
  offsetY: 0,
  radius: randomBetween(1, 3),
  color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
});

const positionOf = (p: Particle): Point => ({ x: p.baseX + p.offsetX, y: p.baseY + p.offsetY });

export const useParticles = (
  canvasRef: RefObject<HTMLCanvasElement>,
  options: ParticleOptions = {},
): void => {
  const { count, maxDistance = 140, speed = 0.4 } = options;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouse: Point | null = null;
    let frameId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const total = count ?? Math.min(120, Math.floor((width * height) / 15000));
      particles = Array.from({ length: total }, () => createParticle(width, height, speed));
    };

    const update = () => {
      for (const p of particles) {
        if (!reduceMotion) {
          p.baseX += p.vx;
          p.baseY += p.vy;
          if (p.baseX < 0 || p.baseX > width) p.vx *= -1;
          if (p.baseY < 0 || p.baseY > height) p.vy *= -1;
        }

        let targetX = 0;
        let targetY = 0;
        if (mouse) {
          const dx = p.baseX - mouse.x;
          const dy = p.baseY - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < MOUSE_REPEL_RADIUS) {
            const force = (1 - distance / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
            targetX = (dx / distance) * force;
            targetY = (dy / distance) * force;
          }
        }

        p.offsetX += (targetX - p.offsetX) * REPEL_EASING;
        p.offsetY += (targetY - p.offsetY) * REPEL_EASING;
      }
    };

    const drawNeighbourLinks = () => {
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i += 1) {
        const a = positionOf(particles[i]);
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = positionOf(particles[j]);
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(${LINK_COLOR}, ${(1 - distance / maxDistance) * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawMouseLinks = (pointer: Point) => {
      ctx.lineWidth = 1.2;
      ctx.shadowColor = `rgba(${LINK_COLOR}, 1)`;
      ctx.shadowBlur = 10;
      for (const p of particles) {
        const position = positionOf(p);
        const distance = Math.hypot(position.x - pointer.x, position.y - pointer.y);
        if (distance < MOUSE_LINK_RADIUS) {
          ctx.strokeStyle = `rgba(${LINK_COLOR}, ${(1 - distance / MOUSE_LINK_RADIUS) * 0.8})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(position.x, position.y);
          ctx.stroke();
        }
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        const position = positionOf(p);
        ctx.shadowColor = `rgba(${p.color}, 1)`;
        ctx.shadowBlur = 12;
        ctx.fillStyle = `rgba(${p.color}, 0.9)`;
        ctx.beginPath();
        ctx.arc(position.x, position.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawNeighbourLinks();
      if (mouse) drawMouseLinks(mouse);
      drawParticles();
    };

    const loop = () => {
      update();
      draw();
      if (!reduceMotion) frameId = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      resize();
      if (reduceMotion) draw();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse = { x: event.clientX, y: event.clientY };
      if (reduceMotion) {
        update();
        draw();
      }
    };

    // The canvas has pointer-events-none, so mouse movement is listened to at window level.
    const handleMouseLeave = () => {
      mouse = null;
    };

    resize();
    loop();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef, count, maxDistance, speed]);
};
