"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Share2 } from "lucide-react";

// CURVA QUE ARRANCA DESDE LA ESQUINA INFERIOR-IZQUIERDA
const LINE = "M 0,300 C 80,295 180,250 300,175 C 420,100 510,35 600,5";
const AREA = `${LINE} L 600,300 L 0,300 Z`;

// NUEVA PALETA DE COLORES SUAVES Y DESATURADOS
const SLOW_GREEN = "#A0C4B8"; // Un verde pálido y suave
const SLOW_GRAY = "#D4DBD8";  // Un gris pálido

export default function ContactSection() {
  return (
    <section id="contacto" className="w-full scroll-mt-20 min-h-[calc(100vh-5rem)] py-32 px-6 border-t border-zinc-200 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white shadow-sm overflow-hidden"
        >
          {/* Gráfica decorativa — anclada al fondo, conserva proporciones */}
          <svg
            viewBox="0 0 600 300"
            className="absolute bottom-0 left-0 right-0 w-full h-auto"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SLOW_GREEN} stopOpacity="0.22" />
                <stop offset="100%" stopColor={SLOW_GREEN} stopOpacity="0.04" />
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
              stroke={SLOW_GREEN}
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
            <span className="text-zinc-500 font-mono text-sm tracking-[0.3em] uppercase mb-6 block">04. El siguiente paso</span>
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-8 tracking-tighter">
              ¿Listo para elevar <br className="hidden sm:block" /> tu próximo proyecto?
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 h-14 px-8 text-base font-bold rounded-xl shadow-lg transition-transform hover:scale-105">
                Enviar Email
                <Mail className="ml-2 w-4 h-4" />
              </Button>

              <Button variant="outline" size="lg" className="border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 h-14 px-8 text-base rounded-xl transition-all">
                Conectar en Redes
                <Share2 className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}