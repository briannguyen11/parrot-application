import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import SearchIcon from "../../assets/icons/search.svg";
import SpotlightIcon from "../../assets/icons/spotlight.svg";
import ReportIcon from "../../assets/icons/report.svg";
import HelpIcon from "../../assets/icons/help.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import MessagesIcon from "../../assets/icons/messages.svg";
import SavedIcon from "../../assets/icons/saved.svg";

import SidebarElement from "./SidebarElement";

import { useNavigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

export function SidebarPopup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("explore");

  useEffect(() => {
    if (location.pathname === "/") {
      setTab("explore");
    }
    if (location.pathname === "/open-projects") {
      setTab("open-projects");
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
  }, [location.pathname]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <svg
          className="lg:hidden hover:cursor-pointer"
          fill="currentColor"
          height="20"
          icon-name="menu-outline"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 10.625H1v-1.25h18v1.25Zm0-7.875H1V4h18V2.75ZM19 16H1v1.25h18V16Z"></path>
        </svg>
      </SheetTrigger>
      <SheetContent className="z-50 w-72 bg-white mt-[68px] border-0 border-t border-border" side={"left"}>
        <SheetClose asChild>
          <div className="fixed w-60 h-sidebar lg:border-r border-gray-200 pt-0 overflow-auto flex flex-col justify-between ">
            <div className="flex flex-col gap-y-2">
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
                title="Find Teams"
                icon={SpotlightIcon}
                selected={tab === "open-projects"}
                onClick={() => {
                  setTab("open-projects");
                  navigate("/open-projects");
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

              
            </div>

            <div className="border-t mr-4 py-4 flex flex-col gap-y-2 mb-10">
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
            </div>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
