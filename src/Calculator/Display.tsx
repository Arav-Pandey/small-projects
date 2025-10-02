type Props = {
  num1: string;
  num2: string;
  setNum1: (val: string) => void;
  setNum2: (val: string) => void;
};

export default function Display({ num1, num2, setNum1, setNum2 }: Props) {
  return (
    <div style={{ marginBottom: 10, display: 'flex', gap: 8 }}>
      <div className="led-wrapper">
        <input
          className="led-input-element"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="First number"
        />
        <span className="led-dot" aria-hidden />
      </div>

      <div className="led-wrapper">
        <input
          className="led-input-element"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Second number"
        />
        <span className="led-dot" aria-hidden />
      </div>
    </div>
  );
}
