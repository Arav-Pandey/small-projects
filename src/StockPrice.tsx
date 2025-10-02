import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FcHome } from "react-icons/fc";
import HomeLogo from "./HomeLogo.tsx";

export default function StockPrice() {
  const [ticker, setTicker] = useState("AAPL");
  const [inputValue, setInputValue] = useState("AAPL");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTicker(inputValue.toUpperCase());
    }
  };

  const stockQuery = useQuery({
    queryKey: ["ticker", ticker],
    queryFn: async () => {
      const q = encodeURIComponent(ticker);
      const res = await fetch(`/.netlify/functions/stock?ticker=${q}`);
      if (!res.ok) throw new Error("Failed to fetch stock price");
      return res.json();
    },
  });

  if (stockQuery.isLoading) return <p>Loading stock price...</p>;
  if (stockQuery.error)
    return (
      <>
        <p>Error loading stock price: {(stockQuery.error as Error).message}</p>
        <a
          href="/homepage"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FcHome size={40} />
            <span style={{ fontSize: "18px" }}>Home</span>
          </div>
        </a>
      </>
    );

  const stock = stockQuery.data;
  const priceChange = stock?.changePercent; // 🔁 Optional: add this if your API returns it
  const isUp = priceChange >= 0;

  return (
    <div style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}>
      <h1>📈 Stock Prices</h1>
      <h3>Enter a ticker symbol to view its latest stock price</h3>

      {/* Search input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter ticker here..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      />

      {/* Home link */}
      <HomeLogo />

      {/* Stock Card */}
      {stock?.ticker ? (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#1a1a1a",
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "5px", fontSize: "28px" }}>
            {stock.name}
          </h2>
          <p style={{ fontSize: "20px", color: "#aaa", marginBottom: "15px" }}>
            {stock.ticker}
          </p>

          <p
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            {stock.price} {stock.currency}
          </p>

          {priceChange !== undefined && (
            <p
              style={{
                fontSize: "18px",
                marginTop: "8px",
              }}
            >
              {isUp ? "▲" : "▼"} {priceChange.toFixed(2)}%
            </p>
          )}
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>No stock prices found</p>
      )}
    </div>
  );
}
