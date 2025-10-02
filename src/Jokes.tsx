import { useState, useEffect } from "react";
import useRouteHomepage from "./useRouteHomepage";
import Panel from "./HomePage/Panel";

export default function Joke() {
  const [jokeResponse, setJokeResponse] = useState<{
    setup: string;
    punchline: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [refresh, setRefresh] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomepage();

  useEffect(() => {
    async function fetchJoke() {
      try {
        const response = await fetch(
          `https://official-joke-api.appspot.com/random_joke`
        );
        if (!response.ok) throw new Error("Failed to fetch jokes");
        const data = await response.json();
        setJokeResponse(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    }

    fetchJoke();
  }, [refresh]);

  if (loading)
    return <p className="text-center text-gray-300">Loading joke...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;
  if (!jokeResponse)
    return <p className="text-center text-red-400">Error loading joke. :(</p>;

  const refreshJoke = () => setRefresh(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <div
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.15)",
          padding: "10px 20px",
          borderRadius: "12px",
          color: "white",
          fontSize: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          transition: "transform 0.2s, background 0.2s",
          flexDirection: "column",
          width: "700px",
          textAlign: "center",
        }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ marginBottom: "0px" }}>
          {jokeResponse.setup}{" "}
        </h2>
        <p className="text-lg italic text-yellow-200 mb-6">
          {jokeResponse.punchline}
        </p>
      </div>

      <button
        onClick={refreshJoke}
        style={{ marginTop: "10px", fontSize: "20px" }}
        className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-md transition-all duration-300 hover:scale-110"
      >
        😂 New Joke
      </button>
    </div>
  );
}
