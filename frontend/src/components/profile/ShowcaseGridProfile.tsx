import { ShowcaseData } from "../interfaces";
import ShowcaseCardProfile from "./ShowcaseCardProfile";
import { Skeleton } from "../ui/skeleton";

interface ShowcaseProjectProp {
  showcaseProjects: ShowcaseData[];
  loading: boolean;
}

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

const ShowcaseGridProfile: React.FC<ShowcaseProjectProp> = ({
  showcaseProjects,
  loading,
}) => {
  return (
    <div className="mt-5 grid 4xl:grid-cols-4 showcase-xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      {loading && renderSkeletons()}
      {!loading &&
        showcaseProjects &&
        showcaseProjects.length > 0 &&
        showcaseProjects.map((project: ShowcaseData) => (
          <ShowcaseCardProfile {...project} />
        ))}
    </div>
  );
};

export default ShowcaseGridProfile;
