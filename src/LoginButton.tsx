import { useAuth0 } from "@auth0/auth0-react";

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
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        border: "none",
        background: "rgba(0, 200, 255, 0.2)",
        outline: "none",
        marginRight: "20px",
        color: "rgba(40, 45, 47, 1)",
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
