import ShowcaseGrid from "../components/explore/ShowcaseGrid";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { SortByPopover } from "@/components/explore/SortByPopover";
import { CommunityPopover } from "@/components/explore/CommunityPopover";
const Showcase = () => {
  useEffect(() => {
    document.title = "Showcase | Parrot";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [search, setSearch] = useState("");

  return (
    <div className="w-full pt-5">
      <div className="grid grid-cols-1 ">
        <h1 className="mt-4 text-3xl font-bold font-raleway text-primary">
          Discover projects from <br className="inline-block sm:hidden" />
          <span className=" bg-parrot-gradient inline-block text-transparent bg-clip-text">
            creative
          </span>{" "}
          minds
        </h1>
        <p className="text-secondary font-normal mt-2 font-montserrat text-sm max-w-[590px]">
          See what others are posting right now. Discover a world of creativity
          and inspiration as you browse through diverse portfolios from talented
          individuals.
        </p>

        <div className="mt-4 flex items-center text-sm font-light pl-5 lg:w-full p-2 bg-inherit rounded-2xl focus:outline-none border">
          <SearchIcon size={25} />
          <input
            type="text"
            placeholder="Search"
            className="text-md font-light pl-5 w-full bg-inherit rounded-2xl focus:outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="p-2 px-5 bg-black text-white rounded-2xl">
            Search
          </button>
        </div>
      </div>
      <div className="flex gap-3 items-center mb-8">
        <SortByPopover />
        <CommunityPopover />
      </div>

      <ShowcaseGrid />
    </div>
  );
};

export default Showcase;
