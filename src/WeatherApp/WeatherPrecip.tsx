import { TbArrowBackUp } from "react-icons/tb";
import WeatherLogo from "./WeatherLogo.tsx";
import { useParams } from "react-router";
import { useWeather } from "./WeatherHandlers";

export default function WeatherPrecip() {
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
          <a
            href="/weatherapp"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TbArrowBackUp size={40} />
              <span style={{ fontSize: "18px" }}>Back</span>
            </div>
          </a>
          <p>Local Time Estimate: {weather.data.location.localtime}</p>
          <p>Last Updated: {weather.data.current.last_updated}</p>
          <p>
            💧 Chance of Rain:{" "}
            {weather.data.forecast.forecastday[0].day.daily_chance_of_rain}%
          </p>
          <p>
            Precipitation: {weather.data.current.precip_in} in. /{" "}
            {weather.data.current.precip_mm} mm.
          </p>
          <p>
            Chance of snow:{" "}
            {weather.data.forecast.forecastday[0].hour[0].chance_of_snow}%
          </p>
          <p>
            How much it snowed:{" "}
            {weather.data.forecast.forecastday[0].hour[0].snow_cm} cm.
          </p>
          <WeatherLogo icon={weather.data?.current?.condition?.icon} />
        </div>
      )}
    </div>
  );
}
