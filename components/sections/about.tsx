"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShaderBackground from "@/components/ui/shader-background";

const projectScreenshots = [
  "/images/LumaImagenHero.png",
  "/images/LumaTienda.png",
  "/images/LumaQuiz.png",
  "/images/LunaBelleStudio.png",
  "/images/ReservasCalendario.png",
  "/images/PizzaRaffaello.png",
];

const techStack = [
  {
    name: "Frontend",
    tools: [
      { name: "Next.js 15", logo: "/logos/nextjs.svg" },
      { name: "React 19", logo: "/logos/react.svg" },
      { name: "TypeScript", logo: "/logos/typescript.svg" },
      { name: "Tailwind v4", logo: "/logos/tailwind.svg" },
    ]
  },
  {
    name: "Backend",
    tools: [
      { name: "Node.js", logo: "/logos/nodejs.svg" },
      { name: "Next.js 15", logo: "/logos/nextjs.svg" },
      { name: "Express", logo: "/logos/express.svg" },
      { name: "MySQL", logo: "/logos/mysql.svg" },
      { name: "MongoDB", logo: "/logos/mongodb.svg" }
    ]
  },
  {
    name: "Herramientas",
    tools: [
      { name: "Git", logo: "/logos/git.svg" },
      { name: "Supabase", logo: "/logos/supabase.svg" },
      { name: "Vercel", logo: "/logos/vercel.svg" },
      { name: "Render", logo: "/logos/render.svg" },
      { name: "VSCode", logo: "/logos/vscode.svg" }
    ]
  }
];

export default function AboutSection() {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % projectScreenshots.length);
  };

  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + projectScreenshots.length) % projectScreenshots.length);
  };

  return (
    <section id="sobre-mi" className="w-full scroll-mt-20 min-h-[calc(100vh-5rem)] pt-16 pb-32 px-6 border-t border-[#E5E7EB] bg-white">
      <div className="container mx-auto max-w-6xl">
        
        {/* PARTE 1: PRESENTACIÓN PERSONAL + CARRUSEL MOCKUP */}
        <div className="flex flex-col gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[#0052FF] font-mono text-sm tracking-[0.3em] uppercase mb-4 block">01. Presentación</span>
            <h2 className="text-5xl font-bold text-[#111827] mb-8 tracking-tight leading-[1.1]">
              Hola, soy Iván. <span className="text-[#6B7280] italic font-light">Construyo el puente</span> <br className="hidden md:block" />
              entre el diseño y la infraestructura.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[#6B7280] text-lg leading-relaxed">
              <p>
                Mi viaje en el desarrollo comenzó por la curiosidad de entender cómo funcionan las cosas por dentro. Hoy, me especializo en crear aplicaciones web que no solo se ven bien, sino que son <b className="text-[#111827] font-semibold">escalables, rápidas y seguras</b>.
              </p>
              <p>
                Me enfoco en el desarrollo <b className="text-[#111827] font-semibold">Full Stack</b>, con el foco en soluciones y estrategias de negocio.
              </p>
            </div>
          </motion.div>

          {/* Carrusel con Marco de Navegador */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden group"
          >
            {/* Dots — navegación táctil móvil */}
            <div className="flex justify-center gap-2 py-2.5 border-b border-[#E5E7EB] md:hidden">
              {projectScreenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImg(idx)}
                  aria-label={`Imagen ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImg ? "w-5 bg-[#0052FF]" : "w-1.5 bg-[#D1D5DB]"
                  }`}
                />
              ))}
            </div>
            {/* Barra de Navegador */}
            <div className="h-10 w-full bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between px-5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#B3C9FF]" />
                <div className="w-3 h-3 rounded-full bg-[#5B8DFF]" />
                <div className="w-3 h-3 rounded-full bg-[#0052FF]" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-widest">
                  {currentImg + 1} / {projectScreenshots.length}
                </span>
              </div>
            </div>

            {/* Contenedor de Imagen */}
            <div className="relative aspect-[4/3] md:aspect-[21/9] lg:aspect-[25/10] overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={projectScreenshots[currentImg]}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full w-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Controles de Navegación: siempre visibles en móvil, hover en desktop */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 transition-opacity duration-300 pointer-events-none opacity-100 md:opacity-0 md:group-hover:opacity-100">
                <button 
                  onClick={prevImage}
                  className="p-3 rounded-full bg-white/90 border border-[#E5E7EB] shadow-xl hover:bg-white hover:scale-110 transition-all text-[#111827] pointer-events-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="p-3 rounded-full bg-white/90 border border-[#E5E7EB] shadow-xl hover:bg-white hover:scale-110 transition-all text-[#111827] pointer-events-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PARTE 2: TECH STACK (Con fondo shader sutil) */}
        <div className="relative mt-20 border-t border-[#F3F4F6] pt-20 overflow-hidden rounded-3xl">
          <ShaderBackground className="pointer-events-none opacity-50" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/55 to-white/90" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 px-2 md:px-6 py-6">
            {techStack.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-start"
              >
                <h3 className="text-[#111827] font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                  <span>{category.name}</span>
                </h3>
                <div className="flex flex-col gap-5 w-full">
                  {category.tools.map((tool) => (
                    <div key={tool.name} className="flex items-center gap-4 group cursor-default">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/75 border border-[#F3F4F6] group-hover:border-[#B3C9FF] group-hover:bg-[#EFF6FF] transition-all duration-300 backdrop-blur-[2px]">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300"
                          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/favicon.ico'; }}
                        />
                      </div>
                      <span className="text-[#6B7280] font-mono text-sm group-hover:text-[#111827] transition-colors">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}