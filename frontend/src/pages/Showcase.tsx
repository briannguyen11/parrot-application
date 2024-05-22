import ShowcaseGrid from "../components/showcase/ShowcaseGrid";
import { useEffect } from "react";
import CategoryList from "@/components/showcase/CategoryList";
import { FilterPopup } from "@/components/explore/FilterPopup";

const Showcase = () => {
  useEffect(() => {
    document.title = "Showcase | Parrot";
  }, []);

  return (
    <div className="w-full pt-5 lg:pl-5">
      <div className="grid grid-cols-1 ">
        <div className="flex justify-between gap-10">
          <CategoryList />
          <FilterPopup handleFilter={() => console.log()} />
        </div>
      </div>

      <ShowcaseGrid />
    </div>
  );
};

export default Showcase;
