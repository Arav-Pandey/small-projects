import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export default function useStock(ticker: string) {
  const { user } = useAuth0();
  const { data, isLoading, error } = useQuery({
    queryKey: ["stock", ticker],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/.netlify/functions/stock?ticker=${encodeURIComponent(ticker)}`,
        {
          method: "POST",
          body: JSON.stringify({
            id: user?.sub,
          }),
        }
      );

      const result = await response.json();
      return result;
    },
  });
  if (isLoading) return { status: "loading" as const };
  if (error) return { status: "error" as const, error };
  if (data?.error) return { status: "apiError" as const, error: data.error };

  return { status: "success" as const, data };
}
