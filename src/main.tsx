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
import Register from "./Register.tsx";
import ForgotPasscode from "./ForgotPasscode.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/length" element={<Todos4 />} />
          <Route path="/temperature" element={<Todos3 />} />
          <Route path="/money" element={<Todos5 />} />
          <Route path="/calculator" element={<Todos2 />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/tictactoe" element={<Todos6 />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/weight" element={<Weight />} />
          <Route path="/unitconverter" element={<UnitConverter />} />
          <Route path="/jokes" element={<Jokes />} />
          <Route path="/weatherapp" element={<WeatherApp />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/speed" element={<SpeedConverter />} />
          <Route path="/word" element={<Word />} />
          <Route path="/stopwatch" element={<StopWatch />} />
          <Route path="/quotes" element={<Quote />} />
          <Route path="/stocks" element={<StockPrice />} />
          <Route path="/weathertemp/:city" element={<WeatherTemp />} />
          <Route path="/weatherastro/:city" element={<WeatherAstro />} />
          <Route path="/weathervis/:city" element={<WeatherVis />} />
          <Route path="/weatherprecip/:city" element={<WeatherPrecip />} />
          <Route path="/weatherwind/:city" element={<WeatherWind />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPasscode />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
