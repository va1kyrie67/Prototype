"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const loans = [
  { name: "SoFi", amount: "$40,000", apr: "6.99%", term: "48 mo", logo: "/lenders/sofi.png" },
  { name: "Prosper", amount: "$35,000", apr: "7.29%", term: "60 mo", logo: "/lenders/prosper.png" },
  { name: "Upgrade", amount: "$30,000", apr: "8.49%", term: "36 mo", logo: "/lenders/upgrade.png" },
  { name: "Best Egg", amount: "$25,000", apr: "8.99%", term: "36 mo", logo: "/lenders/best-egg.png" },
];

export default function LoanOptions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="loan-options" className="py-16 lg:py-20 bg-soft-sky">
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

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 max-w-[1080px] mx-auto">
          {loans.map((loan, i) => (
            <motion.div
              key={loan.name}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
            >
              {/* Logo */}
              <div className="flex h-[44px] items-center">
                <img
                  src={loan.logo}
                  alt={`${loan.name} logo`}
                  className="h-[28px] w-auto object-contain"
                />
              </div>

              {/* 3-Column Data Grid */}
              <dl className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                    Amount
                  </dt>
                  <dd className="mt-[6px] text-[15px] font-bold tracking-[-0.01em] text-ink tabular-nums">
                    {loan.amount}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                    APR
                  </dt>
                  <dd className="mt-[6px] text-[15px] font-bold tracking-[-0.01em] text-brand-700 tabular-nums">
                    {loan.apr}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                    Term
                  </dt>
                  <dd className="mt-[6px] text-[15px] font-bold tracking-[-0.01em] text-ink tabular-nums">
                    {loan.term}
                  </dd>
                </div>
              </dl>

              {/* View Offer */}
              <a
                href="#quote"
                className="mt-auto border-t border-slate-100 pt-[18px] text-center text-[12.5px] font-bold text-brand-700 transition-colors hover:text-brand-500"
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
