import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Navigate, useNavigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [see, setSee] = useState("password");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMessage(""); // reset message

    if (!username || !password) {
      setMessage("Please fill out both fields.");
      return;
    }

    try {
      const res = await fetch("/.netlify/functions/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
      } else {
        setMessage(data.message);
        setUsername("");
        setPassword("");
        setTimeout(() => {
          navigate("/");
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error — could not reach server.");
    }
  };

  return (
    <div style={{ minHeight: "50vh" }}>
      <h1>Create an account</h1>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
            marginRight: "10px",
          }}
        />

        <input
          type={see}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
        />

        <button
          onClick={() => setSee(see === "password" ? "text" : "password")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
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
        onClick={handleRegister}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          border: "none",
          background: "none",
          outline: "none",
          marginRight: "10px",
        }}
      >
        Sign up
      </button>

      {message && <p>{message}</p>}

      <a href="/">Already have an account?</a>
    </div>
  );
}
