import HomeLogo from "../HomeLogo";
import CardController from "./CardController";

export default function Memory() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh", // ✅ grows with content
      }}
    >
      <h1>Memory Game</h1>
      <button
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          border: "none",
          background: "none",
          outline: "none",
        }}
        onClick={() => (window.location.href = "/memory")}
      >
        Refresh board
      </button>
      <HomeLogo />
      <CardController />
    </div>
  );
}
