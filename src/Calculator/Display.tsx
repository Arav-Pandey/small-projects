type Props = {
  num1: string;
  num2: string;
  setNum1: (val: string) => void;
  setNum2: (val: string) => void;
};

export default function Display({ num1, num2, setNum1, setNum2 }: Props) {
  return (
    <div style={{ marginBottom: 10 }}>
      <input
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="First number"
        style={{ marginRight: 5 }}
      />
      <input
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Second number"
      />
    </div>
  );
}
