import React from "react";
import { motion } from "framer-motion";
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  delay?: number;
}
export function StatsCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  className = "",
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay,
      }}
      className={`glass-card p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group ${className}`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-neon-blue/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-neon-blue/20" />

      <div className="flex justify-between items-start mb-2 relative z-10">
        <h3 className="text-text-muted text-xs font-medium uppercase tracking-wider">
          {title}
        </h3>
        {icon && <div className="text-neon-cyan opacity-80">{icon}</div>}
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-mono font-bold text-white group-hover:text-glow-blue transition-all duration-300">
          {value}
        </div>

        {trend && (
          <div
            className={`text-xs mt-1 flex items-center ${trendUp ? "text-neon-cyan" : "text-neon-pink"}`}
          >
            <span className="mr-1">{trendUp ? "↑" : "↓"}</span>
            {trend}
          </div>
        )}
      </div>
    </motion.div>
  );
}
