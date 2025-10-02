import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Login/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calculator from "./Calculator/Calculator.tsx";
import Temp from "./Temp.tsx";
import Measure from "./Measure/Measure.tsx";
import Money from "./MoneyConverter/Money.tsx";
import ToDo from "./ToDo/ToDo.tsx";
import TicTacToe from "./TicTacToe.tsx";
import HomePage from "./HomePage/HomePage.tsx";
import Weight from "./Weight.tsx";
import UnitConverter from "./UnitConverter";
import Jokes from "./Jokes.tsx";
import WeatherApp from "./WeatherApp/WeatherApp.tsx";
import Calendar from "./Calendar.tsx";
import SpeedConverter from "./SpeedConverter.tsx";
import Word from "./Word/Word.tsx";
import StopWatch from "./StopWatch/StopWatch.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quote from "./Quote/Quote.tsx";
import StockPrice from "./Stock/StockPrice.tsx";
import WeatherTemp from "./WeatherApp/WeatherTemp.tsx";
import WeatherAstro from "./WeatherApp/WeatherAstro.tsx";
import WeatherVis from "./WeatherApp/WeatherVis.tsx";
import WeatherPrecip from "./WeatherApp/WeatherPrecip.tsx";
import WeatherWind from "./WeatherApp/WeatherWind.tsx";
import Timer from "./Timer/Timer.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import RequireAuth from "./RequireAuth.tsx";
import Memory from "./MemoryGame/Memory.tsx";
import Notes from "./Notes/Notes.tsx";
import { DarkModeContextProvider } from "./HomePage/DarkMode.tsx";

const queryClient = new QueryClient();

const makeRouteAuth = (Place: React.FC, route: string) => {
  return (
    <Route
      path={`/${route}`}
      element={
        <RequireAuth>
          <Place />
        </RequireAuth>
      }
    />
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeContextProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
        useRefreshTokens={true}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/unitconverter" element={<UnitConverter />} />

              {/* Protected Routes */}
              {makeRouteAuth(Measure, "length")}
              {makeRouteAuth(Temp, "temperature")}
              {makeRouteAuth(Money, "money")}
              {makeRouteAuth(Calculator, "calculator")}
              {makeRouteAuth(ToDo, "todos")}
              {makeRouteAuth(TicTacToe, "tictactoe")}
              {makeRouteAuth(Weight, "weight")}
              {makeRouteAuth(Jokes, "jokes")}
              {makeRouteAuth(WeatherApp, "weatherapp")}
              {makeRouteAuth(Calendar, "calendar")}
              {makeRouteAuth(SpeedConverter, "speed")}
              {makeRouteAuth(Word, "word")}
              {makeRouteAuth(StopWatch, "stopwatch")}
              {makeRouteAuth(Quote, "quotes")}
              {makeRouteAuth(StockPrice, "stocks")}
              {makeRouteAuth(WeatherTemp, "weathertemp/:city")}
              {makeRouteAuth(WeatherAstro, "weatherastro/:city")}
              {makeRouteAuth(WeatherVis, "weathervis/:city")}
              {makeRouteAuth(WeatherPrecip, "weatherprecip/:city")}
              {makeRouteAuth(WeatherWind, "weatherwind/:city")}
              {makeRouteAuth(Timer, "timer")}
              {makeRouteAuth(Memory, "/memory")}
              {makeRouteAuth(Notes, "/notes")}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Auth0Provider>
    </DarkModeContextProvider>
  </StrictMode>
);
