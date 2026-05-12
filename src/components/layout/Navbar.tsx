"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-mc-dark/95 backdrop-blur-md shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="w-8 h-8 rounded-full bg-mc-orange flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">M</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white font-semibold text-lg tracking-tight">
              Montse Cespedosa
            </span>
            <span className="text-mc-gray-400 text-[10px] font-body tracking-widest uppercase">
              MC Group
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="text-sm font-body text-white/60 hover:text-white transition-colors"
          >
            {SITE_CONFIG.phone}
          </a>
          <Button label="Agenda ahora" href="#consultoria" size="sm" />
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-mc-dark/98 backdrop-blur-md px-4 py-6 flex flex-col gap-4 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-body font-medium text-white/80 hover:text-white transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Button
            label="Agenda una consultoría"
            href="#consultoria"
            className="mt-2 w-full justify-center"
          />
        </nav>
      </div>
    </header>
  );
}
