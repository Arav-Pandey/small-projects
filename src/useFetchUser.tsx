import type { User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

type WhoAmIResponse = {
  user: {
    weatherRequestLimit: number;
    weatherRequestsUsed: number;
    quoteStockRequestsUsed: number;
    quoteStockRequestLimit: number;
    moneyRequestLimit: number;
    moneyRequestsUsed: number;
    measureRequestsUsed: number;
    measureRequestLimit: number;
  };
};
export default function useFetchUser(user: User | undefined) {
  const [data, setData] = useState<WhoAmIResponse | null>(null);

  useEffect(() => {
    if (!user?.sub) return;

    async function fetchUser() {
      const res = await fetch("/.netlify/functions/whoami", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.sub, // backend expects "id"
        }),
      });

      const result = await res.json();
      setData(result);
    }

    fetchUser();
  }, [user]);
  return data;
}
