import RouteList from "@/components/RouteList";

export default function FavoritesPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Favorite routes</h1>
      <p className="text-sm text-gray-600 max-w-xl">
        Routes you have saved as part of your personal eco-friendly routine.
      </p>

      <RouteList onlyFavorites />
    </section>
  );
}
