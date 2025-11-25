const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "EcoRoute backend is running" });
});


// use modular router for /api/routes
const routesRouter = require("./routes/routes");
app.use("/api/routes", routesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`EcoRoute backend listening on port ${PORT}`);
});
