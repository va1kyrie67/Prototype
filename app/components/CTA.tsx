"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-14 sm:py-20 bg-cta">
      <div className="shell text-center" ref={sectionRef}>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-white mb-4"
        >
          Your Next Chapter Starts{" "}
          <span className="text-gradient-light">With One Thoughtful</span>{" "}
          Step.
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm sm:text-base text-white/70 max-w-xl mx-auto mb-6 leading-relaxed"
        >
          Check your rate in 60 seconds and compare personalized offers from
          35+ trusted lending partners — without affecting your credit score.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a href="#quote" className="btn-on-dark btn-sheen px-6 py-2.5 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 ease-out hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
            Get Started
          </a>
          <a href="#book" className="btn-ghost-on-dark px-6 py-2.5 hover:scale-[1.03] hover:bg-white/10 hover:border-white/60 active:scale-[0.97] transition-all duration-200 ease-out">
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
