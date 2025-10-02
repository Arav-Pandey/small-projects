import { useState, useEffect } from "react";
import HomeLogo from "../HomeLogo";
import routeHomePage from "../routeHomepage";
import { useMoney } from "./MoneyHandler"; // adjust import path

export default function Todos4() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(0);

  routeHomePage();

  const money = useMoney();

  useEffect(() => {
    if (money.status === "success" && money.data?.conversion_rates) {
      const number = parseFloat(amount);
      if (isNaN(number)) {
        setResult(NaN);
        return;
      }

      const rates = money.data.conversion_rates;
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];

      if (!fromRate || !toRate) {
        setResult(NaN);
        return;
      }

      // ✅ Convert using base USD
      const convertedValue = (number / fromRate) * toRate;
      setResult(convertedValue);
    }
  }, [amount, fromCurrency, toCurrency, money.data]);

  if (money.status === "loading") return <div>Loading rates...</div>;
  if (money.status === "error")
    return (
      <div>
        Error loading rates <HomeLogo />
      </div>
    );
  if (money.status === "apiError")
    return (
      <div>
        API Error: {money.error} <HomeLogo />
      </div>
    );

  const rates = money.data?.conversion_rates || {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "2px" }}>Money Converter</h1>

      <HomeLogo />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />
      <div>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
            borderRadius: "7px",
          }}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "7px" }}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        Result:{" "}
        <strong>
          {amount} {fromCurrency} ={" "}
          {isNaN(result)
            ? "Invalid input"
            : result.toFixed(2) + " " + toCurrency}
        </strong>
      </div>
    </div>
  );
}
