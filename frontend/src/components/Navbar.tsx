import { ProfileDropDown } from "./ProfileDropDown";
import { SidebarPopup } from "./SidebarPopup";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "../assets/icons/notification.svg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full md:px-7 px-5 py-3 flex border-b border-gray-200 z-50 justify-between  bg-white shadow-sm">
      <div className="flex justify-center items-center gap-5 hover:cursor-pointer">
        <SidebarPopup />

        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-5"
        >
          <img
            src="../../icon.png"
            alt="logo"
            className="w-5 h-10 object-cover select-none"
          />
          <h1 className="text-[23px] font-medium lg:block hidden select-none">
            SPRINT
          </h1>
        </div>
      </div>

      <SearchBar />

      <div className="flex items-center justify-center select-none  gap-x-5">
        <img
          src={NotificationIcon}
          alt="notification"
          className="w-6 h-6 object-cover hover:cursor-pointer"
        />
        <div className="hover:cursor-pointer">
          <ProfileDropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
