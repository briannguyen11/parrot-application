interface CategoryItemProps {
  category: string;
  icon: string;
  selected : boolean;
  onClick?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, icon, selected, onClick }) => {
  return (
    <div onClick={onClick} className={`flex flex-col items-center justify-center border-b-2  border-slate-50 ${selected && 'border-gray-600'}   hover:border-gray-600 hover:cursor-pointer p-2 transition duration-300 ease-in-out`}>
      <div className="w-8 h-8 ">
        <img src={icon} alt="Category" className="w-full h-full" />
      </div>

      <p className="mt-1 text-xs text-center whitespace-nowrap">{category}</p>
    </div>
  );
};

export default CategoryItem;
