// import { SkeletonCard } from "@/components/SkeletonCard";
import FeedCard from "@/components/FeedCard";
import { FilterPopup } from "./FilterPopup";
import { useEffect, useState } from "react";

const Feed = () => {

  const [isFixed, setIsFixed] = useState(false);

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <div className="flex w-full items-start  lg:justify-start justify-center gap-10">
      <div className="flex flex-col gap-3 lg:ml-16">
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
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
      </div>
      <div className={` bg-gray-200 shadow-light w-64 h-96 xl+:flex hidden mt-16 rounded-xl ${isFixed ? 'fixed left-0 ml-[1048px] mr-7 top-5' : ''}`}></div>
    </div>
  );
};

export default Feed;
