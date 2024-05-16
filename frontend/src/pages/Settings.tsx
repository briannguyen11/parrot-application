import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);




  
  useEffect(() => {
    document.title = `Settings | Parrot`;

    // Get dark mode from local storage
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      setDarkMode(JSON.parse(darkMode));
      if (JSON.parse(darkMode)) {
        document.body.classList.add("dark");
      }

    }

  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    document.body.classList.toggle("dark");
  }

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-background  mt-16 w-full">
        <div className="p-10 md:w-1/2 min-w-[700px] w-full">
          <p
            onClick={() => navigate(-1)}
            className="text-sm text-secondary-foreground underline cursor-pointer"
          >
            {"<- Back"}
          </p>
          <h1 className="mt-5 font-semibold text-2xl text-left text-primary">Settings</h1>

          <div className="mt-12 pb-5 border-b flex flex-row justify-between items-end">
            <div>
              <h2 className="font-light text-primary">Appearance</h2>

              <p className=" font-extralight text-primary-foreground mt-2">{darkMode ? 'Dark' : 'Light'}</p>
            </div>
            <button onClick={toggleDarkMode} className="text-sm text-secondary border p-2 rounded-lg dark:bg-white">
              Dark Mode Toggle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
