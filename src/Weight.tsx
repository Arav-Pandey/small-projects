import { useState, useEffect } from "react";
import useRouteHomePage from "./useRouteHomepage";
import Panel from "./HomePage/Panel";

export default function Weight() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState(0);
  const [fromWeight, setFromWeight] = useState("Pounds");
  const [toWeight, setToWeight] = useState("Pounds");
  const unitToPounds = new Map<string, number>([
    ["Pounds", 1.0], // base
    ["Kilograms", 0.453592],
    ["Grams", 453.592],
    ["Milligrams", 453592.0],
    ["Ounces", 16.0],
  ]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

  const Convert = () => {
    const number = parseFloat(num);
    if (isNaN(number)) {
      setResult(NaN);
      return;
    }

    const from = unitToPounds.get(fromWeight);
    const to = unitToPounds.get(toWeight);

    if (!from || !to) {
      setResult(NaN);
      return;
    }

    const base = number / from;
    const converted = base * to;
    setResult(converted);
  };

  useEffect(() => {
    Convert();
  }, [num, fromWeight, toWeight, unitToPounds]);

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

      <h1 style={{ marginBottom: "2px" }}>Weight Converter</h1>

      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        placeholder="Enter value"
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          width: "200px",
          borderRadius: "10px",
        }}
      ></input>
      <div>
        <select
          onChange={(e) => setFromWeight(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
            borderRadius: "7px",
          }}
        >
          <option value="Pounds">Pounds</option>
          <option value="Kilograms">Kilograms</option>
          <option value="Grams">Grams</option>
          <option value="Ounces">Ounces</option>
        </select>
        <select
          onChange={(e) => setToWeight(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
            borderRadius: "7px",
          }}
        >
          <option value="Pounds">Pounds</option>
          <option value="Kilograms">Kilograms</option>
          <option value="Grams">Grams</option>
          <option value="Ounces">Ounces</option>
        </select>
      </div>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        Result:{" "}
        <strong>
          {num} {fromWeight} ={" "}
          {isNaN(result) ? "Invalid input" : result.toFixed(3) + " " + toWeight}
        </strong>
      </div>
    </div>
  );
}
