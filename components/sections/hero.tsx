"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// â”€â”€ Desktop: propiedades por capa de profundidad â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEPTH_DESKTOP = [
  { opacity: 0.22, blur: 3,   shadow: "0 4px 20px rgba(0,0,0,0.10)", parallax: 0.018 },
  { opacity: 0.42, blur: 1,   shadow: "0 8px 30px rgba(0,0,0,0.16)", parallax: 0.032 },
  { opacity: 0.68, blur: 0,   shadow: "0 16px 48px rgba(0,0,0,0.22)", parallax: 0.05  },
];

// â”€â”€ Desktop: 11 imÃ¡genes en 4 filas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DESKTOP_CARDS = [
  { src: "/images/LumaImagenHero.png",                depth: 2, w: 280, top: 14, left: 12, rot: -6, dur: 13, delay: 0   },
  { src: "/images/proyectos/LunaBelleStudioPort.png", depth: 1, w: 210, top:  8, left: 38, rot:  3, dur: 17, delay: 1.5 },
  { src: "/images/LunaBelleStudio.png",               depth: 2, w: 270, top: 12, left: 68, rot:  7, dur: 12, delay: 0.8 },
  { src: "/images/proyectos/RaffaelloPort.png",       depth: 0, w: 150, top: 18, left: 88, rot: -4, dur: 22, delay: 3   },
  { src: "/images/LumaTienda.png",                    depth: 1, w: 230, top: 38, left:  6, rot: -9, dur: 16, delay: 2   },
  { src: "/images/proyectos/LumaPort.png",            depth: 2, w: 260, top: 35, left: 82, rot:  5, dur: 11, delay: 1   },
  { src: "/images/PizzaRaffaello.png",                depth: 0, w: 160, top: 62, left: 15, rot:  6, dur: 24, delay: 4   },
  { src: "/images/ReservasCalendario.png",            depth: 1, w: 220, top: 65, left: 58, rot: -5, dur: 18, delay: 2.5 },
  { src: "/images/proyectos/UltimateGym.png",         depth: 2, w: 265, top: 60, left: 80, rot: -8, dur: 14, delay: 0.5 },
  { src: "/images/LumaQuiz.png",                      depth: 1, w: 200, top: 83, left: 30, rot:  4, dur: 19, delay: 3.5 },
  { src: "/images/LumaImagenHero.png",                depth: 0, w: 140, top: 86, left: 72, rot: -3, dur: 26, delay: 1   },
];

// â”€â”€ MÃ³vil: blobs de gradiente animados â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// No necesitan cursor. Derivan lentamente con escala y posiciÃ³n ondulante.


type Card = { src: string; depth: number; w: number; top: number; left: number; rot: number; dur: number; delay: number };
type DepthStyle = { opacity: number; blur: number; shadow: string; parallax: number };

// â”€â”€ Tarjeta flotante con parallax (solo desktop) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FloatingCard({ card, d, mouseX, mouseY }: {
  card: Card; d: DepthStyle;
  mouseX: MotionValue<number>; mouseY: MotionValue<number>;
}) {
  const px = useTransform(mouseX, (v) => v * d.parallax);
  const py = useTransform(mouseY, (v) => v * d.parallax);
  const floatAmp = card.depth === 2 ? 18 : card.depth === 1 ? 11 : 6;

  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{ top: `${card.top}%`, left: `${card.left}%`, translateX: "-50%", translateY: "-50%", zIndex: card.depth + 1, x: px, y: py }}
    >
      <motion.div
        className="rounded-2xl overflow-hidden"
        style={{ width: card.w, opacity: d.opacity, filter: d.blur > 0 ? `blur(${d.blur}px)` : undefined, boxShadow: d.shadow }}
        initial={{ rotate: card.rot, scale: 0.82, opacity: 0 }}
        animate={{ rotate: [card.rot, card.rot + 1.2, card.rot, card.rot - 1.2, card.rot], scale: 1, opacity: d.opacity, y: [0, -floatAmp, 0] }}
        transition={{
          rotate:  { duration: card.dur, repeat: Infinity, ease: "easeInOut", delay: card.delay },
          scale:   { duration: 0.9, ease: "easeOut", delay: card.delay * 0.3 },
          opacity: { duration: 0.9, ease: "easeOut", delay: card.delay * 0.3 },
          y:       { duration: card.dur, repeat: Infinity, ease: "easeInOut", delay: card.delay },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.src} alt="" className="w-full h-auto block" />
        {card.depth === 2 && <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />}
      </motion.div>
    </motion.div>
  );
}

const TICKS_1 = [0, 60, 120, 180, 240, 300].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x1: 208 * Math.cos(r), y1: 208 * Math.sin(r), x2: 234 * Math.cos(r), y2: 234 * Math.sin(r) };
});
const TICKS_2 = [30, 150, 270].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x1: 158 * Math.cos(r), y1: 158 * Math.sin(r), x2: 180 * Math.cos(r), y2: 180 * Math.sin(r) };
});
const NODES_3 = [0, 90, 180, 270].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { cx: 115 * Math.cos(r), cy: 115 * Math.sin(r) };
});
const DIAG_SPOKES = [45, 135, 225, 315].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x1: 300 + 32 * Math.cos(r), y1: 300 + 32 * Math.sin(r), x2: 300 + 222 * Math.cos(r), y2: 300 + 222 * Math.sin(r) };
});

function MobileOrbits({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });
  const r1      = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const r2      = useTransform(scrollYProgress, [0, 1], [0, -252]);
  const r3      = useTransform(scrollYProgress, [0, 1], [0, 432]);
  const r4      = useTransform(scrollYProgress, [0, 1], [0, -324]);
  const dashOff = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const lineOp  = useTransform(scrollYProgress, [0, 1], [0.4, 0.80]);

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Diagonales estaticas - el dash fluye hacia afuera con el scroll */}
      {DIAG_SPOKES.map((s, i) => (
        <motion.line key={i}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="rgba(5,150,105,0.35)" strokeWidth="0.9" strokeLinecap="round"
          strokeDasharray="20 14"
          style={{ strokeDashoffset: dashOff, opacity: lineOp }}
        />
      ))}

      {/* Anillo 1 - mas exterior · 6 ticks · 1 spoke que rota con el anillo */}
      <g transform="translate(300,300)">
        <motion.g style={{ rotate: r1 }}>
          <circle cx="0" cy="0" r="220" fill="none"
            stroke="rgba(5,150,105,0.42)" strokeWidth="1.8" strokeDasharray="260 140" />
          {TICKS_1.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke="rgba(52,211,153,0.72)" strokeWidth="1.8" strokeLinecap="round" />
          ))}
          <motion.line x1="0" y1="-55" x2="0" y2="-210"
            stroke="rgba(5,150,105,0.55)" strokeWidth="1.2" strokeLinecap="round"
            strokeDasharray="18 14"
            style={{ strokeDashoffset: dashOff, opacity: lineOp }}
          />
        </motion.g>
      </g>

      {/* Anillo 2 · 3 ticks a 120° · spoke */}
      <g transform="translate(300,300)">
        <motion.g style={{ rotate: r2 }}>
          <circle cx="0" cy="0" r="168" fill="none"
            stroke="rgba(52,211,153,0.34)" strokeWidth="1.2" strokeDasharray="200 100" />
          {TICKS_2.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke="rgba(52,211,153,0.68)" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          <motion.line x1="0" y1="-50" x2="0" y2="-160"
            stroke="rgba(52,211,153,0.50)" strokeWidth="1" strokeLinecap="round"
            strokeDasharray="16 12"
            style={{ strokeDashoffset: dashOff, opacity: lineOp }}
          />
        </motion.g>
      </g>

      {/* Anillo 3 · 4 nodos huecos en las posiciones cardinales */}
      <g transform="translate(300,300)">
        <motion.g style={{ rotate: r3 }}>
          <circle cx="0" cy="0" r="115" fill="none"
            stroke="rgba(16,185,129,0.32)" strokeWidth="1" strokeDasharray="140 70" />
          {NODES_3.map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r="3.5"
              fill="none" stroke="rgba(52,211,153,0.72)" strokeWidth="1.5" />
          ))}
        </motion.g>
      </g>

      {/* Anillo 4 - interior · ticks de cruz */}
      <g transform="translate(300,300)">
        <motion.g style={{ rotate: r4 }}>
          <circle cx="0" cy="0" r="68" fill="none"
            stroke="rgba(52,211,153,0.26)" strokeWidth="0.8" strokeDasharray="85 35" />
          <line x1="-62" y1="0" x2="-74" y2="0" stroke="rgba(52,211,153,0.58)" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="62" y1="0" x2="74" y2="0"  stroke="rgba(52,211,153,0.58)" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="0" y1="-62" x2="0" y2="-74" stroke="rgba(52,211,153,0.58)" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="0" y1="62"  x2="0" y2="74"  stroke="rgba(52,211,153,0.58)" strokeWidth="1.3" strokeLinecap="round" />
        </motion.g>
      </g>

      {/* Punto central */}
      <circle cx="300" cy="300" r="5"  fill="rgba(5,150,105,0.58)" />
      <circle cx="300" cy="300" r="11" fill="none" stroke="rgba(5,150,105,0.32)" strokeWidth="1" />
    </svg>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const rawX = useSpring(0, { stiffness: 60, damping: 20 });
  const rawY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <section
      ref={containerRef}
      id="inicio"
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="relative min-h-[calc(100vh-5rem)] scroll-mt-20 w-full flex flex-col items-center justify-center overflow-hidden bg-[#F9FAFB] px-6"
    >
      {/* Grid sutil */}
      <div className="absolute inset-0 z-0 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      {/* Fondo: orbs en mÃ³vil / tarjetas parallax en desktop */}
      {isMobile !== null && (
        isMobile
          ? <MobileOrbits containerRef={containerRef} />
          : DESKTOP_CARDS.map((card, i) => (
              <FloatingCard key={`d-${i}`} card={card} d={DEPTH_DESKTOP[card.depth]} mouseX={rawX} mouseY={rawY} />
            ))
      )}

      {/* Vignette adaptada al contexto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background: isMobile
            ? "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(249,250,251,0.97) 0%, rgba(249,250,251,0.88) 22%, rgba(249,250,251,0.42) 46%, rgba(249,250,251,0.06) 65%, transparent 82%)"
            : "radial-gradient(ellipse 46% 54% at 50% 50%, rgba(249,250,251,0.96) 0%, rgba(249,250,251,0.80) 35%, rgba(249,250,251,0.30) 60%, transparent 100%)",
        }}
      />

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container relative mx-auto max-w-5xl text-center"
        style={{ zIndex: 6 }}
      >
        <h1 className="text-balance text-5xl font-bold tracking-tighter text-zinc-900 sm:text-7xl lg:text-8xl">
          Ingenierí­a de Software para <span className="text-emerald-600">negocios</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-600 sm:text-xl leading-relaxed">
          Desarrollador Full Stack Jr. Construyo soluciones escalables y optimizadas
          alineadas con objetivos estratégicos.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_4px_rgba(5,150,105,0.35)]"
          >
            Explorar Proyectos <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

