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

  // Mock Feed Card Data
  const feedCardData = [
    {
      project_name: "Social Media Website",
      name: "John Smith",
      description:
        "Hi! I am looking for three other individuals to join me in a project to build a new social media platform. The project will be built using Python and Javascript. If you are interested, please apply to the project and contact me!",
      userBio: "Software Engineer at Cal State Fullerton",
      post_date: "2024-04-29",
      tags: ["Python", "Javascript", "React", "Django"],
      group_size: 3,
      profilePicture:
        "https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI",
      level: "beginner",
      user: "1",
    },
    {
      project_name: "Windomi",
      name: "John Smith",
      description: "Don't you think Windomi is such a good name?",
      userBio: "Unemployed at Cal Poly SLO",
      post_date: "2024-04-19",
      tags: ["Python", "Javascript", "React", "Django"],
      group_size: 3,
      profilePicture:
        "https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI",
      level: "intermediate",
      user: "2",
    },
    {
      project_name: "Ethnicity Detection",
      name: "John Smith",
      description:
        "Hi! I am looking for three other individuals to join me in a project to build a new social media platform. The project will be built using Python and Javascript. If you are interested, please apply to the project and contact me!",
      userBio: "Software Engineer at Cal State Fullerton",
      post_date: "2024-04-29",
      tags: ["Python", "Javascript", "React", "Django"],
      group_size: 3,
      profilePicture:
        "https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI",

      level: "advanced",
      user: "3",
    },
  ];

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
    <div className="flex w-full items-start  lg:justify-start justify-center gap-10">
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

          {/* Hide Hardcoded Cards */}
          {false &&
            feedCardData.map((cardData, index) => (
              <FeedCard key={index} {...cardData} />
            ))}
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
