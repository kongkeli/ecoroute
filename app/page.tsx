"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ModeFilter from "@/components/ModeFilter";
import RouteList from "@/components/RouteList";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const INTRO_KEY = "ecoroute_intro_seen";

export default function HomePage() {
  const { loadRoutes, loadFromStorage } = useFavoritesStore();
  const searchParams = useSearchParams();
  const forceIntro = searchParams.get("forceIntro") === "1";

  // showIntro = αν είναι mounted το overlay
  // introActive = για fade-in / fade-out
  // introReady = έχουμε αποφασίσει αν πρέπει να δείξουμε intro ή όχι
  const [showIntro, setShowIntro] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  // Φόρτωμα δεδομένων (τρέχει μία φορά)
  useEffect(() => {
    loadFromStorage();
    loadRoutes();
  }, [loadFromStorage, loadRoutes]);

  // Λογική για το intro (τρέχει όταν αλλάζει το forceIntro ή στο πρώτο load)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (forceIntro) {
      // Ο χρήστης πάτησε το logo EcoRoute → πάντα δείξε intro
      window.sessionStorage.removeItem(INTRO_KEY);
      setShowIntro(true);
      setIntroReady(true);
      return;
    }

    const hasSeen = window.sessionStorage.getItem(INTRO_KEY);

    if (!hasSeen) {
      setShowIntro(true);
    } else {
      setShowIntro(false);
    }

    setIntroReady(true);
  }, [forceIntro]);

  // μόλις γίνει showIntro=true, κάνουμε fade-in
  useEffect(() => {
    if (showIntro) {
      const id = requestAnimationFrame(() => {
        setIntroActive(true);
      });
      return () => cancelAnimationFrame(id);
    } else {
      setIntroActive(false);
    }
  }, [showIntro]);

  function handleCloseIntro() {
    // fade-out
    setIntroActive(false);
    setTimeout(() => {
      setShowIntro(false);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(INTRO_KEY, "1");
      }
    }, 300); // 300ms = duration-300
  }

  // Μέχρι να αποφασίσουμε αν έχει intro ή όχι, δεν κάνουμε render τίποτα
  if (!introReady) {
    return null;
  }

  return (
    <>
      {showIntro && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black transition-opacity duration-300 ${
            introActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            <div className="bg-hourglass" />
          </div>

          <div className="relative z-10 text-center px-6 select-none">
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">
              EcoRoute
            </h1>

            <p
              className="mt-4 text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto cursor-pointer hover:text-emerald-300 transition"
              onClick={handleCloseIntro}
            >
              Discover cleaner, greener routes that keep your city moving – not
              just your car.
            </p>
          </div>
        </div>
      )}

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
