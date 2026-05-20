"use client";

import { motion } from "framer-motion";
// Iconos SVG personalizados (acento verde)
const IconWeb = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18" /></svg>
);
const IconDashboard = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
);
const IconLayers = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="1.5"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></svg>
);

const services = [
  {
    icon: IconWeb,
    tag: "Presencia digital",
    title: "Webs para negocios",
    description:
      "Diseño y desarrollo webs que no solo se ven bien, sino que trabajan para ti. Soluciones orientadas a conseguir más visibilidad y a convertir esa visibilidad en clientes reales.",
    highlights: ["Landing pages de alto impacto", "SEO técnico desde el inicio", "Optimización de conversión (CRO)", "Rendimiento Core Web Vitals"],
  },
  {
    icon: IconDashboard,
    tag: "Productividad interna",
    title: "Apps de gestión",
    description:
      "Herramientas a medida para que tu equipo trabaje mejor. Paneles de control, CRMs internos, gestión de inventario o cualquier flujo de trabajo que necesites digitalizar.",
    highlights: ["Dashboards y paneles de control", "CRMs y gestores internos", "Automatización de procesos", "Integraciones con APIs externas"],
    featured: true,
  },
  {
    icon: IconLayers,
    tag: "Producto digital",
    title: "SaaS",
    description:
      "Si tienes una idea de producto, puedo ayudarte a construirla. Desde la arquitectura hasta el lanzamiento: autenticación, suscripciones, multi-tenancy y todo lo que necesita un SaaS moderno.",
    highlights: ["Autenticación y roles de usuario", "Pagos y suscripciones", "Arquitectura multi-tenant", "Panel de administración"],
  }
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="w-full scroll-mt-20 min-h-[calc(100vh-5rem)] py-32 px-6 border-t border-zinc-200 bg-zinc-50/50">
      <div className="container mx-auto max-w-6xl">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-emerald-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            02. Qué puedo hacer por ti
          </span>
          <h2 className="text-4xl font-bold text-zinc-900 tracking-tight max-w-2xl">
            Del problema a la solución,{" "}
            <span className="text-zinc-400 italic font-light">sin rodeos.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            // Card central destacada
            const isFeatured = service.featured;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                viewport={{ once: true }}
                className={`relative flex flex-col p-8 rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/60 ${isFeatured ? 'md:scale-105 z-10 bg-gradient-to-br from-emerald-50/80 to-white shadow-emerald-100/40 shadow-lg border-emerald-200' : ''}`}
                style={isFeatured ? { minHeight: 420 } : {}}
              >
                {/* Icono SVG personalizado */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12">
                    <Icon />
                  </div>
                </div>
                {/* Tag */}
                <span className={`inline-block self-start px-3 py-1 rounded-full border text-[10px] font-mono tracking-widest uppercase mb-4 text-emerald-600 bg-emerald-50 border-emerald-200`}>
                  {service.tag}
                </span>
                {/* Título y descripción */}
                <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
                {/* Highlights */}
                <ul className="mt-auto space-y-2">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 bg-emerald-500`} />
                      <span className="text-xs text-zinc-500 font-mono">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
