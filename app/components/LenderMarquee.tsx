"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const lenders = [
  "Swoop Funding",
  "Upwise Capital",
  "SoFi",
  "LightStream",
  "United Capital",
];

export default function LenderMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let tween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      // Wait for layout to settle
      requestAnimationFrame(() => {
        const items = track.children;
        const halfCount = items.length / 2;

        // Calculate width of first half of items
        let totalHalfWidth = 0;
        for (let i = 0; i < halfCount; i++) {
          const rect = (items[i] as HTMLElement).getBoundingClientRect();
          totalHalfWidth += rect.width;
        }
        // Add gaps (gap-12 = 3rem = 48px between items)
        totalHalfWidth += (halfCount - 1) * 48;

        tween = gsap.to(track, {
          x: -totalHalfWidth,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      });
    }, wrapperRef);

    return () => {
      tween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="bg-band py-6 overflow-hidden">
      <div className="shell">
        <p className="text-xs text-white/50 text-center uppercase tracking-[0.16em] mb-4">
          Lenders on our marketplace
        </p>
      </div>

      <div className="mask-fade-x overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-12 will-change-transform">
          {[...lenders, ...lenders, ...lenders, ...lenders].map((name, i) => (
            <span
              key={i}
              className="text-xl sm:text-2xl font-extrabold text-white/30 whitespace-nowrap uppercase tracking-wide shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="shell mt-4">
        <p className="text-[10px] text-white/30 text-center leading-relaxed">
          All Trademarks, Logos, And Brand Names Displayed Are The Property Of
          Their Respective Owners. Use Of These Names And Logos Does Not Imply
          Endorsement.
        </p>
      </div>
    </section>
  );
}
