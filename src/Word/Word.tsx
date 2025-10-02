import { useState, useEffect } from "react";
import useRouteHomePage from "../useRouteHomepage";
import Display from "./Display";

export default function Word() {
  const [amount, setAmount] = useState(0);
  const [sentence, setSentence] = useState("");
  const [amountChar, setAmountChar] = useState(0);
  const [amountSpace, setAmountSpace] = useState(0);
  const [amountSentence, setAmountSentence] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

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
    <Display
      isPanelOpen={isPanelOpen}
      setIsPanelOpen={setIsPanelOpen}
      setSentence={setSentence}
      count={count}
      amount={amount}
      amountChar={amountChar}
      amountSentence={amountSentence}
      amountSpace={amountSpace}
    />
  );
}
