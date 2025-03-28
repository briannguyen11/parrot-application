interface SidebarElementProps {
  title: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
}

const SidebarElement: React.FC<SidebarElementProps> = ({
  title,
  icon,
  selected,
  onClick,
}) => {
  return (
    <div>
      <div
        className={`flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-sidebar-hover hover:cursor-pointer p-3 rounded-md select-none ${
          selected ? "bg-gray-100 dark:bg-sidebar font-light" : "font-light"
        }`}
        onClick={onClick}
      >
        <img src={icon} alt="sidebar-element" className="w-5 ml-3" />
        <p className="text-sm text-primary font-sidebar">{title}</p>
      </div>
    </div>
  );
};

export default SidebarElement;
