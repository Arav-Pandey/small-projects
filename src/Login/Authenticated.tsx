import { GrInstallOption } from "react-icons/gr";
import Profile from "../Profile";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

export default function Authenticated({
  installEvent,
}: {
  installEvent: BeforeInstallPromptEvent | undefined;
}) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Profile />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <button
          onClick={() => (window.location.href = "/homepage")}
          style={{
            background: "rgba(255, 255, 255, 0.15)", // ✨ translucent card
            padding: "12px 20px",
            borderRadius: "14px",
            color: "white",
            marginBottom: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            outline: "none",
            border: "none",
          }}
        >
          Proceed to the homepage
        </button>
        <button
          style={{
            marginLeft: "10px",
            border: "none",
            outline: "none",
            background: "none",
            display: "flex",
            flexDirection: "row",
            marginTop: "5px",
          }}
          onClick={() => installEvent?.prompt()}
        >
          <GrInstallOption size={25} />
          <p
            style={{
              marginTop: "0px",
              marginLeft: "7px",
              fontSize: "20px",
            }}
          >
            Install App
          </p>
        </button>
      </div>
    </div>
  );
}
