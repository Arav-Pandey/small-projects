import { useState } from "react";
import HomeLogo from "../HomeLogo";
import routeHomePage from "../routeHomepage";
import useQuote from "./QuoteHandler";

export default function Quote() {
  const [category] = useState("life"); // you can change category

  routeHomePage();

  const quote = useQuote(category);

  if (quote.status === "loading") return <p>Loading quote...</p>;
  if (quote.status === "error")
    return (
      <>
        <p>Error loading quote</p>
        <HomeLogo />
      </>
    );
  if (quote.status === "apiError")
    return (
      <>
        <p>{quote.error}</p>
        <HomeLogo />
      </>
    );

  const refresh = () => {
    window.location.href = "/quotes";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Motivational Quotes</h1>

      <blockquote
        style={{
          fontSize: "20px",
          margin: "20px 0",
          boxShadow: "black",
          background: "rgba(255, 255, 255, 0.15)",
          padding: "12px 20px",
          borderRadius: "14px",
          color: "white",
        }}
      >
        “{quote.data.data[0].quote}”
        <footer style={{ marginTop: "10px", fontStyle: "italic" }}>
          – {quote.data.data[0].author}
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
