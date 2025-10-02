import { useDarkModeContext } from "./DarkMode";

interface Props {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ClosedPanel({ isPanelOpen, setIsPanelOpen }: Props) {
  const darkModeContext = useDarkModeContext();
  if (!darkModeContext) {
    throw new Error("This should never happen. You broke the code....");
  }
  const { darkMode } = darkModeContext;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "0",
        width: "100px",
        height: "100%",
        zIndex: 1001, // puts it in front of everything
        padding: "20px",
        boxSizing: "border-box",
        background: !darkMode ? "#0fc0baff" : " #063671 ",
      }}
      onMouseEnter={() => {
        setIsPanelOpen((prev) => !prev);
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <button
          onClick={() => setIsPanelOpen((prev) => !prev)}
          style={{
            position: "fixed", // stays in the same spot even when scrolling
            top: "20px", // makes it 20px away from the top of the page (ONLY WORKS WHEN POSITION IS FIXED)
            left: "30px",
            zIndex: 1000, // controls the layering order. The higher the number the more front it is.
            background: "none",
            outline: "none",
            border: "none",
            color: "white",
            fontSize: "40px",
            padding: "0px 0px",
          }}
        >
          ☰
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "70px",
            fontSize: "40px",
            marginBottom: "0px",
          }}
        >
          🌤️
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          🧮
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          ⏱️
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          🧠
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          📓
        </p>

        <p
          style={{ marginTop: "0px", textAlign: "center", fontWeight: "bold" }}
        >
          More down below!
        </p>
      </div>
    </div>
  );
}
