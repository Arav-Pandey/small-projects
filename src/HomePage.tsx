import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";
import { useNavigate } from "react-router-dom";
import routeHomePage from "./routeHomepage";
import netlifyIdentity from "netlify-identity-widget";

export default function HomePage() {
  const navigate = useNavigate();

  const emojiLinks: { href: string; emoji: string; label: string }[] = [
    { href: "/unitconverter", emoji: "🔄", label: "Unit Converter" },
    { href: "/calculator", emoji: "🧮", label: "Calculator" },
    { href: "/todos", emoji: "✅", label: "To-Do List" },
    { href: "/tictactoe", emoji: "❌⭕", label: "Tic-Tac-Toe" },
    { href: "/jokes", emoji: "😂", label: "Jokes Page" },
    { href: "/weatherapp", emoji: "🌤️", label: "Weather App" },
    { href: "/calendar", emoji: "📅", label: "Calendar" },
    { href: "/word", emoji: "📝", label: "Word Counter" },
    { href: "/stopwatch", emoji: "⏱️", label: "Stop Watch" },
    { href: "/quotes", emoji: "💬", label: "Motivational Quotes" },
    { href: "/stocks", emoji: "📈", label: "Stock Prices" },
    { href: "/timer", emoji: "⏲️", label: "Timer" },
  ];
  const [customAlert, setCustomAlert] = useState<string | null>(null);

  routeHomePage();

  function NavLink(emoji: string, label: string, href: string) {
    return (
      <a
        key={label}
        href={href}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.15)", // ✨ translucent card
            padding: "15px 30px",
            borderRadius: "12px",
            color: "white",
            fontWeight: "500",
            fontSize: "30px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, background 0.2s",
            marginBottom: "10px",
          }}
        >
          <span style={{ marginRight: "10px" }}>{emoji}</span>
          <span className="nav-link">{label}</span>
        </div>
      </a>
    );
  }

  const back = () => {
    setCustomAlert(`Signing out...`);
    setTimeout(() => {
      navigate("/");
    }, 1000);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <div
      className="HomePage"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Choose what program</h1>
      <h1>You want to run</h1>
      <button
        onClick={(e) => back()}
        style={{ outline: "none", background: "none", border: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "40px" }}>🔙</span>
        </div>
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {emojiLinks.map((link) => NavLink(link.emoji, link.label, link.href))}
      </div>
      <CustomAlert customAlert={customAlert} setCustomAlert={setCustomAlert} />
    </div>
  );
}
