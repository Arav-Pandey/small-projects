import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useRouteLimit() {
  const navigate = useNavigate();
  const hasChecked = useRef(false); // 👈 Prevents double runs

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    async function checkLimit() {
      try {
        const response = await fetch("/.netlify/functions/whoami", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          alert("You are not authenticated. :(");
          navigate("/homepage");
          return;
        }

        const data = await response.json();
        const { user } = data;

        if (user.weatherRequestsUsed >= user.weatherRequestLimit) {
          alert(
            "You reached your max requests for this site. BYEEEEEEEEEEEEEEEEEE👋👋👋👋👋👋"
          );
          navigate("/homepage");
        }
      } catch (err) {
        console.error("Error checking route limit:", err);
        alert("Error checking route limit. :(");
        navigate("/homepage");
      }
    }

    checkLimit();
  }, [navigate]);
}
