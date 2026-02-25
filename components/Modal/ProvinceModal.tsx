import React, { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Calendar, Navigation2, MapPin, Globe } from "lucide-react";
import { mapRegions, provinceDetails } from "@/data/philippinesData";

interface ProvinceModalProps {
  regionId: string | null;
  onClose: () => void;
}
export const ProvinceModal = ({ regionId, onClose }: ProvinceModalProps) => {
  const regionData = regionId
    ? mapRegions.find((r) => r.title === regionId)
    : null;

  const details = regionId ? provinceDetails[regionId] : null;

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const regionColor =
    regionData?.title.toLocaleLowerCase() === "laguna"
      ? {
          text: "text-neon-blue",
          bg: "bg-neon-blue/20",
          border: "border-neon-blue/40",
          glow: "rgba(0,212,255,0.3)",
        }
      : {
          text: "text-neon-purple",
          bg: "bg-neon-purple/20",
          border: "border-neon-purple/40",
          glow: "rgba(139,92,246,0.3)",
        };

  return (
    <AnimatePresence>
      {regionId && regionData && details && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none p-6"
          >
            <div
              className="pointer-events-auto w-full max-w-md relative"
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 40px ${regionColor.glow}, 0 24px 64px rgba(0,0,0,0.7)`,
              }}
            >
              {/* Corner Accents */}
              <div
                className={`absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 ${regionColor.border} rounded-tl-xl pointer-events-none z-10`}
              />
              <div
                className={`absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 ${regionColor.border} rounded-tr-xl pointer-events-none z-10`}
              />
              <div
                className={`absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 ${regionColor.border} rounded-bl-xl pointer-events-none z-10`}
              />
              <div
                className={`absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 ${regionColor.border} rounded-br-xl pointer-events-none z-10`}
              />

              {/* Card */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(10, 10, 20, 0.92)",
                  backdropFilter: "blur(24px)",
                }}
              >
                {/* Header */}
                <div
                  className={`relative p-6 border-b border-white/5 overflow-hidden`}
                >
                  {/* Background glow blob */}
                  <div
                    className={`absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-30 ${regionColor.bg}`}
                  />

                  <div className="relative flex items-start justify-between">
                    <div>
                      {/* Region + Visited badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${regionColor.bg} ${regionColor.text} ${regionColor.border}`}
                        >
                          {regionData.id}
                        </span>
                        {regionData.visited ? (
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Visited
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gray-700/50 text-gray-500 border border-gray-600/30">
                            Not Visited
                          </span>
                        )}
                      </div>

                      {/* Province Name */}
                      <h2
                        className={`text-2xl font-display font-bold tracking-wide ${regionColor.text}`}
                        style={{
                          textShadow: `0 0 20px ${regionColor.glow}`,
                        }}
                      >
                        {regionData.title}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">
                        Philippines · {regionData.id}
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Stats Body */}
                <div className="p-6 space-y-3">
                  {/* Visitors Count */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.05,
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-neon-purple" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">
                        Community Travelers
                      </p>
                      <p className="text-xl font-mono font-bold text-white">
                        {details.visitorsCount.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal ml-2">
                          explorers visited
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Visit Date */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.1,
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${regionData.visited && details.visitDate ? "bg-white/[0.03] border-white/[0.06]" : "bg-white/[0.015] border-white/[0.03] opacity-50"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${regionData.visited && details.visitDate ? "bg-neon-blue/15 border border-neon-blue/20" : "bg-gray-800 border border-gray-700"}`}
                    >
                      <Calendar
                        size={18}
                        className={
                          regionData.visited && details.visitDate
                            ? "text-neon-blue"
                            : "text-gray-600"
                        }
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">
                        Your Visit Date
                      </p>
                      {regionData.visited && details.visitDate ? (
                        <p className="text-sm font-mono font-bold text-white">
                          {details.visitDate}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600 italic">
                          Not yet visited
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Exact Address */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.15,
                    }}
                    className={`flex items-start gap-4 p-4 rounded-xl border ${regionData.visited && details.exactAddress ? "bg-white/[0.03] border-white/[0.06]" : "bg-white/[0.015] border-white/[0.03] opacity-50"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${regionData.visited && details.exactAddress ? "bg-neon-cyan/15 border border-neon-cyan/20" : "bg-gray-800 border border-gray-700"}`}
                    >
                      <Navigation2
                        size={18}
                        className={
                          regionData.visited && details.exactAddress
                            ? "text-neon-cyan"
                            : "text-gray-600"
                        }
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">
                        Exact Location
                      </p>
                      {regionData.visited && details.exactAddress ? (
                        <p className="text-sm font-mono text-white leading-relaxed">
                          {details.exactAddress}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600 italic">
                          Check in to record your location
                        </p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Footer hint */}
                <div className="px-6 pb-5">
                  <p className="text-[10px] text-gray-600 text-center">
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 font-mono">
                      ESC
                    </kbd>{" "}
                    or click outside to close
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
