import ClosedPanel from "./ClosedPanel";
import SidePanel from "./SidePanel";

export default function Panel({
  isPanelOpen,
  setIsPanelOpen,
}: {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <ClosedPanel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />

      <SidePanel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
    </>
  );
}
