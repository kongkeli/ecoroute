"use client";

import { TravelMode } from "@/lib/types";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const modes: (TravelMode | "all")[] = [
  "all",
  "walking",
  "cycling",
  "bus",
  "escooter",
];

export default function ModeFilter() {
  const { modeFilter, setModeFilter } = useFavoritesStore();

  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setModeFilter(m)}
          className={`px-4 py-1.5 rounded-full text-sm shadow-sm transition border
            ${
              modeFilter === m
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          {m === "all" ? "All modes" : m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
}
