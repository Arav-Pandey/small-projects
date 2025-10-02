import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import Profile from "./Profile";

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
      console.log(installEvent + "erfgerferfefrfeferf");
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
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <h1>Login Screen</h1>
        {isAuthenticated ? (
          <div>
            <Profile />
            <button onClick={() => (window.location.href = "/homepage")}>
              Would you like to proceed to the homepage?
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => installEvent?.prompt()}
            >
              Install App
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Get started by signing in to your account</p>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
