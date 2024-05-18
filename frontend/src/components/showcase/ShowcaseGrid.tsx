import ShowcaseCard from "./ShowcaseCard";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import api from "@/api";

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

const ShowcaseGrid = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/showcase-projects/projects/");
        console.log(res.data);
        setProjects(res.data);
        setLoading(false);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  const renderSkeletons = () => {
    if (loading) {
      return (
        <>
          <div className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
            <Skeleton className="w-[600px] h-[600px]" />
          </div>
          <div className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
            <Skeleton className="object-cover w-full h-full" />
          </div>
          <div className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
            <Skeleton className="object-cover w-full h-full" />
          </div>
          <div className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
            <Skeleton className="object-cover w-full h-full" />
          </div>
          <div className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
            <Skeleton className="object-cover w-full h-full" />
          </div>
          <div className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
            <Skeleton className="object-cover w-full h-full" />
          </div>
        </>
      );
    }
  };

  renderSkeletons();

  return (
    <div className="mt-5 grid 4xl:grid-cols-4 showcase-xl:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-10 ">
      {loading && renderSkeletons()}
      {!loading &&
        projects.length !== 0 &&
        projects.map((project: ShowcaseProject) => (
          <ShowcaseCard
            key={project.id}
            projectName={project.project_name}
            description={project.description}
            photos={project.photos}
            postDate={project.post_date}
          />
        ))}
    </div>
  );
};

export default ShowcaseGrid;
