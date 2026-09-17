import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PriorityPlus Financial — Combine Every Balance Into One Lower Payment",
  description:
    "Check your rate in 60 seconds without touching your credit score. Compare real-debt consolidation offers from 35+ trusted lending partners.",
  openGraph: {
    title: "PriorityPlus Financial",
    description:
      "Combine every balance into one lower monthly payment. Check your rate in 60 seconds — it won't touch your credit score.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PriorityPlus Financial",
    description:
      "Combine every balance into one lower monthly payment. Check your rate in 60 seconds — it won't touch your credit score.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
