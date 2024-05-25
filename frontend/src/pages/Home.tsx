import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check user preference from local storage
    const storedDarkMode = localStorage.getItem("darkMode");

    if (storedDarkMode === null) {
      localStorage.setItem("darkMode", "false");
    }

    setIsDarkMode(storedDarkMode === "true");
  }, []);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar />

      <div className="mt-16 h-full ">
        <div className="md:px-12 px-5 dark:bg-background bg-fixed flex flex-row h-full min-h-home">
          
          <div className="w-full h-full flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
