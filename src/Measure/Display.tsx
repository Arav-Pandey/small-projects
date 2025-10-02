import Switch from "../switch";

type Props = {
  num: string;
  setNum: (val: string) => void;
  className: string;
  handleClass: () => void;
};

export default function Display({
  num,
  setNum,
  className,
  handleClass,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      {/* Input box */}
      <input
        className={className}
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        placeholder="Enter value"
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "12px",
          width: "200px",
        }}
      />

      <Switch className={className} handleClass={handleClass} />
    </div>
  );
}
