import LoginButton from "../LoginButton";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: "30px" }}>
        Get started by signing in to your account
      </p>
      <p
        style={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        This login is securely managed by Auth0, a widely trusted authentication
        service. If you’re unsure, you’re welcome to look into Auth0 before
        continuing.
      </p>
      <LoginButton />
    </div>
  );
}
