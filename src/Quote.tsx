import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HomeLogo from "./HomeLogo";

export default function Quote() {
  const [category] = useState("life"); // you can change category

  const { data, error, isLoading } = useQuery({
    queryKey: ["quote", category], // makes a cache that stores copies of the cities
    queryFn: async () => {
      const res = await fetch(`/.netlify/functions/quote`);

      if (!res.ok) throw new Error("Failed to fetch quote");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{"Error loading quote: " + (error as Error).message}</p>;
  if (!data || data.length === 0) return <p>No quotes found</p>;

  const refresh = () => {
    window.location.href = "/quotes";
  };

  return (
    <div>
      <h1>Motivational Quotes</h1>

      <blockquote
        style={{
          fontSize: "20px",
          margin: "20px 0",
          boxShadow: "black",
          background: "rgba(255, 255, 255, 0.15)",
          padding: "12px 20px",
          borderRadius: "14px",
        }}
      >
        “{data[0].quote}”
        <footer style={{ marginTop: "10px", fontStyle: "italic" }}>
          – {data[0].author}
        </footer>
      </blockquote>

      <HomeLogo />

      <button
        onClick={() => refresh()}
        style={{
          background: "rgba(255, 255, 255, 0.15)", // ✨ translucent card
          padding: "12px 20px",
          borderRadius: "14px",
          color: "white",

          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        Refresh Quote
      </button>
    </div>
  );
}
