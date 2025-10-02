import { useState, useEffect } from "react";
import HomeLogo from "../HomeLogo";
import { RxSwitch } from "react-icons/rx";
import Display from "./Display";

export default function Todos4() {
  //Sets default values
  const [num, setNum] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("meter");
  const [result, setResult] = useState(0);
  const [className, setClassName] = useState("");
  const supportedUnits = [
    // The supported units of the API
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
  const [error, setError] = useState(false);

  useEffect(() => {
    // Runs convert when num, fromUnit, or toUnit are changed
    convert();
  }, [num, fromUnit, toUnit]);

  const convert = () => {
    // Convert function
    const url = `https://api.mathjs.org/v4/?expr=${`${num}%20${fromUnit}%20to%20${toUnit}`}`; // The url link
    if (!num) return; // If num is invalid go back
    fetch(url) // Fetch the following things from the url link
      .then((res) => res.text()) // ???
      .then((data) => {
        // ???
        const value = parseFloat(data);

        if (!isNaN(value)) {
          // If value is not a number set result to value. IDK why
          setResult(value);
        } else {
          // set result to not a number
          setResult(NaN);
        }
      })
      .catch((err) => setError(true)); // catch any errors and then display them in the console
  };

  if (error) return <p>Error fetching money convertions. Sorry :(</p>;

  const handleClass = () => {
    return className === "led-input"
      ? setClassName("")
      : setClassName("led-input");
  };

  return (
    <div
      // The style for the layout of the div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
      }}
    >
      <h1 style={{ marginTop: "2px" }}>Measure Converter</h1>
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
          {supportedUnits.map(
            (
              unit // Add all the supported units of the API into the dropdown menue item
            ) => (
              <option
                key={unit} // What does the key mean?
                value={unit}
              >
                {unit}
              </option>
            )
          )}
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
            {num} {fromUnit} ={" "}
            {isNaN(result) ? "Invalid input" : result.toFixed(2) + " " + toUnit}
          </strong>
        </div>
      </div>
    </div>
  );
}
