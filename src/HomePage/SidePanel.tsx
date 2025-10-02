import HomeLogo from "../HomeLogo";
import LogoutButton from "../LogoutButton";
import Profile from "../Profile";
import DarkMode, { useDarkModeContext } from "./DarkMode";

interface Props {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function links(text: string, route: string) {
  return (
    <a
      href={`/${route}`}
      style={{
        textDecoration: "none",
        color: "white",
        padding: "5px 0",
        fontSize: "20px",
      }}
    >
      {text}
    </a>
  );
}

export default function SidePanel({ isPanelOpen, setIsPanelOpen }: Props) {
  const darkModeContext = useDarkModeContext();
  if (!darkModeContext) {
    throw new Error("This should never happen. You broke the code....");
  }
  const { darkMode } = darkModeContext;

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
          left: isPanelOpen ? "0" : "-200px", // makes it so that if the panel isn't open it goes off the screen
          width: "300px",
          height: "100%",
          background: !darkMode ? "#0fc0baff" : " #063671 ",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.3)", // makes the side panel look hovering
          transition: "left 0.3s ease-in-out", // good looking transition
          zIndex: isPanelOpen ? 1002 : 1000, // puts it in front of everything
          padding: "20px",
          boxSizing: "border-box", // makes everything have to be 300px including the padding. ALWAYS GOOD TO USE THIS
          overflowY: "auto",
          overflowX: "hidden",
        }}
        onMouseLeave={() => setIsPanelOpen(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0, color: "white" }}>Menu</h2>
          <HomeLogo />
          <button
            onClick={() => setIsPanelOpen(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
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
              color: "white",
            }}
          >
            <h2>Navigation</h2>
          </div>
          {links("🧮 Calculator", "calculator")}
          {links("📅 Calendar", "calendar")}
          {links("😂 Jokes Page", "jokes")}
          {links("🧠 Memory Game", "memory")}
          {links("💬 Motivational Quotes", "quotes")}
          {links("📓 Notes", "notes")}
          {links("📈 Stock Prices", "stocks")}
          {links("⏱️ Stop Watch", "stopwatch")}
          {links("❌⭕ TicTacToe", "tictactoe")}
          {links("⏲️ Timer", "timer")}
          {links("✅ To-Do List", "todos")}
          {links("🔄 Unit Converter", "unitconverter")}
          {links("🌤️ Weather App", "weatherapp")}
          {links("📝 Word Counter", "word")}
          <div
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              marginTop: "20px",
              color: "white",
            }}
          >
            <h2>Account</h2>
          </div>
          <div
            style={{
              padding: "5px 0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Profile />
            <LogoutButton />
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
}
