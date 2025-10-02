interface CustomAlertProps {
  customAlert: string | null;
  setCustomAlert: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CustomAlert({
  customAlert,
  setCustomAlert,
}: CustomAlertProps) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {customAlert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "15px 25px",
            borderRadius: "10px",
            fontSize: "18px",
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          onClick={() => setCustomAlert(null)} // click to close
        >
          {customAlert}
        </div>
      )}
    </div>
  );
}
