import { EcoRoute } from "@/lib/types";

export default function MapPreview({ route }: { route: EcoRoute }) {
  if (!route.coords) return null;

  const [lat, lng] = route.coords;

  const embedSrc = `https://www.openstreetmap.org/export/embed.html?&layer=mapnik&marker=${lat},${lng}`;
  const linkHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`;

  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-emerald-200 bg-emerald-50">
      <div className="w-full h-40">
        <iframe src={embedSrc} className="w-full h-full" loading="lazy" />
      </div>
      <a
        href={linkHref}
        target="_blank"
        rel="noreferrer"
        className="block text-xs text-emerald-800 text-center py-1 hover:bg-emerald-100"
      >
        View on OpenStreetMap
      </a>
    </div>
  );
}
