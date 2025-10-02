import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todos2 from "./Calculator/Todos2.tsx";
import Todos3 from "./Todos3.tsx";
import Todos4 from "./Measure/Todos4.tsx";
import Todos5 from "./MoneyConverter/Todos5.tsx";
import Todos from "./Todos.tsx";
import Todos6 from "./Todos6.tsx";
import HomePage from "./HomePage.tsx";
import Weight from "./Weight.tsx";
import UnitConverter from "./UnitConverter";
import Jokes from "./Jokes.tsx";
import WeatherApp from "./WeatherApp/WeatherApp.tsx";
import Calendar from "./Calendar.tsx";
import SpeedConverter from "./SpeedConverter.tsx";
import Word from "./Word.tsx";
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
            <Route
              path="/length"
              element={
                <RequireAuth>
                  <Todos4 />
                </RequireAuth>
              }
            />
            <Route
              path="/temperature"
              element={
                <RequireAuth>
                  <Todos3 />
                </RequireAuth>
              }
            />
            <Route
              path="/money"
              element={
                <RequireAuth>
                  <Todos5 />
                </RequireAuth>
              }
            />

            <Route
              path="/calculator"
              element={
                <RequireAuth>
                  <Todos2 />
                </RequireAuth>
              }
            />
            <Route
              path="/todos"
              element={
                <RequireAuth>
                  <Todos />
                </RequireAuth>
              }
            />

            <Route
              path="/tictactoe"
              element={
                <RequireAuth>
                  <Todos6 />
                </RequireAuth>
              }
            />

            <Route
              path="/weight"
              element={
                <RequireAuth>
                  <Weight />
                </RequireAuth>
              }
            />

            <Route
              path="/jokes"
              element={
                <RequireAuth>
                  <Jokes />
                </RequireAuth>
              }
            />

            <Route
              path="/weatherapp"
              element={
                <RequireAuth>
                  <WeatherApp />
                </RequireAuth>
              }
            />

            <Route
              path="/calendar"
              element={
                <RequireAuth>
                  <Calendar />
                </RequireAuth>
              }
            />

            <Route
              path="/speed"
              element={
                <RequireAuth>
                  <SpeedConverter />
                </RequireAuth>
              }
            />

            <Route
              path="/word"
              element={
                <RequireAuth>
                  <Word />
                </RequireAuth>
              }
            />

            <Route
              path="/stopwatch"
              element={
                <RequireAuth>
                  <StopWatch />
                </RequireAuth>
              }
            />

            <Route
              path="/quotes"
              element={
                <RequireAuth>
                  <Quote />
                </RequireAuth>
              }
            />

            <Route
              path="/stocks"
              element={
                <RequireAuth>
                  <StockPrice />
                </RequireAuth>
              }
            />

            <Route
              path="/weathertemp/:city"
              element={
                <RequireAuth>
                  <WeatherTemp />
                </RequireAuth>
              }
            />

            <Route
              path="/weatherastro/:city"
              element={
                <RequireAuth>
                  <WeatherAstro />
                </RequireAuth>
              }
            />

            <Route
              path="/weathervis/:city"
              element={
                <RequireAuth>
                  <WeatherVis />
                </RequireAuth>
              }
            />

            <Route
              path="/weatherprecip/:city"
              element={
                <RequireAuth>
                  <WeatherPrecip />
                </RequireAuth>
              }
            />

            <Route
              path="/weatherwind/:city"
              element={
                <RequireAuth>
                  <WeatherWind />
                </RequireAuth>
              }
            />

            <Route
              path="/timer"
              element={
                <RequireAuth>
                  <Timer />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>
);
