
interface SidebarElementProps {
  title: string;
  icon: string;
  selected?: boolean;
}

const SidebarElement: React.FC<SidebarElementProps> = ({
  title,
  icon,
  selected,
}) => {
  return (
    <div
      className={`flex items-center gap-3 hover:bg-gray-100 hover:cursor-pointer p-3 mr-4 mb-2 rounded-md ${
        selected ? "bg-gray-100 font-md" : "font-light"
      }`}
    >
      <img src={icon} alt="sidebar-element" className="w-5 ml-3" />
      <p className="text-md text-gray-800 ">{title}</p>
    </div>
  );
};

export default SidebarElement;
