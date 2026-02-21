"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2, Navigation } from "lucide-react";

export function CheckInButton() {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const handleCheckIn = () => {
    setIsCheckingIn(true);

    setTimeout(() => {
      setIsCheckingIn(false);
      setLocation("Cebu City, Philippines");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setLocation(null);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={handleCheckIn}
        disabled={isCheckingIn}
        className="relative flex w-fit items-center gap-3 px-2.5 py-2.5 rounded-xl bg-linear-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/40 text-neon-cyan hover:border-neon-cyan/80 hover:shadow-[0_0_20px_rgba(6,255,212,0.25)] transition-all duration-300 overflow-hidden group disabled:opacity-60"
      >
        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

        {/* Pulse dot */}
        {/* <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan" />
        </span> */}

        {isCheckingIn ? (
          <>
            <Loader2 size={16} className="animate-spin shrink-0" />
            <span className="text-sm font-bold tracking-widest uppercase font-display">
              Locating…
            </span>
          </>
        ) : (
          <>
            <Navigation size={16} className="shrink-0" />
            {/* <span className="text-sm font-bold tracking-widest uppercase font-display">
              Check In
            </span> */}
          </>
        )}
      </motion.button>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="glass-panel px-5 py-3 rounded-xl border-l-4 border-neon-cyan flex items-center gap-3 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <div className="bg-neon-cyan/20 p-1.5 rounded-full">
                <MapPin className="w-4 h-4 text-neon-cyan" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Location Verified
                </p>
                <p className="text-[11px] text-gray-400">
                  Checked in at{" "}
                  <span className="text-neon-cyan">{location}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
