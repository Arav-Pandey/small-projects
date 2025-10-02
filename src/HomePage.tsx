import {
  FaSignOutAlt,
  FaLaughSquint,
  FaCalendarAlt,
  FaFileWord,
} from "react-icons/fa";
import { SiConvertio, SiTheweatherchannel } from "react-icons/si";
import { FcCalculator } from "react-icons/fc";
import { FaListCheck } from "react-icons/fa6";
import { GiTicTacToe } from "react-icons/gi";
import { FaStopwatch } from "react-icons/fa6";
import { LuMessageSquareQuote } from "react-icons/lu";
import { AiOutlineStock } from "react-icons/ai";

export default function HomePage() {
  function NavLink(href: string, Icon: React.ElementType, label: string) {
    return (
      <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Icon size={20} />
          <span style={{ fontSize: "18px", marginLeft: "5px" }}>{label}</span>
        </div>
      </a>
    );
  }

  return (
    <div className="HomePage">
      <h1>Choose what program</h1>
      <h1>You want to run</h1>
      <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt size={40} />
          <span style={{ fontSize: "18px" }}>Sign Out</span>
        </div>
      </a>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul>
          {NavLink("/unitconverter", SiConvertio, "Unit Converter")}
          {NavLink("/calculator", FcCalculator, "Calculator")}
          {NavLink("/todos", FaListCheck, "To-Do List")}
          {NavLink("/tictactoe", GiTicTacToe, "Tic-Tac-Toe")}
          {NavLink("/jokes", FaLaughSquint, "Jokes Page")}
          {NavLink("/weatherapp", SiTheweatherchannel, "Weather App")}
          {NavLink("/calendar", FaCalendarAlt, "Calendar")}
          {NavLink("/word", FaFileWord, "Word Counter")}
          {NavLink("/stopwatch", FaStopwatch, "Stop Watch")}
          {NavLink("/quotes", LuMessageSquareQuote, "Motivational Quotes")}
          {NavLink("/stocks", AiOutlineStock, "Stock Prices")}
          {NavLink("/timer", FaStopwatch, "Timer")}
        </ul>
      </div>
    </div>
  );
}
