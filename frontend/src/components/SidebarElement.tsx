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
        className={`flex items-center gap-3 hover:bg-gray-100  hover:cursor-pointer p-3 mr-4 mb-2 rounded-md ${
          selected ? "bg-gray-100 font-medium" : "font-normal"
        }`}
        onClick={onClick}
      >
        <img src={icon} alt="sidebar-element" className="w-5 ml-3" />
        <p className="text-md text-primary font-sidebar">{title}</p>
      </div>
    </div>
  );
};

export default SidebarElement;
