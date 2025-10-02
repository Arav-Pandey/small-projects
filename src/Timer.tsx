import { useState, useEffect, useRef } from "react";
import HomeLogo from "./HomeLogo";
import { FaPause, FaPlayCircle } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // ✅ Fix: give ref a proper type
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    if (time <= 0) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
    // ✅ Clear any existing interval safely
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // ✅ Cleanup interval when unmounting or stopping
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>⏱ Timer</h1>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="number"
          placeholder="Enter time (seconds)"
          onChange={(e) => {
            const val = e.target.valueAsNumber;
            setTime(val);
            setInitialTime(val);
          }}
          style={{
            height: "25px",
            outline: "none", // ❌ removes the focus outline
            color: "black", // ✅ makes text black
            fontSize: "16px", // (optional) nicer size
          }}
        />
        <HomeLogo />
      </div>

      <h2>{isNaN(time) ? "N/A" : time}</h2>

      {!isRunning ? (
        <button
          onClick={handleStart}
          style={{ background: "none", border: "none", outline: "none" }}
        >
          <FaPlayCircle size="30" />
        </button>
      ) : (
        <button
          onClick={handlePause}
          style={{ background: "none", border: "none", outline: "none" }}
        >
          <FaPause fill="white" size="30" />
        </button>
      )}

      <button
        onClick={handleReset}
        style={{ background: "none", border: "none", outline: "none" }}
      >
        <RiResetLeftLine fill="white" size="30" />
      </button>
    </div>
  );
}
