import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Authenticated from "./Authenticated";
import Login from "./Login";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

export default function App() {
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
        <Authenticated installEvent={installEvent} />
      ) : (
        <Login />
      )}
    </div>
  );
}
