import SidebarElement from "./SidebarElement";

import SearchIcon from "../assets/icons/search.svg";
import SpotlightIcon from "../assets/icons/spotlight.svg";
import { useState } from "react";

const Sidebar = () => {
  const [tab, setTab] = useState("explore");
  return (
    <div className="fixed w-64 h-screen lg:border-r border-gray-200 pt-5 overflow-auto">
      <div onClick={() => setTab("explore")}>
        <SidebarElement
          title="Explore"
          icon={SearchIcon}
          selected={tab === "explore"}
        />
      </div>

      <div onClick={() => setTab("spotlight")}>
        <SidebarElement
          title="Spotlight"
          icon={SpotlightIcon}
          selected={tab === "spotlight"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
