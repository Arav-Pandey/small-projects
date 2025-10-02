import { useState, useEffect } from "react";
import Display from "./Display";
import useRouteHomePage from "../useRouteHomepage";
import useMeasure from "./MeasureHandler";
import { useDebounce } from "../debouce";
import { useAuth0 } from "@auth0/auth0-react";
import useFetchUser from "../useFetchUser";
import Panel from "../HomePage/Panel";

export default function Measure() {
  const [num, setNum] = useState("0");
  const debouncedNum = useDebounce(num, 400);
  const { user } = useAuth0();
  const whoami = useFetchUser(user);
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("meter");
  const [result, setResult] = useState(0);
  const [className, setClassName] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

  useRouteHomePage();

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
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />

      <h1 style={{ marginTop: "2px" }}>Measure Converter</h1>
      <p style={{ marginBottom: "5px" }}>Requests Used / Request Limit</p>
      <p style={{ marginTop: "0px" }}>
        {whoami?.user?.measureRequestsUsed} /{" "}
        {whoami?.user?.measureRequestLimit}
      </p>

      {measure.status === "loading" && <p>Loading conversion...</p>}
      {measure.status === "error" && (
        <>
          <p>Error fetching conversion data: {measure.error.message}</p>{" "}
        </>
      )}
      {measure.status === "empty" && (
        <p>{String(measure.error || "No data available.")}</p>
      )}

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
