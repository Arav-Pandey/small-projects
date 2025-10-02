import { useState } from "react";
import CustomAlert from "./CustomAlert";
import { useNavigate } from "react-router";

export default function ForgotPasscode() {
  const [newPasscode, setNewPasscode] = useState("");
  const [username, setUsername] = useState("");
  const [customAlert, setCustomAlert] = useState<string | null>(null);
  const navigate = useNavigate();

  const resetPasscode = async () => {
    if (!username || !newPasscode) {
      alert("Please fill in both fields.");
      return;
    }

    const response = await fetch(`/.netlify/functions/forgotPasscode`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: newPasscode,
      }),
    });

    if (!response.ok) setCustomAlert("🚫 User not found");
    else {
      setCustomAlert(`✅ Reset Password successful!`);

      // ✅ Redirect after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
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

      <input
        type="text"
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter you same username... "
      />
      <input
        type="password"
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
        onChange={(e) => setNewPasscode(e.target.value)}
        placeholder="Enter new passcode here..."
      />
      <div>
        <button
          style={{
            marginBottom: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            border: "none",
            background: "rgba(0, 200, 255, 0.2)",
            outline: "none",
            marginRight: "20px",
            color: "rgba(40, 45, 47, 1)",
          }}
          onClick={() => resetPasscode()}
        >
          Reset Passcode
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            border: "none",
            background: "rgba(0, 200, 255, 0.2)",
            outline: "none",
            marginRight: "20px",
            color: "rgba(40, 45, 47, 1)",
          }}
          onClick={() => navigate("/")}
        >
          Remember it now?
        </button>
      </div>
      <CustomAlert customAlert={customAlert} setCustomAlert={setCustomAlert} />
    </div>
  );
}
