"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const loans = [
  { name: "SoFi", amount: "$40,000", apr: "6.99%", term: "48/mo", logo: "/lenders/sofi.png" },
  { name: "Prosper", amount: "$35,000", apr: "7.29%", term: "60 mo", logo: "/lenders/prosper.png" },
  { name: "Upgrade", amount: "$30,000", apr: "8.49%", term: "36 mo", logo: "/lenders/upgrade.png" },
  { name: "Best Egg", amount: "$25,000", apr: "8.99%", term: "36 mo", logo: "/lenders/best-egg.png" },
];

export default function LoanOptions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="loan-options" className="py-14 sm:py-20 bg-white">
      <div className="shell">
        <motion.h2
          ref={sectionRef}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center mb-12"
        >
          Sample Personal <span className="text-brand-700">Loan Offers.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1020px] mx-auto">
          {loans.map((loan, i) => (
            <motion.div
              key={loan.name}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-xl shadow-card p-5 flex flex-col border border-slate-100 hover:shadow-cardHover transition-shadow"
            >
              {/* Logo / Name */}
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={loan.logo}
                  alt={`${loan.name} logo`}
                  className="w-10 h-10 rounded-lg object-contain shrink-0"
                />
                <span className="text-lg font-bold text-ink">{loan.name}</span>
              </div>

              {/* 3-Column Row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div>
                  <p className="text-[10px] text-ink-400 uppercase tracking-[0.12em] font-medium">
                    Amount
                  </p>
                  <p className="text-base font-bold text-ink tabular-nums mt-0.5">
                    {loan.amount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-ink-400 uppercase tracking-[0.12em] font-medium">
                    APR
                  </p>
                  <p className="text-base font-bold text-brand-700 tabular-nums mt-0.5">
                    {loan.apr}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-ink-400 uppercase tracking-[0.12em] font-medium">
                    Term
                  </p>
                  <p className="text-base font-bold text-ink tabular-nums mt-0.5">
                    {loan.term}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200 mb-4" />

              {/* View Offer */}
              <a
                href="#quote"
                className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors mt-auto"
              >
                View Offer
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
