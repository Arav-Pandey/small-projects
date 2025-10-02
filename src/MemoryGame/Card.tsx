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
    setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>,
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
  const [disabled, setDisabled] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const hasRun = useRef(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (flippedCards === 0) {
      hasRun.current = false;
      setIsCardFlipped(false);
      onClose(() => {}, setDisabled);
    }

    if (flippedCards === 2 && !hasRun.current) {
      setDisabled(true);
      useEffectCode(setIsCorrect, text, setDisabled);
      hasRun.current = true;
    }
  }, [flippedCards, card1, card2]);

  return (
    <button
      disabled={disabled}
      className="card"
      onClick={() => {
        if (disabled) return;
        setDisabled(true);
        setIsCardFlipped(true);
        onCardFlipped(text);
      }}
      style={{ background: "transparent", border: "none", outline: "none" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className={`card-inner ${isCardFlipped ? "flipped" : ""}`}>
        {/* Front */}
        <div
          className="card-face card-front"
          style={{ borderRadius: "10px", background: "none" }}
        >
          <img
            style={{
              background: "black",
              borderRadius: "10px",
              width: "90%",
              height: "90%",
              objectFit: "contain",
            }}
            src={isCorrect ? text : "a.png"}
            alt="Back of card"
          />
        </div>

        {/* Back */}
        <div
          className="card-face card-back"
          style={{ borderRadius: "10px", background: "none" }}
        >
          <img
            style={{
              background: "black",
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={text}
            alt="Card"
          />
        </div>
      </div>
    </button>
  );
}
