import { useState, useEffect } from "react";
import HomeLogo from "../HomeLogo";
import Display from "./Display";
import routeHomePage from "../routeHomepage";
import useMeasure from "./MeasureHandler";
import { useDebounce } from "../debouce";

export default function Todos4() {
  const [num, setNum] = useState("0");
  const debouncedNum = useDebounce(num, 400);

  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("meter");
  const [result, setResult] = useState(0);
  const [className, setClassName] = useState("");

  const supportedUnits = [
    "meter",
    "kilometer",
    "centimeter",
    "millimeter",
    "micrometer",
    "mile",
    "yard",
    "foot",
    "inch",
  ];

  routeHomePage();

  const measure = useMeasure(debouncedNum, fromUnit, toUnit);

  const handleClass = () => {
    setClassName((prev) => (prev === "led-input" ? "" : "led-input"));
  };

  // ✅ Always called — safe Hook order
  useEffect(() => {
    if (measure.status === "success" && measure.data) {
      setResult(measure.data.result);
    }
  }, [measure.status, measure.data]);

  // ✅ Render conditionally inside JSX instead of early return
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
      }}
    >
      <h1 style={{ marginTop: "2px" }}>Measure Converter</h1>

      {measure.status === "loading" && <p>Loading conversion...</p>}
      {measure.status === "error" && (
        <p>Error fetching conversion data: {measure.error.message}</p>
      )}
      {measure.status === "empty" && (
        <p>{String(measure.error || "No data available.")}</p>
      )}

      <p style={{ marginBottom: "0px" }}>Request Limit</p>
      <p style={{ marginTop: "0px" }}>
        {measure.data?.measureRequestsUsed ?? 0} /{" "}
        {measure.data?.measureRequestLimit ?? "100"}
      </p>

      <HomeLogo />
      <Display
        num={num}
        setNum={setNum}
        className={className}
        handleClass={handleClass}
      />

      <div>
        <select
          onChange={(e) => setFromUnit(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
            borderRadius: "7px",
          }}
        >
          {supportedUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setToUnit(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
            borderRadius: "7px",
          }}
        >
          {supportedUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          Result:
          <strong>
            {" "}
            {num} {fromUnit} ={" "}
            {isNaN(result) ? "Invalid input" : result.toFixed(2) + " " + toUnit}
          </strong>
        </div>
      </div>
    </div>
  );
}
