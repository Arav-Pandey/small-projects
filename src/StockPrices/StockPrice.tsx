import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FcHome } from "react-icons/fc";
import HomeLogo from "../HomeLogo.tsx";

export default function StockPrice() {
  const [ticker, setTicker] = useState("AAPL");
  const [inputValue, setInputValue] = useState("AAPL");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Trigger search on Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTicker(inputValue.toUpperCase());
      setSearchResults([]);
    }
  };

  // Autocomplete search (optional — can remove if you only want direct search)
  const handleSearch = async (query: string) => {
    setInputValue(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    // ✅ Hit our Netlify backend instead of the external API
    const res = await fetch(`/.netlify/functions/stock?ticker=${query}`);

    if (!res.ok) {
      setSearchResults([]);
      return;
    }

    const data = await res.json();
    setSearchResults(Array.isArray(data) ? data : []);
  };

  // ✅ Use React Query to fetch the stock price via our backend
  const stockQuery = useQuery({
    queryKey: ["ticker", ticker],
    queryFn: async () => {
      const q = encodeURIComponent(ticker);
      const res = await fetch(`/.netlify/functions/stock?ticker=${q}`);

      if (!res.ok) throw new Error("Failed to fetch stock price");
      return res.json();
    },
  });

  // Loading or error states
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

  return (
    <div style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Stock Prices</h1>
      <h3>Enter a ticker for any company and I will get their stock price</h3>

      {/* Search input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter ticker here..."
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />

      {/* Home link */}
      <HomeLogo />

      {/* Stock price display */}
      <div style={{ marginTop: "20px" }}>
        {stockQuery.data?.ticker ? (
          <h3>
            {stockQuery.data.name} has a stock price of {stockQuery.data.price}{" "}
            {stockQuery.data.currency}
          </h3>
        ) : (
          <p>No stock prices found</p>
        )}
      </div>
    </div>
  );
}
