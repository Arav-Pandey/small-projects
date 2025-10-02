import { useEffect, useState } from "react";
import { FcHome } from "react-icons/fc";
import { handleSearch, useWeather } from "./WeatherHandlers.tsx";
import SearchDisplay from "./SearchDisplay.tsx";
import { Link } from "react-router";
import WeatherLogo from "./WeatherLogo.tsx";
import HomeLogo from "../HomeLogo.tsx";

export default function WeatherApp() {
  const [city, setCity] = useState(() => {
    // ✅ Initialize from localStorage or fallback
    return localStorage.getItem("weatherCity") || "San Diego";
  });
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const weather = useWeather(city); // ✅ fetch handled in hook

  function links(href: string, color: string, name: string) {
    return (
      <Link
        to={href}
        className="nav-link"
        style={{ fontSize: "25px", marginBottom: "10px", color }}
      >
        {name}
      </Link>
    );
  }

  useEffect(() => {
    localStorage.setItem("weatherCity", city);
  }, [city]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh", // ✅ grows with content
      }}
    >
      <h1>Weather App</h1>

      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search for city..."
          onChange={(e) => handleSearch(e, setSearchResults)}
          style={{
            fontSize: "16px",
            padding: "8px",
            marginBottom: "10px",
            width: "200px",
            borderRadius: "10px",
          }}
        />

        <SearchDisplay
          searchResults={searchResults}
          setCity={setCity}
          setSearchResults={setSearchResults}
        />
      </div>

      <h2>
        {weather.data?.location?.name}, {weather.data?.location?.region},{" "}
        {weather.data?.location?.country}
      </h2>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {links(`/weathertemp/${city}`, "orange", "Temperature")}
        {links(`/weatherastro/${city}`, "grey", "Astronomy")}
        {links(`/weathervis/${city}`, "red", "Visual/Dewpoint")}
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {links(`/weatherprecip/${city}`, "blue", "Precipitation/Pressure/Snow")}
        {links(`/weatherwind/${city}`, "grey", "Wind/Gust speeds")}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <HomeLogo />
        <WeatherLogo icon={weather.data?.current?.condition?.icon} />
      </div>
    </div>
  );
}
