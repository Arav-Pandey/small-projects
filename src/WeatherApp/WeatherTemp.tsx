import { WiHumidity, WiThermometer } from "react-icons/wi";
import { useWeather } from "./WeatherHandlers.tsx";
import { useParams } from "react-router";
import WeatherLogo from "./WeatherLogo.tsx";
import BackButton from "./backButton.tsx";

export default function WeatherTemp() {
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
              width: "300px", // ✅ fixed manageable width
              gap: "6px", // ✅ space between rows
              lineHeight: "1.4",
            }}
          >
            <p>
              <strong>🕐 Local Time:</strong> {w.location.localtime}
            </p>
            <p>
              <strong>🔄 Last Updated:</strong> {w.current.last_updated}
            </p>
            <p>
              🌡 <strong>Current:</strong> {w.current.temp_f}°F /{" "}
              {w.current.temp_c}°C
            </p>
            <p>
              🔺 <strong>Max:</strong> {w.forecast.forecastday[0].day.maxtemp_f}
              °F / {w.forecast.forecastday[0].day.maxtemp_c}°C
            </p>
            <p>
              🔻 <strong>Min:</strong> {w.forecast.forecastday[0].day.mintemp_f}
              °F / {w.forecast.forecastday[0].day.mintemp_c}°C
            </p>
            <p>
              🌥 <strong>Condition:</strong> {w.current.condition.text}
            </p>
            <p>
              <WiThermometer size={20} /> Feels Like: {w.current.feelslike_f}°F
              / {w.current.feelslike_c}°C
            </p>
            <p>
              <WiHumidity size={20} /> Humidity: {w.current.humidity}%
            </p>
            <p>
              💧 Chance of Rain:{" "}
              {w.forecast.forecastday[0].day.daily_chance_of_rain}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
