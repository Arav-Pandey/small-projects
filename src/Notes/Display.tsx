import type { ChangeEvent, FormEvent } from "react";
import SavedNotes from "./SavedNotes";

interface Props {
  setBoxShadow: React.Dispatch<React.SetStateAction<string>>;
  boxShadow: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
  scroll: boolean;
  handleSave: () => void;
  savedText: string;
  handleRemove: (removeText: string) => void;

  getNotes:
    | {
        status: "loading";
        error?: undefined;
        data?: undefined;
      }
    | {
        status: "error";
        error: Error;
        data?: undefined;
      }
    | {
        status: "empty";
        error: string;
        data?: undefined;
      }
    | {
        status: "success";
        data: any;
        error?: undefined;
      };
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function Display({
  setBoxShadow,
  boxShadow,
  handleChange,
  textareaRef,
  text,
  scroll,
  handleSave,
  savedText,
  getNotes,
  handleRemove,
  setText,
}: Props) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        onMouseEnter={() => setBoxShadow("0 4px 12px rgba(0,0,0,0.4)")}
        onMouseLeave={() => setBoxShadow("")}
        style={{
          display: "flex",
          marginTop: "30px",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#1a1a1a",
          color: "white",
          boxShadow: boxShadow,
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <form>
          <textarea
            ref={textareaRef}
            onChange={(e) => handleChange(e)}
            value={text}
            placeholder="Enter notes here..."
            style={{
              background: "none",
              color: "white",
              width: "100%",
              resize: "none",
              overflow: scroll ? "visible" : "hidden",
              border: "none",
              outline: "none",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          />
        </form>
      </div>
      <button
        onClick={() => handleSave()}
        style={{
          background:
            text !== ""
              ? " rgba(75, 199, 34, 0.62)"
              : "rgba(247, 173, 0, 0.15)",
          padding: "15px 30px",
          borderRadius: "12px",
          color: "white",
          fontWeight: "500",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          marginBottom: "10px",
          cursor: text !== "" ? "pointer" : "not-allowed",
        }}
      >
        Save Note
      </button>
      <strong>{savedText}</strong>
      {getNotes.status === "success" ? (
        <SavedNotes
          getNotes={getNotes}
          handleRemove={handleRemove}
          setText={setText}
        />
      ) : null}
    </div>
  );
}
