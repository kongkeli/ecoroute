function calculateEcoRoutes({
  origin,
  destination,
  mode = "driving",
  preferences = {},
}) {
  const baseDistanceKm = 10;
  const baseDurationMin = 20;

  const CO2 = {
    driving: 0.192,
    bus: 0.105,
    escooter: 0.016,
    cycling: 0,
    walking: 0,
  };

  function saved(distance, mode) {
    return Number((distance * (CO2["driving"] - CO2[mode])).toFixed(2));
  }

  // ECO DRIVING IS SHORTER BY 20%
  const ecoDistance = baseDistanceKm * 0.8;
  const ecoDuration = baseDurationMin * 1.1;

  const routes = [
    {
      id: 1,
      label: "Fastest driving route",
      mode: "driving",
      from: origin || "City Center",
      to: destination || "University Campus",
      distanceKm: baseDistanceKm,
      durationMin: baseDurationMin,
      co2Kg: saved(baseDistanceKm, "driving"),
      type: "fastest",
      mapPreview: "fastest",
    },

    {
  id: 2,
  label: "Most eco-friendly driving route",
  mode: "driving",
  from: origin || "City Center",
  to: destination || "University Campus",
  distanceKm: ecoDistance,
  durationMin: ecoDuration,
  co2Kg: 0.38,
  type: "eco",
  mapPreview: "eco",
},


    {
      id: 3,
      label: "Cycling route",
      mode: "cycling",
      from: origin || "City Center",
      to: destination || "University Campus",
      distanceKm: baseDistanceKm * 0.85,
      durationMin: baseDurationMin,
      co2Kg: saved(baseDistanceKm * 0.85, "cycling"),
      type: "cycling",
      mapPreview: "cycling",
    },

    {
      id: 4,
      label: "Walking route",
      mode: "walking",
      from: origin || "City Center",
      to: destination || "University Campus",
      distanceKm: baseDistanceKm * 0.95,
      durationMin: baseDurationMin * 2.2,
      co2Kg: saved(baseDistanceKm * 0.95, "walking"),
      type: "walking",
      mapPreview: "walking",
    },

    {
      id: 5,
      label: "Bus route with one transfer",
      mode: "bus",
      from: origin || "City Center",
      to: destination || "University Campus",
      distanceKm: baseDistanceKm * 1.3,
      durationMin: baseDurationMin * 1.5,
      co2Kg: saved(baseDistanceKm * 1.3, "bus"),
      type: "bus",
      mapPreview: "bus",
    },

    {
      id: 6,
      label: "E-scooter friendly route",
      mode: "escooter",
      from: origin || "City Center",
      to: destination || "University Campus",
      distanceKm: baseDistanceKm,
      durationMin: baseDurationMin * 1.1,
      co2Kg: saved(baseDistanceKm, "escooter"),
      type: "escooter",
      mapPreview: "escooter",
    },
  ];

  return routes;
}

module.exports = { calculateEcoRoutes };


