import { useState } from "react";
import { MdOutlineColorLens } from "react-icons/md";
import Colors from "./Colors";
import { CiEdit } from "react-icons/ci";

interface Props {
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  note: any;
  handleRemove: (removeText: string) => void;
}

export default function Background({
  setBackgroundColor,
  setText,
  note,
  handleRemove,
}: Props) {
  const handleBackground = () => {
    if (vis === "hidden") {
      setVis("visible");
    } else {
      setVis("hidden");
    }
  };
  const [vis, setVis] = useState<"visible" | "hidden">("hidden");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "25%",
      }}
    >
      <button
        onClick={() => handleBackground()}
        style={{
          marginLeft: "10px",
          outline: "none",
          background: "none",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.5) ";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <MdOutlineColorLens size={30} />
      </button>
      <button
        onClick={() => {
          setText(note.text);
          handleRemove(note.text);
        }}
        style={{
          marginLeft: "10px",
          outline: "none",
          background: "none",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.5) ";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <CiEdit size={30} />
      </button>
      <div style={{ visibility: vis }}>
        <Colors setBackgroundColor={setBackgroundColor} />
      </div>
    </div>
  );
}
