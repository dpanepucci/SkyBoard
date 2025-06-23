import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); // Add this line

const router = express.Router();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Add logging to verify
console.log('Weather route - API Key length:', WEATHER_API_KEY?.length);

// GET City
router.get('/', async (req: any, res: any) => {
  const { city, country } = req.query;
  if (!city) return res.status(400).json({ error: 'Missing city' });

  // 1. Geocode city to get lat/lon
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}${country ? ',' + country : ''}&limit=1&appid=${WEATHER_API_KEY}`;
  
  try {
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json() as Array<{ lat: number; lon: number }>;
    if (!geoData[0]) return res.status(404).json({ error: 'City not found' });

    const { lat, lon } = geoData[0];

    // 2. Fetch current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;
    
    // 3. Fetch 5-day forecast (includes rain probability)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    // Combine both responses
    res.json({
      current: weatherData,
      forecast: forecastData
    });
    
  } catch (err) {
    console.error('Weather fetch failed:', err);
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

export default router;