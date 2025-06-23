import { useState } from 'react';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(
        `http://localhost:3001/api/weather?city=${encodeURIComponent(city)}${country ? `&country=${country}` : ''}`
      );
      if (!res.ok) throw new Error('City not found or server error');
      const data = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country code (optional)"
          value={country}
          onChange={e => setCountry(e.target.value)}
          style={{ marginLeft: 8 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && weather.weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°F</p>
        </div>
      )}
      {weather && weather.forecast && (
        <div style={{ marginTop: 20 }}>
          <h4>5-Day Forecast</h4>
          {weather.forecast.list.slice(0, 5).map((item: any, index: number) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <p>
                <strong>{new Date(item.dt * 1000).toLocaleDateString()}</strong>
              </p>
              <p>Temp: {item.main.temp}°F</p>
              <p>Rain Chance: {(item.pop * 100).toFixed(0)}%</p>
              <p>{item.weather[0].description}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;