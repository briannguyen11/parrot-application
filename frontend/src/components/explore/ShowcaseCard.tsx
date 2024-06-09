import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import PersonIcon from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import NoPic from "../../assets/icons/nopic.svg";
import { MinProfileData } from "../interfaces";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PhotoData } from "../interfaces";

interface ShowcaseCardProps {
  projectId: number;
  projectName: string;
  description: string;
  photos: PhotoData[];
  postDate: string;
  profile: MinProfileData;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  projectId,
  projectName,
  description,
  photos,
  postDate,
  profile,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const orderedPhotos = photos.sort((a, b) => a.order - b.order);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const navigate = useNavigate();

  const isRecentPost = (postDate: string) => {
    const postDateObj = new Date(postDate);
    const currentDate = new Date();
    const dayDifference = (+currentDate - +postDateObj) / (1000 * 3600 * 24);
    return dayDifference <= 3;
  };

  const timeAgo = formatDistanceToNow(new Date(postDate), {
    addSuffix: true,
  });

  useEffect(() => {
    preloadImages(orderedPhotos);
  }, []);

  const preloadImages = (photos: PhotoData[]) => {
    const imagePromises = photos.map((photo) => {
      return new Promise<string>((resolve) => {
        const img = new Image();
        img.src = photo.photo;
        img.onload = () => {
          resolve(photo.photo);
        };
      });
    });
    Promise.all<string>(imagePromises).then((images) => {
      setIsPreloaded(true);
      setPreloadedImages(images);
    });
  };

  return (
    <div className="relative">
      <div className="group aspect-video relative hover:cursor-pointer hover:scale-102 transition duration-300 ease-in-out select-none">
        {photos.length > 0 ? (
          isPreloaded ? (
            <img
              src={preloadedImages[photoIndex]}
              alt="showcase-project"
              className="object-cover w-full h-full rounded-md"
              draggable="false"
              onClick={() => {
                navigate("/showcase-project/" + projectId);
              }}
            />
          ) : (
            <div
              onClick={() => {
                navigate("/showcase-project/" + projectId);
              }}
              className="w-full h-full rounded-md bg-gray-50"
            ></div>
          )
        ) : (
          <div
            onClick={() => {
              navigate("/showcase-project/" + projectId);
            }}
            className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center"
          >
            <img src={NoPic} alt="placeholder" className="w-12 h-12" />
          </div>
        )}
        {isRecentPost(postDate) && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-sm bg-white shadow-light">
            <p className="text-sm font-raleway font-medium bg-showcase-gradient text-transparent bg-clip-text animate-pulseGradient">
              New
            </p>
          </div>
        )}

        {photoIndex < photos.length - 1 && (
          <div
            onClick={() => setPhotoIndex(photoIndex + 1)}
            className="  rounded-full absolute top-1/2 right-2 p-1.5 bg-white transform -translate-y-1/2 bg-opacity-50 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity duration-300 "
          >
            <ChevronRight size={18} />
          </div>
        )}

        {photoIndex > 0 && (
          <div
            onClick={() => setPhotoIndex(photoIndex - 1)}
            className="rounded-full absolute top-1/2 left-2 p-1.5 bg-white transform -translate-y-1/2 bg-opacity-50 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity duration-300 "
          >
            <ChevronLeft size={18} />
          </div>
        )}
      </div>
      <div className="flex flex-inline py-2 mt-1">
        <img
          onClick={() => navigate(`/${profile.username}`)}
          src={profile.profile_picture || PersonIcon}
          alt="pfp"
          className="w-9 h-9 rounded-full cursor-pointer"
        />
        <div className="flex-col ml-4 w-full">
          <div className="flex items-center justify-between gap-2 ">
            <h4 className="font-semibold text-md text-primary">
              {projectName}
            </h4>
            <p className="text-gray-400 text-sm">{timeAgo}</p>
          </div>

          <p className="text-slate-500 dark:text-gray-400 text-sm whitespace-nowrap text-ellipsis w-64 overflow-hidden">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
