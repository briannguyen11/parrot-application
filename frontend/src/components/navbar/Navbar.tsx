import { ProfileDropDown } from "./ProfileDropDown";
import { SidebarPopup } from "../sidebar/SidebarPopup";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/search-icon.svg";

import NotificationPopover from "./NotificationPopover";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full md:px-12 px-5 py-4 flex z-50 justify-between bg-white dark:bg-background h-[68px] ">
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

       
        <h2 onClick={()=>navigate('/')} className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground">Explore</h2>
        <h2 onClick={()=>navigate('/open-projects')} className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground">Find Teams</h2>
        <h2 onClick={()=>navigate('/create')} className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground">Create Project</h2>
        <h2 onClick={()=>navigate('/messages')} className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground">Messages</h2>
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
