import { useState } from "react";
import { FcHome } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";

export default function Quote() {
  const [category] = useState("life"); // you can change category
  const API_KEY = "dkjvndkvjbndvn";

  const { data, error, isLoading } = useQuery({
    queryKey: ["quote", category], // makes a cache that stores copies of the cities
    queryFn: async () => {
      const res = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
        headers: { "X-Api-Key": API_KEY },
      });

      if (!res.ok) throw new Error("Failed to fetch quote");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{"Error loading quote: " + (error as Error).message}</p>;
  if (!data || data.length === 0) return <p>No quotes found</p>;

  const refresh = () => {
    window.location.href = "/quote";
  };

  return (
    <div>
      <h1>Motivational Quotes</h1>

      <blockquote style={{ fontSize: "20px", margin: "20px 0" }}>
        “{data[0].quote}”
        <footer style={{ marginTop: "10px", fontStyle: "italic" }}>
          – {data[0].author}
        </footer>
      </blockquote>

      <a href="/homepage" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <FcHome size={30} />
          <span style={{ fontSize: "18px" }}>Home</span>
        </div>
      </a>

      <button onClick={() => refresh()}>Refresh Quote</button>
    </div>
  );
}
