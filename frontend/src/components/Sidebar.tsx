import SidebarElement from "./SidebarElement";

import SearchIcon from "../assets/icons/search.svg";
import SpotlightIcon from "../assets/icons/spotlight.svg";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [tab, setTab] = useState("empty");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTab("explore");
    } else if (location.pathname === "/spotlight") {
      setTab("spotlight");
    }
  }, [location.pathname]);

  return (
    <div className="fixed w-56 h-screen lg:border-r border-gray-200 pt-5 overflow-auto">
      <div
        onClick={() => {
          setTab("explore");
          navigate("/");
        }}
      >
        <SidebarElement
          title="Explore"
          icon={SearchIcon}
          selected={"/" === location.pathname}
        />
      </div>

      <div
        onClick={() => {
          setTab("spotlight");
          navigate("/spotlight");
        }}
      >
        <SidebarElement
          title="Showcase"
          icon={SpotlightIcon}
          selected={"/" + tab === location.pathname}
        />
      </div>
    </div>
  );
};

export default Sidebar;
