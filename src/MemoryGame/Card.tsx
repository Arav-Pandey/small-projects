import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;

  onCardFlipped: (random: string) => void;

  flippedCards: number;

  onClose: (
    setVisText: React.Dispatch<React.SetStateAction<string>>,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;

  setFlippedCards: React.Dispatch<React.SetStateAction<number>>;

  useEffectCode: (
    setVisText: React.Dispatch<React.SetStateAction<string>>,
    text: string,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  card1: string;
  card2: string;
}

export default function Card({
  text,
  onCardFlipped,
  flippedCards,
  onClose,
  useEffectCode,
  card1,
  card2,
}: Props) {
  const [mouseSetting, setMouseSetting] = useState<string>("pointer");
  const [visText, setVisText] = useState("hi");
  const [disabled, setDisabled] = useState(false);
  const hasRun = useRef(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => {
    if (!disabled) setMouseSetting("pointer");
    if (disabled) setMouseSetting("not-allowed");

    if (flippedCards === 0) {
      hasRun.current = false;
      console.log(hasRun.current);
    }

    if (flippedCards === 0 && visText !== "Correct!") {
      onClose(setVisText, setDisabled);
      hasRun.current = false;
      setIsCardFlipped(false);
    }

    if (flippedCards === 2 && !hasRun.current) {
      setDisabled(true);
      useEffectCode(setVisText, text, setDisabled);
      hasRun.current = true;
    }
  }, [disabled, flippedCards, card1, card2]);

  return (
    <button
      disabled={disabled}
      style={{
        marginRight: "40px",
        padding: "30px 30px",
        fontSize: "20px",
        marginTop: "20px",
        cursor: mouseSetting,
        width: "230px",
        height: "230px",
      }}
      onClick={() => {
        setDisabled(true);
        onCardFlipped(text);
        setVisText(text);
        setIsCardFlipped(true);
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {isCardFlipped ? (
        <img src={text} alt="Hi" />
      ) : (
        <img src={"a.png"} alt="HI" />
      )}
    </button>
  );
}
