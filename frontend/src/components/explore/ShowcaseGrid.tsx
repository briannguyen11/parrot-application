import ShowcaseCard from "./ShowcaseCard";
import { useEffect, useRef} from "react";
import { Skeleton } from "../ui/skeleton";
import { MinProfileData } from "../interfaces";

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
  profile: MinProfileData;
}

const ShowcaseGrid = ({ projects, fetchMoreProjects, loading, nextPage }: {
  projects: ShowcaseProject[];
  fetchMoreProjects: () => void;
  loading: boolean;
  nextPage: string | null;
}) => {

  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);



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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(triggerRef.current);
      }
    };
  }, [loading, nextPage, fetchMoreProjects]);

  const renderSkeletons = () => (
    <>
      <div className="mb-3">
        <div className="aspect-spotlight bg-gray-50 relative rounded-sm  hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
          <Skeleton className="w-[600px] h-[600px]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="mt-3 h-10 w-10 rounded-full" />
          <div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-52" />

              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="aspect-spotlight bg-gray-50 relative rounded-sm  hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
          <Skeleton className="w-[600px] h-[600px]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="mt-3 h-10 w-10 rounded-full" />
          <div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-52" />

              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="aspect-spotlight bg-gray-50 relative rounded-sm  hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
          <Skeleton className="w-[600px] h-[600px]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="mt-3 h-10 w-10 rounded-full" />
          <div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-52" />

              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="aspect-spotlight bg-gray-50 relative rounded-sm  hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
          <Skeleton className="w-[600px] h-[600px]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="mt-3 h-10 w-10 rounded-full" />
          <div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-52" />

              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="aspect-spotlight bg-gray-50 relative rounded-sm  hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
          <Skeleton className="w-[600px] h-[600px]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="mt-3 h-10 w-10 rounded-full" />
          <div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-52" />

              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="aspect-spotlight bg-gray-50 relative rounded-sm  hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
          <Skeleton className="w-[600px] h-[600px]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="mt-3 h-10 w-10 rounded-full" />
          <div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-52" />

              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="mt-5 grid 4xl:grid-cols-4 showcase-xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      {loading && renderSkeletons()}
      {!loading &&
        projects &&
        projects.length > 0 &&
        projects.map((project : ShowcaseProject) => (
          <ShowcaseCard
            key={project.id}
            projectId={project.id}
            projectName={project.project_name}
            description={project.description}
            photos={project.photos}
            postDate={project.post_date}
            profile={project.profile}
            
          />
        ))}
      {!loading && nextPage && (
        <div ref={triggerRef} className="h-10 w-full"></div>
      )}
    </div>
  );
};

export default ShowcaseGrid;
