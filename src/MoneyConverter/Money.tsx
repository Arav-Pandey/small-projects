import { useState, useEffect } from "react";
import useRouteHomePage from "../useRouteHomepage";
import { useMoney } from "./MoneyHandler"; // adjust import path
import Display from "./Display";

export default function Money() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(0);
  const [className, setClassName] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleClass = () => {
    setClassName((prev) => (prev === "led-input" ? "" : "led-input"));
  };

  useRouteHomePage();

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
  if (money.status === "error") return <div>Error loading rates</div>;
  if (money.status === "apiError") return <div>API Error: {money.error}</div>;

  const rates = money.data?.conversion_rates || {};

  return (
    <Display
      isPanelOpen={isPanelOpen}
      setIsPanelOpen={setIsPanelOpen}
      className={className}
      handleClass={handleClass}
      amount={amount}
      setAmount={setAmount}
      fromCurrency={fromCurrency}
      setFromCurrency={setFromCurrency}
      rates={rates}
      toCurrency={toCurrency}
      setToCurrency={setToCurrency}
      result={result}
    />
  );
}
