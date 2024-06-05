/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "../components/ui/skeleton";
import FeedCard from "@/components/open-projects/FeedCard";
import { FilterPopup } from "../components/open-projects/FilterPopup";
import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/api";
import { SearchIcon } from "lucide-react";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState("");

  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState({
    level: "",
    groupSize: null,
  });

  useEffect(() => {
    document.title = "Explore Projects | Parrot";

    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // fetch projects from backend
  useEffect(() => {
    const createFilterParams = () => {
      // const techStackParam = filter.techStack.map((tech) => `tags=${tech}`).join(",");
      return `?level=${filter.level}&${
        filter?.groupSize &&
        filter.groupSize > 1 &&
        `group_size=${filter.groupSize}`
      }`;
    };

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = createFilterParams();
        const link = `/api/open-projects/projects/${params}`;
        console.log(link);
        const res = await api.get(link);
        console.log(res.data.results);
        setProjects(res.data.results);
        setNextPage(res.data.next);
        setLoading(false);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    fetchProjects();
  }, [filter]);

  // Pass this function to FilterPopup component
  const handleFilter = (newFilter: any) => {
    console.log(newFilter);
    setFilter(newFilter);
  };

  const fetchMoreProjects = useCallback(async () => {
    if (!nextPage) return;

    try {
      const res = await api.get(nextPage);
      const newProjects = [...projects, ...res.data.results];
      setProjects(newProjects);
      setNextPage(res.data.next);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }, [nextPage, projects]);

  useEffect(() => {
    if (loading) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPage) {
        fetchMoreProjects();
      }
    }, options);

    if (triggerRef.current) {
      observerRef.current.observe(triggerRef.current);
    }

    return () => {
      if (observerRef.current && triggerRef.current) {
        observerRef.current.unobserve(triggerRef.current);
      }
    };
  }, [loading, nextPage, fetchMoreProjects]);

  const renderSkeletons = () => {
    if (loading) {
      return (
        <>
          <Skeleton className="w-full  max-w-[700px] h-[300px]" />
          <Skeleton className="h-[300px] w-full mb-5 rounded-xl" />
          <Skeleton className="h-[300px] w-full mb-5 rounded-xl" />
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex w-full items-start pt-5 justify-center gap-10">
      <div className="flex flex-col w-full max-w-[700px]">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="mt-4 text-3xl font-bold font-raleway text-primary">
              Find your Team. <br className="inline-block md:hidden" />
              <span className=" bg-parrot-gradient inline-block text-transparent bg-clip-text">
                Actualize
              </span>{" "}
              your Ideas
            </h1>
            <p className="text-secondary font-medium font-montserrat mt-2 text-sm max-w-[550px]">
              Find collaborators for your next project. Connect with passionate
              individuals and work together to bring your vision to life.
            </p>
          </div>
        </div>

        <div className="border rounded-xl flex items-center gap-3 mt-4">
          <SearchIcon size={25} className="ml-3 stroke-gray-500" />
          <input
            type="text"
            placeholder="Search for projects"
            className="text-sm text-secondary font-montserrat  pl-5 w-full bg-inherit rounded-2xl focus:outline-none p-2"
          />
        </div>
        <div className="flex">
          <FilterPopup handleFilter={handleFilter} />
        </div>

        <div className="mt-8 flex flex-col gap-7  lg:items-start items-center  max-w-screen-[700px] mb-10">
          {renderSkeletons()}

          {!loading &&
            projects &&
            projects.map((project: any, index: number) => (
              <FeedCard key={index} {...project} />
            ))}

          {!loading && nextPage && (
            <div ref={triggerRef} className="h-10 w-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
