import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="place-content-center grid"
    >
      <Switch id="theme" />
      {/* {theme === "dark" ? "Light Mode" : "Dark Mode"} */}
    </button>
  );
};

export default ThemeToggle;
