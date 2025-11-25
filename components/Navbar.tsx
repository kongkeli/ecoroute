"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const INTRO_KEY = "ecoroute_intro_seen";

export default function Navbar() {
  const pathname = usePathname();
  const fromFavorites = pathname === "/favorites";

  function handleHomeClick() {
    if (fromFavorites && typeof window !== "undefined") {
      // πες στο Home ότι σε αυτή τη session έχουμε ήδη δει intro
      window.sessionStorage.setItem(INTRO_KEY, "1");
    }
  }

  return (
    <nav className="w-full bg-emerald-600 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <Link
          href="/?forceIntro=1"
          className="font-bold text-2xl tracking-tight"
        >
          EcoRoute
        </Link>

        <div className="flex gap-6 text-sm">
          <Link
            href="/"
            onClick={handleHomeClick}
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link href="/favorites" className="hover:text-gray-200 transition">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
