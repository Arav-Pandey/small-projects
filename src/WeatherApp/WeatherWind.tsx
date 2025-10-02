import { useParams } from "react-router";
import { useWeather } from "./WeatherHandlers";
import WeatherLogo from "./WeatherLogo.tsx";
import BackButton from "./backButton.tsx";

export default function WeatherWind() {
  const { city } = useParams<{ city: string }>();
  const weather = useWeather(city ?? "San Diego");
  const w = weather.data?.data;

  const windDirectionMap: Record<string, string> = {
    N: "North",
    NNE: "North-Northeast",
    NE: "Northeast",
    ENE: "East-Northeast",
    E: "East",
    ESE: "East-Southeast",
    SE: "Southeast",
    SSE: "South-Southeast",
    S: "South",
    SSW: "South-Southwest",
    SW: "Southwest",
    WSW: "West-Southwest",
    W: "West",
    WNW: "West-Northwest",
    NW: "Northwest",
    NNW: "North-Northwest",
  };

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
            <WeatherLogo icon={w.current?.condition?.icon} />
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
              width: "470px", // ✅ fixed manageable width
              gap: "6px", // ✅ space between rows
              lineHeight: "1.4",
            }}
          >
            <p>Local Time Estimate: {w.location.localtime}</p>
            <p>Last Updated: {w.current.last_updated}</p>
            <p>
              Wind speed: {w.current.wind_mph} mph / {w.current.wind_kph} kph
            </p>
            <p>
              🌬 The wind is blowing from:{" "}
              {windDirectionMap[w.current.wind_dir] || "Unknown"}
            </p>
            <p>
              Gust speed: {w.current.gust_mph} mph / {w.current.gust_kph} kph
            </p>
          </div>
          <WeatherLogo icon={w.current?.condition?.icon} />
        </div>
      )}
    </div>
  );
}
