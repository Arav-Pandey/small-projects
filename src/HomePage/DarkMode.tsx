import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { VscColorMode } from "react-icons/vsc";

interface Props {
  children: ReactNode;
}

const DarkModeContext = createContext<
  | {
      // Ask Logan why the "|" is there. If you remove it, no error comes.
      darkMode: boolean;
      setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useDarkModeContext = () => {
  return useContext(DarkModeContext);
};

export function DarkModeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default function DarkMode() {
  const darkModeContext = useDarkModeContext();
  if (!darkModeContext) {
    throw new Error("This should never happen......");
  }
  const { darkMode, setDarkMode } = darkModeContext;

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored) document.documentElement.classList.add(stored);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      style={{ background: "none", border: "none", outline: "none" }}
    >
      <VscColorMode size={40} />
    </button>
  );
}
