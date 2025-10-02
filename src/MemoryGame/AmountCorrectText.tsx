type AmountCorrectTextProps = {
  amountCorrect: number;
};

export default function AmountCorrectText({
  amountCorrect,
}: AmountCorrectTextProps) {
  return (
    <h3 style={{ marginTop: "10px", marginBottom: "5px" }}>
      Amount Correct: {amountCorrect} / 8
    </h3>
  );
}
