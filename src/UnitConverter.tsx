import HomeLogo from "./HomeLogo";
import routeHomePage from "./routeHomepage";

export default function UnitConverter() {
  const emojiLinks: { href: string; emoji: string; label: string }[] = [
    { href: "/length", emoji: "📏", label: "Length Converter" },
    { href: "/temperature", emoji: "🌡️", label: "Temperature Converter" },
    { href: "/weight", emoji: "🏋️‍♂️", label: "Weight Converter" },
    { href: "/money", emoji: "💵", label: "Money Converter" },
    { href: "/speed", emoji: "🏎️", label: "Speed Converter" },
  ];

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

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 0",
      }}
    >
      <h1>Unit Converter</h1>
      <HomeLogo />

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
    </div>
  );
}
