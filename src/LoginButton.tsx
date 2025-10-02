import { useAuth0 } from "@auth0/auth0-react";
import { IoMdLogIn } from "react-icons/io";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        marginBottom: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        border: "none",
        background: "none",
        outline: "none",
      }}
    >
      <IoMdLogIn size={40} />
      <p style={{ marginTop: "0px", marginBottom: "0px", fontSize: "20px" }}>
        Log In
      </p>
    </button>
  );
};

export default LoginButton;
