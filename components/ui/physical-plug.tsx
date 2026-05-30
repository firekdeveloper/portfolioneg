"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  MotionValue,
  PanInfo,
} from "framer-motion";

const SNAP_THRESHOLD = 72;
// Visual dimensions of the plug
const PLUG_BODY_H = 80;
const PLUG_PRONG_H = 30;
const PLUG_TOTAL_H = PLUG_BODY_H + PLUG_PRONG_H;

interface PhysicalPlugProps {
  isPowered: boolean;
  onPowerToggle: () => void;
}

// ── Socket Visual ─────────────────────────────────────────────────────────────
function SocketVisual({ isPlugged }: { isPlugged: boolean }) {
  return (
    <div className="relative">
      {/* Animated guide ring — pulses to draw attention to the destination */}
      {!isPlugged && (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[5px] rounded-[20px] pointer-events-none"
          style={{
            border: "1px solid rgba(251,191,36,0.55)",
            boxShadow: "0 0 8px 1px rgba(251,191,36,0.30), inset 0 0 6px 1px rgba(251,191,36,0.10)",
          }}
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div
        className={`relative w-24 h-28 rounded-2xl border transition-all duration-500 ${
          isPlugged
            ? "border-emerald-500/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.06),inset_0_-6px_14px_rgba(0,0,0,0.7),0_12px_32px_rgba(0,0,0,0.5)]"
            : "border-zinc-600/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.06),inset_0_-6px_14px_rgba(0,0,0,0.7),0_12px_32px_rgba(0,0,0,0.5)]"
        } bg-gradient-to-b from-zinc-700 to-zinc-900`}
      >
        {/* Recessed face plate */}
        <div className="absolute inset-[6px] rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.85)] flex flex-row items-center justify-center gap-3">
          {/* Slot 1 */}
          <div
            className={`w-3.5 h-7 rounded-sm transition-all duration-300 ${
              isPlugged
                ? "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.75),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                : "bg-zinc-800 border border-zinc-500/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),0_0_6px_1px_rgba(251,191,36,0.18)]"
            }`}
          />
          {/* Slot 2 */}
          <div
            className={`w-3.5 h-7 rounded-sm transition-all duration-300 ${
              isPlugged
                ? "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.75),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                : "bg-zinc-800 border border-zinc-500/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),0_0_6px_1px_rgba(251,191,36,0.18)]"
            }`}
          />
        </div>

        {/* Connection ring flash */}
        {isPlugged && (
          <motion.div
            className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/70"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </div>

      {/* Ambient glow behind socket */}
      <div
        className={`absolute -inset-6 rounded-3xl -z-10 blur-2xl transition-all duration-700 bg-emerald-500/30 ${
          isPlugged ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Label */}
      <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        220V
      </p>
    </div>
  );
}

// ── Plug Visual ───────────────────────────────────────────────────────────────
function PlugVisual() {
  return (
    <div className="flex flex-col items-center select-none" style={{ userSelect: "none" }}>
      {/* Prongs facing upward */}
      <svg
        width="56"
        height={PLUG_PRONG_H}
        viewBox={`0 0 56 ${PLUG_PRONG_H}`}
        aria-hidden="true"
        className="block"
      >
        <defs>
          <linearGradient id="pg-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="28%" stopColor="#e4e4e7" />
            <stop offset="58%" stopColor="#d4d4d8" />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
          <linearGradient id="pg-tip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#71717a" />
          </linearGradient>
        </defs>
        {/* Left prong */}
        <rect x="8" y="0" width="11" height={PLUG_PRONG_H} rx="3" fill="url(#pg-metal)" />
        <rect x="9" y="0" width="9" height="6" rx="2" fill="url(#pg-tip)" />
        {/* Right prong */}
        <rect x="37" y="0" width="11" height={PLUG_PRONG_H} rx="3" fill="url(#pg-metal)" />
        <rect x="38" y="0" width="9" height="6" rx="2" fill="url(#pg-tip)" />
      </svg>

      {/* Body */}
      <div
        className="w-16 flex flex-col items-center justify-end pb-3 gap-2 rounded-b-2xl rounded-tl-sm rounded-tr-sm bg-gradient-to-b from-zinc-600 to-zinc-800 border border-zinc-500/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.09),inset_0_-4px_10px_rgba(0,0,0,0.55),0_10px_22px_rgba(0,0,0,0.55)]"
        style={{ height: PLUG_BODY_H }}
      >
        {/* Grip detail */}
        <div className="w-9 h-px rounded-full bg-zinc-500/50" />
        <div className="w-9 h-px rounded-full bg-zinc-500/50" />
        {/* Cable strain relief */}
        <div className="w-6 h-4 rounded-b-xl bg-zinc-950/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
}

// ── Dynamic Cable ─────────────────────────────────────────────────────────────
function DynamicCable({ pathD }: { pathD: MotionValue<string> }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    >
      {/* Drop shadow pass */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="15"
        strokeLinecap="round"
        style={{ translateY: 5 }}
      />
      {/* Main cable body */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#18181b"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Specular highlight */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function PhysicalPlug({ onPowerToggle }: PhysicalPlugProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();
  const [isPlugged, setIsPlugged] = useState(false);
  const [positionsReady, setPositionsReady] = useState(false);

  // Drag offset motion values — drive both the plug position and the cable path
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Stable ref for computed positions (avoids stale closures in derived motion values)
  const pos = useRef({
    plugCX: 0,
    plugCY: 0,
    socketCX: 0,
    socketCY: 0,
    cableStartX: 0,
    cableStartY: 0,
  });

  // Cable end = bottom of plug body (cable exit point)
  const cableEndX = useTransform(x, (v) => pos.current.plugCX + v);
  const cableEndY = useTransform(y, (v) => pos.current.plugCY + v + PLUG_TOTAL_H / 2);

  // Derived path — bound directly to motion values, never triggers React renders
  const pathD = useTransform(
    [cableEndX, cableEndY] as MotionValue<number>[],
    ([ex, ey]: number[]) => {
      const { cableStartX, cableStartY } = pos.current;
      const cpX = (cableStartX + ex) / 2;
      const cpY = (cableStartY + ey) / 2 + 80;
      return `M ${cableStartX} ${cableStartY} Q ${cpX} ${cpY} ${ex} ${ey}`;
    }
  ) as MotionValue<string>;

  useEffect(() => {
    const container = containerRef.current;
    const socket = socketRef.current;
    if (!container || !socket) return;

    const cr = container.getBoundingClientRect();
    const sr = socket.getBoundingClientRect();

    pos.current = {
      plugCX: cr.width / 2,
      plugCY: cr.height * 0.68,
      socketCX: sr.left - cr.left + sr.width / 2,
      socketCY: sr.top - cr.top + sr.height / 2,
      cableStartX: cr.width / 2 + 30,
      cableStartY: cr.height + 30,
    };

    // Nudge motion values so useTransform recomputes the initial path
    x.set(0.1);
    x.set(0);

    setPositionsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (isPlugged) return;

      const { plugCX, plugCY, socketCX, socketCY } = pos.current;
      const dist = Math.hypot(
        plugCX + info.offset.x - socketCX,
        plugCY + info.offset.y - socketCY
      );

      if (dist < SNAP_THRESHOLD) {
        void controls
          .start({
            x: socketCX - plugCX,
            y: socketCY - plugCY,
            scale: [1, 0.93, 1],
            transition: {
              x: { duration: 0.22, ease: "easeOut" },
              y: { duration: 0.22, ease: "easeOut" },
              scale: { duration: 0.35, times: [0, 0.45, 1] },
            },
          })
          .then(() => {
            setIsPlugged(true);
            onPowerToggle();
          });
      } else {
        void controls.start({
          x: 0,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        });
      }
    },
    [isPlugged, controls, onPowerToggle]
  );

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Cable */}
      {positionsReady && <DynamicCable pathD={pathD} />}

      {/* Socket — upper-center */}
      <div
        ref={socketRef}
        className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 10 }}
      >
        <SocketVisual isPlugged={isPlugged} />
      </div>

      {/* Plug — draggable, lower */}
      {positionsReady && (
        <motion.div
          drag={!isPlugged}
          dragMomentum={false}
          animate={controls}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.06 }}
          style={{
            x,
            y,
            position: "absolute",
            left: pos.current.plugCX,
            top: pos.current.plugCY,
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 15,
            touchAction: "none",
          }}
          className={`relative ${
            isPlugged ? "cursor-default" : "cursor-grab active:cursor-grabbing"
          }`}
        >
          {/* Amber aura — moves with the plug, screen-blends over the dark bg */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 260,
              height: 260,
              background:
                "radial-gradient(circle, rgba(251,191,36,0.30) 0%, rgba(245,158,11,0.16) 38%, rgba(217,119,6,0.06) 62%, transparent 75%)",
              mixBlendMode: "screen",
              zIndex: -1,
            }}
          />
          <PlugVisual />
        </motion.div>
      )}

      {/* Instruction label */}
      {!isPlugged && positionsReady && (
        <motion.p
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BFDBFE] whitespace-nowrap pointer-events-none"
          animate={{ opacity: [0.42, 1, 0.42] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Arrastra el enchufe para conectar
        </motion.p>
      )}
    </div>
  );
}
