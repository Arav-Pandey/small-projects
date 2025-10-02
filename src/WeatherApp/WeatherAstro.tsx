import { useParams } from "react-router";
import { useWeather } from "./WeatherHandlers";
import { TbArrowBackUp } from "react-icons/tb";
import WeatherLogo from "./WeatherLogo";
import BackButton from "./backButton";

export default function DisplayAstro() {
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
              fontSize: "16px", // ✅ smaller font
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              transition: "transform 0.2s, background 0.2s",
              margin: "15px auto",
              width: "400px", // ✅ fixed manageable width
              gap: "6px", // ✅ space between rows
              lineHeight: "1.4",
            }}
          >
            <div style={{ fontSize: "20px" }}>
              <p>Local Time Estimate: {weather.data.location.localtime}</p>
              <p>Last Updated: {weather.data.current.last_updated}</p>
              <p>
                🌅 Sunrise: {weather.data.forecast.forecastday[0].astro.sunrise}
              </p>
              <p>
                🌅 Is the sun above the horizon:{" "}
                {weather.data.current.is_day === 1 ? "True" : "False"}
              </p>
              <p>
                🌇 Sunset: {weather.data.forecast.forecastday[0].astro.sunset}
              </p>
              <p>
                🌙 Moonrise:{" "}
                {weather.data.forecast.forecastday[0].astro.moonrise}
              </p>
              <p>
                🌑 Moonset: {weather.data.forecast.forecastday[0].astro.moonset}
              </p>
              <p>
                🌑 Is the moon above the horizon:{" "}
                {weather.data.forecast.forecastday[0].astro.is_moon_up == 0
                  ? "False"
                  : "True"}
              </p>
              <p>
                🌑 Moon Phase:{" "}
                {weather.data.forecast.forecastday[0].astro.moon_phase}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
