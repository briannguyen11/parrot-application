import SidebarElement from "./SidebarElement";

import SearchIcon from "../assets/icons/search.svg";
import SpotlightIcon from "../assets/icons/spotlight.svg";
import { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";

const Sidebar = () => {
  const [tab, setTab] = useState("explore");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTab("explore");
    } else if (location.pathname === "/spotlight") {
      setTab("spotlight");
    }
  })
 

  return (
    <div className="fixed w-64 h-screen lg:border-r border-gray-200 pt-5 overflow-auto">
      <div
        onClick={() => {
          setTab("explore");
          navigate("/");
        }}
      >
        <SidebarElement
          title="Explore"
          icon={SearchIcon}
          selected={tab === "explore"}
        />
      </div>

      <div
        onClick={() => {
          setTab("spotlight");
          navigate("/spotlight");
        }}
      >
        <SidebarElement
          title="Spotlight"
          icon={SpotlightIcon}
          selected={"/"+ tab === location.pathname}
        />
      </div>
    </div>
  );
};

export default Sidebar;
