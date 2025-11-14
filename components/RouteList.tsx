"use client";

import RouteCard from "./RouteCard";
import EmptyState from "./EmptyState";
import { useFavoritesStore } from "@/store/useFavoritesStore";

type Props = {
  onlyFavorites?: boolean;
};

export default function RouteList({ onlyFavorites = false }: Props) {
  const { routes, favorites, modeFilter, searchQuery } = useFavoritesStore();

  let filtered = routes;

  // 1. Filter by mode (walking, cycling, bus, etc.)
  if (modeFilter !== "all") {
    filtered = filtered.filter((r) => r.mode === modeFilter);
  }

  // 2. Filter by search query
  if (searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((r) =>
      (r.title + r.origin + r.destination + r.description)
        .toLowerCase()
        .includes(q)
    );
  }

  // 3. Only favorites
  if (onlyFavorites) {
    filtered = filtered.filter((r) => favorites.includes(r.id));
  }

  // 4. Empty state
  if (filtered.length === 0) {
    return (
      <EmptyState
        message={
          onlyFavorites
            ? "You have no favorite routes yet. Save a route and it will appear here."
            : "No routes found. Try changing the search or filter mode."
        }
      />
    );
  }

  return (
    <div className="grid gap-4 mt-4 sm:grid-cols-2">
      {filtered.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
}
