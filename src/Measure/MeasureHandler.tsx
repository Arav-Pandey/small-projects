import { useQuery } from "@tanstack/react-query";

interface MeasureData {
  result: number;
  measureRequestsUsed: number;
  measureRequestLimit: number;
}

export default function useMeasure(
  num: string,
  fromUnit: string,
  toUnit: string
) {
  const { data, error, isLoading } = useQuery<MeasureData>({
    queryKey: ["measure", num, fromUnit, toUnit],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const params = new URLSearchParams({
        num,
        fromUnit,
        toUnit,
      });

      const response = await fetch(
        `/.netlify/functions/measure?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch measure data");
      }

      const result = await response.json();
      return result as MeasureData;
    },
    enabled: !!num && !!fromUnit && !!toUnit, // only fetch if inputs exist
  });

  if (isLoading) return { status: "loading" as const };
  if (error) return { status: "error" as const, error };
  if (!data) return { status: "empty" as const, error: "No data returned" };

  return { status: "success" as const, data };
}
