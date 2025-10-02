import { useState } from "react";
import CustomAlert from "../CustomAlert";
import useRouteHomePage from "../useRouteHomepage";
import Panel from "./Panel";

export default function HomePage() {
  const [customAlert, setCustomAlert] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

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
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Choose what program</h1>
        <h1 style={{ marginTop: "0px" }}>You want to run</h1>

        <h2
          style={{
            textAlign: "center", // centers the text
            maxWidth: "700px", // controls line length
            margin: "0 auto", // centers the block itself
            paddingLeft: "40px", // indentation
            paddingRight: "40px",
            marginBottom: "30px",
          }}
        >
          Welcome to my everything you need website! Here you have all the
          essential apps that you might search on the web. Now you have it all
          in one app
        </h2>
        <h2
          style={{
            textAlign: "center", // centers the text
            maxWidth: "700px", // controls line length
            margin: "0 auto", // centers the block itself
            paddingLeft: "40px", // indentation
            paddingRight: "40px",
            marginBottom: "30px",
          }}
        >
          To start, hover over the sidebar to the left. Scroll over all the apps
          and click on any you find interesting or useful.
        </h2>
        <h2
          style={{
            textAlign: "center", // centers the text
            maxWidth: "700px", // controls line length
            margin: "0 auto", // centers the block itself
            paddingLeft: "40px", // indentation
            paddingRight: "40px",
            marginBottom: "30px",
          }}
        >
          If something looks weird, confusing, or doesn't work, please leave a
          comment in github. Go to github.com/Arav-Pandey/small-projects and
          either issue a problem or fix it yourself in pull requests.
        </h2>
        <h1
          style={{
            textAlign: "center", // centers the text
            maxWidth: "700px", // controls line length
            margin: "0 auto", // centers the block itself
            paddingLeft: "40px", // indentation
            paddingRight: "40px",
            marginBottom: "30px",
          }}
        >
          Keep in mind! This is made by an 11 year old with help of a tutor!
        </h1>
      </div>

      <CustomAlert customAlert={customAlert} setCustomAlert={setCustomAlert} />
    </div>
  );
}
