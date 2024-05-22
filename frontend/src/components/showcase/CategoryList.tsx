import CategoryItem from "./CategoryItem";
import ReactIcon from "../../assets/icons/react.svg";


const CategoryList = () => {
return (
    <div className="w-full flex items-center gap-8 overflow-scroll">
        <CategoryItem icon={ReactIcon} category="All" />
        <CategoryItem icon={ReactIcon} category="React" />
        <CategoryItem icon={ReactIcon} category="C++" />
        <CategoryItem icon={ReactIcon} category="UI/UX" />
        <CategoryItem icon={ReactIcon} category="Machine Learning" />
        <CategoryItem icon={ReactIcon} category="Python" />
        <CategoryItem icon={ReactIcon} category="JavaScript" />
        <CategoryItem icon={ReactIcon} category="HTML/CSS" />
        <CategoryItem icon={ReactIcon} category="Ruby" />
        <CategoryItem icon={ReactIcon} category="Java" />
        <CategoryItem icon={ReactIcon} category="PHP" />
        <CategoryItem icon={ReactIcon} category="TypeScript" />
        <CategoryItem icon={ReactIcon} category="Go" />
    </div>
);
};

export default CategoryList;
