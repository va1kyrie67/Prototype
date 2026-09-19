"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WarningIcon, ArrowRightIcon } from "./Icons";
import { useCountUp } from "../lib/useCountUp";

function computeSavings(debt: number, apr: number) {
  // Current plan: 2.5% of balance per month minimum payment at current APR
  const currentMonthlyRate = apr / 100 / 12;
  let balance = debt;
  let currentMonths = 0;
  let currentTotalPaid = 0;

  while (balance > 0 && currentMonths < 600) {
    const interest = balance * currentMonthlyRate;
    const minPay = Math.max(balance * 0.025, interest + 1);
    const payment = Math.min(minPay, balance + interest);
    balance = balance + interest - payment;
    currentTotalPaid += payment;
    currentMonths++;
    if (balance < 0.5) { balance = 0; break; }
  }

  const currentInterest = Math.max(0, currentTotalPaid - debt);

  // New plan: fixed payment at 8.9% APR until paid off
  const newMonthlyRate = 8.9 / 100 / 12;
  const newFixedPayment = debt * 0.025; // reasonable fixed payment
  let newBalance = debt;
  let newMonths = 0;
  let newTotalPaid = 0;

  while (newBalance > 0 && newMonths < 600) {
    const interest = newBalance * newMonthlyRate;
    const payment = Math.min(newFixedPayment, newBalance + interest);
    newBalance = newBalance + interest - payment;
    newTotalPaid += payment;
    newMonths++;
    if (newBalance < 0.5) { newBalance = 0; break; }
  }

  const newInterest = Math.max(0, newTotalPaid - debt);
  const yearsSooner = Math.max(0, Math.round((currentMonths - newMonths) / 12));

  return {
    currentPayment: Math.round(debt * 0.025),
    currentMonths,
    currentYears: Math.round(currentMonths / 12),
    currentInterest: Math.round(currentInterest),
    newPayment: Math.round(newFixedPayment),
    newMonths,
    interestSaved: Math.round(currentInterest - newInterest),
    yearsSooner,
  };
}

export default function SavingsCalculator() {
  const [debt, setDebt] = useState(25000);
  const [apr, setApr] = useState(24);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const darkCardRef = useRef<HTMLDivElement>(null);
  const darkCardInView = useInView(darkCardRef, { once: true, margin: "-50px" });

  const savings = computeSavings(debt, apr);
  const { ref: countUpRef, value: countUpValue } = useCountUp(savings.interestSaved, 1800);

  const debtGradient =
    "linear-gradient(90deg, #174195 0%, #174195 " +
    ((debt - 5000) / 495000) * 100 +
    "%, #2a2d35 " +
    ((debt - 5000) / 495000) * 100 +
    "%, #2a2d35 100%)";

  const aprGradient =
    "linear-gradient(90deg, #174195 0%, #174195 " +
    ((apr - 10) / 25) * 100 +
    "%, #2a2d35 " +
    ((apr - 10) / 25) * 100 +
    "%, #2a2d35 100%)";

  return (
    <section id="savings" className="py-14 sm:py-20 bg-soft-sky" ref={sectionRef}>
      <div className="shell">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-white text-center mb-3"
        >
          Discover How Much <span className="text-brand-700">You Could Save.</span>
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-sm sm:text-base text-white/60 text-center max-w-xl mx-auto mb-12"
        >
          Move the sliders to compare minimum payments with one fixed monthly
          payment and see your potential savings in real time.
        </motion.p>

        <div className="lg:grid lg:grid-cols-2 gap-6 max-w-[1020px] mx-auto">
          {/* Left Card — Light */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="card p-6 sm:p-8 mb-6 lg:mb-0"
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-medium text-white/50">
                Total debt to consolidate
              </span>
              <span className="text-xl font-bold text-brand-400 tabular-nums">
                ${debt.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={500000}
              step={5000}
              value={debt}
              onChange={(e) => setDebt(Number(e.target.value))}
              className="range w-full mb-2"
              style={{ background: debtGradient }}
            />
            <div className="flex justify-between text-xs text-white/40 mb-8">
              <span>$5,000</span>
              <span>$500,000</span>
            </div>

            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-medium text-white/50">
                Your current average APR
              </span>
              <span className="text-xl font-bold text-brand-400 tabular-nums">
                {apr}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={35}
              step={1}
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              className="range w-full mb-2"
              style={{ background: aprGradient }}
            />
            <div className="flex justify-between text-xs text-white/40 mb-8">
              <span>10%</span>
              <span>35%</span>
            </div>

            {/* Warning Box */}
            <div className="bg-danger/10 rounded-xl p-4 flex gap-3">
              <WarningIcon size={22} className="shrink-0 mt-0.5 text-danger" />
              <div>
                <p className="text-sm font-bold text-danger">
                  The Hidden Cost of Minimum Payments
                </p>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  Starting at <span className="font-bold text-danger">${savings.currentPayment.toLocaleString()}/month</span>, minimum payments
                  could leave you in debt for <span className="font-bold text-danger">{savings.currentYears} years</span> and
                  add <span className="font-bold text-danger">${savings.currentInterest.toLocaleString()}</span> in interest.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Card — Dark */}
          <motion.div
            ref={darkCardRef}
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative bg-panel-navy rounded-card p-6 sm:p-8 text-white shadow-panel overflow-hidden"
          >
            {/* Illustration — top right */}
            <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="52" r="18" fill="#fff" />
                <circle cx="40" cy="44" r="18" fill="#fff" opacity="0.7" />
                <circle cx="40" cy="36" r="18" fill="#fff" opacity="0.4" />
                <rect x="52" y="18" width="22" height="16" rx="3" fill="#22c55e" />
                <path d="M58 26 L62 22 L66 26" stroke="#fff" strokeWidth="1.5" fill="none" />
                <text x="56" y="32" fill="#fff" fontSize="6" fontWeight="bold">Save!</text>
              </svg>
            </div>

            <p className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.16em] mb-3">
              One payment. Big savings.
            </p>
            <div className="flex items-baseline gap-2 mb-2" ref={countUpRef}>
              <span className="text-4xl sm:text-5xl font-extrabold tabular-nums">
                ${countUpValue.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-white/60">in interest</span>
            </div>
            <p className="text-sm text-white/60 mb-6">
              Become debt free <span className="font-bold text-white">{savings.yearsSooner}</span> {savings.yearsSooner === 1 ? "year" : "years"} sooner with one fixed
              monthly payment.
            </p>

            {/* Comparison Bars */}
            <div className="space-y-5 mb-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60">
                    Current payments &bull; {apr}% APR
                  </span>
                  <span className="font-medium text-white/60">
                    {Math.round(savings.currentMonths / 12)} years
                  </span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/40 rounded-full w-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white">
                    Consolidation loan &bull; 8.9% APR
                  </span>
                  <span className="font-medium text-white">
                    {Math.round(savings.newMonths / 12)} years &bull; ${savings.newPayment}/mo
                  </span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-400 rounded-full sc-bar-fill"
                    style={{ width: `${Math.max(8, (savings.newMonths / savings.currentMonths) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <a href="#quote" className="btn-on-dark btn-sheen w-full text-center rounded-full py-2.5">
              Check My Rate
            </a>
            <p className="text-[10px] text-white/40 text-center mt-3">
              Estimates only. Your actual rate depends on credit approval.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
