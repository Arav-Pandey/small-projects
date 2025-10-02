import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function routeHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (!user || !token) {
      navigate("/");
    }
  }, [navigate]);
}
