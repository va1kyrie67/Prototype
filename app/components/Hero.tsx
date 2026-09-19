"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PlayArrowIcon } from "./Icons";
import CrystalCursor from "./CrystalCursor";

const words = ["Let's", "See", "What's", "Possible."];

const stats = [
  { value: "200,000+", label: "Inquiries Processed" },
  { value: "$8.5B+", label: "Funded Through Our Partners" },
  { value: "35+", label: "Trusted Lending Partners" },
  { value: "A+", label: "BBB Accredited & Rated" },
];

function AnimatedWords() {
  return (
    <span className="block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0, filter: "blur(7px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
              delay: 2.0 + i * 0.08,
            }}
          >
            {word === "What's" ? (
              <span className="text-gradient">{word}</span>
            ) : word === "Possible." ? (
              <span className="text-shimmer">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function QuoteForm() {
  const [amount, setAmount] = useState(25000);

  const gradient =
    "linear-gradient(90deg, #174195 0%, #174195 " +
    ((amount - 5000) / 95000) * 100 +
    "%, #2a2d35 " +
    ((amount - 5000) / 95000) * 100 +
    "%, #2a2d35 100%)";

  return (
    <motion.div
      id="quote"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay: 2.6 }}
      className="bg-[#111318] rounded-card p-7 sm:p-9 shadow-card border border-white/[0.06]"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-white">Start with Confidence</h3>
        <span className="text-xs font-medium text-white/40">
          Step 1 of 4
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-5">
        <div className="h-full w-1/4 bg-brand-700 rounded-full" />
      </div>

      <p className="text-lg font-extrabold text-white leading-snug mb-2 whitespace-nowrap">
        How much are you looking to borrow?
      </p>
      <p className="text-sm text-white/50 mb-6">
        This helps us find the right options for you.
      </p>

      <div className="text-center mb-5">
        <span className="text-[13px] font-medium text-white/40 align-top relative top-[0.5em]">$</span>
        <span className="text-[52px] font-extrabold text-brand-400 tabular-nums leading-none tracking-tight">
          {amount.toLocaleString()}
        </span>
      </div>

      <input
        type="range"
        min={5000}
        max={100000}
        step={1000}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="range w-full mb-2"
        style={{ background: gradient }}
      />
      <div className="flex justify-between text-xs text-white/40 mb-6">
        <span>$5,000</span>
        <span>$100,000</span>
      </div>

      <button className="btn-primary btn-sheen w-full" disabled style={{ background: "#13306b" }}>
        What&apos;s the purpose of your loan?
      </button>
    </motion.div>
  );
}

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center sm:text-left min-w-0"
    >
      <div className="text-xl sm:text-2xl font-extrabold text-white tabular-nums whitespace-nowrap">
        {value}
      </div>
      <div className="text-[9px] sm:text-[10px] text-white/60 mt-1 leading-snug">
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-hero pt-28 sm:pt-36 pb-16 overflow-hidden">
      <CrystalCursor />
      <div className="shell relative z-[1]">
        <div className="lg:grid lg:grid-cols-[1fr_524px] gap-12 items-start">
          {/* Left Column */}
          <div className="mb-10 lg:mb-0">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.5 }}
              className="inline-flex items-center gap-3 text-xs font-semibold text-brand-300 tracking-normal mb-5"
            >
              <span className="w-8 h-px bg-brand-300/50" />
              Fast &bull; Secure &bull; Trusted
              <span className="w-8 h-px bg-brand-300/50" />
            </motion.span>

            <h1 className="text-[36px] sm:text-[48px] lg:text-[62px] font-extrabold leading-[1.05] tracking-[-0.035em] text-white mb-6">
              <AnimatedWords />
            </h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mb-8"
            >
              Combine every balance into one lower monthly payment. Check your
              rate in 60 seconds &mdash; it won&apos;t touch your credit score.
            </motion.p>

            <motion.a
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              href="#savings"
              className="btn-primary btn-sheen inline-flex items-center gap-2"
            >
              See my savings
              <PlayArrowIcon size={16} className="btn-arrow" />
            </motion.a>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-5 mt-10">
              {stats.map((stat, i) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={2.8 + i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Right Column — Quote Form */}
          <div className="hidden lg:block">
            <QuoteForm />
          </div>
        </div>

        {/* Mobile Quote Form */}
        <div className="lg:hidden mt-10">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
