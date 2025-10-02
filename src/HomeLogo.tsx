import { useState } from "react";
import { FcHome } from "react-icons/fc";

export default function HomeLogo() {
  const [hovered, setHovered] = useState(false);

  return (
    <a href="/homepage" style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          position: "relative", // <- make this parent relative for absolute child
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          marginTop: 20,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FcHome size={40} style={{ marginBottom: "10px" }} />
        {hovered && (
          <span
            style={{
              position: "absolute", // <- overlay on top
              top: "80%", // slightly below the icon
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              background: "black",
              color: "white",
              padding: "2px 6px",
              borderRadius: "7px",
              zIndex: 10, // make sure it's on top
              whiteSpace: "nowrap", // prevent wrapping
            }}
          >
            Home
          </span>
        )}
      </div>
    </a>
  );
}
