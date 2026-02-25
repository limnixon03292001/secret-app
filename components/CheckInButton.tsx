"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Navigation } from "lucide-react";
import { toast } from "sonner";
import { checkLocationAction } from "@/app/action";

export function CheckInButton() {
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // async function handleCheckLocation() {
  //   try {
  //     setIsCheckingIn(true);

  //     const position = await new Promise<GeolocationPosition>(
  //       (resolve, reject) =>
  //         navigator.geolocation.getCurrentPosition(resolve, reject, {
  //           enableHighAccuracy: true,
  //         }),
  //     );

  //     const { latitude, longitude } = position.coords;

  //     // For testing
  //     // const latitude = 23.826565;
  //     // const longitude = 115.151911;

  //     const data = await checkLocationAction(latitude, longitude);

  //     console.log("result", data);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //       console.error(error);
  //     }
  //   } finally {
  //     setIsCheckingIn(false);
  //   }
  // }

  async function handleCheckLocation() {
    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      }),
    );

    const { latitude, longitude } = position.coords;

    // If you are using a mobile device, enable location services
    // (GPS location sharing with your browser) for the best current location accuracy

    fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={handleCheckLocation}
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
    </>
  );
}
