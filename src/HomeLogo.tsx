import { useState } from "react";
import HoverSettings from "./HoverSettings";
import { FcHome } from "react-icons/fc";

export default function HomeLogo() {
  const [hovered, setHovered] = useState(false);

  return (
    <a href="/homepage" style={{ textDecoration: "none", color: "inherit" }}>
      <HoverSettings name={"Home"} icon={<FcHome size={35} />} />
    </a>
  );
}
