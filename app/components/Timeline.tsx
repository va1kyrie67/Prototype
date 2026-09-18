"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  {
    num: 1,
    title: "Offers in hand",
    desc: "Check your rate, compare pre-qualified offers from 8+ lenders, and pick your plan.",
  },
  {
    num: 2,
    title: "Funds in your account",
    desc: "Money is deposited straight into your bank account, ready to clear your balances.",
  },
  {
    num: 3,
    title: "Simplified Repayment",
    desc: "Five due dates become one fixed monthly payment - one amount and no surprises.",
  },
  {
    num: 4,
    title: "Debt paid off",
    desc: "No prepayment penalties. Finish sooner and keep more of your money.",
  },
];

export default function Timeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const glowRefs = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;
    const line = lineRef.current;
    if (!wrapper || !track || !heading) return;

    const circles = circleRefs.current.filter(Boolean);
    const glows = glowRefs.current.filter(Boolean);
    const cards = cardsRef.current.filter(Boolean);
    if (circles.length === 0) return;

    let ctx: gsap.Context;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    const initAnimation = () => {
      ctx = gsap.context(() => {
        const trackWidth = track.scrollWidth;
        const viewWidth = window.innerWidth;
        const totalScroll = trackWidth - viewWidth;

        // Set initial glow states
        glows.forEach((glow) => {
          gsap.set(glow, { opacity: 0, scale: 0.8 });
        });

        // Set initial card states
        cards.forEach((card) => {
          gsap.set(card, { opacity: 0.4, y: 10 });
        });

        // Calculate each circle's position as a fraction of total scroll
        // (0 = first circle at left edge, 1 = last circle at right edge)
        const circlePositions = circles.map((c) => {
          const rect = c.getBoundingClientRect();
          const trackRect = track.getBoundingClientRect();
          const centerInTrack = rect.left - trackRect.left + rect.width / 2;
          // Convert to fraction of the scrollable distance
          return centerInTrack / trackWidth;
        });

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Move track horizontally
            gsap.set(track, { x: -progress * totalScroll });

            // Fill progress line — use same progress value directly
            if (line) {
              gsap.set(line, { scaleX: progress, transformOrigin: "left center" });
            }

            // The leading edge of the line is at `progress` fraction of the track
            const lineLeading = progress;

            const stepCount = circles.length;
            for (let i = 0; i < stepCount; i++) {
              const circleFrac = circlePositions[i];
              // How far past the line has reached this circle (0 = just reached, positive = passed)
              const distPast = lineLeading - circleFrac;
              // How far until the line reaches it (positive = not yet reached)
              const distAhead = circleFrac - lineLeading;

              // Circle is "active" when the line has just reached or is approaching it
              // Use a smooth band around the line position
              const activeBand = 0.08; // ~8% of total scroll for active zone
              const inActiveZone = distPast > -activeBand && distPast < activeBand;
              const isHighlighted = inActiveZone || (i === stepCount - 1 && progress >= circleFrac);

              // Smooth intensity: peaks when line is exactly at circle position
              const intensity = Math.max(0, 1 - Math.abs(distPast) / activeBand);
              const smoothIntensity = intensity * intensity; // ease-in for cleaner feel

              const maxScale = 1.35;
              const minScale = 1.0;
              const scale = minScale + (maxScale - minScale) * smoothIntensity;

              // Circle appearance
              gsap.to(circles[i], {
                scale: scale,
                backgroundColor: isHighlighted ? "#174195" : "#fff",
                color: isHighlighted ? "#fff" : "#174195",
                borderColor: isHighlighted ? "#174195" : "#bdd4f7",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });

              // Glow
              if (glows[i]) {
                if (isHighlighted) {
                  glows[i].classList.add("tl-glow-active");
                } else {
                  glows[i].classList.remove("tl-glow-active");
                }
                gsap.to(glows[i], {
                  opacity: smoothIntensity,
                  scale: 0.8 + smoothIntensity * 0.2,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }

              // Card text
              if (cards[i]) {
                gsap.to(cards[i], {
                  opacity: 0.4 + smoothIntensity * 0.6,
                  y: 10 - smoothIntensity * 10,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            }
          },
        });
      }, wrapperRef);
    };

    // Small delay to ensure layout is ready
    const timer = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timer);
      scrollTriggerInstance?.kill();
      ctx?.revert();
    };
  }, []);

  return (
    <section className="bg-white">
      <div ref={wrapperRef} className="relative min-h-[85vh] overflow-hidden">
        <div className="shell h-full flex flex-col justify-center">
          <h2
            ref={headingRef}
            className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center mb-12"
          >
            From Your First Call to <br className="hidden sm:block" />
            <span className="text-brand-700">Financial Freedom</span>
          </h2>

          {/* Horizontal Track */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-slate-200">
              <div
                ref={lineRef}
                className="h-full bg-brand-700 origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <div ref={trackRef} className="flex w-max relative" style={{ paddingLeft: "50vw", paddingRight: "50vw" }}>
              {timelineSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="flex flex-col items-center w-[230px] shrink-0 relative"
                >
                  {/* Glow ring behind circle */}
                  <div className="relative">
                    <div
                      ref={(el) => { if (el) glowRefs.current[i] = el; }}
                      className="absolute inset-[-8px] rounded-full bg-brand-700/20 blur-md"
                      style={{ opacity: 0 }}
                    />
                    <div
                      ref={(el) => { if (el) circleRefs.current[i] = el; }}
                      className="w-11 h-11 rounded-full bg-white border-2 border-brand-700 text-brand-700 flex items-center justify-center text-sm font-bold relative z-10"
                      style={{ willChange: "transform, background-color, color, border-color" }}
                    >
                      {step.num}
                    </div>
                  </div>
                  <div
                    ref={(el) => { if (el) cardsRef.current[i] = el; }}
                    className="mt-4 text-center"
                  >
                    <h3 className="text-sm font-bold text-ink mb-1">{step.title}</h3>
                    <p className="text-xs text-ink-600 leading-relaxed px-2">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-danger-light rounded-xl p-4 max-w-[700px] mx-auto mt-10 text-left">
            <p className="text-sm font-bold text-danger mb-1">
              Don&apos;t let minimum payments slow you down.
            </p>
            <p className="text-xs text-ink-600 leading-relaxed">
              Avoid decades of interest by replacing high-interest balances with
              one predictable payment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
