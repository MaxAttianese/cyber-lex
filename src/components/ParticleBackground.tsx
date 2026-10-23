import { useRef } from 'react';
import { useParticles } from '../hooks/useParticles';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default ParticleBackground;
