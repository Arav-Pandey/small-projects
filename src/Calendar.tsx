import { useState } from "react";
import useRouteHomepage from "./useRouteHomepage";
import Panel from "./HomePage/Panel";

export default function Calendar() {
  const [year, setYear] = useState<number>(new Date().getFullYear()); // Year is a number
  const [month, setMonth] = useState("January"); // Month is a string
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomepage();

  const months = [
    // The months
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = months.indexOf(month); // 0–11

  // Number of days in the month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Day of the week the month starts on (0 = Sunday, 6 = Saturday)
  const firstDay = new Date(year, monthIndex, 1).getDay();

  // Create array of days (with padding before start) ????
  const daysArray = [
    ...Array(firstDay).fill(null), // empty slots before first day ???
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1), // ???
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Calendar</h1>
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <input
          type="number"
          value={year}
          style={{ borderRadius: "7px" }}
          onChange={(e) => setYear(Number(e.target.value))} // force number
        />

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ borderRadius: "7px", background: "black", color: "white" }}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Weekday labels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={d + i}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          borderRadius: "7px",
          background: "rgba(255, 255, 255, 0.15)",
        }}
      >
        {/*Empty sqaure colors and style*/}
        {daysArray.map((day, i) => (
          <div
            key={i}
            style={{
              padding: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              borderRadius: "7px",
              minHeight: "40px",
              background: "rgba(255, 255, 255, 0.15)",
            }}
          >
            {day ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
