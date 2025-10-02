import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export const useMoney = () => {
  const { user } = useAuth0();
  const { data, error, isLoading } = useQuery({
    queryKey: ["moneyRates"],
    queryFn: async () => {
      const response = await fetch("/.netlify/functions/money", {
        method: "POST",
        body: JSON.stringify({
          id: user?.sub,
        }),
      });

      const result = await response.json();
      return result;
    },
  });

  if (isLoading) return { status: "loading" as const };
  if (error) return { status: "error" as const, error };
  if (data?.error) return { status: "apiError" as const, error: data.error };
  if (!data?.conversion_rates)
    return { status: "empty" as const, error: "No conversion rates found" };

  return { status: "success" as const, data };
};
