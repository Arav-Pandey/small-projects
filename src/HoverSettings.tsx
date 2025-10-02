import { useState, type ReactNode } from "react";

type Props = {
  name: string;
  icon: ReactNode;
};

export default function HoverSettings({ name, icon: icon }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative", // <- make this parent relative for absolute child
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        marginTop: "20px",
        marginBottom: "10px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      {hovered && (
        <span
          style={{
            position: "absolute", // <- overlay on top
            top: "80%", // slightly below the icon
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            border: "none",
            background: "black",
            outline: "none",
            padding: "5px 9px",
            borderRadius: "7px",
            zIndex: 10, // make sure it's on top
            whiteSpace: "nowrap", // prevent wrapping
            marginTop: "10px",
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
}
