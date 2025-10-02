import { useState } from "react";
import Display from "./Display.tsx";
import ButtonGrid from "./ButtonGrid.tsx";
import { buttonValueChunks } from "./buttonConfig.tsx";
import {
  // Imports all the functions in calcHandlers.tsx
  handleCalc,
  handleNumClick,
  handleAC,
  handle100,
  handleDecimal,
  handlePlusMinus,
  handleSqrt,
  handlePowers,
  handleFraction,
  handleBackspace,
  handleFactorial,
  handleLog10,
  handleCos,
  handlePi,
  handleSin,
  handleLn,
} from "./calcHandlers.tsx";
import useRouteHomePage from "../useRouteHomepage.tsx";
import Panel from "../HomePage/Panel.tsx";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [op, setOp] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <h1 style={{ marginBottom: "5px", marginTop: "100px" }}>Calculator</h1>

      <Display num1={num1} num2={num2} setNum1={setNum1} setNum2={setNum2} />

      <ButtonGrid
        buttonValueChunks={buttonValueChunks}
        state={{ num1, num2, op, result }}
        setState={{ setNum1, setNum2, setOp, setResult }}
        handlers={{
          handleCalc,
          handleNumClick,
          handleAC,
          handle100,
          handleDecimal,
          handlePlusMinus,
          handleSqrt,
          handlePowers,
          handleFraction,
          handleBackspace,
          handleFactorial,
          handleLog10,
          handleCos,
          handlePi,
          handleSin,
          handleLn,
        }}
      />

      <div
        style={{ marginBottom: "20px", marginTop: "20px", fontSize: "25px" }}
      >
        <strong>
          Result: {num1} {op} {num2} ={" "}
        </strong>
        {result !== null ? (isNaN(result) ? "Invalid input" : result) : "N/A"}
      </div>
    </div>
  );
}
