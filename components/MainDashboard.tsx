"use client";

import { motion } from "framer-motion";
import { Sidebar } from "../components/Sidebar";
import { PhilippinesMap } from "@/components/PhilippineMap";
import { Leaderboard } from "@/components/LeaderBoard";
import { StatsCard } from "@/components/StatsCard";
import { CheckInButton } from "@/components/CheckInButton";
import { Compass, Map as MapIcon, Navigation, Zap } from "lucide-react";

export default function MainDashboard() {
  return (
    <div className="min-h-screen w-full bg-bg-primary text-text-primary overflow-hidden flex flex-col md:flex-row">
      {/* Mobile Header (visible only on small screens) */}
      <header className="md:hidden p-4 border-b border-white/10 flex justify-between items-center bg-bg-secondary/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
            <Navigation size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-wider">
            PH<span className="text-neon-cyan">TRACKER</span>
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-neon-blue">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
            alt="User"
          />
        </div>
      </header>

      {/* Sidebar (Left) */}
      <div className="hidden md:block w-[280px] h-screen p-4 sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content Area (Center) */}
      <main className="flex-1 h-[calc(100vh-64px)] md:h-screen overflow-y-auto md:overflow-hidden flex flex-col relative">
        {/* Top Stats Bar */}
        {/* Will add stats bar soon... */}
        {/* <div className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
          <StatsCard
            title="Total Distance"
            value="12,450 km"
            icon={<Navigation size={16} />}
            trend="+125 km"
            trendUp={true}
            delay={0.1}
          />
          <StatsCard
            title="Exploration"
            value="28%"
            icon={<MapIcon size={16} />}
            trend="+2%"
            trendUp={true}
            delay={0.2}
          />
          <StatsCard
            title="Next Rank"
            value="4,580 XP"
            icon={<Zap size={16} />}
            trend="Needed"
            trendUp={false}
            delay={0.3}
          />
          <StatsCard
            title="Active Quest"
            value="Visayas Tour"
            icon={<Compass size={16} />}
            className="border-neon-purple/30 bg-neon-purple/5"
            delay={0.4}
          />
        </div> */}

        {/* Map Container */}
        <div className="flex-1 relative min-h-[500px] md:min-h-0">
          <PhilippinesMap />

          {/* Overlay Title */}
          <div className="absolute top-4 left-6 pointer-events-none">
            <motion.h1
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              className="text-4xl md:text-6xl font-display font-bold text-white/10 uppercase tracking-[0.2em]"
            >
              Philippines
            </motion.h1>
          </div>
        </div>

        {/* Floating Action Button */}
        <CheckInButton />
      </main>

      {/* Right Panel (Leaderboard) */}
      <div className="w-full md:w-[320px] h-auto md:h-screen p-4 md:sticky md:top-0">
        <Leaderboard />
      </div>
    </div>
  );
}
