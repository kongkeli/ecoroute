import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-emerald-600 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="font-bold text-2xl tracking-tight">
          EcoRoute
        </Link>

        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-gray-200 transition">
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
