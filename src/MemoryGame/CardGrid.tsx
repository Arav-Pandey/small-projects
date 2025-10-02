import AmountCorrectText from "./AmountCorrectText";
import Card from "./Card.tsx";

interface Props {
  flippedCards: number;

  shuffledText: string[];

  onCardFlipped: (random: string) => void;

  onClose: (
    setVisText: React.Dispatch<React.SetStateAction<string>>,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;

  setFlippedCards: React.Dispatch<React.SetStateAction<number>>;

  useEffectCode: (
    setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    ranText: string,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;

  card1: string;
  card2: string;
  amountCorrect: number;
  totalMoves: React.MutableRefObject<number>;
}

export default function CardGrid({
  flippedCards,
  shuffledText,
  onCardFlipped,
  onClose,
  setFlippedCards,
  useEffectCode,
  card1,
  card2,
  amountCorrect,
  totalMoves,
}: Props) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ marginTop: "10px", marginBottom: "5px" }}>
        Flipped Cards: {flippedCards}
      </h3>
      <AmountCorrectText amountCorrect={amountCorrect} />
      <h3 style={{ marginTop: "10px", marginBottom: "5px" }}>
        Total Moves: {totalMoves.current}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {shuffledText.map((t, i) => (
          <Card
            key={i}
            text={t}
            onCardFlipped={onCardFlipped}
            flippedCards={flippedCards}
            onClose={onClose}
            setFlippedCards={setFlippedCards}
            useEffectCode={useEffectCode}
            card1={card1}
            card2={card2}
          />
        ))}
      </div>
    </div>
  );
}
