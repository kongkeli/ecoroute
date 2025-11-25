"use client";

import { create } from "zustand";
import { EcoRoute, TravelMode } from "@/lib/types";
import { routes as demoRoutes } from "@/lib/routesData";

type State = {
  routes: EcoRoute[];
  favorites: string[];
  modeFilter: TravelMode | "all";
  searchQuery: string;
  dataSource: "unknown" | "backend" | "demo";
};

type Actions = {
  toggleFavorite: (id: string) => void;
  setModeFilter: (mode: TravelMode | "all") => void;
  setSearchQuery: (query: string) => void;
  loadFromStorage: () => void;
  loadRoutes: (opts?: {
    origin?: string;
    destination?: string;
    mode?: string;
  }) => Promise<void> | void;
  setRoutes: (routes: EcoRoute[], source?: State["dataSource"]) => void;
};

export const useFavoritesStore = create<State & Actions>((set, get) => ({
  routes: [],
  favorites: [],
  dataSource: "unknown",
  modeFilter: "all",
  searchQuery: "",

  toggleFavorite: (id) => {
    const { favorites } = get();
    const updated = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];

    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(updated));
    }

    set({ favorites: updated });
  },

  setModeFilter: (mode) => set({ modeFilter: mode }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setRoutes: (routes, source) =>
    set((state) => ({
      routes,
      dataSource: source ?? state.dataSource,
    })),

  loadRoutes: async (opts?: {
    origin?: string;
    destination?: string;
    mode?: string;
  }) => {
    if (typeof window === "undefined") return;
    const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
    let backendFetchFailed = false;

    try {
      const body = {
        origin: opts?.origin || "City Center",
        destination: opts?.destination || "University Campus",
        mode: opts?.mode || "driving",
      };

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${base}/api/routes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.debug(
          "Backend returned non-OK response when loading routes:",
          res.status,
          text
        );
        return;
      }

      const data = await res.json();
      if (!data || !Array.isArray(data.routes)) return;

      const demoPool = demoRoutes.map((d) => ({ ...d }));
      const usedIds = new Set<string>();

      const mapped: EcoRoute[] = data.routes.map((r: any, i: number) => {
        const originalId = String(r.id ?? i + 1);
        const routeMode = ((r.mode as TravelMode) ||
          (r.type as TravelMode) ||
          (body.mode as TravelMode) ||
          "cycling") as TravelMode;

        const demoIndex = demoPool.findIndex((d) => d.mode === routeMode);
        let assignedId: string;
        let demoMatched: any | null = null;
        if (demoIndex >= 0) {
          demoMatched = demoPool.splice(demoIndex, 1)[0];
          assignedId = String(demoMatched.id);
        } else {
          assignedId = originalId;
        }

        if (usedIds.has(assignedId)) {
          if (!usedIds.has(originalId)) {
            assignedId = originalId;
          } else {
            let suffix = 1;
            while (usedIds.has(`${originalId}-${suffix}`)) suffix += 1;
            assignedId = `${originalId}-${suffix}`;
          }
        }
        usedIds.add(assignedId);

        try {
          if (assignedId !== originalId) {
            console.debug(
              `Remapped backend route id ${originalId} -> ${assignedId} (mode ${routeMode})`,
              {
                backendRoute: r,
                demoRoute: demoMatched,
              }
            );
          }
        } catch {}

        return {
          id: assignedId,
          title: r.label || r.title || `Route ${i + 1}`,
          origin: body.origin,
          destination: body.destination,
          mode: routeMode,
          distanceKm: r.distanceKm ?? r.distance ?? 0,
          durationMin: r.durationMin ?? r.duration ?? 0,
          // 👉 ΤΩΡΑ: ΠΡΩΤΑ backend co2Kg, μετά demo/fallback
          co2SavedKg:
            typeof r.co2Kg === "number"
              ? r.co2Kg
              : demoMatched?.co2SavedKg ?? r.co2SavedKg ?? 0,
          description: r.description || "",
          coords:
            r.coords && Array.isArray(r.coords) && r.coords.length === 2
              ? [Number(r.coords[0]), Number(r.coords[1])]
              : demoMatched && demoMatched.coords
              ? [Number(demoMatched.coords[0]), Number(demoMatched.coords[1])]
              : [40.632 + i * 0.002, 22.947 + i * 0.002],
        };
      });

      get().setRoutes(mapped, "backend");
    } catch (e) {
      if (!backendFetchFailed) {
        try {
          const msg = (e && (e as any).message) || String(e);
          console.debug(
            "Could not load routes from backend; using local demo data.",
            msg
          );
        } catch {
          console.debug(
            "Could not load routes from backend; using local demo data."
          );
        }
        backendFetchFailed = true;
      }

      try {
        const mappedFallback: EcoRoute[] = demoRoutes.map(
          (r: any, i: number) => ({
            id: String(r.id ?? i + 1),
            title: r.title || `Route ${i + 1}`,
            origin: r.origin || opts?.origin || "City Center",
            destination:
              r.destination || opts?.destination || "University Campus",
            mode:
              (r.mode as TravelMode) ||
              (opts?.mode as TravelMode) ||
              "cycling",
            distanceKm: r.distanceKm ?? 0,
            durationMin: r.durationMin ?? 0,
            co2SavedKg: r.co2SavedKg ?? 0,
            description: r.description || "",
            coords:
              r.coords && Array.isArray(r.coords) && r.coords.length === 2
                ? [Number(r.coords[0]), Number(r.coords[1])]
                : [40.632 + i * 0.002, 22.947 + i * 0.002],
          })
        );

        get().setRoutes(mappedFallback, "demo");
      } catch (e2) {
        console.error("Error applying fallback routes", e2);
      }
    }
  },

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


