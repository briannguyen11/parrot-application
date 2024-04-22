import { ProfileDropDown } from "./ProfileDropDown";
import { SidebarPopup } from "./SidebarPopup";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full bg-white md:px-10 px-5 py-3 flex border-b border-gray-200 z-50 justify-between">
      <div className="flex justify-center items-center gap-5  hover:cursor-pointer">
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

      <div className="flex items-center select-none hover:cursor-pointer">
        <ProfileDropDown />
      </div>
    </div>
  );
};

export default Navbar;
