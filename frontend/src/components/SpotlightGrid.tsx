import { Skeleton } from "./ui/skeleton";

const SpotlightGrid = () => {
    return ( <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-x-10 gap-y-16">

        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />


    </div> );
}
 
export default SpotlightGrid;