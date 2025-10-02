import { MdInvertColorsOff } from "react-icons/md";

interface Props {
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function Colors({ setBackgroundColor }: Props) {
  function Circle(color: string) {
    return {
      backgroundColor: color,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "black",
      padding: 0,
      cursor: "pointer",
      marginLeft: "5px",
    };
  }
  function Onclick(e: string) {
    setBackgroundColor(e);
  }

  return (
    <div>
      <button style={Circle("black")} onClick={() => Onclick("black")}>
        <MdInvertColorsOff size={20} />
      </button>
      <button style={Circle("red")} onClick={() => Onclick("red")} />
      <button style={Circle("orange")} onClick={() => Onclick("orange")} />
      <button style={Circle("blue")} onClick={() => Onclick("blue")} />
    </div>
  );
}
