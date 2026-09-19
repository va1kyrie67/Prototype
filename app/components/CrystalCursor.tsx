"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface Crystal {
  size: number;
  offsetX: number;
  offsetY: number;
  duration: number;
  opacity: number;
  bobDelay: number;
  bobDuration: number;
  gradient: string;
}

const crystals: Crystal[] = [
  {
    size: 18, offsetX: 0, offsetY: 0, duration: 0.35, opacity: 0.7,
    bobDelay: 0, bobDuration: 4.2,
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.7), rgba(59,130,246,0.5))",
  },
  {
    size: 12, offsetX: -30, offsetY: -20, duration: 0.55, opacity: 0.5,
    bobDelay: 0.6, bobDuration: 3.8,
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.8), rgba(99,102,241,0.6), rgba(14,165,233,0.5))",
  },
  {
    size: 14, offsetX: 25, offsetY: 15, duration: 0.45, opacity: 0.6,
    bobDelay: 1.2, bobDuration: 4.5,
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(168,85,247,0.6), rgba(99,102,241,0.5))",
  },
  {
    size: 10, offsetX: -15, offsetY: 25, duration: 0.7, opacity: 0.4,
    bobDelay: 0.3, bobDuration: 3.5,
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.7), rgba(99,102,241,0.8), rgba(139,92,246,0.6))",
  },
  {
    size: 8, offsetX: 35, offsetY: -10, duration: 0.65, opacity: 0.35,
    bobDelay: 1.8, bobDuration: 4.0,
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(59,130,246,0.6), rgba(99,102,241,0.5))",
  },
  {
    size: 16, offsetX: -40, offsetY: 5, duration: 0.8, opacity: 0.55,
    bobDelay: 0.9, bobDuration: 4.8,
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(14,165,233,0.7), rgba(168,85,247,0.5))",
  },
];

function CrystalShape({ crystal }: { crystal: Crystal }) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: crystal.duration,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: crystal.duration,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX + crystal.offsetX);
      yTo(e.clientY + crystal.offsetY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [crystal.duration, crystal.offsetX, crystal.offsetY]);

  return (
    <div
      ref={elRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        width: crystal.size,
        height: crystal.size,
        opacity: crystal.opacity,
        willChange: "transform",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          background: crystal.gradient,
          animation: `crystalBob ${crystal.bobDuration}s ease-in-out ${crystal.bobDelay}s infinite alternate`,
          filter: `drop-shadow(0 0 ${crystal.size / 2}px rgba(99,102,241,0.3))`,
        }}
      />
    </div>
  );
}

export default function CrystalCursor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {crystals.map((crystal, i) => (
        <CrystalShape key={i} crystal={crystal} />
      ))}
    </div>
  );
}
