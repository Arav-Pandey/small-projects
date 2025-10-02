import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import { GrInstallOption } from "react-icons/gr";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

function App() {
  const { isAuthenticated, isLoading, error, user } = useAuth0();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent>();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setInstallEvent(e as any);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("token", user.sub || "");

      fetch(
        `/.netlify/functions/login`,

        {
          body: JSON.stringify({
            email: user.email,
            id: user.sub,
          }),
          method: "POST",
        }
      );
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <div>Oops!</div>
          <div>Something went wrong</div>
          <div>{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        flexDirection: "column",
      }}
    >
      <h1>Login Screen</h1>
      {isAuthenticated ? (
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
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "30px" }}>
            Get started by signing in to your account
          </p>
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default App;
