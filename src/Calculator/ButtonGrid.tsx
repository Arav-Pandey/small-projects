import Button from "./Button";
import "./ButtonGrid.css"; // 👈 we’ll make this file next

type Props = {
  buttonValueChunks: string[][];
  state: {
    num1: string;
    num2: string;
    op: string | null;
    result: number | null;
  };
  setState: {
    setNum1: (val: string | ((prev: string) => string)) => void;
    setNum2: (val: string | ((prev: string) => string)) => void;
    setOp: (op: string | null) => void;
    setResult: (res: number | null) => void;
  };
  handlers: any;
};

export default function ButtonGrid({
  buttonValueChunks,
  state,
  setState,
  handlers,
}: Props) {
  return (
    <div className="button-grid">
      {buttonValueChunks.map((row, rowIdx) => (
        <div key={rowIdx} className="button-row">
          {row.map((buttonValue, colIdx) => (
            <Button
              key={colIdx}
              value={buttonValue}
              state={state}
              setState={setState}
              handlers={handlers}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
