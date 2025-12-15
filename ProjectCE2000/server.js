// server.js - CE2000 weather app backend

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

// allow Node-style __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup (templating)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// ---------- PAGE ROUTES (templated) ----------

// home page
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Weather Dashboard",
    defaultCity: "Aberdeen"
  });
});

// about page
app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About This App"
  });
});

// ---------- API ROUTE (server-side web service usage) ----------

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  if (!API_KEY) {
    return res.status(500).json({
      error: "API key is not configured on the server."
    });
  }

  if (!city || !city.trim()) {
    return res.status(400).json({ error: "City is required." });
  }

  try {
    const endpoint = new URL("https://api.openweathermap.org/data/2.5/weather");
    endpoint.searchParams.set("q", city);
    endpoint.searchParams.set("appid", API_KEY);
    endpoint.searchParams.set("units", "metric");

    const response = await fetch(endpoint);
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Unable to fetch weather for "${city}".`
      });
    }

    const data = await response.json();

    const payload = {
      name: data.name,
      country: data.sys?.country,
      temp: data.main?.temp,
      feelsLike: data.main?.feels_like,
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      description: data.weather?.[0]?.description,
      main: data.weather?.[0]?.main,
      icon: data.weather?.[0]?.icon,
      timestamp: data.dt * 1000
    };

    res.json(payload);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error while contacting weather service."
    });
  }
});

// ---------- 404 route (templated) ----------
app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    url: req.originalUrl
  });
});

// ---------- START SERVER ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
