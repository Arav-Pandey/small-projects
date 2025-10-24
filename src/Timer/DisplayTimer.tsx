import { FaPlayCircle } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { HiMiniSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { RiResetLeftLine } from "react-icons/ri";
import HomeLogo from "../HomeLogo";

type TimerProps = {
  time: number;
  setTime: (val: number) => void;
  setInitialTime: (val: number) => void;
  isRunning: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleReset: () => void;
  soundOn: boolean;
  toggleSound: () => void;
};

export default function DisplayTimer({
  time,
  setTime,
  setInitialTime,
  isRunning,
  handleStart,
  handlePause,
  handleReset,
  soundOn,
  toggleSound,
}: TimerProps) {
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
            marginRight: "10px",
          }}
        />
        <button
          style={{ border: "none", outline: "none", background: "none" }}
          onClick={() => localStorage.setItem("hasVisitedTimerPage", "false")}
        >
          <HomeLogo />
        </button>
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

      <button
        style={{ background: "none", border: "none", outline: "none" }}
        onClick={toggleSound}
      >
        {soundOn ? (
          <HiSpeakerWave size="30" />
        ) : (
          <HiMiniSpeakerXMark size="30" />
        )}
      </button>
    </div>
  );
}
