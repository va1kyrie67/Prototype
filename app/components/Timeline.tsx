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
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;
    const line = lineRef.current;
    if (!wrapper || !track || !heading) return;

    const circles = circleRefs.current.filter(Boolean);
    if (circles.length === 0) return;

    // Calculate scroll distance
    const getMaxScroll = () => {
      return track.scrollWidth - window.innerWidth + 200;
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getMaxScroll()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Move track horizontally
      tl.to(track, {
        x: () => -getMaxScroll(),
        ease: "none",
      }, 0);

      // Animate heading out
      tl.to(heading, {
        opacity: 0,
        y: -20,
        ease: "power2.in",
        duration: 0.15,
      }, 0);

      // Animate progress line width
      if (line) {
        tl.fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", transformOrigin: "left center" },
          0.05
        );
      }

      // Highlight circles based on timeline progress
      const stepDuration = 1 / circles.length;
      circles.forEach((circle, i) => {
        const start = i * stepDuration;
        const mid = start + stepDuration * 0.5;
        const end = start + stepDuration;

        // Scale up + fill when active
        tl.to(circle, {
          scale: 1.35,
          backgroundColor: "#1a3d7c",
          color: "#fff",
          borderColor: "#1a3d7c",
          ease: "power2.inOut",
          duration: stepDuration * 0.4,
        }, mid);

        // Scale back down after
        if (i < circles.length - 1) {
          tl.to(circle, {
            scale: 1,
            backgroundColor: "#fff",
            color: "#1a3d7c",
            borderColor: "#1a3d7c",
            ease: "power2.inOut",
            duration: stepDuration * 0.3,
          }, end);
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white">
      <div ref={wrapperRef} className="relative h-screen overflow-hidden">
        <div className="shell h-full flex flex-col justify-center">
          <h2
            ref={headingRef}
            className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center mb-12"
          >
            From Your First Call to <br className="hidden sm:block" />
            <span className="text-brand-700">Financial Freedom</span>
          </h2>

          {/* Horizontal Track */}
          <div className="overflow-hidden relative">
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
                  <div
                    ref={(el) => { if (el) circleRefs.current[i] = el; }}
                    className="w-11 h-11 rounded-full bg-white border-2 border-brand-700 text-brand-700 flex items-center justify-center text-sm font-bold mb-4 shadow-pill relative z-10"
                  >
                    {step.num}
                  </div>
                  <h3 className="text-sm font-bold text-ink mb-1 text-center">{step.title}</h3>
                  <p className="text-xs text-ink-600 leading-relaxed px-2 text-center">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-danger-light rounded-xl p-4 max-w-[700px] mx-auto mt-6 text-left">
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
