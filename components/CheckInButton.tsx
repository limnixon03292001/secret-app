"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { mapRegions } from "@/data/philippinesData";
import { toast } from "sonner";
import { checkLocationAction } from "@/app/action";
import { table } from "console";

export function CheckInButton() {
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // const handleCheckIn = () => {
  //   setIsCheckingIn(true);

  //   let lat = null;
  //   let lng = null;

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       lat = 13.163912157132854;
  //       lng = 108.52264970828077;
  //       console.log("User location:", latitude, longitude);
  //       fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           const results = data.results;
  //           const components = results[0].address_components;

  //           const province = components.find((c: any) =>
  //             c.types.includes("administrative_area_level_1"),
  //           )?.long_name;

  //           const city = components.find(
  //             (c: any) =>
  //               c.types.includes("locality") ||
  //               c.types.includes("administrative_area_level_2"),
  //           )?.long_name;

  //           console.log("Province:", province, "City:", city, results);

  //           alert(`${province} ${city}`);

  //           const result = mapRegions.find((item) => {
  //             const lowerTitle = item.title.toLowerCase();

  //             const matchesFormatted = results[0].address_components.find(
  //               (i: { short_name: string }) => {
  //                 return i.short_name.toLowerCase().includes(lowerTitle);
  //               },
  //             );

  //             return matchesFormatted;
  //           });
  //           setIsCheckingIn(false);

  //           if (result === undefined) {
  //             return toast.error(
  //               "We’re unable to map your current location in our system. This may be because you’re using a VPN connected to another country or you’re currently outside the country.",
  //             );
  //           }
  //           console.log("result", result);
  //         });
  //     },
  //     (error) => {
  //       console.error("Geolocation error:", error);
  //       alert(`error: ${error}`);
  //     },
  //     { enableHighAccuracy: true },
  //   );
  // };

  async function handleCheckLocation() {
    try {
      setIsCheckingIn(true);

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
          }),
      );

      const { latitude, longitude } = position.coords;

      // For testing
      // const latitude = 23.826565;
      // const longitude = 115.151911;

      const data = await checkLocationAction(latitude, longitude);

      console.log("result", data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      }
    } finally {
      setIsCheckingIn(false);
    }
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
