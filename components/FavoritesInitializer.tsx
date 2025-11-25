"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";

export default function FavoritesInitializer() {
  const load = useFavoritesStore((s) => s.loadFromStorage);
  const loadRoutes = useFavoritesStore((s) => s.loadRoutes);

  useEffect(() => {
    load();

    loadRoutes();
  }, [load, loadRoutes]);

  return null;
}
