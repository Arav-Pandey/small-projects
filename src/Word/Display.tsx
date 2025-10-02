import Panel from "../HomePage/Panel";

interface Props {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
  count: () => void;
  amount: number;
  amountChar: number;
  amountSpace: number;
  amountSentence: number;
}

export default function Display({
  isPanelOpen,
  setIsPanelOpen,
  setSentence,
  count,
  amount,
  amountChar,
  amountSpace,
  amountSentence,
}: Props) {
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

      <h1 style={{ marginBottom: "0px" }}>Word Count</h1>
      <h3>
        Enter a sentence and I will count how many words are in the sentence
      </h3>
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
