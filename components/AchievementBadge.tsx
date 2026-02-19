"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Anchor, Building, Compass, Mountain, Sun } from "lucide-react";
interface AchievementBadgeProps {
  name: string;
  icon: string;
  unlocked: boolean;
  size?: "sm" | "md" | "lg";
}
const iconMap: Record<string, React.ReactNode> = {
  anchor: <Anchor size={18} />,
  building: <Building size={18} />,
  compass: <Compass size={18} />,
  mountain: <Mountain size={18} />,
  sun: <Sun size={18} />,
};
export function AchievementBadge({
  name,
  icon,
  unlocked,
  size = "md",
}: AchievementBadgeProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: 5,
      }}
      className="flex flex-col items-center gap-2 group cursor-pointer"
    >
      <div
        className={`relative flex items-center justify-center ${sizeClasses[size]}`}
      >
        {/* Hexagon Shape Background */}
        <div
          className={`absolute inset-0 clip-hexagon transition-all duration-300 ${unlocked ? "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border-neon-blue" : "bg-gray-800/50 border-gray-700"}`}
        >
          {/* Hexagon Border Simulation */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            <path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="none"
              stroke={unlocked ? "url(#neonGradient)" : "#334155"}
              strokeWidth="2"
              className={
                unlocked ? "drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]" : ""
              }
            />
            <defs>
              <linearGradient
                id="neonGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Icon */}
        <div
          className={`relative z-10 ${unlocked ? "text-neon-cyan" : "text-gray-500"}`}
        >
          {unlocked ? iconMap[icon] || <Anchor /> : <Lock size={16} />}
        </div>

        {/* Glow Effect for Unlocked */}
        {unlocked && (
          <div className="absolute inset-0 bg-neon-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      <span
        className={`text-[10px] font-medium uppercase tracking-wider text-center max-w-[80px] ${unlocked ? "text-text-primary group-hover:text-neon-blue" : "text-text-muted"} transition-colors`}
      >
        {name}
      </span>
    </motion.div>
  );
}
