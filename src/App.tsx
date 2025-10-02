import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import CustomAlert from "./CustomAlert";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [see, setSee] = useState("password");
  const [customAlert, setCustomAlert] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Invalid credentials");
        return;
      }

      // ✅ Store JWT in localStorage or sessionStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);

      setCustomAlert(`✅ Logged in as ${username}`);

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/homepage");
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Network error — could not reach server.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
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
            marginBottom: "20px",
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
          onClick={handleRegister} // ✅ route to forgot passcode
        >
          Create new account
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
