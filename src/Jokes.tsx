import { useState, useEffect } from "react";
import HomeLogo from "./HomeLogo";

export default function Joke() {
  const [jokeResponse, setJokeResponse] = useState<{
    setup: string;
    punchline: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [refresh, setRefresh] = useState(false);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-lg text-center transition-all duration-300 hover:scale-105">
        <div
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.15)", // ✨ translucent card
            padding: "10px 20px",
            borderRadius: "12px",
            color: "white",
            fontSize: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, background 0.2s",
            flexDirection: "column",
          }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ marginBottom: "0px" }}
          >
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

        <div className="mt-6">
          <HomeLogo />
        </div>
      </div>
    </div>
  );
}
