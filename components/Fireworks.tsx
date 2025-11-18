
import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    const colors = ['#FFD700', '#FFA500', '#FFFFFF', '#FF4500']; // Gold, Orange, White, Red-Orange

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.vx *= 0.95; // drag
        this.vy *= 0.95; // drag
        this.life -= 0.02; // fade out
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        // Draw a "spark" line trailing behind
        ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
        ctx.stroke();
      }
    }

    const createBurst = (x: number, y: number) => {
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y));
      }
    };

    // Launch a few bursts initially
    createBurst(window.innerWidth * 0.3, window.innerHeight * 0.4);
    createBurst(window.innerWidth * 0.7, window.innerHeight * 0.4);
    setTimeout(() => createBurst(window.innerWidth * 0.5, window.innerHeight * 0.3), 300);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
          // Cleanup check
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

export default Fireworks;
