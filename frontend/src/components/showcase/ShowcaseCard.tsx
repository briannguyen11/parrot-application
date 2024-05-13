import React, { useState, useEffect } from "react";

interface Photo {
  photo: string;
  caption: string;
  id: number;
  project: number;
}

type ShowcaseCardProps = {
  projectName: string;
  photos: Photo[];
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ projectName, photos }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = photos.map((photo) => {
        return new Promise<string>((resolve) => {
          const img = new Image();
          img.src = photo.photo;
          img.onload = () => {
            resolve(photo.photo);
          };
        });
      });
      Promise.all<string>(imagePromises).then((images) =>
        setPreloadedImages(images)
      );
    };
    preloadImages();
  }, [photos]);

  return (
    <div
      onClick={() => setPhotoIndex((photoIndex + 1) % photos.length)}
      className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none"
    >
      {preloadedImages.length > 0 ? (
        <img
          src={preloadedImages[photoIndex]}
          alt="placeholder"
          className="object-cover w-full h-full "
          draggable="false"
        />
      ) : (
        <div className="w-[100vw] h-[100vh] bg-gray-400"></div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-full  bg-card-hover opacity-0 hover:opacity-100">
        <div className="flex items-end h-full w-full">
          <div className="m-6 flex justify-between w-full items-center">
            <h2 className="text-primary text-white text-sm bg-white rounded-lg p-2 backdrop-filter backdrop-blur-xl bg-opacity-30">
              {projectName}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
