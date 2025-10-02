import { useQuery } from "@tanstack/react-query";

export default function useQuote(category: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quote", category],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/.netlify/functions/quote`, {
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
  if (error) return { status: "error" as const };
  if (data?.error) return { status: "apiError" as const, error: data.error };

  return { status: "success" as const, data };
}
