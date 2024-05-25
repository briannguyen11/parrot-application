import CategoryItem from "./CategoryItem";
import ReactIcon from "../../assets/icons/react.svg";
import { useState } from "react";

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="w-full flex items-center gap-8 overflow-scroll">
      <CategoryItem
        icon={ReactIcon}
        category="All"
        selected={selectedCategory === "All"}
        onClick={() => setSelectedCategory("All")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="React"
        selected={selectedCategory === "React"}
        onClick={() => setSelectedCategory("React")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="C++"
        selected={selectedCategory === "C++"}
        onClick={() => setSelectedCategory("C++")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="UI/UX"
        selected={selectedCategory === "UI/UX"}
        onClick={() => setSelectedCategory("UI/UX")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="Machine Learning"
        selected={selectedCategory === "Machine Learning"}
        onClick={() => setSelectedCategory("Machine Learning")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="Python"
        selected={selectedCategory === "Python"}
        onClick={() => setSelectedCategory("Python")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="JavaScript"
        selected={selectedCategory === "JavaScript"}
        onClick={() => setSelectedCategory("JavaScript")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="HTML/CSS"
        selected={selectedCategory === "HTML/CSS"}
        onClick={() => setSelectedCategory("HTML/CSS")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="Ruby"
        selected={selectedCategory === "Ruby"}
        onClick={() => setSelectedCategory("Ruby")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="Java"
        selected={selectedCategory === "Java"}
        onClick={() => setSelectedCategory("Java")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="PHP"
        selected={selectedCategory === "PHP"}
        onClick={() => setSelectedCategory("PHP")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="TypeScript"
        selected={selectedCategory === "TypeScript"}
        onClick={() => setSelectedCategory("TypeScript")}
      />
      <CategoryItem
        icon={ReactIcon}
        category="Go"
        selected={selectedCategory === "Go"}
        onClick={() => setSelectedCategory("Go")}
      />
    </div>
  );
};

export default CategoryList;
