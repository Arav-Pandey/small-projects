import { useState } from "react";
import CustomAlert from "../CustomAlert";
import routeHomePage from "../routeHomepage";
import LogoutButton from "../LogoutButton";
import {
  emojiLinks1,
  emojiLinks2,
  emojiLinks3,
  emojiLinks4,
  FormatStuff,
  NavLink,
} from "./Emoji";
import SidePanel from "./SidePanel";

export default function HomePage() {
  const [customAlert, setCustomAlert] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  routeHomePage();

  return (
    <div
      className="HomePage"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => setIsPanelOpen((prev) => !prev)}
        style={{
          position: "fixed", // stays in the same spot even when scrolling
          top: "20px", // makes it 20px away from the top of the page (ONLY WORKS WHEN POSITION IS FIXED)
          left: "20px",
          zIndex: 1000, // controls the layering order. The higher the number the more front it is.
          background: "none",
          outline: "none",
          border: "none",
          color: "black",
          fontSize: "30px",
        }}
      >
        ☰
      </button>

      <SidePanel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />

      <h1>Choose what program</h1>
      <h1 style={{ marginTop: "0px" }}>You want to run</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {NavLink("🌤️", "Weather App", "/weatherapp")}
        <FormatStuff NavLink={NavLink} emojiLinks={emojiLinks1} />
        <FormatStuff NavLink={NavLink} emojiLinks={emojiLinks2} />
        <FormatStuff NavLink={NavLink} emojiLinks={emojiLinks3} />
        <FormatStuff NavLink={NavLink} emojiLinks={emojiLinks4} />
      </div>
      <CustomAlert customAlert={customAlert} setCustomAlert={setCustomAlert} />
    </div>
  );
}
