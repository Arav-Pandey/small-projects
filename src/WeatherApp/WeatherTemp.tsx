import { WiHumidity, WiThermometer } from "react-icons/wi";
import { useWeather } from "./WeatherHandlers.tsx";
import { TbArrowBackUp } from "react-icons/tb";
import { useParams } from "react-router";
import WeatherLogo from "./WeatherLogo.tsx";
import BackButton from "./backButton.tsx";

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
              width: "300px", // ✅ fixed manageable width
              gap: "6px", // ✅ space between rows
              lineHeight: "1.4",
            }}
          >
            <p>
              <strong>🕐 Local Time:</strong> {weather.data.location.localtime}
            </p>
            <p>
              <strong>🔄 Last Updated:</strong>{" "}
              {weather.data.current.last_updated}
            </p>
            <p>
              🌡 <strong>Current:</strong> {weather.data.current.temp_f}°F /{" "}
              {weather.data.current.temp_c}°C
            </p>
            <p>
              🔺 <strong>Max:</strong>{" "}
              {weather.data.forecast.forecastday[0].day.maxtemp_f}°F /{" "}
              {weather.data.forecast.forecastday[0].day.maxtemp_c}°C
            </p>
            <p>
              🔻 <strong>Min:</strong>{" "}
              {weather.data.forecast.forecastday[0].day.mintemp_f}°F /{" "}
              {weather.data.forecast.forecastday[0].day.mintemp_c}°C
            </p>
            <p>
              🌥 <strong>Condition:</strong>{" "}
              {weather.data.current.condition.text}
            </p>
            <p>
              <WiThermometer size={20} /> Feels Like:{" "}
              {weather.data.current.feelslike_f}°F /{" "}
              {weather.data.current.feelslike_c}°C
            </p>
            <p>
              <WiHumidity size={20} /> Humidity: {weather.data.current.humidity}
              %
            </p>
            <p>
              💧 Chance of Rain:{" "}
              {weather.data.forecast.forecastday[0].day.daily_chance_of_rain}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
