"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "./services.module.css";

const services = [
  {
    number: "01",
    tag: "Presencia Digital",
    title: "Webs para negocios",
    subtitle: "IMPACTO COMERCIAL",
    description:
      "Diseño y desarrollo webs que no solo se ven bien, sino que trabajan para ti. Soluciones orientadas a conseguir más visibilidad.",
    highlights: [
      "Landing pages",
      "SEO Técnico",
      "CRO",
    ],
    className: styles.c1,
  },
  {
    number: "02",
    tag: "Productividad Interna",
    title: "Apps de gestión",
    subtitle: "AUTOMATIZACIÓN OPERATIVA",
    description:
      "Herramientas a medida para que tu equipo trabaje mejor. Paneles de control, CRMs internos y automatización de flujos de trabajo.",
    highlights: [
      "Dashboards",
      "CRMs",
      "Procesos",
    ],
    className: styles.c2,
  },
  {
    number: "03",
    tag: "Producto Digital",
    title: "SaaS",
    subtitle: "ESCALABILIDAD TÉCNICA",
    description:
      "Si tienes una idea de producto, te ayudo a construirla desde cero: arquitectura, autenticación, suscripciones y entornos multi-tenant.",
    highlights: [
      "Auth & Roles",
      "Pagos y suscripciones",
      "Multi-tenancy",
    ],
    className: styles.c3,
  },
];

type ParticlesContainer = {
  options: {
    particles?: {
      move?: { speed?: number };
      color?: { value?: string | string[] };
    };
  };
  refresh: () => Promise<void>;
};

export default function ServicesSection() {
  const particlesRef = useRef<ParticlesContainer | null>(null);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!scriptsReady || isLoaded) {
      return;
    }

    const particlesGlobal = (window as Window & {
      tsParticles?: {
        load: (id: string, options: object) => Promise<ParticlesContainer>;
      };
    }).tsParticles;

    if (!particlesGlobal) {
      return;
    }

    particlesGlobal
      .load("tsparticles-services", {
        preset: "triangles",
        particles: {
          color: { value: "#0052FF" },
          links: { color: "#3B82F6", opacity: 0.2 },
          move: { speed: 1.5 },
          number: { value: 70 },
          size: { value: 2 },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.6 } },
          },
        },
      })
      .then((container) => {
        particlesRef.current = container;
        setIsLoaded(true);
      });
  }, [isLoaded, scriptsReady]);

  const accelerateParticles = () => {
    const container = particlesRef.current;
    if (!container?.options.particles) {
      return;
    }

    if (container.options.particles.move) {
      container.options.particles.move.speed = 6;
    }
    if (container.options.particles.color) {
      container.options.particles.color.value = "#003FD1";
    }
    void container.refresh();
  };

  const normalizeParticles = () => {
    const container = particlesRef.current;
    if (!container?.options.particles) {
      return;
    }

    if (container.options.particles.move) {
      container.options.particles.move.speed = 1.5;
    }
    if (container.options.particles.color) {
      container.options.particles.color.value = "#0052FF";
    }
    void container.refresh();
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-triangles@2.12.0/tsparticles.preset.triangles.bundle.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsReady(true)}
      />

      <section id="servicios" className={styles.premiumInteractiveSection}>
        <div id="tsparticles-services" className={styles.tsparticles} />

        <div className={styles.interactiveContentWrapper}>
          <span className={styles.kicker}>02. Qué puedo hacer por ti</span>
          <h2 className={styles.mainTitle}>
            Del problema a la solución, <span className={styles.gradientText}>sin rodeos.</span>
          </h2>

          <div className={styles.interactiveGrid}>
            {services.map((service) => (
              <article
                key={service.title}
                className={`${styles.glassNode} ${service.className}`}
                onMouseEnter={accelerateParticles}
                onMouseLeave={normalizeParticles}
              >
                <div className={styles.nodeHeader}>
                  <span className={styles.number}>{service.number}</span>
                  <span className={styles.tag}>{service.tag}</span>
                </div>
                <h3>{service.title}</h3>
                <p className={styles.subtitle}>{service.subtitle}</p>
                <p className={styles.nodeDesc}>{service.description}</p>
                <div className={styles.nodeFooter}>
                  {service.highlights.map((item) => (
                    <span key={item}>• {item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
