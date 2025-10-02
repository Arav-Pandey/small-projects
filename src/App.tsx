import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import CustomAlert from "./CustomAlert";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [see, setSee] = useState("password");
  const [customAlert, setCustomAlert] = useState<string | null>(null);

  const handleLogin = () => {
    if (
      username === localStorage.getItem("username") &&
      password === localStorage.getItem("password")
    ) {
      setCustomAlert(`✅ Logged in as ${username}`);
      setTimeout(() => {
        navigate("/homepage");
      }, 1000);
    } else {
      alert("Invalid credentials");
    }
  };
  const handleForgotPasscode = () => {
    navigate("/forgotpasscode"); // ✅ route to forgot passcode
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
      <h1>Login Screen</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          style={{
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
            marginRight: "10px",
          }}
          onChange={(e) => setUsername(e.target.value)} // ✅ update state
        />
        <input
          type={see}
          placeholder="Password"
          style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
          onChange={(e) => setPassword(e.target.value)} // ✅ update state
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "30px",
          }}
          onClick={handleForgotPasscode} // ✅ route to forgot passcode
        >
          Forgot Passcode
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <LuLogIn
            size={40}
            style={{ cursor: "pointer" }}
            onClick={handleLogin}
          />
          <span style={{ fontSize: "18px" }}>Login</span>
        </div>
      </div>
      <CustomAlert customAlert={customAlert} setCustomAlert={setCustomAlert} />
    </div>
  );
}

export default App;
