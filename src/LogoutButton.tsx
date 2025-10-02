import { useAuth0 } from "@auth0/auth0-react";
import { RiLogoutCircleLine } from "react-icons/ri";
import HoverSettings from "./HoverSettings";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      style={{
        marginBottom: "10px",
        padding: "10px 20px",
        fontSize: "16px",
        border: "none",
        background: "none",
        outline: "none",
        marginTop: "0px",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "80px",
      }}
    >
      <HoverSettings
        name="Log out"
        icon={<RiLogoutCircleLine size={40} fill={"white"} />}
      />
    </button>
  );
};

export default LogoutButton;
