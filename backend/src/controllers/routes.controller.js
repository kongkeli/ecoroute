const { calculateEcoRoutes } = require("../services/routes.services");

async function getEcoRoutes(params) {
  // εδώ μπορείς αργότερα να βάλεις auth, logging κτλ
  return calculateEcoRoutes(params);
}

module.exports = { getEcoRoutes };
