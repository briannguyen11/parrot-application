import { ProfileDropDown } from "./ProfileDropDown";
import { SidebarPopup } from "../sidebar/SidebarPopup";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/search-icon.svg";
import { useEffect, useState } from "react";

import NotificationPopover from "./NotificationPopover";

const Navbar = () => {
  const navigate = useNavigate();

  const [border, setBorder] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 30; // Adjust this value to set the scroll threshold

      if (scrollY > threshold) {
        setBorder(true);
      } else {
        setBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigate = (path : string) => {
    setLoading(true);
    navigate(path);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the duration of the animation
  };

  return (
    <div className={`fixed top-0 left-0 w-full md:px-12 px-5 py-4 flex z-50 justify-between bg-white dark:bg-background h-[68px] transition duration-1000 ease-in-out  ${border && "shadow-light"}`}>
      {loading && (
          <div className="absolute bottom-0 left-0 h-[3px] bg-parrot-gradient  animate-loading-bar"></div>
        )}
      <div className="flex gap-10 items-center">
        <div className="flex justify-center items-center gap-5">
          <SidebarPopup />

          <div
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-4 hover:cursor-pointer"
          >
            <img
              src="../../icon.svg"
              alt="logo"
              className="w-6 h-6 object-cover select-none"
            />
            <h1 className="text-xl font-semibold font-raleway text-primary lg:block hidden select-none">
              PARROT
            </h1>
          </div>
        </div>

        <SearchBar />
        <div className="lg:flex gap-14 items-center hidden select-none">
          <h2
            onClick={() => handleNavigate("/")}
            className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground"
          >
            Explore
          </h2>
          <h2
            onClick={() => handleNavigate("/open-projects")}
            className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground"
          >
            Find Teams
          </h2>
          <h2
            onClick={() => handleNavigate("/create")}
            className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground"
          >
            Create Project
          </h2>
          <h2
            onClick={() => handleNavigate("/messages")}
            className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground"
          >
            Messages
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center select-none gap-x-4">
        <img
          src={SearchIcon}
          alt="search"
          className="md:hidden w-7 h-7 hover:bg-gray-200 p-1 rounded-full transition duration-300 ease-in-out hover:cursor-pointer"
        />

        <NotificationPopover />
        <div className="hover:cursor-pointer ml-2 ">
          <ProfileDropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
