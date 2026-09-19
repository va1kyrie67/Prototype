"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDir: number;
  opacitySpeed: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 80;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cvs!.width = w;
      cvs!.height = h;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        opacitySpeed: Math.random() * 0.005 + 0.002,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        p.opacity += p.opacityDir * p.opacitySpeed;
        if (p.opacity >= 0.6) {
          p.opacity = 0.6;
          p.opacityDir = -1;
        } else if (p.opacity <= 0.05) {
          p.opacity = 0.05;
          p.opacityDir = 1;
        }

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
