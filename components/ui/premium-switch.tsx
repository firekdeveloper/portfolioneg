"use client";

import { motion } from "framer-motion";

interface PremiumSwitchProps {
  isPowered: boolean;
  onPowerToggle: () => void;
}

export default function PremiumSwitch({ isPowered, onPowerToggle }: PremiumSwitchProps) {
  return (
    <div className="relative flex flex-col items-center gap-4">
      {!isPowered && (
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-28 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,82,255,0.36) 0%, rgba(0,82,255,0.18) 42%, rgba(0,82,255,0.00) 78%)",
            filter: "blur(10px)",
          }}
          animate={{ opacity: [0.42, 0.9, 0.42], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <button
        type="button"
        onClick={onPowerToggle}
        aria-label={isPowered ? "Interfaz activada" : "Activar interfaz"}
        className="group relative z-10 h-14 w-24 rounded-full border border-white/30 bg-gradient-to-b from-[#0e172b] to-[#050a14] p-1 shadow-[inset_0_2px_2px_rgba(255,255,255,0.20),inset_0_-6px_10px_rgba(0,0,0,0.65),0_16px_24px_rgba(2,6,23,0.45)] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
      >
        <motion.div
          className={`absolute inset-1 rounded-full border transition-colors duration-500 ${
            isPowered
              ? "border-[#1D4ED8]/70 bg-gradient-to-b from-[#1E40AF] to-[#1E3A8A]"
              : "border-[#94A3B8]/35 bg-gradient-to-b from-[#1f2937] to-[#111827]"
          } shadow-[inset_0_2px_3px_rgba(255,255,255,0.14),inset_0_-4px_8px_rgba(0,0,0,0.50)]`}
        />

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 450, damping: 32 }}
          className={`relative z-20 h-12 w-12 rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#CBD5E1] shadow-[0_8px_16px_rgba(2,6,23,0.45),inset_0_2px_2px_rgba(255,255,255,0.85),inset_0_-2px_3px_rgba(148,163,184,0.45)] ${
            isPowered ? "translate-x-10" : "translate-x-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9CA3AF] shadow-[0_1px_0_rgba(255,255,255,0.7)]"
          />
        </motion.div>
      </button>

      {!isPowered && (
        <p className="z-10 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BFDBFE]">
          Click para conectar
        </p>
      )}
    </div>
  );
}
