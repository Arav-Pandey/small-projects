import { useEffect, useState } from "react";
import { handleSearch, useWeather } from "./WeatherHandlers.tsx";
import SearchDisplay from "./SearchDisplay.tsx";
import { Link } from "react-router";
import WeatherLogo from "./WeatherLogo.tsx";
import useRouteHomePage from "../useRouteHomepage.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import useFetchUser from "../useFetchUser.tsx";
import Panel from "../HomePage/Panel.tsx";

export default function WeatherApp() {
  useRouteHomePage();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { user } = useAuth0();
  const whoami = useFetchUser(user);

  const [city, setCity] = useState(() => {
    return localStorage.getItem("weatherCity") || "San Diego";
  });
  const weather = useWeather(city); // ✅ fetch handled in hook

  useEffect(() => {
    localStorage.setItem("weatherCity", city);
  }, [city]);

  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  if (weather.status === "empty") {
    return <div>Please enter a city to fetch weather data.</div>;
  }
  if (weather.status === "loading") {
    return <div>Loading weather data...</div>;
  }
  if (weather.status === "error") {
    return <div>Error loading weather data: {String(weather.error)}</div>;
  }
  if (weather.status === "apiError") {
    return <div>API error: {weather.error}</div>;
  }

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
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <h1>Weather App</h1>
      <p style={{ marginBottom: "0px" }}>Request Used / Request Limit</p>
      <p style={{ marginTop: "5px" }}>
        {whoami?.user?.weatherRequestsUsed} /{" "}
        {whoami?.user?.weatherRequestLimit}
      </p>

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
        {weather.data?.data?.location?.name ?? ""},{" "}
        {weather.data?.data?.location?.region ?? ""},{" "}
        {weather.data?.data?.location?.country ?? ""}
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
        {links(`/weatherwind/${city}`, "white", "Wind/Gust speeds")}
      </div>

      <WeatherLogo icon={weather.data?.current?.condition?.icon} />
    </div>
  );
}
