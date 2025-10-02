import { useState } from "react";
import useRouteHomePage from "../useRouteHomepage";
import useQuote from "./QuoteHandler";
import { useAuth0 } from "@auth0/auth0-react";
import useFetchUser from "../useFetchUser";
import Panel from "../HomePage/Panel";

export default function Quote() {
  const [category, setCategory] = useState("life"); // you can change category
  const { user } = useAuth0();
  const whoami = useFetchUser(user);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

  const quote = useQuote(category);

  if (quote.status === "loading") return <p>Loading quote...</p>;
  if (quote.status === "error") return <p>Error loading quote</p>;

  if (quote.status === "apiError") return <p>{quote.error}</p>;

  console.log(category);

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
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <h1>Motivational Quotes</h1>

      <p style={{ marginBottom: "0px" }}>Request Used / Request Limit</p>
      <p style={{ marginBottom: "0px", marginTop: "0px" }}>
        (This is connected with your quote page)
      </p>
      <p style={{ marginTop: "5px" }}>
        {whoami?.user?.quoteStockRequestsUsed} /{" "}
        {whoami?.user?.quoteStockRequestLimit}
      </p>

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

      <button
        onClick={() => refresh()}
        style={{
          background: "rgba(255, 255, 255, 0.15)", // ✨ translucent card
          padding: "12px 20px",
          borderRadius: "14px",
          color: "white",
          marginBottom: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        Refresh Quote
      </button>
      <select
        onChange={(e) => setCategory(e.target.value)}
        style={{
          background: "rgba(255, 255, 255, 0.15)", // ✨ translucent card
          padding: "12px 20px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
        value={category}
      >
        <option value="life">Life</option>
        <option value="wisdom">Wisdom</option>
        <option value="inspirational">Inspirational</option>
        <option value="courage">Courage</option>
        <option value="leadership">Leadership</option>
        <option value="Freedom">Freedom</option>
      </select>
    </div>
  );
}
