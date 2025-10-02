import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function routeHomePage() {
  const navigate = useNavigate();
  return useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login if not logged in
    }
  }, []);
}
