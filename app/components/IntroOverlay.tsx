"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });

      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.25,
        delay: 0.35,
        ease: "power2.in",
      })
        .to(
          leftRef.current,
          {
            xPercent: -100,
            duration: 0.5,
            ease: "power4.inOut",
          },
          "+=0.02"
        )
        .to(
          rightRef.current,
          {
            xPercent: 100,
            duration: 0.5,
            ease: "power4.inOut",
          },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="intro-overlay">
      <div ref={leftRef} className="intro-panel-left" />
      <div ref={rightRef} className="intro-panel-right" />
      <div ref={contentRef} className="intro-content">
        <span
          className="font-extrabold uppercase tracking-[0.04em] text-white"
          style={{ fontSize: "10vw" }}
        >
          PriorityPlus
        </span>
      </div>
    </div>
  );
}
