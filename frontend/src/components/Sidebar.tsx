import SidebarElement from "./SidebarElement";

import SearchIcon from "../assets/icons/search.svg";
import SpotlightIcon from "../assets/icons/spotlight.svg";
import ReportIcon from "../assets/icons/report.svg";
import HelpIcon from "../assets/icons/help.svg";
import SettingsIcon from "../assets/icons/settings.svg";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [tab, setTab] = useState("empty");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTab("explore");
    }
    if (location.pathname === "/spotlight") {
      setTab("spotlight");
    }
  }, [location.pathname]);

  return (
    <div className="fixed w-60 h-sidebar lg:border-r border-gray-200 pt-5 overflow-auto flex flex-col justify-between ">
      <div>
        <SidebarElement
          title="Explore"
          icon={SearchIcon}
          selected={tab === "explore"}
          onClick={() => {
            setTab("explore");
            navigate("/");
          }}
        />

        <SidebarElement
          title="Showcase"
          icon={SpotlightIcon}
          selected={"/" + tab === location.pathname}
          onClick={() => {
            setTab("spotlight");
            navigate("/spotlight");
          }}
        />
      </div>

      <div className="border-t mr-4 py-4">
        <SidebarElement
          title="Settings"
          icon={SettingsIcon}
          selected={tab === "settings"}
          onClick={() => {
            setTab("settings");
          }}
        />

        <SidebarElement
          title="Help"
          icon={HelpIcon}
          selected={tab === "help"}
          onClick={() => {
            setTab("help");
          }}
        />

        <SidebarElement
          title="Report"
          icon={ReportIcon}
          selected={tab === "report"}
          onClick={() => {
            setTab("report");
          }}
        />
         <p className="ml-3 p-3 text-xs font-light text-gray-400">© 2024 Parrot, Inc</p>
      </div>

     
    </div>
  );
};

export default Sidebar;
