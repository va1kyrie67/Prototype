"use client";

import React from "react";
import Link from "next/link";
import { PhoneIcon, EmailIcon, GlobeIcon } from "./Icons";

const productLinks = [
  { label: "About Us", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Financial Wellness", href: "#" },
  { label: "FAQs", href: "#" },
];

const serviceLinks = [
  { label: "Funding", href: "#" },
  { label: "Working Capital", href: "#" },
  { label: "Loan Options", href: "#" },
  { label: "Equipment", href: "#" },
];

const loanTypeLinks = [
  { label: "Medicals", href: "#" },
  { label: "Debt Consolidation", href: "#" },
  { label: "Home Improvement", href: "#" },
  { label: "Personal Loans", href: "#" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        className="group relative text-sm text-white/50 hover:text-brand-400 transition-colors inline-block"
      >
        {label}
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      </a>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#08080c] pt-16 pb-8 border-t border-white/[0.06]">
      <div className="shell">
        {/* Top */}
        <div className="lg:grid lg:grid-cols-[352px_repeat(3,minmax(0,1fr))] gap-10 mb-12">
          {/* Logo & Description */}
          <div className="mb-8 lg:mb-0">
            <Link href="/" className="cursor-pointer inline-block leading-none">
              <img src="/logo.png" alt="Ali Aun" className="h-20 w-auto block" />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Ali Aun is a marketplace connecting borrowers with
              a curated network of trusted lending partners. We are not a
              lender.
            </p>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-xs font-semibold text-brand-700 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-brand-700 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-brand-700 mb-4">
              Loan Types
            </h4>
            <ul className="space-y-2.5">
              {loanTypeLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 py-5 border-t border-white/[0.06]">
          <a
            href="tel:+18888738319"
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-full bg-brand-700/20 text-brand-400 flex items-center justify-center">
              <PhoneIcon size={16} />
            </div>
            <span className="text-sm text-white/50 group-hover:text-brand-400 transition-colors">
              (888) 873-8319
            </span>
          </a>
          <a
            href="mailto:info@aliaun.com"
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-full bg-brand-700/20 text-brand-400 flex items-center justify-center">
              <EmailIcon size={16} />
            </div>
            <span className="text-sm text-white/50 group-hover:text-brand-400 transition-colors">
              info@aliaun.com
            </span>
          </a>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-700/20 text-brand-400 flex items-center justify-center">
              <GlobeIcon size={16} />
            </div>
            <span className="text-sm text-white/40">
              Lahore, Pakistan
            </span>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="space-y-3 mb-8">
          <p className="text-[10px] text-white/30 leading-relaxed">
            Ali Aun is not a lender. We connect consumers with
            third-party lending partners. Loan offers are subject to
            eligibility and lender approval. Checking your rate uses a soft
            inquiry and won&apos;t affect your credit score. Loan amounts, rates,
            and terms vary by lender and applicant qualifications.
          </p>
          <p className="text-[10px] text-white/30 leading-relaxed">
            Ali Aun is a Utah-licensed lender under the Utah
            Department of Financial Institutions (NMLS #2242692). Personal loan
            offers provided to customers who originated via a paid Google or Bing
            advertisement feature rate quotes on Ali Aun of no
            greater than 35.99% APR with terms from 61 days to 180 months. Your
            actual rate depends upon credit score, loan amount, loan term,
            domicile, and credit usage and history, and will be agreed upon
            between you and the lender. An example of total amount paid on a
            personal loan of $10,000 for a term of 36 months at a rate of 10%
            would be equivalent to $11,616.12 over the 36-month life of the
            loan.
          </p>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/30">
          <p>&copy;2026 Ali Aun. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
              Terms of Use
            </a>
            <span className="text-white/10">|</span>
            <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
