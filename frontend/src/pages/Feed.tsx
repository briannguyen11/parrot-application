/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "../components/ui/skeleton";
import FeedCard from "@/components/explore/FeedCard";
import { FilterPopup } from "../components/explore/FilterPopup";
import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/api";

const Feed = () => {
  const [isFixed, setIsFixed] = useState(false);
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

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 60; // Adjust this value to set the scroll threshold

      if (scrollY > threshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
          <Skeleton className="w-full  max-w-screen-sm h-[300px]" />
          <Skeleton className="h-[300px] w-full mb-5 rounded-xl" />
          <Skeleton className="h-[300px] w-full mb-5 rounded-xl" />
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex w-full items-start  lg:justify-start lg:pl-8 pt-5 justify-center gap-10">
      <div className="flex flex-col gap-3 lg:ml-16 w-full max-w-screen-sm">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold dark:text-primary">
              Explore Projects
            </h2>
            <p className="font-normal text-sm text-gray-500">
              Find projects for you to join
            </p>
          </div>

          <FilterPopup handleFilter={handleFilter} />
        </div>

        <div className="flex flex-col gap-7  lg:items-start items-center  max-w-screen-sm mb-10">
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
      <div
        className={` bg-white shadow-light w-64 h-96 xl+:flex hidden mt-16 rounded-xl ${
          isFixed ? "fixed left-0 ml-[1032px] mr-7 top-5" : ""
        }`}
      ></div>
    </div>
  );
};

export default Feed;
