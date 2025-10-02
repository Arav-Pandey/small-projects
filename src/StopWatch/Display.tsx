import { FaPause, FaPlayCircle } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";
import HomeLogo from "../HomeLogo";

type DisplayProps = {
  elapsed: number;
  isRunning: boolean;
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
  formatTime: (ms: number) => string;
};

export default function Display({
  elapsed,
  isRunning,
  handleStart,
  handleStop,
  handleReset,
  formatTime,
}: DisplayProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "5px" }}>
      <div className="circle">
        <div className="orbit-wrapper">
          <div
            className={`orbit rotate-${Math.floor(elapsed / 1000) * 360}`}
            style={{ rotate: `${Math.floor((elapsed / 3000) * 360)}deg` }}
          >
            <div className="ball"></div>
          </div>
        </div>
      </div>

      <h1>Stop Watch</h1>
      <h2 style={{ fontSize: 36, margin: "16px 0" }}>{formatTime(elapsed)}</h2>

      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {!isRunning ? (
          <button
            onClick={handleStart}
            style={{ background: "none", border: "none", outline: "none" }}
          >
            <FaPlayCircle size="30" />
          </button>
        ) : (
          <button
            onClick={handleStop}
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

        <HomeLogo />
      </div>
    </div>
  );
}
