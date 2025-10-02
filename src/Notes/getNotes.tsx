import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export default function useGetNotes() {
  const { user } = useAuth0();
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch(".netlify/functions/getNotes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.sub}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch notes data");
      }
      const result = await response.json();
      return result;
    },
  });

  if (isLoading) return { status: "loading" as const };
  if (error) return { status: "error" as const, error };
  if (!data) return { status: "empty" as const, error: "No data returned" };

  return { status: "success" as const, data };
}
