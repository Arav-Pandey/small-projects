import { useState } from "react";
import Panel from "../HomePage/Panel";
import useRouteHomePage from "../useRouteHomepage";
import Card from "./Card";

export default function Notes() {
  useRouteHomePage();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <h1>Notes</h1>

      <Card />
    </div>
  );
}
