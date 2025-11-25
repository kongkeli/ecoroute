"use client";

import Link from "next/link";
import RouteList from "@/components/RouteList";

export default function FavoritesPage() {
  return (
    <section className="pt-4">
      <div className="mb-4">
        <Link
          href="/?skipIntro=1"
          className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-white text-emerald-700 border border-emerald-400 hover:bg-emerald-50 transition"
        >
          <span className="text-lg leading-none">←</span>
          <span>Back to main routes</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2 text-emerald-900">Saved routes</h1>

      <p className="text-sm text-gray-600 max-w-xl mb-3">
        These are the routes you’ve marked as favorites.
      </p>

      <RouteList onlyFavorites />
    </section>
  );
}
