import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import LeftIcon from "../../assets/icons/left-arrow-backup-2-svgrepo-com.svg";
import RightIcon from "../../assets/icons/right-arrow-backup-2-svgrepo-com.svg";
import PersonIcon from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import NoPic from "../../assets/icons/nopic.svg";
import { MinProfileData } from "../interfaces";

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
  // const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const navigate = useNavigate();



  const nextPhotoButton = () => {
    return (
      <button
        onClick={() => setPhotoIndex(photoIndex + 1)}
        className="z-50 bg-white rounded-full absolute right-0 mr-2 p-2 flex justify-center items-center opacity-80 hover:opacity-100"
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
  
    formatDistanceToNow(new Date(postDate), {
      addSuffix: true,
    });

  return (
    <div
      className="relative"
    >
      <div  onClick={() => navigate("/showcase-project/" + projectId)} className="aspect-spotlight relative hover:cursor-pointer hover:scale-103 transition duration-300 ease-in-out select-none">
        {photos.length > 0 ? (
          <img
            src={photos[photoIndex].photo}
            alt="placeholder"
            className="object-cover w-full h-full rounded-md"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            <img src={NoPic} alt="placeholder" className="w-12 h-12" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full h-full opacity-0 hover:opacity-100">
          <div className="flex items-center h-full w-full">
            {photoIndex > 0 && prevPhotoButton()}
            {photoIndex < photos.length - 1 && nextPhotoButton()}
          </div>
        </div>
      </div>
      <div className="flex flex-inline py-2 mt-1">
        <img src={profile.profile_picture} alt="pfp" className="w-9 h-9 rounded-full" />
        <div className="flex-col ml-4 w-full">
          <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-md">
            {projectName}
          </h4>
          <p className="text-gray-400 text-sm">{timeAgo}</p>
          </div>
          
          <p className="text-slate-500 text-sm">{description}</p>
         
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
