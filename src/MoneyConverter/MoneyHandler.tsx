import { useQuery } from "@tanstack/react-query";

export const useMoney = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["moneyRates"],
    queryFn: async () => {
      const token = localStorage.getItem("token"); // ✅ use auth if required
      const response = await fetch("/.netlify/functions/money", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
