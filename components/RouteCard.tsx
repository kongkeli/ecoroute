"use client";

import { EcoRoute } from "@/lib/types";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import MapPreview from "@/components/MapPreview";

type Props = {
  route: EcoRoute;
};

export default function RouteCard({ route }: Props) {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(route.id);

  return (
    <article className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/70 shadow-sm hover:shadow-md hover:border-emerald-400 transition flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          {route.mode}
        </span>

        <button
          onClick={() => toggleFavorite(route.id)}
          className="text-xs rounded-full px-3 py-1 border border-emerald-500 text-emerald-700 bg-white hover:bg-emerald-500 hover:text-white transition"
        >
          {isFavorite ? "★ Saved" : "☆ Save route"}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-emerald-900">
          {route.title}
        </h3>
        <p className="text-sm text-emerald-800 mt-1">
          {route.origin} → {route.destination}
        </p>
      </div>

      <div className="text-sm text-emerald-900 space-y-1">
        <p>
          Distance: <strong>{route.distanceKm} km</strong>
        </p>
        <p>
          Duration: <strong>{route.durationMin} min</strong>
        </p>
        <p className="text-xs text-emerald-700">
          CO₂ saved: {route.co2SavedKg} kg
        </p>
      </div>

      {/* map preview at the bottom */}
      <MapPreview route={route} />
    </article>
  );
}
