import SidebarElement from "./SidebarElement";

import SearchIcon from "../assets/icons/search.svg";

interface SidebarProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ tab, setTab }) => {
  return (
    <div className="lg:block hidden fixed w-56 h-screen border-r border-gray-200 pt-5">
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
          icon={SearchIcon}
          selected={tab === "spotlight"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
