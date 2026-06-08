"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

// CURVA QUE ARRANCA DESDE LA ESQUINA INFERIOR-IZQUIERDA
const LINE = "M 0,300 C 80,295 180,250 300,175 C 420,100 510,35 600,5";
const AREA = `${LINE} L 600,300 L 0,300 Z`;

// Paleta de acento coherente con identidad azul cobalto.
const COBALT = "#0052FF";

export default function ContactSection() {
  return (
    <section id="contacto" className="w-full scroll-mt-20 min-h-[calc(100vh-5rem)] py-32 px-6 border-t border-[#E5E7EB] bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-[#E5E7EB] bg-gradient-to-b from-[#F9FAFB] to-white shadow-sm overflow-hidden"
        >
          {/* Gráfica decorativa — anclada al fondo, conserva proporciones */}
          <svg
            viewBox="0 0 600 300"
            className="absolute bottom-0 left-0 right-0 w-full h-auto"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COBALT} stopOpacity="0.22" />
                <stop offset="100%" stopColor={COBALT} stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* Relleno de la gráfica */}
            <motion.path
              d={AREA}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />

            {/* Línea principal — verde/mint suave */}
            <motion.path
              d={LINE}
              fill="none"
              stroke={COBALT}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.1 }}
              viewport={{ once: true }}
            />
          </svg>

          {/* Contenido encima de la gráfica */}
          <div className="relative z-10 px-6 sm:px-12 md:px-20 py-12 md:py-20">
            {/* Texto de cabecera gris para mayor suavidad */}
            <span className="text-[#6B7280] font-mono text-sm tracking-[0.3em] uppercase mb-6 block">04. El siguiente paso</span>
            <h2 className="text-4xl md:text-6xl font-bold text-[#111827] mb-8 tracking-tighter leading-[1.02]">
              ¿Listo para elevar <br className="hidden sm:block" /> tu próximo proyecto?
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[#0052FF] text-white hover:bg-[#003FD1] h-14 px-8 text-base font-bold rounded-xl shadow-lg transition-transform hover:scale-105">
                <a href="mailto:ivanponsdeonil@gmail.com" aria-label="Enviar correo a ivanponsdeonil@gmail.com">
                  Enviar Email
                  <Mail className="ml-2 w-4 h-4" />
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB] h-14 px-8 text-base rounded-xl transition-all">
                <a href="https://www.linkedin.com/in/ivanpons" target="_blank" rel="noopener noreferrer" aria-label="Abrir perfil de LinkedIn de Ivan Pons">
                  LinkedIn
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.038-1.852-3.038-1.854 0-2.136 1.445-2.136 2.94v5.667H9.351V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.369-1.85 3.601 0 4.267 2.369 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}