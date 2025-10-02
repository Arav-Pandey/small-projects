import { useEffect, useState } from "react";
import HomeLogo from "../HomeLogo.tsx";
import routeHomePage from "../routeHomepage.tsx";
import useStock from "./StockHandler.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import useFetchUser from "../useFetchUser.tsx";

export default function StockPrice() {
  const [ticker, setTicker] = useState("AAPL");
  const [inputValue, setInputValue] = useState("AAPL");
  const { user } = useAuth0();
  const whoami = useFetchUser(user);

  routeHomePage();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTicker(inputValue.toUpperCase().trim());
    }
  };

  // ✅ useStock automatically re-runs when ticker changes
  const stockQuery = useStock(ticker);

  if (stockQuery.status === "loading") return <p>Loading stock price...</p>;
  if (stockQuery.status === "error")
    return (
      <>
        <p>Error loading stock prices</p>
        <HomeLogo />
      </>
    );
  if (stockQuery.status === "apiError")
    return (
      <>
        <p>API Error: {stockQuery.error}</p>
        <HomeLogo />
      </>
    );

  const stock = stockQuery.data;
  const priceChange = stock?.changePercent;
  const isUp = priceChange >= 0;

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>📈 Stock Prices</h1>
      <h3>Enter a ticker symbol to view its latest stock price</h3>

      <p style={{ marginBottom: "0px" }}>Request Used / Request Limit</p>
      <p style={{ marginBottom: "0px", marginTop: "0px" }}>
        (This is connected with your quote page)
      </p>
      <p style={{ marginTop: "5px" }}>
        {whoami?.user?.quoteStockRequestsUsed} /{" "}
        {whoami?.user?.quoteStockRequestLimit}
      </p>

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
      {stock ? (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#1a1a1a",
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              marginBottom: "5px",
              fontSize: "28px",
              marginRight: "120px",
              marginLeft: "120px",
            }}
          >
            {stock.data.name}
          </h2>
          <p style={{ fontSize: "20px", color: "#aaa", marginBottom: "15px" }}>
            {stock.data.ticker}
          </p>

          <p
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            {stock.data.price} {stock.data.currency}
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
