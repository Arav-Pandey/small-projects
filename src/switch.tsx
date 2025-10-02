import { RxSwitch } from "react-icons/rx";

type Props = {
  className: string;
  handleClass: () => void;
};

export default function Switch({ className, handleClass }: Props) {
  return (
    <button
      onClick={handleClass}
      style={{
        border: "none",
        background: "none",
        outline: "none",
        padding: 0,
      }}
    >
      <div style={{ position: "relative", width: "40px", height: "40px" }}>
        {/* Switch icon */}
        {className === "led-input" ? (
          <RxSwitch size={40} color="gray" />
        ) : (
          <RxSwitch
            size={40}
            color="gray"
            style={{ transform: "scaleX(-1)" }}
          />
        )}

        {/* Moving black circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: className === "led-input" ? "70%" : "30%",
            transform: "translate(-50%, -50%)",
            width: "17px",
            height: "18px",
            backgroundColor: "black",
            borderRadius: "50%",
            transition: "left 0.3s ease",
            pointerEvents: "none",
          }}
        ></div>
      </div>
    </button>
  );
}
