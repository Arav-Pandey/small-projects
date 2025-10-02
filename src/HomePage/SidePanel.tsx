import LogoutButton from "../LogoutButton";

interface Props {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidePanel({ isPanelOpen, setIsPanelOpen }: Props) {
  return (
    <div>
      {/* Overlay */}
      {isPanelOpen && ( // When panel is open this is the other stuff (not the side panel) --->>>
        <div
          style={{
            position: "fixed",
            top: 0, // stick to the top and the left
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setIsPanelOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isPanelOpen ? "0" : "-300px", // makes it so that if the panel isn't open it goes off the screen
          width: "300px",
          height: "100%",
          backgroundColor: "white", // color of the background
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.3)", // makes the side panel look hovering
          transition: "left 0.3s ease-in-out", // good looking transition
          zIndex: 1001, // puts it in front of everything
          padding: "20px",
          boxSizing: "border-box", // makes everything have to be 300px including the padding. ALWAYS GOOD TO USE THIS
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0, color: "black" }}>Menu</h2>
          <button
            onClick={() => setIsPanelOpen(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
              outline: "none",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              color: "black",
            }}
          >
            <strong>Navigation</strong>
          </div>
          <a
            href="/weatherapp"
            style={{ textDecoration: "none", color: "#333", padding: "5px 0" }}
          >
            🌤️ Weather App
          </a>
          <a
            href="/calculator"
            style={{ textDecoration: "none", color: "#333", padding: "5px 0" }}
          >
            🧮 Calculator
          </a>
          <a
            href="/stopwatch"
            style={{ textDecoration: "none", color: "#333", padding: "5px 0" }}
          >
            ⏱️ Stop Watch
          </a>
          <a
            href="/memory"
            style={{ textDecoration: "none", color: "#333", padding: "5px 0" }}
          >
            🧠 Memory Game
          </a>
          <div
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              marginTop: "20px",
              color: "black",
            }}
          >
            <strong>Account</strong>
          </div>
          <div style={{ padding: "5px 0" }}>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
