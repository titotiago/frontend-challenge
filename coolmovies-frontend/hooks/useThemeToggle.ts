import { useState, useEffect } from "react";

const useThemeToggle = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") as "light" | "dark";
    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode("light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return { mode, toggleTheme };
};

export default useThemeToggle;
