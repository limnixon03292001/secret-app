"use client";

import { motion } from "framer-motion";
import { User, Map, Award, Settings, LogOut, Star } from "lucide-react";
import { userData, achievements } from "../data/philippinesData";
import { AchievementBadge } from "./AchievementBadge";
export function Sidebar() {
  const progressPercentage = Math.round(
    (userData.provincesVisited / userData.totalProvinces) * 100,
  );
  return (
    <aside className="h-full flex flex-col glass-panel border-r border-white/5 overflow-hidden">
      {/* Profile Header */}
      <div className="p-6 flex flex-col items-center border-b border-white/5 relative">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-neon-blue/10 to-transparent pointer-events-none" />

        <div className="relative mb-4 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple animate-spin-slow blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
          <img
            src={userData.avatar}
            alt="Profile"
            className="relative w-24 h-24 rounded-full border-2 border-white/20 object-cover z-10"
          />
          <div className="absolute -bottom-2 -right-2 z-20 bg-black rounded-full p-1 border border-neon-yellow">
            <div className="bg-yellow-500 rounded-full p-1">
              <Star size={12} className="text-black fill-black" />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-display font-bold text-white tracking-wide">
          {userData.username}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider px-2 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/20">
            {userData.rank}
          </span>
          <span className="text-xs text-gray-400 font-mono">Lvl 12</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-neon-blue/30 transition-colors">
          <div className="text-2xl font-mono font-bold text-white">
            {userData.provincesVisited}
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">
            Provinces
          </div>
        </div>
        <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-neon-purple/30 transition-colors">
          <div className="text-2xl font-mono font-bold text-white">
            {userData.citiesExplored}
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">
            Cities
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-6 pb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Philippines Explored
          </span>
          <span className="text-sm font-mono font-bold text-neon-blue">
            {progressPercentage}%
          </span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progressPercentage}%`,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="h-full bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple relative"
          >
            <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent w-full" />
          </motion.div>
        </div>
        <div className="mt-2 text-[10px] text-gray-500 text-right">
          {userData.provincesVisited} / {userData.totalProvinces} Provinces
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Award size={14} />
          Recent Badges
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {achievements.map((badge) => (
            <AchievementBadge
              key={badge.id}
              name={badge.name}
              icon={badge.icon}
              unlocked={badge.unlocked}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-4 border-t border-white/5 mt-auto">
        <nav className="flex justify-around text-gray-400">
          <button className="p-2 hover:text-neon-blue hover:bg-white/5 rounded-lg transition-colors">
            <User size={20} />
          </button>
          <button className="p-2 text-neon-cyan bg-neon-cyan/10 rounded-lg transition-colors shadow-[0_0_10px_rgba(6,255,212,0.2)]">
            <Map size={20} />
          </button>
          <button className="p-2 hover:text-neon-purple hover:bg-white/5 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          <button className="p-2 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
            <LogOut size={20} />
          </button>
        </nav>
      </div>
    </aside>
  );
}
