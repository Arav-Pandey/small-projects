import { useParams } from "react-router";
import { useWeather } from "./WeatherHandlers";
import WeatherLogo from "./WeatherLogo.tsx";
import BackButton from "./backButton.tsx";

export default function WeatherVis() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const { city } = useParams<{ city: string }>();
  const weather = useWeather(city ?? "San Diego");

  return (
    <div>
      {weather.status === "empty" && <p>Enter a city to see the weather.</p>}
      {weather.status === "loading" && <p>Loading...</p>}
      {weather.status === "error" && <p>Error fetching weather</p>}
      {weather.status === "apiError" && <p>{weather.error.message}</p>}

      {weather.status === "success" && (
        <div>
          <h2>
            {weather.data.location.name}, {weather.data.location.region},{" "}
            {weather.data.location.country}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BackButton />
            <WeatherLogo icon={weather.data?.current?.condition?.icon} />
          </div>
          <div
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.15)", // ✨ translucent card
              padding: "12px 20px",
              borderRadius: "14px",
              color: "white",
              fontWeight: "500",
              fontSize: "20px", // ✅ smaller font
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              transition: "transform 0.2s, background 0.2s",
              margin: "15px auto",
              width: "400px", // ✅ fixed manageable width
              gap: "6px", // ✅ space between rows
              lineHeight: "1.4",
            }}
          >
            <p>Local Time Estimate: {weather.data.location.localtime}</p>
            <p>Last Updated: {weather.data.current.last_updated}</p>
            <p>
              👀 Visibility distance in miles: {weather.data.current.vis_miles}
            </p>
            <p>
              👀 Visibility distance in kilometers:{" "}
              {weather.data.current.vis_km}
            </p>
            <p>
              ☀️ UV rays:{" "}
              {weather.data.current.uv <= 2
                ? "Low risk"
                : weather.data.current.uv <= 5
                ? "Moderate risk"
                : weather.data.current.uv <= 7
                ? "High risk"
                : weather.data.current.uv <= 10
                ? "Very high risk"
                : "Extreme risk"}
            </p>
            <p>
              Dew Point: {weather.data.current.dewpoint_f}°F /{" "}
              {weather.data.current.dewpoint_c}°C
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
