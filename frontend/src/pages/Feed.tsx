/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "../components/ui/skeleton";
import FeedCard from "@/components/FeedCard";
import { FilterPopup } from "../components/FilterPopup";
import { useEffect, useState } from "react";
import api from "@/api";

const Feed = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
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
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/open-projects/projects/");
        console.log(res.data);
        setProjects(res.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    fetchProjects();
  }, []);

 

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
            <h2 className="text-2xl font-semibold">Explore Projects</h2>
            <p className="font-normal text-sm text-gray-500">
              Find projects for you to join
            </p>
          </div>

          <FilterPopup />
        </div>

        <div className="flex flex-col gap-7  lg:items-start items-center  max-w-screen-sm">
          {renderSkeletons()}

          {!loading &&
            projects.map((project: any, index: number) => (
              <FeedCard key={index} {...project} />
            ))}

        </div>
      </div>
      <div
        className={` bg-gray-200 shadow-light w-64 h-96 xl+:flex hidden mt-16 rounded-xl ${
          isFixed ? "fixed left-0 ml-[1032px] mr-7 top-5" : ""
        }`}
      ></div>
    </div>
  );
};

export default Feed;
