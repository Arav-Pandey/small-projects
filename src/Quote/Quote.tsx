import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HomeLogo from "../HomeLogo";
import routeHomePage from "../routeHomepage";
import useQuote from "./QuoteHandler";

export default function Quote() {
  const [category] = useState("life"); // you can change category

  routeHomePage();

  const quote = useQuote(category);

  if (quote.status === "loading") return <p>Loading quote...</p>;
  if (quote.status === "error") return <p>Error loading quote</p>;
  if (quote.status === "apiError") return <p>API error: {quote.error}</p>;

  const refresh = () => {
    window.location.href = "/quotes";
  };

  return (
    <div>
      <h1>Motivational Quotes</h1>
      <p style={{ marginBottom: "0px" }}>
        Request Limit (Linked with Stock Prices page)
      </p>
      <p style={{ marginTop: "0px" }}>
        {quote.data.stockQuoteRequestsUsed ?? "0"} /{" "}
        {quote.data.stockQuoteReqeustLimit ?? "100"}
      </p>

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
