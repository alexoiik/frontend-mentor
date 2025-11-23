import { useEffect, useState } from "react";
// Importing Components.
import Navbar from "./components/Navbar";
// eslint-disable-next-line
import Loading from "./components/Loading";
import Error from "./components/Error";
import MainWeatherCard from "./components/MainWeatherCard";
import WeatherInfoCards from "./components/WeatherInfoCards";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationName, setLocationName] = useState("Berlin, Germany");
  const [formattedDate, setFormattedDate] = useState("");
  const [units, setUnits] = useState({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const fetchWeather = async (query = search) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(false);

    try {
      // 1. Fetch coordinates from Open-Meteo Geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`
      );

      if (!geoRes.ok) throw new Error("Geo API error");
      const geoData = await geoRes.json();

      // If location not found
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Location not found");
      }

      const place = geoData.results[0];
      const lat = place.latitude;
      const lon = place.longitude;

      // 2. Fetch weather with daily parameters
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`
      );

      if (!weatherRes.ok) throw new Error("Weather API error");

      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      // Correct location name (from geocoding)
      setLocationName(`${place.name}, ${place.country}`);

      // Format today’s date
      const options = {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      setFormattedDate(new Date().toLocaleDateString("en-US", options));

    } catch (err) {
      console.error(err);
      setError(true);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Run only on first load. 
  useEffect(() => {
    fetchWeather("Berlin");
    // eslint-disable-next-line
  }, []);

  // Error UI.
  if (error) {
    return <Error fetchWeather={() => fetchWeather("Berlin")} />;
  }

  // Loading UI. 
  if (loading) {
    // return <Loading />;
    return null;
  }

  return (
    <div className="min-h-screen bg-[#061630] text-white p-6 flex flex-col items-center justify-center text-center">
      {/* Navbar */}
      <Navbar
        units={units}
        setUnits={setUnits}
      />

      {/* Header */}
      <h1 className="text-5xl font-semibold mb-10 mt-[100px] leading-tight">
        How's the sky looking today?
      </h1>

      {/* Searchbar */}
      <div className="mb-2 flex flex-col md:flex-row items-center md:items-stretch gap-4 md:gap-4">
        {/* Input wrapper */}
        <div className="relative w-full md:w-auto flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
            placeholder="Search for a place..."
            className="w-full md:w-[500px] max-w-3xl pl-12 pr-3 py-3 rounded-xl text-white outline-none bg-[#25253f] placeholder-[#c6c5d6] transition"
          />

          {/* Search Icon */}
          <img
            src="/assets/images/icon-search.svg"
            alt="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={() => fetchWeather(search)}
          className="w-full md:w-auto bg-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl mt-10 gap-5">
        <div className="flex flex-col flex-1 items-end">
          {/* Main Weather Card */}
          <MainWeatherCard
            locationName={locationName}
            formattedDate={formattedDate}
            weather={weather}
            units={units}
          />

          {/* Weather Info Cards */}
          <WeatherInfoCards weather={weather} units={units} />

          {/* Daily Forecast */}
          <DailyForecast daily={weather.daily || null} units={units} />
        </div>

        <div className="flex-1 w-full items-end">
          <HourlyForecast hourly={weather.hourly || null} units={units} />
        </div>
      </div>
    </div>
  );
}

export default App;
