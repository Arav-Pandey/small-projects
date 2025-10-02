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
      <HomeLogo />
      <CardController />
    </div>
  );
}
