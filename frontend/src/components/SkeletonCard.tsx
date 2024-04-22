import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 transition-opacity duration-500 ease-in-out">
      <Skeleton className="h-[125px] w-full mb-5 rounded-xl" />
    
    </div>
  )
}
