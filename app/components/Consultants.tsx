"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LightningIcon, StarIcon } from "./Icons";

const consultants = [
  {
    name: "Belinda J.",
    role: "Senior consultant · 6 years",
    review: "Named in 40+ five-star reviews",
    image: "/consultants/belinda.png",
  },
  {
    name: "Josh H.",
    role: "Consolidation specialist · 4 years",
    review: "\"Hands down recommend a call\"",
    image: "/consultants/dianna.png",
  },
  {
    name: "Dianna R.",
    role: "Client advocate · 5 years",
    review: "\"Professional, understanding\"",
    image: "/consultants/josh.png",
  },
];

const timeSlots = [
  "Today · 4:45 PM",
  "Today · 6:15 PM",
  "Tomorrow · 9:30 AM",
  "Tomorrow · 2:15 PM",
];

export default function Consultants() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-14 sm:py-20 bg-soft-sky">
      <div className="shell">
        <motion.h2
          ref={sectionRef}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center mb-12"
        >
          10 Minutes That Could{" "}
          <span className="text-brand-700">Change Your Finances.</span>
        </motion.h2>

        {/* Consultant Cards */}
        <div className="grid sm:grid-cols-3 gap-5 max-w-[960px] mx-auto mb-10">
          {consultants.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="bg-white rounded-card p-7 text-center shadow-card border border-slate-100 group flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-5 overflow-hidden ring-2 ring-brand-100 group-hover:scale-110 transition-transform duration-500 bg-slate-100">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base font-bold text-ink">{c.name}</h3>
              <p className="text-sm text-ink-500 mt-1.5">{c.role}</p>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <StarIcon size={14} className="text-brand-700 shrink-0" />
                <p className="text-[13px] text-brand-700 font-medium whitespace-nowrap">{c.review}</p>
              </div>
              <a
                href="#book"
                className="inline-block mt-auto pt-7 px-6 py-2.5 rounded-full border border-brand-700 text-brand-700 text-sm font-semibold hover:bg-brand-700 hover:text-white transition-colors"
              >
                Book with {c.name.split(" ")[0]}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_470px] gap-6 max-w-[1020px] mx-auto">
          {/* What the call is like */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white rounded-card p-6 shadow-card mb-6 lg:mb-0"
          >
            <h3 className="text-base font-bold text-ink mb-4">
              What the call is actually like
            </h3>
            <div className="space-y-4">
              {[
                { time: "Min 1", desc: "Say hello, confirm the debts you want gone." },
                {
                  time: "Min 2-5",
                  desc: "Review your real offers from the marketplace, side by side.",
                },
                {
                  time: "Min 6-10",
                  desc: "Your questions — including options beyond a loan if that fits better.",
                },
              ].map((item) => (
                <div key={item.time} className="flex gap-4">
                  <span className="text-xs font-bold text-brand-700 w-14 shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 bg-brand-50 rounded-xl">
              <p className="text-xs text-ink-600 leading-relaxed">
                <strong className="text-ink">Our promise:</strong> no pressure,
                no obligation, and if we&apos;re not the right fit, we&apos;ll
                tell you — and point you somewhere that is.
              </p>
            </div>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            id="book"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="bg-panel-navy rounded-card p-6 shadow-panel"
          >
            <h3 className="text-base font-bold text-white mb-4">
              Pick a time, your consultant calls you.
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-5">
              {timeSlots.map((slot, i) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(i)}
                  className={`text-xs font-medium px-3 py-2.5 rounded-full border transition-colors ${
                    selectedSlot === i
                      ? "border-white bg-white/10 text-white"
                      : "border-white/20 text-white/70 hover:border-white/45 hover:bg-white/10"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button className="btn-on-dark btn-sheen w-full mb-4">
              <LightningIcon size={16} />
              Call me in the next 2 minutes
            </button>

            <p className="text-[10px] text-white/40 text-center leading-relaxed">
              Enter your number and your consultant will already know your
              situation when they call. No repeating yourself.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
