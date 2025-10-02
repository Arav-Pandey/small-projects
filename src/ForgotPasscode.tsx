import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import CustomAlert from "./CustomAlert";

export default function HomePage() {
  const [newUsername, setNewUsername] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [see, setSee] = useState("password");
  const [customAlert, setCustomAlert] = useState<string | null>(null);

  const handleReset = () => {
    setCustomAlert("✅ Passcode reset successful!");
    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPasscode);
    setTimeout(() => {
      window.location.href = "/"; // Redirect to login page after 100 milliseconds
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <h1>Forgot Passcode</h1>
      <a href="/">Go back to login</a>
      <input
        type="text"
        placeholder="Enter your new username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
      />
      <div>
        <input
          type={see}
          value={newPasscode}
          onChange={(e) => setNewPasscode(e.target.value)}
          placeholder="Enter your new passcode"
          style={{
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
            marginLeft: "35px",
          }}
        />
        <button
          onClick={(e) => {
            if (see === "password") {
              setSee("text");
              return;
            } else setSee("password");
          }}
          style={{
            background: "none", // remove default button background
            border: "none", // remove border
            cursor: "pointer", // make it clickable
            width: "5px",
            height: "5px",
            justifyContent: "center",
            alignContent: "center",
            outline: "none",
          }}
        >
          {see === "password" ? (
            <VscEye size={30} />
          ) : (
            <VscEyeClosed size={30} />
          )}
        </button>
      </div>
      <button
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        onClick={() => handleReset()}
      >
        Reset Passcode
      </button>
      <CustomAlert customAlert={customAlert} setCustomAlert={setCustomAlert} />
    </div>
  );
}
