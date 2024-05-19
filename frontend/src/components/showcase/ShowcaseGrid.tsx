import ShowcaseCard from "./ShowcaseCard";
import { useEffect, useState, useRef, useCallback } from "react";
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
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("");

  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/showcase-projects/projects/");
        setProjects(res.data.results);
        setNextPage(res.data.next);
        setLoading(false);
      } catch (error: unknown) {
        console.log(error);
      }
    };

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

  const renderSkeletons = () => (
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

  return (
    <div className="mt-5 grid 4xl:grid-cols-4 showcase-xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      {loading && renderSkeletons()}
      {!loading &&
        projects.length > 0 &&
        projects.map((project) => (
          <ShowcaseCard
            key={project.id}
            projectId={project.id}
            projectName={project.project_name}
            description={project.description}
            photos={project.photos}
            postDate={project.post_date}
          />
        ))}
      {!loading && nextPage && (
        <div ref={triggerRef} className="h-10 w-full"></div>
      )}
    </div>
  );
};

export default ShowcaseGrid;
