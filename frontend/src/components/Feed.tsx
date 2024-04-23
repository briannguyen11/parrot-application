// import { SkeletonCard } from "@/components/SkeletonCard";
import FeedCard from "@/components/FeedCard";

const Feed = () => {
  return (
    <div className="flex flex-col gap-7 lg:ml-16 lg:items-start items-center">
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  );
};

export default Feed;
