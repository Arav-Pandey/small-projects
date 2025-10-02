import { useAuth0 } from "@auth0/auth0-react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout, user, error } = useAuth0();

  if (isLoading) {
    return <p>Loading authentication...</p>;
  }
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    logout({ logoutParams: { returnTo: window.location.origin } });
    console.log("DEBUG AUTH:", { isAuthenticated, isLoading, user, error });
    return null;
  }

  return children;
}
