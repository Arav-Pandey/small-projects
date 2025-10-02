import { useState, useEffect } from "react";
import useRouteHomePage from "./useRouteHomepage";
import Panel from "./HomePage/Panel";

export default function SpeedConverter() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState(0);
  const [fromSpeed, setFromSpeed] = useState("mph");
  const [toSpeed, setToSpeed] = useState("mph");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

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
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <h1 style={{ marginBottom: "2px" }}>Speed Converter</h1>

      <input
        onChange={(e) => setNum(e.target.value)}
        type="number"
        value={num}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />

      <div style={{ marginBottom: "10px" }}>
        <select
          onChange={(e) => setFromSpeed(e.target.value)}
          style={{
            marginTop: "10px",
            marginRight: "10px",
            borderRadius: "7px",
            fontSize: "15px",
          }}
        >
          <option value="mph">Miles per hour</option>
          <option value="kph">Kilometers per hour</option>
        </select>
        <select
          onChange={(e) => setToSpeed(e.target.value)}
          style={{
            marginTop: "10px",
            marginRight: "10px",
            borderRadius: "7px",
            fontSize: "15px",
          }}
        >
          <option value="mph">Miles per hour</option>
          <option value="kph">Kilometers per hour</option>
        </select>
      </div>

      <div style={{ fontSize: "25px" }}>
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
