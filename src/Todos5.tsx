import { useState, useEffect } from "react";
import HomeLogo from "./HomeLogo";

export default function Todos4() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(0);
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch("/.netlify/functions/money")
      .then((res) => res.json())
      .then((data) => {
        if (data.conversion_rates) {
          setRates(data.conversion_rates);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((err) => console.error("Error fetching rates:", err));
  }, []);

  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency, rates]);
  const convert = () => {
    const number = parseFloat(amount);
    if (isNaN(number)) {
      setResult(NaN);
      return;
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
      setResult(NaN);
      return;
    }

    // Correct conversion for base=USD API
    const convertedValue = (number / fromRate) * toRate;

    setResult(convertedValue);
  };

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
