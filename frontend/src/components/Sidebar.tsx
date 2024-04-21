import SidebarElement from "./SidebarElement";

import SearchIcon from "../assets/icons/search.svg";
import SpotlightIcon from "../assets/icons/spotlight.svg";

interface SidebarProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ tab, setTab }) => {
  return (
    <div className="lg:block hidden fixed w-56 h-screen border-r border-gray-200 pt-5 overflow-auto">
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
