import { WiHumidity, WiThermometer } from "react-icons/wi";
import { useWeather } from "./WeatherHandlers.tsx";
import { TbArrowBackUp } from "react-icons/tb";
import { useParams } from "react-router";
import WeatherLogo from "./WeatherLogo.tsx";

export default function WeatherTemp() {
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
            🌡 Current Temperature: {weather.data.current.temp_f}°F /{" "}
            {weather.data.current.temp_c}°C
          </p>
          <p>
            🌡 Max Temp: {weather.data.forecast.forecastday[0].day.maxtemp_f}°F /{" "}
            {weather.data.forecast.forecastday[0].day.maxtemp_c}°C
          </p>
          <p>
            🌡 Min Temp: {weather.data.forecast.forecastday[0].day.mintemp_f}°F /{" "}
            {weather.data.forecast.forecastday[0].day.mintemp_c}°C
          </p>
          <p>🌥 Condition: {weather.data.current.condition.text}</p>
          <p>
            <WiThermometer size={24} /> Feels like:{" "}
            {weather.data.current.feelslike_f}°F /{" "}
            {weather.data.current.feelslike_c}°C
          </p>
          <p>
            <WiHumidity size={24} /> Humidity: {weather.data.current.humidity}%
          </p>
          <p>
            💧 Chance of Rain:{" "}
            {weather.data.forecast.forecastday[0].day.daily_chance_of_rain}%
          </p>
          <WeatherLogo icon={weather.data?.current?.condition?.icon} />
        </div>
      )}
    </div>
  );
}
