import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import SidebarElement from "./SidebarElement";
import SearchIcon from "../assets/icons/search.svg";
import SpotlightIcon from "../assets/icons/spotlight.svg";
import ReportIcon from "../assets/icons/report.svg";
import HelpIcon from "../assets/icons/help.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import MessagesIcon from "../assets/icons/messages.svg";
import { useNavigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

export function SidebarPopup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("explore");

  useEffect(() => {
    if (location.pathname === "/") {
      setTab("explore");
    } else if (location.pathname === "/spotlight") {
      setTab("spotlight");
    }
  }, [location.pathname]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <svg
          className="lg:hidden"
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
      <SheetContent className="w-72 mt-12" side={"left"}>
        {/* <Sidebar /> */}
        <SheetClose asChild>
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
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
