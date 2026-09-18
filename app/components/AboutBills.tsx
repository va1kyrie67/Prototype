"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bills = [
  { title: "High Interest", value: "24.9% APR", type: "Credit Card", finalX: -180, finalY: -100, rotate: -8 },
  { title: "Payment Due", value: "$185/mo", type: "Auto Loan", finalX: 180, finalY: -120, rotate: -3 },
  { title: "Minimum Payment", value: "$120/mo", type: "Store Card", finalX: 200, finalY: 80, rotate: 7 },
  { title: "Late Fee Risk", value: "+$35", type: "Monthly", finalX: -160, finalY: 100, rotate: 5 },
];

export default function AboutBills() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;
    const panel = panelRef.current;
    const watermark = watermarkRef.current;
    if (!wrapper || !track || !heading || !panel) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    // Set initial states
    gsap.set(heading, { opacity: 1 });
    gsap.set(panel, { scale: 0.8, opacity: 0 });
    if (watermark) gsap.set(watermark, { opacity: 0.03 });

    const startPositions = [
      { x: -500, y: -400, rotate: -30 },
      { x: 500, y: -400, rotate: 25 },
      { x: 500, y: 400, rotate: -20 },
      { x: -500, y: 400, rotate: 30 },
    ];

    cards.forEach((card, i) => {
      const sp = startPositions[i] || startPositions[0];
      gsap.set(card, {
        x: sp.x,
        y: sp.y,
        rotate: sp.rotate,
        opacity: 0,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.3,
      },
    });

    // Phase 1: Heading fades out (0–6%)
    tl.to(heading, { opacity: 0, duration: 0.06 }, 0);

    // Phase 2: Cards fly in from corners one by one (6%–40%)
    cards.forEach((card, i) => {
      const bill = bills[i];
      const startTime = 0.06 + i * 0.08;
      tl.to(card, {
        x: bill.finalX,
        y: bill.finalY,
        rotate: bill.rotate,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      }, startTime);
    });

    // Phase 3: Hold cards visible (40%–50%)
    tl.to({}, { duration: 0.1 }, 0.40);

    // Phase 4: Cards scatter outward and fade + watermark fades (50%–65%)
    cards.forEach((card, i) => {
      const bill = bills[i];
      const scatterX = bill.finalX * 1.8;
      const scatterY = bill.finalY * 1.8;
      tl.to(card, {
        x: scatterX,
        y: scatterY,
        opacity: 0,
        duration: 0.1,
        ease: "power2.in",
      }, 0.50);
    });
    if (watermark) {
      tl.to(watermark, { opacity: 0, duration: 0.1 }, 0.50);
    }

    // Phase 5: Panel scales in cleanly (65%–90%)
    tl.to(panel, {
      scale: 1,
      opacity: 1,
      duration: 0.2,
      ease: "back.out(1.2)",
    }, 0.65);

    // Phase 6: Hold final state (90%–100%) — ensures scrub reaches full opacity
    tl.to({}, { duration: 0.1 }, 0.90);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="about" className="bg-white relative">
      <div ref={wrapperRef} className="relative h-screen overflow-hidden">
        <div className="shell h-full flex flex-col justify-center">
          <h2
            ref={headingRef}
            className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center"
          >
            More bills. <span className="text-brand-700">More stress.</span>
          </h2>

          <div ref={trackRef} className="relative h-[350px] sm:h-[450px] mt-10 max-w-4xl mx-auto">
            {/* Watermark */}
            <div ref={watermarkRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[200px] font-extrabold text-brand-700 uppercase tracking-widest">
                PP
              </span>
            </div>

            {/* Bill Cards — centered origin, GSAP animates from corners */}
            <div className="absolute inset-0 flex items-center justify-center">
              {bills.map((bill, i) => (
                <div
                  key={i}
                  ref={(el) => { if (el) cardRefs.current[i] = el; }}
                  className="absolute hidden sm:block"
                >
                  <div className="bg-white rounded-xl shadow-tilt px-4 py-3 min-w-[140px] border border-slate-100">
                    <p className="text-[10px] text-ink-400 uppercase tracking-[0.12em] font-medium">
                      {bill.title}
                    </p>
                    <p className="text-lg font-bold text-danger tabular-nums mt-0.5">
                      {bill.value}
                    </p>
                    <p className="text-xs text-ink-500 mt-0.5">{bill.type}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile fallback */}
            <div className="sm:hidden space-y-3">
              {bills.map((bill, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-card px-4 py-3 border border-slate-100"
                >
                  <p className="text-[10px] text-ink-400 uppercase tracking-[0.12em] font-medium">
                    {bill.title}
                  </p>
                  <p className="text-lg font-bold text-danger tabular-nums">
                    {bill.value}
                  </p>
                  <p className="text-xs text-ink-500">{bill.type}</p>
                </div>
              ))}
            </div>

            {/* Consolidation Panel */}
            <div
              ref={panelRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 relative bg-panel-navy rounded-card p-8 sm:p-10 text-center shadow-panel z-10 w-[280px] sm:w-[340px] overflow-hidden"
            >
              <p className="text-sm font-semibold text-white/60 mb-1">
                Ali Aun
              </p>
              <p className="text-5xl font-extrabold text-white tabular-nums">
                $318<span className="text-lg font-semibold">/mo</span>
              </p>
              <p className="text-sm text-white/70 mt-3 leading-relaxed">
                One simple payment. Every bill handled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
