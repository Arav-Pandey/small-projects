import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";

export default function useMakeNotes({
  onError,
  onSuccess,
}: {
  onError: (error: Error) => void;
  onSuccess: () => void;
}) {
  const { user } = useAuth0();

  const mutation = useMutation({
    mutationKey: ["notes"],
    mutationFn: async (text: string) => {
      const response = await fetch(".netlify/functions/notes", {
        method: "POST",
        body: JSON.stringify({
          text: text,
        }),
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
    onSuccess,
    onError,
  });

  return { status: "success" as const, mutation };
}
