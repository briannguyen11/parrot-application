import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import LeftIcon from "../../assets/icons/left-arrow-backup-2-svgrepo-com.svg";
import RightIcon from "../../assets/icons/right-arrow-backup-2-svgrepo-com.svg";
import PersonIcon from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

interface Photo {
  photo: string;
  caption: string;
  id: number;
  project: number;
}

interface ShowcaseCardProps {
  projectId: number;
  projectName: string;
  description: string;
  photos: Photo[];
  postDate: string;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  projectId,
  projectName,
  description,
  photos,
  postDate,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const navigate = useNavigate();

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

  const nextPhotoButton = () => {
    return (
      <button
        onClick={() => setPhotoIndex(photoIndex + 1)}
        className="bg-white rounded-full absolute right-0 mr-2 p-2 flex justify-center items-center opacity-80 hover:opacity-100"
      >
        <img src={RightIcon} alt="next" className="h-4 w-4" />
      </button>
    );
  };

  const prevPhotoButton = () => {
    return (
      <button
        onClick={() => setPhotoIndex(photoIndex - 1)}
        className="bg-white rounded-full absolute left-0 ml-2 p-2 flex justify-center items-center opacity-80 hover:opacity-100"
      >
        <img src={LeftIcon} alt="prev" className="h-4 w-4" />
      </button>
    );
  };

  const timeAgo =
    "posted " +
    formatDistanceToNow(new Date(postDate), {
      addSuffix: false,
    }) +
    " ago";

  return (
    <div
      className="relative"
      onClick={() => navigate("/showcase-project/" + projectId)}
    >
      <div className="aspect-spotlight relative hover:cursor-pointer hover:scale-103 transition duration-300 ease-in-out select-none">
        {preloadedImages.length > 0 ? (
          <img
            src={preloadedImages[photoIndex]}
            alt="placeholder"
            className="object-cover w-full h-full rounded-2xl"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full bg-gray-400 rounded-2xl"></div>
        )}
        <div className="absolute bottom-0 left-0 w-full h-full opacity-0 hover:opacity-100">
          <div className="flex items-center h-full w-full">
            {photoIndex > 0 && prevPhotoButton()}
            {photoIndex < photos.length - 1 && nextPhotoButton()}
          </div>
        </div>
      </div>
      <div className="flex flex-inline p-2 mt-1">
        <img src={PersonIcon} alt="pfp" className="w-12 h-12" />
        <div className="flex-col ml-4">
          <h4 className="font-bold text-lg md:text-xl sm:text-lg">
            {projectName}
          </h4>
          <p className="text-slate-500">{description}</p>
          <p className="text-slate-500">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
