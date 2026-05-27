"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b-2 border-[#111827]">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#inicio"
          className="text-2xl tracking-tight text-[#111827] hover:text-[#374151] transition-colors"
          onClick={closeMenu}
        >
          <span className="font-serif font-semibold">Iv</span>
          <span className="font-serif italic text-[#0052FF] font-semibold">á</span>
          <span className="font-serif font-semibold">n Pons</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#6B7280] hover:text-[#0052FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger button */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t-2 border-[#111827] bg-white"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-3 border-b border-[#F3F4F6] last:border-none text-sm font-mono uppercase tracking-[0.15em] text-[#6B7280] hover:text-[#0052FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
