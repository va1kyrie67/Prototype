"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX - 150);
      yTo(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[1]"
      style={{
        width: 300,
        height: 300,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(23,65,149,0.28) 0%, rgba(23,65,149,0.10) 40%, transparent 70%)",
        filter: "blur(20px)",
        willChange: "transform",
      }}
    />
  );
}
