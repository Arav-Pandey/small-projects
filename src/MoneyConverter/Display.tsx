import { useAuth0 } from "@auth0/auth0-react";
import Panel from "../HomePage/Panel";
import Switch from "../switch";
import useFetchUser from "../useFetchUser";
import type { SetStateAction } from "react";

interface Props {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
  handleClass: () => void;
  amount: string;
  setAmount: React.Dispatch<SetStateAction<string>>;
  fromCurrency: string;
  setFromCurrency: React.Dispatch<SetStateAction<string>>;
  rates: any;
  toCurrency: string;
  setToCurrency: React.Dispatch<SetStateAction<string>>;
  result: number;
}

export default function Display({
  isPanelOpen,
  setIsPanelOpen,
  className,
  handleClass,
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  rates,
  toCurrency,
  setToCurrency,
  result,
}: Props) {
  const { user } = useAuth0();
  const whoami = useFetchUser(user);

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
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />

      <h1 style={{ marginBottom: "2px" }}>Money Converter</h1>
      <p style={{ marginBottom: "0px" }}>Requests Used / Request Limit</p>
      <p style={{ marginTop: "5px" }}>
        {whoami?.user?.moneyRequestsUsed} / {whoami?.user?.moneyRequestLimit}
      </p>

      <Switch className={className} handleClass={handleClass} />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={className}
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
