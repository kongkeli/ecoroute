"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ModeFilter from "@/components/ModeFilter";
import RouteList from "@/components/RouteList";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* FULLSCREEN INTRO OVERLAY */}
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
          {/* Πράσινο/μαύρο 3D-style background */}
          <div className="absolute inset-0">
            <div className="bg-hourglass" />
          </div>

          {/* Κεντρικό περιεχόμενο */}
          <div className="relative z-10 text-center px-6 select-none">
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">
              EcoRoute
            </h1>

            <p
              className="mt-4 text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto cursor-pointer hover:text-emerald-300 transition"
              onClick={() => setShowIntro(false)}
            >
              Discover cleaner, greener routes that keep your city moving – not
              just your car.
            </p>
          </div>
        </div>
      )}

      {/* ΚΥΡΙΑ ΣΕΛΙΔΑ (αυτή που είχες ήδη) */}
      <section className="pt-4">
        <h1 className="text-3xl font-bold mb-2">EcoRoute</h1>
        <p className="text-sm text-gray-600 max-w-xl">
          Explore greener alternatives for your everyday trips – walking,
          cycling, bus, or e-scooter – and see how much CO₂ you can save
          compared to driving a car.
        </p>

        <SearchBar />
        <ModeFilter />
        <RouteList />
      </section>
    </>
  );
}
