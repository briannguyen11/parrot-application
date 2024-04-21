import { SkeletonCard } from "@/components/SkeletonCard";

const Feed = () => {
  return (
    <div className="lg:ml-56 w-full h-full lg:pt-5 lg:pl-5 pt-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
    </div>
  );
};

export default Feed;
