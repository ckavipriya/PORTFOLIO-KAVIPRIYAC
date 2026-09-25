import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  hue: number;
}

export const AmbientParticles: React.FC<{ className?: string; count?: number }> = ({ 
  className = "", 
  count = 38 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const maxOp = 0.15 + Math.random() * 0.35;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.2,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -0.15 - Math.random() * 0.3,
        opacity: Math.random() * maxOp,
        maxOpacity: maxOp,
        pulseSpeed: 0.005 + Math.random() * 0.01,
        hue: Math.random() > 0.4 ? 160 : 210 // emerald or cyan/steel
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle gradient light ambient pool in the center/top
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.6
      );
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.04)');
      gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.pulseSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.05) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
        ctx.fill();

        // Subtle soft halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity * 0.18})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
