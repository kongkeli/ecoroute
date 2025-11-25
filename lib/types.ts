export type TravelMode = "driving" |"walking" | "cycling" | "bus" | "escooter";

export interface EcoRoute {
  id: string;
  title: string;
  origin: string;
  destination: string;
  mode: TravelMode;
  distanceKm: number;
  durationMin: number;
  co2SavedKg: number;
  description: string;
  coords?: [number, number]; 
}
