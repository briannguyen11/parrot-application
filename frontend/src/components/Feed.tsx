import { SkeletonCard } from "@/components/SkeletonCard";

const Feed = () => {
  return (
    <div className="lg:ml-52 w-full h-full lg:p-5 pt-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
    </div>
  );
};

export default Feed;
