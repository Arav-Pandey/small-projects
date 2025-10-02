import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function routeHomePage() {
  const navigate = useNavigate();
  const { getIdTokenClaims, logout } = useAuth0();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    async function checkExperation() {
      const token = await getIdTokenClaims();
      if (!token) return;
      if (!token.exp) return;

      const expTime = token.exp * 1000; // convert miliseconds
      const now = Date.now();

      const timeLeft = expTime - now;

      if (timeLeft <= 0) {
        alert(
          "Your token has expired. Please re-login to make sure you are valid"
        );

        logout({ logoutParams: { returnTo: window.location.origin } });
        return;
      }

      setTimeout(() => {
        alert(
          "Your token has expired. Please re-login to make sure you are valid"
        );

        logout({ logoutParams: { returnTo: window.location.origin } });
      }, timeLeft);
    }

    checkExperation();
  }, [navigate, logout, getIdTokenClaims]);
}
