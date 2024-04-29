import { ProfileDropDown } from "./ProfileDropDown";
import { SidebarPopup } from "./SidebarPopup";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/search-icon.svg";
import CodeIcon from "../assets/icons/code.svg";

import NotificationPopover from "./NotificationPopover";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full md:px-7 px-5 md:py-3 py-4 flex border-b border-gray-200 z-50 justify-between bg-white ">
      <div className="flex justify-center items-center gap-5 hover:cursor-pointer ">
        <SidebarPopup />

        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-4"
        >
          <img
            src="../../icon.svg"
            alt="logo"
            className="w-6 h-6 object-cover select-none"
          />
          <h1 className="text-[23px] font-medium text-primary lg:block hidden select-none">
            PARROT
          </h1>
        </div>
      </div>

      <SearchBar />

      <div className="flex items-center justify-center select-none gap-x-4">
        <img
          src={SearchIcon}
          alt="search"
          className="md:hidden w-7 h-7 hover:bg-gray-200 p-1 rounded-full transition duration-300 ease-in-out hover:cursor-pointer"
        />

        <div
          onClick={() => navigate("create")}
          className="hover:cursor-pointer  md:hover:bg-gray-200 flex justify-center items-center pr-3 pl-2 md:py-1 rounded-full gap-x-1"
        >
          <img
            src={CodeIcon}
            alt="search"
            className="w-8 h-8 md:hover:bg-inherit hover:bg-gray-200 p-1 rounded-xl transition duration-300 ease-in-out"
          />
          <h4 className="font-normal text-sm text-primary md:flex hidden">
            Create Project
          </h4>
        </div>

        <NotificationPopover />
        <div className="hover:cursor-pointer ml-2 ">
          <ProfileDropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
