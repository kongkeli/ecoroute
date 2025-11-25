"use client";

import { useState, FormEvent } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const { setSearchQuery } = useFavoritesStore();

  function submit(e: FormEvent) {
    e.preventDefault();
  }

  function handleChange(value: string) {
    setInput(value);
    setSearchQuery(value.trim().toLowerCase());
  }

  return (
    <form
      onSubmit={submit}
      className="flex gap-3 mt-4 bg-white p-3 rounded-xl shadow-sm border"
    >
      <input
        type="text"
        placeholder="Search routes..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="flex-1 px-3 py-2 border rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
      >
        Search
      </button>
    </form>
  );
}
