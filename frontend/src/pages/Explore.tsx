import ShowcaseGrid from "../components/explore/ShowcaseGrid";
import { useEffect, useState, useCallback } from "react";
import { SearchIcon } from "lucide-react";
import { SortByPopover } from "@/components/explore/SortByPopover";
import { CommunityPopover } from "@/components/explore/CommunityPopover";
import { X } from "lucide-react";
import api from "@/api";
import LoadingIcon from "../assets/icons/loading.svg";

interface Photo {
  photo: string;
  caption: string;
  id: number;
  project: number;
}

interface ShowcaseProject {
  id: number;
  project_name: string;
  description: string;
  photos: Photo[];
  user_id: string;
  post_date: string;
}
const colorMap: { [key: string]: string } = {
  all: "bg-parrot-red",
  photography: "bg-parrot-purple",
  design: "bg-parrot-yellow",
  "computer science": "bg-parrot-blue",
  "electrical engineering": "bg-parrot-green",
};

const getColor = (name: string) => {
  const technology = name.toLowerCase();
  return colorMap[technology] || "bg-gray-400";
};

const Showcase = () => {
  useEffect(() => {
    document.title = "Showcase | Parrot";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [search, setSearch] = useState("");
  const [communities, setCommunities] = useState<string[]>(["All"]);
  const [nextPage, setNextPage] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);

  const addToCommunities = (newCommunities: string[]) => {
    setCommunities(newCommunities);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let link = "/api/showcase-projects/explore/";
      if (search.length > 0) {
        link = `/api/showcase-projects/search/?query=${search}`;
      }
      const res = await api.get(link);
      setProjects(res.data.results);
      setNextPage(res.data.next);
      setLoading(false);
      setInitialLoad(false);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchMoreProjects = useCallback(async () => {
    if (!nextPage) return;

    try {
      const res = await api.get(nextPage);
      const newProjects = [...projects, ...res.data.results];
      setProjects(newProjects);
      setNextPage(res.data.next);
    } catch (error: unknown) {
      console.error(error);
    }
  }, [nextPage, projects]);

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

        <div className="mt-4 flex items-center text-sm font-light pl-5 lg:w-full p-2 bg-inherit rounded-full focus:outline-none border">
          {!loading || initialLoad ? (
            <SearchIcon size={25} className="mr-[6px] translate-x-1" />
          ) : (
            !initialLoad && (
              <div className="animate-spin rounded-full w-8 h-8 overflow-hidden">
                <img
                  src={LoadingIcon}
                  alt="logo"
                  className="w-full h-full object-cover select-none"
                />
              </div>
            )
          )}

          <input
            type="text"
            placeholder="Search"
            className="md:text-sm text-base font-light pl-5 w-full bg-inherit rounded-full focus:outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                fetchProjects();
              }
            }}
          />

          <button
            onClick={() => fetchProjects()}
            className="p-2 px-5 bg-black text-white rounded-full"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex gap-3 items-center mb-8 w-full overflow-scroll ">
        <SortByPopover handleFilter={() => console.log("filter")} />
        <CommunityPopover handleFilter={addToCommunities} />

        {communities.map((community) => (
          <div
            key={community}
            className={`whitespace-nowrap mt-3 ${getColor(
              community
            )} text-white text-xs font-montserrat font-semibold px-2 py-2 rounded-lg flex items-center gap-2`}
          >
            <h4 className=" whitespace-nowrap">{community}</h4>

            <X
              size={15}
              className="cursor-pointer"
              onClick={() =>
                setCommunities(communities.filter((item) => item !== community))
              }
            />
          </div>
        ))}
      </div>

      <ShowcaseGrid
        projects={projects}
        loading={loading}
        nextPage={nextPage}
        fetchMoreProjects={fetchMoreProjects}
      />
    </div>
  );
};

export default Showcase;
