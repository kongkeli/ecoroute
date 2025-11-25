// Demo routes are now shared in `lib/routesData.ts`.
// Keep a lightweight copy here without type imports to avoid import/path issues.

export const routes = [
  {
    id: '1',
    title: 'Home → University',
    origin: 'City Center',
    destination: 'University Campus',
    mode: 'cycling',
    distanceKm: 4.2,
    durationMin: 15,
    co2SavedKg: 0.8,
    description:
      'Daily route from the city center to the university using bike lanes and low-traffic streets.',
    coords: [40.632, 22.947], 
  },
  {
    id: '2',
    title: 'Home → Work (bus)',
    origin: 'Suburbs',
    destination: 'Business District',
    mode: 'bus',
    distanceKm: 9.5,
    durationMin: 25,
    co2SavedKg: 2.1,
    description:
      'Combination of walking and public transport instead of driving a car.',
    coords: [40.640, 22.930],
  },
  {
    id: '3',
    title: 'Weekend park walk',
    origin: 'City Center',
    destination: 'Eco Park',
    mode: 'walking',
    distanceKm: 2.1,
    durationMin: 30,
    co2SavedKg: 0.4,
    description:
      'Relaxing walking route through green areas towards the main city park.',
    coords: [40.635, 22.939],
  },
  {
    id: '4',
    title: 'Short e-scooter trip',
    origin: 'Train Station',
    destination: 'Old Town',
    mode: 'escooter',
    distanceKm: 1.8,
    durationMin: 10,
    co2SavedKg: 0.3,
    description:
      'Quick e-scooter route, avoiding congested roads and focusing on safe lanes.',
    coords: [40.641, 22.945],
  },
];
