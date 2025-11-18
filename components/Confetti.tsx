
import React, { useEffect, useRef } from 'react';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: Piece[] = [];
    const colors = ['#fca5a5', '#fdba74', '#fde047', '#86efac', '#93c5fd', '#c4b5fd'];

    class Piece {
      x: number;
      y: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      size: number;
      speedY: number;
      speedX: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * -canvas!.height;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas!.height) {
          this.y = -20;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
        ctx.restore();
      }
    }

    // Initialize
    for (let i = 0; i < 150; i++) {
      pieces.push(new Piece());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
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
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
};

export default Confetti;
