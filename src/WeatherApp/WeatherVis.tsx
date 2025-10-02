import { useParams } from "react-router";
import { useWeather } from "./WeatherHandlers";
import WeatherLogo from "./WeatherLogo.tsx";
import BackButton from "./backButton.tsx";

export default function WeatherVis() {
  const { city } = useParams<{ city: string }>();
  const weather = useWeather(city ?? "San Diego");
  const w = weather.data?.data;

  return (
    <div>
      {weather.status === "empty" && <p>Enter a city to see the weather.</p>}
      {weather.status === "loading" && <p>Loading...</p>}
      {weather.status === "error" && <p>Error fetching weather</p>}
      {weather.status === "apiError" && <p>{weather.error.message}</p>}

      {weather.status === "success" && (
        <div>
          <h2>
            {w.location.name}, {w.location.region}, {w.location.country}
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
            <p>Local Time Estimate: {w.location.localtime}</p>
            <p>Last Updated: {w.current.last_updated}</p>
            <p>👀 Visibility distance in miles: {w.current.vis_miles}</p>
            <p>👀 Visibility distance in kilometers: {w.current.vis_km}</p>
            <p>
              ☀️ UV rays:{" "}
              {w.current.uv <= 2
                ? "Low risk"
                : w.current.uv <= 5
                ? "Moderate risk"
                : w.current.uv <= 7
                ? "High risk"
                : w.current.uv <= 10
                ? "Very high risk"
                : "Extreme risk"}
            </p>
            <p>
              Dew Point: {w.current.dewpoint_f}°F / {w.current.dewpoint_c}°C
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
