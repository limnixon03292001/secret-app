"use client";
import React, { useState, useCallback, memo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { MapPin, Minus, Plus, Undo2 } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { mapRegions } from "../data/philippinesData";
import { ProvinceModal } from "./Modal/ProvinceModal";
import { CheckInButton } from "./CheckInButton";

// --- Optimized Map Content (Memoized) ---
const MapContent = memo(
  ({
    hoveredRegion,
    onHover,
    setSelectedRegion,
  }: {
    hoveredRegion: string | null;
    onHover: (id: string | null) => void;
    setSelectedRegion: (id: string | null) => void;
  }) => {
    return (
      <svg
        className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 702.39 1209.438"
      >
        <defs>
          <linearGradient
            id="visitedGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {mapRegions.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            fill={region.visited ? "url(#visitedGradient)" : "#1e293b"}
            stroke={region.visited ? "#a5f3fc" : "#334155"}
            strokeWidth="1"
            className={`cursor-pointer map-path  `}
            onMouseEnter={() => onHover(region.id)}
            onClick={() => setSelectedRegion(region.title)}
            onMouseLeave={() => onHover(null)}
            whileHover={{ scale: 1.02 }}
          />
        ))}
      </svg>
    );
  },
);

// --- Restored Controls ---
const Controls = ({ zoomIn, zoomOut, resetTransform }: any) => (
  <div className="absolute right-5 top-28 z-20">
    <div className="flex flex-col gap-3">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/40 transition-colors"
        onClick={() => zoomIn()}
      >
        <Plus size={18} />
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/40 transition-colors"
        onClick={() => zoomOut()}
      >
        <Minus size={18} />
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/40 transition-colors"
        onClick={() => resetTransform()}
      >
        <Undo2 size={18} />
      </button>
    </div>
  </div>
);

export function PhilippinesMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Motion Values for Tooltip (No re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  const handleHover = useCallback((id: string | null) => {
    setHoveredRegion(id);
  }, []);

  const activeRegion = mapRegions.find((r) => r.id === hoveredRegion);

  return (
    <>
      {/* Province Detail Modal — renders above everything */}
      <ProvinceModal
        regionId={selectedRegion}
        onClose={() => setSelectedRegion(null)}
      />

      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950"
        onMouseMove={handleMouseMove}
      >
        <TransformWrapper initialScale={1} centerOnInit={true}>
          {(utils) => (
            <>
              {/* UI Elements stay fixed inside Wrapper but outside Component */}
              <Controls {...utils} />

              <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none z-20">
                <div className="glass-panel px-3 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-400/20 bg-slate-900/50 backdrop-blur-sm">
                  GPS: ACTIVE
                </div>
                <div className="glass-panel px-3 py-1 rounded text-[10px] font-mono text-purple-400 border border-purple-400/20 bg-slate-900/50 backdrop-blur-sm">
                  SYNC: ONLINE
                </div>
              </div>

              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "grab",
                }}
              >
                <div className="relative w-full max-w-[440px]">
                  <MapContent
                    hoveredRegion={hoveredRegion}
                    onHover={handleHover}
                    setSelectedRegion={setSelectedRegion}
                  />
                </div>
              </TransformComponent>

              {/* Right side: Check-In + hint */}
              <div className="absolute top-64 right-5">
                <div className="flex flex-col gap-4 flex-1 min-w-0">
                  <div className="flex items-end flex-col gap-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                      Current Location
                    </p>
                    <CheckInButton />
                  </div>
                </div>
              </div>
            </>
          )}
        </TransformWrapper>

        {/* Tooltip */}
        <AnimatePresence mode="wait">
          {hoveredRegion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "fixed",
                left: smoothX,
                top: smoothY,
                x: 15,
                y: 15,
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              <div className="glass-panel px-3 py-2 rounded border-l-2 border-cyan-400 bg-slate-900/90 backdrop-blur-md shadow-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-cyan-400" />
                  <span className="text-xs font-bold font-display uppercase tracking-wider text-white">
                    {activeRegion?.title}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  {activeRegion?.visited ? (
                    <span className="text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      VISITED
                    </span>
                  ) : (
                    "LOCKED"
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
