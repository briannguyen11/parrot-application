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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          <FeedCard
            title="Social Media Website"
            name="John Smith"
            description="Hi! I am looking for three other individuals to join me in a project
            to build a new social media platform. The project will be built using
            Python and Javascript. If you are interested, please apply to the
            project and contact me!"
            userBio="Software Engineer at Cal State Fullerton"
            postedTime="2024-04-29 12:30:45"
            tags={["Python", "Javascript", "React", "Django"]}
            profilePicture="https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI"
          />

          <FeedCard
            title="Windomi"
            name="John Smith"
            description="Don't you think Windomi is such a good name?"
            userBio="Unemployed at Cal Poly SLO"
            postedTime="2024-04-19 12:30:45"
            tags={["Python", "Javascript", "React", "Django"]}
            profilePicture="https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI"
          />

          <FeedCard
            title="Ethnicity Detection"
            name="John Smith"
            description="Hi! I am looking for three other individuals to join me in a project
            to build a new social media platform. The project will be built using
            Python and Javascript. If you are interested, please apply to the
            project and contact me!"
            userBio="Software Engineer at Cal State Fullerton"
            postedTime="2024-04-29 12:30:45"
            tags={["Python", "Javascript", "React", "Django"]}
            profilePicture="https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI"
          />
        </div>
      </div>
      <div
        className={` bg-gray-200 shadow-light w-64 h-96 xl+:flex hidden mt-16 rounded-xl ${
          isFixed ? "fixed left-0 ml-[1048px] mr-7 top-5" : ""
        }`}
      ></div>
    </div>
  );
};

export default Feed;
