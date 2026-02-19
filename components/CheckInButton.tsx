"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2 } from "lucide-react";
export function CheckInButton() {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const handleCheckIn = () => {
    setIsCheckingIn(true);
    // Simulate GPS lookup
    setTimeout(() => {
      setIsCheckingIn(false);
      setLocation("Cebu City, Philippines");
      setShowToast(true);
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
        setLocation(null);
      }, 3000);
    }, 2000);
  };
  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        {/* Pulse Rings */}
        <div className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-neon-cyan/10 animate-pulse-glow" />

        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleCheckIn}
          disabled={isCheckingIn}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center shadow-[0_0_20px_rgba(6,255,212,0.4)] border-2 border-white/20 z-10 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />

          {isCheckingIn ? (
            <Loader2 className="w-8 h-8 text-bg-primary animate-spin" />
          ) : (
            <MapPin className="w-8 h-8 text-bg-primary fill-bg-primary" />
          )}
        </motion.button>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[10px] font-bold tracking-widest text-neon-cyan uppercase bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
            Check In
          </span>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            className="fixed bottom-28 left-1/2 md:left-auto md:right-8 md:translate-x-0 z-50"
          >
            <div className="glass-panel px-6 py-4 rounded-lg border-l-4 border-neon-cyan flex items-center gap-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="bg-neon-cyan/20 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Location Verified
                </h4>
                <p className="text-xs text-gray-300">
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
