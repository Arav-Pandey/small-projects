import { useState, useEffect } from "react";
import HomeLogo from "./HomeLogo";
import routeHomePage from "./routeHomepage";

export default function Word() {
  const [amount, setAmount] = useState(0);
  const [sentence, setSentence] = useState("");
  const [amountChar, setAmountChar] = useState(0);
  const [amountSpace, setAmountSpace] = useState(0);
  const [amountSentence, setAmountSentence] = useState(0);

  routeHomePage();

  useEffect(() => {
    count();
    countChar();
    countSpace();
    countAmountSentence();
  }, [sentence]);

  const count = () => {
    if (sentence.trim().length === 0) {
      setAmount(0);
      return;
    }

    const words = sentence.trim().split(/\s+/);
    setAmount(words.length);
  };
  const countChar = () => {
    if (sentence.trim().length === 0) {
      setAmountChar(0);
      return;
    }

    const characters = sentence.length + 1;
    setAmountChar(characters);
  };

  const countSpace = () => {
    if (sentence.trim().length === 0) {
      setAmountSpace(0);
      return;
    }

    let count = 0;
    for (let i = 0; i < sentence.length; i++) {
      if (sentence.substring(i, i + 1) === " ") {
        count++;
      }
    }
    setAmountSpace(count);
  };

  const countAmountSentence = () => {
    if (sentence.trim().length === 0) {
      setAmountSentence(0);
      return;
    }

    let count = 0;
    for (let i = 0; i < sentence.length; i++) {
      if (sentence.substring(i, i + 1) === ".") {
        count++;
      }
    }
    setAmountSentence(count);
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
      <h1 style={{ marginBottom: "0px" }}>Word Count</h1>
      <h3>
        Enter a sentence and I will count how many words are in the sentence
      </h3>
      <HomeLogo />
      <input
        type="text"
        onChange={(e) => {
          setSentence(e.target.value);
          count();
        }}
        style={{ borderRadius: "10px", fontSize: "20px" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>
          <strong>There are </strong>
          {amount !== null
            ? isNaN(amount)
              ? "Invalid input"
              : `${amount} word(s) in your sentence`
            : "-"}
        </div>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>
          <strong style={{ fontSize: "20px", marginBottom: "15px" }}>
            {" "}
            {"                  "}With{" "}
          </strong>
          {amountChar !== null
            ? isNaN(amountChar)
              ? "Invalid input"
              : `${amountChar} character(s) in your sentence`
            : "-"}
        </div>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>
          <strong style={{ fontSize: "20px", marginBottom: "15px" }}>
            {"                     "} Along with{" "}
          </strong>
          {amountSpace !== null
            ? isNaN(amountSpace)
              ? "Invalid input"
              : `${amountSpace} space(s) in your sentence`
            : "-"}
        </div>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>
          <strong style={{ fontSize: "20px", marginBottom: "15px" }}>
            {"                      "} Plus{" "}
          </strong>
          {amountSentence !== null
            ? isNaN(amountSentence)
              ? "Invalid input"
              : `${amountSentence} sentenece(s) in your sentence`
            : "-"}
        </div>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>
          <strong style={{ fontSize: "20px", marginBottom: "15px" }}>
            {"                      "} And{" "}
          </strong>
          {amountChar !== null
            ? isNaN(amountChar)
              ? "Invalid input"
              : `${
                  amountChar - amountSpace
                } character(s) without spaces in your sentence`
            : "-"}
        </div>
      </div>
    </div>
  );
}
