"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";

export default function FavoritesInitializer() {
  const load = useFavoritesStore((s) => s.loadFromStorage);

  useEffect(() => {
    load();
  }, [load]);

  return null;
}
