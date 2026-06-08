"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

// ─── PROYECTOS ────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "LumaDrinks",
    description: "E-commerce de bebidas nootrópicas con quiz de personalización, suscripción a productos y experiencia de compra optimizada para conversión.",
    category: "E-commerce full-stack · Nootropics",
    tags: ["Next.js 15", "Shopify API", "Stripe", "Framer Motion"],
    image: "/images/LumaImagenHero.png",
    placeholder: { from: "#ecfdf5", to: "#6ee7b7", label: "LumaDrinks" },
    link: "https://luma-drinks.vercel.app",
  },
  {
    title: "UltimateGym",
    description: "App de gimnasio donde los usuarios se apuntan a clases, consultan rutinas de ejercicio y construyen hábitos saludables con seguimiento personalizado.",
    category: "App full-stack · Salud & Fitness",
    tags: ["React Native", "Node.js", "MongoDB", "Push Notifications"],
    image: "/images/proyectos/UltimateGym.png?v=20260520-1",
    placeholder: { from: "#0f172a", to: "#1e293b", label: "UltimateGym" },
    link: "https://ultimate-gym-project.vercel.app",
  },
  {
    title: "LunaBelle Studio",
    description: "Web para centro de estética con catálogo de servicios, galería de tratamientos y sistema de reserva de citas online en tiempo real.",
    category: "Frontend web · Belleza & Bienestar",
    tags: ["Next.js 15", "Tailwind CSS", "Prisma", "Resend"],
    image: "/images/proyectos/LunaBelleStudioPort.png",
    placeholder: { from: "#fdf2f8", to: "#fbcfe8", label: "LunaBelle Studio" },
    link: "https://luna-belle-studio.vercel.app",
  },
  {
    title: "Pizzería Raffaello",
    description: "Web de restaurante con carta digital interactiva por categorías, galería del local y reserva de mesa con confirmación por email.",
    category: "Frontend web · Restauración",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    image: "/images/proyectos/PizzeriaRaffello2.png",
    placeholder: { from: "#fffbeb", to: "#fde68a", label: "Pizzería Raffaello" },
    link: "https://pizzeria-rafaello-demo2.vercel.app",
  },
];

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="w-full scroll-mt-20 min-h-[calc(100vh-5rem)] py-32 px-6 border-t border-[#E5E7EB] bg-white">
      <div className="container mx-auto max-w-6xl">

        <div className="flex flex-col mb-16">
          <span className="text-[#0052FF] font-mono text-sm tracking-[0.3em] uppercase mb-4">03. Proyectos Destacados</span>
          <h2 className="text-4xl font-bold text-[#111827] tracking-tight leading-[1.02]">
            Soluciones de software <br />
            <span className="text-[#6B7280] italic font-light">con impacto real.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.14 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB]/70 overflow-hidden hover:bg-white hover:shadow-2xl hover:shadow-[#E5E7EB] transition-all duration-500"
            >
              {/* Imagen / Placeholder clicable */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver proyecto ${project.title}`}
                className="block h-56 border-b border-[#F3F4F6] overflow-hidden"
              >
                {project.image ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={project.image}
                      alt={`Mockup ${project.title}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  /* ── PLACEHOLDER SILHOUETTE ── */
                  <div
                    className="h-full w-full flex items-end justify-start p-6 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${project.placeholder.from}, ${project.placeholder.to})` }}
                  >
                    <span
                      className="font-bold tracking-tight select-none"
                      style={{
                        fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                        color: project.placeholder.from === "#0f172a" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                      }}
                    >
                      {project.placeholder.label}
                    </span>
                  </div>
                )}
              </a>

              <div className="relative z-10 p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <p className="inline-flex rounded-full border border-[#B3C9FF] bg-[#EFF6FF] px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0052FF]">
                    {project.category}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B7280] hover:text-[#0052FF] transition-colors"
                    aria-label={`Abrir ${project.title}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                {/* Título clicable */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title"
                >
                  <h3 className="mb-2 text-2xl font-bold text-[#111827] transition-colors group-hover/title:text-[#0052FF]">
                    {project.title}
                  </h3>
                </a>

                <p className="mb-5 text-[#6B7280] leading-[1.45]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 opacity-80">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-mono text-[#6B7280]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}