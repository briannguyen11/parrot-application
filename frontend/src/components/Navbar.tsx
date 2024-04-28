import { ProfileDropDown } from "./ProfileDropDown";
import { SidebarPopup } from "./SidebarPopup";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

import NotificationPopover from "./NotificationPopover";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full md:px-7 px-5 py-3 flex border-b border-gray-200 z-50 justify-between bg-white ">
      <div className="flex justify-center items-center gap-5 hover:cursor-pointer">
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
          <h1 className="text-[23px] font-medium lg:block hidden select-none">
            PARROT
          </h1>
        </div>
      </div>

      <SearchBar />

      <div className="flex items-center justify-center select-none  gap-x-5">
        <div className="hover:cursor-pointer">
          <h4 className="font-normal text-sm">Create Project</h4>
        </div>

        <NotificationPopover />
        <div className="hover:cursor-pointer">
          <ProfileDropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
