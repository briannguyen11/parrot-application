import SidebarElement from "./SidebarElement";

import SearchIcon from "../assets/icons/search.svg";
import SpotlightIcon from "../assets/icons/spotlight.svg";
import ReportIcon from "../assets/icons/report.svg";
import HelpIcon from "../assets/icons/help.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import MessagesIcon from "../assets/icons/messages.svg";
import CampusIcon from "../assets/icons/campus.svg";
import SavedIcon from "../assets/icons/saved.svg";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [tab, setTab] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTab("explore");
    }
    if (location.pathname === "/showcase") {
      setTab("showcase");
    }
    if (location.pathname === "/settings") {
      setTab("settings");
    }
    if (location.pathname === "/help") {
      setTab("help");
    }
    if (location.pathname === "/report") {
      setTab("report");
    }
    if (location.pathname === "/messages") {
      setTab("messages");
    }
    if (location.pathname === "/campus") {
      setTab("campus");
    }
    if (location.pathname === "/saved") {
      setTab("saved");
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
          selected={tab === "showcase"}
          onClick={() => {
            setTab("showcase");
            navigate("/showcase");
          }}
        />
        <SidebarElement
          title="Messages"
          icon={MessagesIcon}
          selected={tab === "messages"}
          onClick={() => {
            setTab("messages");
            navigate("/messages");
          }}
        />

        <SidebarElement
          title="Saved Posts"
          icon={SavedIcon}
          selected={tab === "saved"}
          onClick={() => {
            setTab("saved");
            navigate("/saved");
          }}
        />

        <SidebarElement
          title="Campus"
          icon={CampusIcon}
          selected={tab === "campus"}
          onClick={() => {
            setTab("campus");
            navigate("/campus");
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
            navigate("/settings");
          }}
        />

        <SidebarElement
          title="Help"
          icon={HelpIcon}
          selected={tab === "help"}
          onClick={() => {
            setTab("help");
            navigate("/help");
          }}
        />

        <SidebarElement
          title="Report"
          icon={ReportIcon}
          selected={tab === "report"}
          onClick={() => {
            setTab("report");
            navigate("/report");
          }}
        />
        <p className="ml-3 p-3 text-xs font-light text-gray-400">
          © 2024 Parrot, Inc
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
