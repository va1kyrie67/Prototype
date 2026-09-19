"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SendIcon, PlusIcon, MinusIcon } from "./Icons";

const faqData = [
  {
    q: "Will checking my rate hurt my credit score?",
    a: "No. Checking your rate with Ali Aun is a soft credit inquiry — it's free, takes about 60 seconds, and has zero impact on your credit score. A hard pull only happens later, if you choose to accept an offer.",
  },
  {
    q: "How much can I consolidate?",
    a: "Personal consolidation loans on our marketplace typically range from $5,000 to $500,000 depending on the lender, your income, and your credit profile. Most borrowers combine credit cards, medical bills, and store financing into a single fixed payment.",
  },
  {
    q: "What does it cost to use Ali Aun?",
    a: "Nothing. Comparing offers is completely free — lenders pay us a fee when a loan funds, so you never receive a bill from us. The rate you see is the rate you get; no hidden origination surprises at checkout.",
  },
];

const quickReplies = [
  "Will this lower my credit score?",
  "Is consolidation right for me?",
  "What's the catch?",
];

const botResponses: Record<string, string> = {
  "Will this lower my credit score?": "Checking your rate uses a soft inquiry, which has zero impact on your credit score. A hard pull only occurs if you choose to accept a loan offer.",
  "Is consolidation right for me?": "If you have multiple high-interest debts (credit cards, store cards, etc.) and want one fixed monthly payment at a potentially lower rate, consolidation could save you money and simplify your finances.",
  "What's the catch?": "There's no catch. Comparing offers is free — lenders pay us a fee when a loan funds. You see your real rate upfront with no hidden fees or origination surprises.",
};

type ChatMessage = { role: "user" | "bot"; text: string };

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = scrollContainerRef.current;
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      }
    });
  }, [chatMessages]);

  function handleSend(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", text: text.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      const response = botResponses[text.trim()] || "Thanks for your question! An Ali Aun specialist can give you a personalized answer — want to schedule a quick call?";
      setChatMessages((prev) => [...prev, { role: "bot", text: response }]);
    }, 600);
  }

  function handleChipClick(qr: string) {
    handleSend(qr);
  }

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-soft-sky">
      <div className="shell">
        <motion.h2
          ref={sectionRef}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-white text-center mb-3"
        >
          Get Clarity Before <span className="text-brand-700">You Commit.</span>
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-white/60 text-center max-w-xl mx-auto mb-12"
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
            className="bg-[#111318] rounded-card p-5 shadow-card mb-6 lg:mb-0"
          >
            <div className="bg-[#0a0a12] rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="16" r="3" fill="white" />
                    <rect x="13" y="3" width="3.5" height="18" rx="1.75" transform="rotate(-30 13 3)" fill="white" />
                  </svg>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Hi! I&apos;m the Ali Aun copilot. Ask me anything about
                  consolidating debt, rates, or whether this is even right for
                  you. I&apos;ll be straight with you.
                </p>
              </div>
            </div>

            {/* Chat messages */}
            <div ref={scrollContainerRef} className="flex flex-col gap-3 mb-4 h-[200px] overflow-y-auto chat-scroll">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex shrink-0 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-brand-700 text-white"
                        : "bg-[#0a0a12] text-white/80"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleChipClick(qr)}
                  className="text-xs font-medium text-brand-400 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/5 transition-colors duration-300 ease-out"
                >
                  {qr}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(inputValue);
                }}
                placeholder="Ask about rates, fees, your situation..."
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-white/10 bg-[#0a0a12] text-white/80 focus:outline-none focus:border-brand-700 transition-colors placeholder:text-white/30"
              />
              <button
                onClick={() => handleSend(inputValue)}
                className="btn-primary btn-sheen px-4 py-2.5 text-xs"
              >
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
            <p className="text-xs font-semibold text-white/50 uppercase tracking-[0.16em] mb-4">
              Quick answers
            </p>
            <div className="bg-[#111318] rounded-card shadow-card divide-y divide-white/[0.06] overflow-hidden">
              {faqData.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-sm font-semibold text-white pr-4">
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
                      <p className="px-5 pb-4 text-sm text-white/60 leading-relaxed">
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
