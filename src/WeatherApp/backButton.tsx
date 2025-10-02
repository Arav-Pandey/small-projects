import { TbArrowBackUp } from "react-icons/tb";
import HoverSettings from "../HoverSettings";

export default function BackButton() {
  return (
    <a href="/weatherapp" style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <HoverSettings name="Back" icon={<TbArrowBackUp size={40} />} />
      </div>
    </a>
  );
}
