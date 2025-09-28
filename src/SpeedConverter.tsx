import { useState, useEffect } from "react";
import { FcHome } from "react-icons/fc";
import HomeLogo from "./HomeLogo";

export default function SpeedConverter() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState(0);
  const [fromSpeed, setFromSpeed] = useState("mph");
  const [toSpeed, setToSpeed] = useState("mph");

  useEffect(() => {
    convert();
  }, [num, fromSpeed, toSpeed]);

  const convert = () => {
    const number = Number(num);
    if (isNaN(number)) {
      setResult(NaN);
      return;
    }

    if (fromSpeed === "mph" && toSpeed === "kph") {
      setResult(number * 1.60934);
    } else if (fromSpeed === "kph" && toSpeed === "mph") {
      setResult(number * 0.621371);
    } else if (fromSpeed == toSpeed) {
      setResult(number);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Speed Converter</h1>

      <HomeLogo />

      <input
        onChange={(e) => setNum(e.target.value)}
        type="number"
        value={num}
      />

      <div>
        <select
          onChange={(e) => setFromSpeed(e.target.value)}
          style={{
            marginTop: "10px",
            marginRight: "10px",
          }}
        >
          <option value="mph">Miles per hour</option>
          <option value="kph">Kilometers per hour</option>
        </select>
        <select onChange={(e) => setToSpeed(e.target.value)}>
          <option value="mph">Miles per hour</option>
          <option value="kph">Kilometers per hour</option>
        </select>
      </div>

      <div>
        <strong>
          Result: {num} {fromSpeed} ={" "}
        </strong>
        {result !== null
          ? isNaN(result)
            ? "Invalid input"
            : `${result.toFixed(2)} ${toSpeed}`
          : "-"}
      </div>
    </div>
  );
}
