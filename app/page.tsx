"use client";

// 1. Importaciones necesarias (Asegúrate de que las rutas sean correctas)
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ServicesSection from "@/components/sections/services";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import Navbar from "@/components/sections/navbar";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";
const POWER_SESSION_KEY = "portfolio-powered";

export default function Home() {
  const [isPowered, setIsPowered] = useState(false);
  const [powerStateReady, setPowerStateReady] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
    const shouldStartPowered =
      isMobile && window.sessionStorage.getItem(POWER_SESSION_KEY) === "1";

    if (shouldStartPowered) {
      setIsPowered(true);
    }

    setPowerStateReady(true);
  }, []);

  useEffect(() => {
    if (!powerStateReady) return;

    const previousScrollRestoration = window.history.scrollRestoration;
    const previousBodyOverflow = document.body.style.overflow;

    if (!isPowered) {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.body.style.overflow = "hidden";
    } else {
      window.history.scrollRestoration = "auto";
      document.body.style.overflow = previousBodyOverflow;
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isPowered, powerStateReady]);

  useEffect(() => {
    if (!powerStateReady) return;

    const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
    if (!isMobile) {
      window.sessionStorage.removeItem(POWER_SESSION_KEY);
      return;
    }

    if (isPowered) {
      window.sessionStorage.setItem(POWER_SESSION_KEY, "1");
    } else {
      window.sessionStorage.removeItem(POWER_SESSION_KEY);
    }
  }, [isPowered, powerStateReady]);

  return (
    <main className="relative flex flex-col items-center bg-[#F9FAFB] min-h-screen selection:bg-[#0052FF]/30 overflow-x-hidden">
      <Navbar />
      {/* Spacer para compensar el navbar fijo (h-20 = 5rem = 80px) */}
      <div className="h-20 w-full shrink-0" />

      {/* 2. Secciones del Portfolio */}
      <HeroSection isPowered={isPowered} onPowerToggle={() => setIsPowered(true)} />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />

      {/* 3. Footer Profesional y Minimalista */}
      <footer className="w-full py-12 border-t border-[#E5E7EB] bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6B7280] text-[10px] font-mono tracking-widest uppercase">
            Iván Pons // Software Engineer // 2026
          </p>
          <div className="flex gap-6 text-[10px] font-mono tracking-widest uppercase text-[#6B7280]">
            <span className="hover:text-[#0052FF] cursor-default transition-colors">Next.js 15</span>
            <span className="hover:text-[#0052FF] cursor-default transition-colors">Tailwind v4</span>
          </div>
        </div>
      </footer>

      {/* Velo global: mantiene toda la página apagada hasta conectar el enchufe */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 25, background: "rgba(2, 6, 23, 0.94)" }}
        animate={isPowered ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

    </main>
  );
}