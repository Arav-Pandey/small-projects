import { useQuery } from "@tanstack/react-query";

export const handleSearch = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const query = e.target.value;
  if (query.length < 2) {
    setSearchResults([]);
    return;
  }

  // ✅ Use 'q' instead of 'city' so the backend receives the correct parameter
  fetch(`/.netlify/functions/search?q=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((data) => setSearchResults(data))
    .catch((err) => {
      console.error("Search error:", err);
      setSearchResults([]);
    });
};

export const useWeather = (city: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["weather", city],
    queryFn: () =>
      fetch(
        `/.netlify/functions/weather?city=${encodeURIComponent(city)}`
      ).then((res) => res.json()),
    enabled: !!city,
  });

  if (!city) return { status: "empty" as const };
  if (isLoading) return { status: "loading" as const };
  if (error) return { status: "error" as const, error };
  if (data?.error) return { status: "apiError" as const, error: data.error };
  return { status: "success" as const, data };
};
