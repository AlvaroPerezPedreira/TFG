import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};

export const ThemeContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [color, setColor] = useState();

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      setColor("warning");
    } else {
      document.body.classList.remove("dark");
      setColor("primary");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ color, dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
