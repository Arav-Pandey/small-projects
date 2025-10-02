import { useState } from "react";
import HomeLogo from "./HomeLogo";

export default function Calendar() {
  const [year, setYear] = useState<number>(2025); // Year is a number
  const [month, setMonth] = useState("January"); // Month is a string

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
      <HomeLogo />

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))} // force number
        />

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
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
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
        }}
      >
        {/*Empty sqaure colors and style*/}
        {daysArray.map((day, i) => (
          <div
            key={i}
            style={{
              padding: "8px",
              border: "1px solid #000000ff",
              minHeight: "40px",
              background: day ? "black" : "#000000ff",
            }}
          >
            {day ?? ""} {/*???*/}
          </div>
        ))}
      </div>
    </div>
  );
}
