"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PlayArrowIcon } from "./Icons";

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
              <span className="text-brand-700">{word}</span>
            ) : word === "Possible." ? (
              <span className="text-gradient">{word}</span>
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
    "%, #dbe7fb " +
    ((amount - 5000) / 95000) * 100 +
    "%, #dbe7fb 100%)";

  return (
    <motion.div
      id="quote"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay: 2.6 }}
      className="bg-surface-muted rounded-card p-6 sm:p-8 shadow-card"
    >
      <h3 className="text-lg font-bold text-ink mb-1">Start with Confidence</h3>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-medium text-ink-500">
          Step 1 of 4
        </span>
        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full w-1/4 bg-brand-700 rounded-full" />
        </div>
      </div>

      <p className="text-sm font-semibold text-ink mb-1">
        How much are you looking to borrow?
      </p>
      <p className="text-xs text-ink-500 mb-5">
        This helps us find the right options for you.
      </p>

      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-brand-700 tabular-nums">
          ${amount.toLocaleString()}
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
      <div className="flex justify-between text-xs text-ink-400 mb-6">
        <span>$5,000</span>
        <span>$100,000</span>
      </div>

      <button className="btn-primary btn-sheen w-full" disabled>
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
      className="text-center sm:text-left"
    >
      <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-[0.16em] mt-2">
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-hero pt-28 sm:pt-36 pb-16 overflow-hidden">
      <div className="shell">
        <div className="lg:grid lg:grid-cols-[1fr_524px] gap-12 items-start">
          {/* Left Column */}
          <div className="mb-10 lg:mb-0">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.5 }}
              className="inline-block text-xs font-semibold text-brand-300 uppercase tracking-[0.18em] mb-5"
            >
              Fast &mdash; Secure &mdash; Trusted
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
              <PlayArrowIcon size={16} />
            </motion.a>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 mt-14">
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
