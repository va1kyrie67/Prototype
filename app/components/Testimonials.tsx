"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StarIcon } from "./Icons";

const testimonials = [
  {
    name: "Robert N.",
    subtitle: "Made the process effortless",
    quote:
      "From start to finish, the team was professional and transparent — consolidating my cards into one payment took the stress out of my month.",
  },
  {
    name: "Maccy Doe",
    subtitle: "Saved me thousands in interest",
    quote:
      "I was drowning in minimum payments. PriorityPlus walked me through my options, and I walked away with a clear payoff plan.",
  },
  {
    name: "Jason L.",
    subtitle: "Quick, simple, no pressure",
    quote:
      "The online process took a few minutes and they answered every question I had.",
  },
  {
    name: "Kian Hooshmand",
    subtitle: "Real progress at last",
    quote:
      "Before finding PriorityPlus, my monthly debt felt completely unmanageable. Their team walked me through the entire consolidation process and combined everything into one single payment.",
  },
  {
    name: "Anthony R.",
    subtitle: "A clear payoff date",
    quote:
      "I had four different interest rates climbing every month and no real plan to pay them off. PriorityPlus laid out clear loan options in minutes, cutting my monthly bill by $350.",
  },
  {
    name: "Rachel V.",
    subtitle: "Shockingly fast and straightforward",
    quote:
      "I was skeptical because so many online offers come with hidden fees. Their website let me see exactly what I qualified for before committing to anything.",
  },
];

const doubled = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-panel-navy rounded-card p-5 flex flex-col min-w-[300px] max-w-[300px] shrink-0">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, j) => (
          <StarIcon key={j} size={14} className="text-[#f5c044]" />
        ))}
      </div>
      <p className="text-sm font-bold text-white mb-0.5">{t.name}</p>
      <p className="text-xs font-medium text-white/60 mb-3">{t.subtitle}</p>
      <p className="text-sm text-white/80 leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-14 sm:py-20 bg-white overflow-hidden">
      <div className="shell">
        <motion.h2
          ref={sectionRef}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[30px] sm:text-[42px] font-extrabold tracking-[-0.02em] text-ink text-center mb-3"
        >
          Real stories. <span className="text-brand-700">Real results.</span>
        </motion.h2>

        {/* Rating Badge */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {/* Stars */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} size={18} className="text-accent-gold" />
            ))}
          </div>
          <span className="text-xs font-medium text-ink-500">
            4.9/5 from 12,400+ verified reviews
          </span>
        </motion.div>
      </div>

      {/* Auto-scrolling marquee — no shell wrapper for full bleed */}
      <div className="overflow-hidden group">
        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
