import SpotlightCard from "./SpotlightCard";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

const SpotlightGrid = () => {
  const [loading, setLoading] = useState(true);

  // simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="mt-5 grid 4xl:grid-cols-3 xl:grid-cols-2 grid-cols-1  gap-x-10 gap-y-16">
        <Skeleton className="aspect-spotlight rounded-3xl" />
        <Skeleton className="aspect-spotlight rounded-3xl" />
        <Skeleton className="aspect-spotlight rounded-3xl" />
        <Skeleton className="aspect-spotlight rounded-3xl" />
        <Skeleton className="aspect-spotlight rounded-3xl" />
        <Skeleton className="aspect-spotlight rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="mt-5 grid 4xl:grid-cols-3 xl:grid-cols-2 grid-cols-1  gap-x-10 gap-y-16">
    
        <SpotlightCard
        projectName="Project Title"
        imageUrls={[
          "https://cdn.dribbble.com/userupload/7760302/file/original-ab94e5567ee1b1efded651ab44ba4e18.png?resize=1024x768",
        ]}
      />
      <SpotlightCard
        projectName="Project Title"
        imageUrls={[
          "https://cdn.dribbble.com/userupload/3187443/file/original-390f8668cd4f4b0a5984122f40dfc714.png?resize=1024x768&vertical=center",
        ]}
      />
        <SpotlightCard
        projectName="Project Title"
        imageUrls={[
          "https://cdn.dribbble.com/userupload/2907214/file/original-1f9adc1d58956eef707e262bb55c7af5.png?resize=1024x768",
        ]}
      />
      <SpotlightCard
        projectName="Project Title"
        imageUrls={[
          "https://cdn.myportfolio.com/6771405b-f126-49e0-9c51-62863cf81a97/e2ea8b1f-f789-4c2b-adde-85fd00506d34_rw_1920.png?h=fe8eeaae3123cb8a0795b940985ed85e",
        ]}
      />
    </div>
  );
};

export default SpotlightGrid;
