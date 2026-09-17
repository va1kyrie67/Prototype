"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Unlock your rate",
    desc: "A quick soft credit check reveals personalized loan offers without impacting your credit score.",
  },
  {
    num: "2",
    title: "Shape your loan",
    desc: "Choose the amount, repayment term, and monthly payment that fit your budget, not a lender's template.",
  },
  {
    num: "3",
    title: "Simplify your finances",
    desc: "Funds go directly into your account so you can pay off existing balances and start fresh with one predictable payment.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-soft-sky">
      <div className="shell">
        <motion.h2
          ref={sectionRef}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center mb-12"
        >
          Three Steps To <br className="hidden sm:block" />
          <span className="text-brand-700">Financial Freedom.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6 max-w-[1020px] mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-700 text-white text-sm font-bold shrink-0">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-ink leading-snug">{step.title}</h3>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
