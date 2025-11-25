const express = require("express");
const router = express.Router();
const { getEcoRoutes } = require("../controllers/routes.controller");

// POST /api/routes
router.post("/", async (req, res) => {
  try {
    const { origin, destination, mode, preferences } = req.body;

    // simple validation
    if (!origin || !destination) {
      return res.status(400).json({ error: "origin and destination are required" });
    }

    const routes = await getEcoRoutes({ origin, destination, mode, preferences });

    res.json({ routes });
  } catch (err) {
    console.error("Error in /api/routes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/routes - convenience endpoint for browser/testing
// Example: /api/routes?origin=A&destination=B&mode=driving
router.get("/", async (req, res) => {
  try {
    const { origin, destination, mode } = req.query;

    // preferences may be passed as JSON-encoded query param
    let preferences = {};
    if (req.query.preferences) {
      try {
        preferences = JSON.parse(String(req.query.preferences));
      } catch (e) {
        // ignore invalid JSON and use empty preferences
      }
    }

    // If origin/destination are missing, fall back to demo defaults so the endpoint
    // is usable from a browser without query params.
    const originVal = origin ? String(origin) : "City Center";
    const destinationVal = destination ? String(destination) : "University Campus";

    const routes = await getEcoRoutes({ origin: originVal, destination: destinationVal, mode: String(mode || "driving"), preferences });

    res.json({ routes });
  } catch (err) {
    console.error("Error in GET /api/routes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
