"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { leaderboardData } from "../data/philippinesData";
export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"weekly" | "all-time">("weekly");
  return (
    <div className="h-full flex flex-col glass-panel rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="text-neon-yellow text-yellow-400" size={24} />
          <h2 className="text-xl font-display font-bold text-white tracking-wider">
            TOP EXPLORERS
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-black/20 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${activeTab === "weekly" ? "bg-neon-blue/20 text-neon-blue shadow-[0_0_10px_rgba(0,212,255,0.2)]" : "text-gray-500 hover:text-gray-300"}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab("all-time")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${activeTab === "all-time" ? "bg-neon-purple/20 text-neon-purple shadow-[0_0_10px_rgba(139,92,246,0.2)]" : "text-gray-500 hover:text-gray-300"}`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {leaderboardData.map((user, index) => (
          <motion.div
            key={user.username}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            className={`relative p-3 rounded-xl flex items-center gap-3 group transition-all duration-300 ${index < 3 ? "bg-white/5 border border-white/10" : "hover:bg-white/5 border border-transparent hover:border-white/5"}`}
          >
            {/* Rank */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-mono font-bold text-sm ${index === 0 ? "bg-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]" : index === 1 ? "bg-gray-400/20 text-gray-300" : index === 2 ? "bg-orange-700/20 text-orange-400" : "text-gray-500"}`}
            >
              {index === 0 ? <Crown size={14} /> : user.rank}
            </div>

            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.avatarColor} ring-2 ring-black`}
            >
              {user.avatarInitials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-gray-200 truncate group-hover:text-neon-blue transition-colors">
                  {user.username}
                </h4>
                {index < 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400 border border-white/5">
                    ELITE
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span>{user.provincesCount} Provinces</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-neon-purple">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>
            </div>

            {/* Trend */}
            <div className="text-gray-600">
              {user.trend === "up" && (
                <TrendingUp size={14} className="text-green-500" />
              )}
              {user.trend === "down" && (
                <TrendingDown size={14} className="text-red-500" />
              )}
              {user.trend === "stable" && (
                <Minus size={14} className="text-gray-600" />
              )}
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* User Rank Footer */}
      <div className="p-4 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-t border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neon-cyan/20 text-neon-cyan font-mono font-bold text-sm">
            47
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              Your Rank
            </div>
            <div className="text-sm font-bold text-white">Top 15%</div>
          </div>
          <div className="text-xs font-mono text-neon-blue">+245 XP to #46</div>
        </div>
      </div>
    </div>
  );
}
