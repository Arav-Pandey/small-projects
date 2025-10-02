import { useAuth0 } from "@auth0/auth0-react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, loginWithRedirect, user, error } =
    useAuth0();

  if (isLoading) {
    return <p>Loading authentication...</p>;
  }
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    loginWithRedirect();
    console.log("DEBUG AUTH:", { isAuthenticated, isLoading, user, error });
    return null;
  }

  return children;
}
