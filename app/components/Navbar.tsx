"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneIcon, HamburgerIcon, CloseIcon } from "./Icons";

const navLinks = [
  { label: "Home", href: "/", sectionId: null },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "How It Works", href: "#how-it-works", sectionId: "how-it-works" },
  { label: "Loan Options", href: "#loan-options", sectionId: "loan-options" },
  { label: "FAQs", href: "#faqs", sectionId: "faqs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .filter((l) => l.sectionId)
      .map((l) => document.getElementById(l.sectionId!))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const isActive = (link: typeof navLinks[0]) => {
    if (link.href === "/") {
      return activeSection === null;
    }
    return activeSection === link.sectionId;
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 1.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-3"
    >
      <div className="shell">
        <nav className="flex h-[58px] items-center justify-between rounded-full bg-white/85 backdrop-blur-xl px-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:scale-[1.01]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Ali Aun" className="h-32 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 hover:-translate-y-[2px] relative ${
                  isActive(link)
                    ? "text-brand-700"
                    : "text-ink-500 hover:text-brand-700"
                }`}
              >
                {link.label}
                {isActive(link) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-700 rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+18888738319"
              className="hidden md:flex items-center gap-2 text-ink-500 hover:text-brand-700 text-sm font-medium transition-all duration-200 hover:-translate-y-[2px]"
            >
              <PhoneIcon size={16} />
              (888) 873-8319
            </a>
            <a
              href="#quote"
              className="btn-primary btn-sheen text-sm px-5 py-2.5"
            >
              Check My Rate
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="shell mt-2 rounded-2xl bg-panel-navy p-5 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-white/80 hover:text-white font-medium text-base"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+18888738319"
                className="flex items-center gap-2 text-white/60 text-sm sm:hidden"
              >
                <PhoneIcon size={16} />
                (888) 873-8319
              </a>
              <a href="#quote" className="btn-primary btn-sheen w-full text-center">
                Check My Rate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
