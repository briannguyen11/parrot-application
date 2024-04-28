// import { SkeletonCard } from "@/components/SkeletonCard";
import FeedCard from "@/components/FeedCard";
import { FilterPopup } from "./FilterPopup";

const Feed = () => {
  return (
    <div className="flex flex-col gap-3 lg:ml-16">
      <FilterPopup />

      <div className="flex flex-col gap-7  lg:items-start items-center pt-3 border-t max-w-screen-sm">
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
    </div>
  );
};

export default Feed;
