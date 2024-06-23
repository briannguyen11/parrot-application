import { ProfileDropDown } from "./ProfileDropDown";
import { SidebarPopup } from "../sidebar/SidebarPopup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import SearchIcon2 from "../../assets/icons/search-alt.svg";
import CreateDropdown from "./CreateDropdown";

const Navbar = () => {
  const navigate = useNavigate();

  const [border, setBorder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleNavigate = (path: string) => {
    setLoading(true);
    navigate(path);
    setTimeout(() => {
      setLoading(false);
    }, 600); // Adjust the duration of the animation
  };

  const renderNavbar = () => {
    return (
      <>
        <div className="flex gap-10 items-center">
          <div className="flex justify-center items-center gap-5">
            <SidebarPopup />

            <a
              href="/"
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
            </a>
          </div>

          <div className="bg-gray-200 rounded-2xl w-96 lg:w-72 items-center md:flex hidden">
            <img src={SearchIcon2} alt="search" className="w-5 h-5 ml-3  " />
            <input
              type="text"
              placeholder="Search"
              className="md:text-sm text-base font-light pl-5 w-full p-2 bg-inherit rounded-full focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && search.length > 0) {
                  handleNavigate(`/search?query=${search}`);
                }
              }}
            />
          </div>
          <div className="lg:flex xl:gap-20 gap-14 items-center hidden select-none">
            <a
              onClick={() => navigate("/")}
              className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground whitespace-nowrap"
            >
              Explore
            </a>
            <a
              onClick={() => navigate("/open-projects")}
              className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground whitespace-nowrap"
            >
              Find Teams
            </a>

            <CreateDropdown />
          </div>
        </div>

        <div className="flex items-center justify-center select-none gap-x-4">
          <SearchIcon
            onClick={() => setShowSearch(true)}
            className="md:hidden w-7 h-7 stroke-primary hover:bg-gray-200 p-1 rounded-full transition duration-300 ease-in-out hover:cursor-pointer"
          />

          <div className="hover:cursor-pointer h-9 w-9 ml-1">
            <ProfileDropDown />
          </div>
        </div>
      </>
    );
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full md:px-12 px-5 py-4 flex z-50 justify-between bg-white dark:bg-background h-[68px] transition duration-1000 ease-in-out  ${
        border && "shadow-light"
      }`}
    >
      {loading && (
        <div
          className={`absolute top-0 left-0 h-[3px] bg-parrot-red animate-loading-bar`}
        ></div>
      )}
      {!showSearch && renderNavbar()}

      {showSearch && (
        <div className="w-full flex items-center gap-x-5">
          <ArrowLeft
            width={22}
            height={22}
            className="hover:cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
          <div className="w-full border focus:outline-none rounded-full py-2 flex items-center">
            <SearchIcon width={20} height={20} className="ml-5" />
            <input
              type="text"
              className="w-full focus:outline-none rounded-full pl-4 text-base font-montserrat text-primary font-medium"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && search.length > 0) {
                  handleNavigate(`/search?query=${search}`);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
