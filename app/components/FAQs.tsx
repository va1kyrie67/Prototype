"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SendIcon, PlusIcon, MinusIcon } from "./Icons";

const faqData = [
  {
    q: "Will checking my rate hurt my credit score?",
    a: "No. Checking your rate with PriorityPlus is a soft credit inquiry — it's free, takes about 60 seconds, and has zero impact on your credit score. A hard pull only happens later, if you choose to accept an offer.",
  },
  {
    q: "How much can I consolidate?",
    a: "Personal consolidation loans on our marketplace typically range from $5,000 to $500,000 depending on the lender, your income, and your credit profile. Most borrowers combine credit cards, medical bills, and store financing into a single fixed payment.",
  },
  {
    q: "What does it cost to use PriorityPlus?",
    a: "Nothing. Comparing offers is completely free — lenders pay us a fee when a loan funds, so you never receive a bill from us. The rate you see is the rate you get; no hidden origination surprises at checkout.",
  },
];

const quickReplies = [
  "Will this lower my credit score?",
  "Is consolidation right for me?",
  "What's the catch?",
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-soft-sky">
      <div className="shell">
        <motion.h2
          ref={sectionRef}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center mb-3"
        >
          Get Clarity Before <span className="text-brand-700">You Commit.</span>
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-ink-600 text-center max-w-xl mx-auto mb-12"
        >
          Explore your options, understand the costs, and see if consolidation
          is right for you without sharing your phone number.
        </motion.p>

        <div className="lg:grid lg:grid-cols-2 gap-6 max-w-[1020px] mx-auto">
          {/* Chat Copilot */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-card p-5 shadow-card mb-6 lg:mb-0"
          >
            <div className="bg-[#f7fafe] rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <p className="text-sm text-ink leading-relaxed">
                  Hi! I&apos;m the PriorityPlus copilot. Ask me anything about
                  consolidating debt, rates, or whether this is even right for
                  you. I&apos;ll be straight with you.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  className="text-xs font-medium text-brand-700 border border-brand-200 rounded-full px-3 py-1.5 hover:bg-brand-50 transition-colors"
                >
                  {qr}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about rates, fees, your situation..."
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-slate-200 bg-surface-muted focus:outline-none focus:border-brand-700 transition-colors"
              />
              <button className="btn-primary btn-sheen px-4 py-2.5 text-xs">
                Send
                <SendIcon size={14} />
              </button>
            </div>
          </motion.div>

          {/* Accordion FAQ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-[0.16em] mb-4">
              Quick answers
            </p>
            <div className="bg-white rounded-card shadow-card divide-y divide-slate-100 overflow-hidden">
              {faqData.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-ink pr-4">
                      {faq.q}
                    </span>
                    {openIndex === i ? (
                      <MinusIcon className="shrink-0 text-brand-700" />
                    ) : (
                      <PlusIcon className="shrink-0 text-ink-400" />
                    )}
                  </button>
                  <div
                    className="accordion-content"
                    data-open={openIndex === i ? "true" : "false"}
                  >
                    <div>
                      <p className="px-5 pb-4 text-sm text-ink-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
