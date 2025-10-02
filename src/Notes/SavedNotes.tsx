import type React from "react";
import { CiEdit } from "react-icons/ci";
import Background from "./Background";
import { useState } from "react";

interface Props {
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
  handleRemove: (removeText: string) => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SavedNotes({ getNotes, handleRemove, setText }: Props) {
  const [background, setBackgroundColor] = useState("black");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "50px",
      }}
    >
      <h2>------------------- Saved Notes -------------------</h2>
      {getNotes.data.notes.map((note: any) => (
        <div
          key={note._id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#1a1a1a",
              color: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              textAlign: "center",
              marginBottom: "20px",
              justifyContent: "center",
              alignItems: "center",
              overflow: "visible",
              background: background,
            }}
          >
            <h3 style={{ marginLeft: "10px" }}>{note.text}</h3>

            <Background
              setBackgroundColor={setBackgroundColor}
              note={note}
              handleRemove={handleRemove}
              setText={setText}
            />

            <button
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                padding: "10px 20px",
                borderRadius: "12px",
                color: "white",
                fontWeight: "500",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                width: "250px",
              }}
              onClick={() => handleRemove(note.text)}
            >
              Remove Note
            </button>
          </div>
          <h3>
            ----------------------------------------------------------------------------
          </h3>
        </div>
      ))}
    </div>
  );
}
