import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState, useEffect } from "react";
// import api from "../api";
// import { ACCESS_TOKEN, FIRST_NAME, LAST_NAME, PFP } from "@/constants";

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
        <div className="md:px-7 px-5 bg-slate-50 dark:bg-background bg-fixed flex flex-row h-full min-h-home">
          <div className="lg:block hidden bg-white">
            <Sidebar />
          </div>
          <div className="lg:ml-56 w-full h-full lg:pl-1 flex lg:justify-start justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
