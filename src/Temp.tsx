import { useState, useEffect } from "react";
import useRouteHomePage from "./useRouteHomepage";
import Panel from "./HomePage/Panel";

export default function Temp() {
  const [num1, setNum1] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [fromTemp, setFromTemp] = useState("Fahrenheit");
  const [toTemp, setToTemp] = useState("Celsius");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

  useEffect(() => {
    convert();
  }, [num1, fromTemp, toTemp]);

  const convert = () => {
    const a = parseFloat(num1);
    if (isNaN(a)) {
      setResult(NaN);
      return;
    }

    if (fromTemp === "Celsius" && toTemp === "Fahrenheit")
      setResult(a * (9 / 5) + 32);
    else if (fromTemp === "Fahrenheit" && toTemp === "Celsius")
      setResult((a - 32) * (5 / 9));
    else if (fromTemp === "Fahrenheit" && toTemp === "Kelvin")
      setResult(((a - 32) * 5) / 9 + 273.15);
    else if (fromTemp === "Kelvin" && toTemp === "Fahrenheit")
      setResult(((a - 273.15) * 9) / 5 + 32);
    else if (fromTemp == toTemp) setResult(a);
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
      <h1 style={{ marginBottom: "5%" }}>Temperature Converter</h1>

      <div style={{ marginBottom: "2%", textAlign: "center" }}>
        <div style={{ marginBottom: "2%" }}>
          <input
            type="number"
            value={num1}
            placeholder="Amount"
            onChange={(e) => setNum1(e.target.value)}
            style={{
              borderRadius: "4px",
              padding: "6px 10px",
              outline: "none",
            }}
          />
        </div>

        <div>
          <select
            value={fromTemp}
            onChange={(e) => setFromTemp(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginRight: "10px",
              borderRadius: "7px",
            }}
          >
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Celsius">Celsius</option>
            <option value="Kelvin">Kelvin</option>
          </select>
          <select
            value={toTemp}
            onChange={(e) => setToTemp(e.target.value)}
            style={{ padding: "10px", fontSize: "16px", borderRadius: "7px" }}
          >
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Celsius">Celsius</option>
            <option value="Kelvin">Kelvin</option>
          </select>
        </div>
      </div>

      <div>
        <strong>
          Result: {num1} {fromTemp} ={" "}
        </strong>
        {result !== null
          ? isNaN(result)
            ? "Invalid input"
            : `${result.toFixed(2)} ${toTemp}`
          : "-"}
      </div>
    </div>
  );
}
