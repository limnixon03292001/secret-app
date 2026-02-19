"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mapRegions2 } from "../data/philippinesData";
import { MapPin } from "lucide-react";
import MapSvgIcon from "./Map/MapIcon";
import Mapv2 from "./Map/Mapv2";

export function PhilippinesMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Get relative position within the SVG container for tooltip
    const rect = e.currentTarget.getBoundingClientRect();

    console.log(e.clientX, e.clientY);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // const lat = 14.6454;
  // const lng = 121.031037;

  const lat = 13.917487;
  const lng = 124.277325;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(`error: ${error}`);
      },
      { enableHighAccuracy: true },
    );

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        const components = results[0].address_components;

        const province = components.find((c: any) =>
          c.types.includes("administrative_area_level_1"),
        )?.long_name;

        const city = components.find(
          (c: any) =>
            c.types.includes("locality") ||
            c.types.includes("administrative_area_level_2"),
        )?.long_name;

        console.log("Province:", province, "City:", city, results);

        alert(`${province} ${city}`);

        // const result = mapRegions2.find((item) => {
        //   const lowerTitle = item.title.toLowerCase();

        //   const matchesFormatted = results[0].formatted_address
        //     .toLowerCase()
        //     .includes(lowerTitle);

        //   const matchesComponent = results[0].address_components.map(
        //     (component: any) =>
        //       // component.long_name.toLowerCase() === lowerTitle ||
        //       component.short_name.toLowerCase() === lowerTitle,
        //   );

        //   return matchesFormatted && matchesComponent;
        // });

        const result = mapRegions2.find((item) => {
          const lowerTitle = item.title.toLowerCase();

          const matchesFormatted = results[0].address_components.find(
            (i: { short_name: string }) => {
              return i.short_name.toLowerCase().includes(lowerTitle);
            },
          );

          return matchesFormatted;
        });

        console.log("result", result);
      });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Background Grid & Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-neon-blue/30 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-neon-purple/30 rounded-br-3xl pointer-events-none" />

      {/* Scan Line Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent absolute top-0 animate-[scan_4s_linear_infinite]"
          style={{
            boxShadow: "0 0 15px rgba(6, 255, 212, 0.5)",
          }}
        />
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* <div
        className="relative z-10 w-full max-w-[500px] aspect-[2/3]"
        onMouseMove={handleMouseMove}
      >
        <Mapv2 />
      </div> */}

      <div
        className="relative z-10 w-full max-w-[500px] aspect-[2/3]"
        onMouseMove={handleMouseMove}
      >
        <svg
          className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "100%", fill: "Red" }}
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
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render Regions */}
          {mapRegions2.map((region) => (
            <motion.path
              id={region.id}
              key={region.id}
              d={region.path}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: Math.random() * 0.5,
              }}
              fill={region.visited ? "url(#visitedGradient)" : "#1e293b"}
              stroke={region.visited ? "#a5f3fc" : "#334155"}
              strokeWidth="1"
              className={`map-path ${region.visited ? "visited" : ""}`}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              whileHover={{
                scale: 1.02,
              }}
            />
          ))}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredRegion && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
              style={{
                left: mousePos.x + 20,
                top: mousePos.y - 40,
              }}
              className="absolute z-50 pointer-events-none"
            >
              <div className="glass-panel px-3 py-2 rounded border-l-2 border-neon-cyan">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-neon-cyan" />
                  <span className="text-xs font-bold font-display uppercase tracking-wider text-white">
                    {mapRegions2.find((r) => r.id === hoveredRegion)?.title}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  {mapRegions2.find((r) => r.id === hoveredRegion)?.visited ? (
                    <span className="text-neon-green text-green-400 flex items-center gap-1">
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

      {/* Floating UI Elements on Map */}
      <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none">
        <div className="glass-panel px-3 py-1 rounded text-[10px] font-mono text-neon-blue border border-neon-blue/20">
          GPS: ACTIVE
        </div>
        <div className="glass-panel px-3 py-1 rounded text-[10px] font-mono text-neon-purple border border-neon-purple/20">
          SYNC: ONLINE
        </div>
      </div>
    </div>
  );
}
