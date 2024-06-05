import { ShowcaseData } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NoPic from "../../assets/icons/nopic.svg";
import { formatDistanceToNow } from "date-fns";
import LeftIcon from "../../assets/icons/left-arrow-backup-2-svgrepo-com.svg";
import RightIcon from "../../assets/icons/right-arrow-backup-2-svgrepo-com.svg";


const ShowcaseCardProfile = (project: ShowcaseData, key: number) => {
  const navigate = useNavigate();
  const [photoIndex, setPhotoIndex] = useState(0);
  const orderedPhotos = project.photos.sort((a, b) => a.order - b.order);
  const timeAgo =
  formatDistanceToNow(new Date(project.post_date), {
    addSuffix: true,
  });

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


  return (
    <div className="relative" key={key}>
      <div
        onClick={() => {navigate("/showcase-project/" + project.id)}}
        className="aspect-spotlight relative hover:cursor-pointer hover:scale-103 transition duration-300 ease-in-out select-none"
      >
        {project.photos.length > 0 ? (
          <img
            src={orderedPhotos[photoIndex].photo}
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
            {photoIndex < project.photos.length - 1 && nextPhotoButton()}
          </div>
        </div>
      </div>
      <div className="flex flex-inline py-2 mt-1">
        <div className="flex-col w-full">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold text-md">{project.project_name}</h4>
            <p className="text-gray-400 text-sm">{timeAgo}</p>
          </div>

          <p className="text-slate-500 text-sm">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCardProfile;
