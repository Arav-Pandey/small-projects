interface Props {
  NavLink: (emoji: string, label: string, href: string) => React.ReactNode;
  emojiLinks: {
    href: string;
    emoji: string;
    label: string;
  }[];
}

export const emojiLinks1: { href: string; emoji: string; label: string }[] = [
  { href: "/unitconverter", emoji: "🔄", label: "Unit Converter" },
  { href: "/calculator", emoji: "🧮", label: "Calculator" },
  { href: "/todos", emoji: "✅", label: "To-Do List" },
];

export const emojiLinks2: { href: string; emoji: string; label: string }[] = [
  { href: "/tictactoe", emoji: "❌⭕", label: "Tic-Tac-Toe" },
  { href: "/jokes", emoji: "😂", label: "Jokes Page" },
  { href: "/calendar", emoji: "📅", label: "Calendar" },
];

export const emojiLinks3: { href: string; emoji: string; label: string }[] = [
  { href: "/word", emoji: "📝", label: "Word Counter" },
  { href: "/stopwatch", emoji: "⏱️", label: "Stop Watch" },
  { href: "/quotes", emoji: "💬", label: "Motivational Quotes" },
];

export const emojiLinks4: { href: string; emoji: string; label: string }[] = [
  { href: "/stocks", emoji: "📈", label: "Stock Prices" },
  { href: "/timer", emoji: "⏲️", label: "Timer" },
  { href: "/memory", emoji: "🧠", label: "Memory Game" },
];

export function FormatStuff({ NavLink, emojiLinks }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {emojiLinks.map((link) => NavLink(link.emoji, link.label, link.href))}
    </div>
  );
}

export function NavLink(emoji: string, label: string, href: string) {
  return (
    <a
      key={label}
      href={href}
      style={{ textDecoration: "none", color: "inherit", marginRight: "20px" }}
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
