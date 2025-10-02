import { FaPause, FaPlayCircle } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";
import HoverSettings from "../HoverSettings";

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
    <div style={{ textAlign: "center", marginTop: "5px", minHeight: "10vh" }}>
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

      <h1 style={{ marginBottom: "5px" }}>Stop Watch</h1>
      <h2 style={{ fontSize: 36, margin: "16px 0" }}>{formatTime(elapsed)}</h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: "20px",
          marginTop: "5px",
        }}
      >
        {!isRunning ? (
          <button
            onClick={handleStart}
            style={{ background: "none", border: "none", outline: "none" }}
          >
            <HoverSettings name="Start" icon={<FaPlayCircle size={30} />} />
          </button>
        ) : (
          <button
            onClick={handleStop}
            style={{ background: "none", border: "none", outline: "none" }}
          >
            <HoverSettings
              name="Pause"
              icon={<FaPause fill="white" size={30} />}
            />
          </button>
        )}
        <button
          onClick={handleReset}
          style={{ background: "none", border: "none", outline: "none" }}
        >
          <HoverSettings
            name="Reset"
            icon={<RiResetLeftLine fill="white" size={30} />}
          />
        </button>
      </div>
    </div>
  );
}
