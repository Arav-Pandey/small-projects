import { TbArrowBackUp } from "react-icons/tb";

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
        <TbArrowBackUp size={40} />
        <span className="nav-link" style={{ fontSize: "18px" }}>
          Back
        </span>
      </div>
    </a>
  );
}
