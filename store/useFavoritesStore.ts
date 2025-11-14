"use client";

import { create } from "zustand";
import { EcoRoute, TravelMode } from "@/lib/types";
import { routes as allRoutes } from "@/lib/routesData";

type State = {
  routes: EcoRoute[];
  favorites: string[];
  modeFilter: TravelMode | "all";
  searchQuery: string;
};

type Actions = {
  toggleFavorite: (id: string) => void;
  setModeFilter: (mode: TravelMode | "all") => void;
  setSearchQuery: (query: string) => void;
  loadFromStorage: () => void;
};

export const useFavoritesStore = create<State & Actions>((set, get) => ({
  routes: allRoutes,
  favorites: [],
  modeFilter: "all",
  searchQuery: "",

  toggleFavorite: (id) => {
    const { favorites } = get();
    const updated = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];

    // save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(updated));
    }

    set({ favorites: updated });
  },

  setModeFilter: (mode) => set({ modeFilter: mode }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  loadFromStorage: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          set({ favorites: parsed });
        }
      } catch {}
    }
  },
}));

