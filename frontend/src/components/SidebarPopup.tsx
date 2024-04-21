import Sidebar from "./Sidebar";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import SidebarElement from "./SidebarElement";
import SearchIcon from "@/assets/icons/search.svg";
import SpotlightIcon from "@/assets/icons/spotlight.svg";
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
  });

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
      <SheetContent className="w-72 mt-16" side={"left"}>
        {/* <Sidebar /> */}
        <SheetClose asChild>
          <div onClick={() => navigate("/")}>
            <SidebarElement
              title="Explore"
              icon={SearchIcon}
              selected={tab === "explore"}
            />
          </div>
        </SheetClose>

        <SheetClose asChild>
          <div onClick={() => navigate("/spotlight")}>
            <SidebarElement
              title="Spotlight"
              icon={SpotlightIcon}
              selected={tab === "spotlight"}
            />
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
