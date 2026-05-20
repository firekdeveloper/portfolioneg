// 1. Importaciones necesarias (Asegúrate de que las rutas sean correctas)
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ServicesSection from "@/components/sections/services";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import Navbar from "@/components/sections/navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-[#F9FAFB] min-h-screen selection:bg-emerald-500/30 overflow-x-hidden">
      <Navbar />
      {/* Spacer para compensar el navbar fijo (h-20 = 5rem = 80px) */}
      <div className="h-20 w-full shrink-0" />

      {/* 2. Secciones del Portfolio */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />

      {/* 3. Footer Profesional y Minimalista */}
      <footer className="w-full py-12 border-t border-zinc-200 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-[10px] font-mono tracking-widest uppercase">
            Iván Pons // Software Engineer // 2026
          </p>
          <div className="flex gap-6 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            <span className="hover:text-emerald-600 cursor-default transition-colors">Next.js 15</span>
            <span className="hover:text-emerald-600 cursor-default transition-colors">Tailwind v4</span>
          </div>
        </div>
      </footer>

    </main>
  );
}