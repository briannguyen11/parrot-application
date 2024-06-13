import { ShowcaseData } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NoPic from "../../assets/icons/nopic.svg";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PhotoData } from "../interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThreeDots from "@/assets/icons/three-dots-vertical-svgrepo-com.svg";
import TrashIcon from "@/assets/icons/trash-svgrepo-com.svg";

interface ShowcaseCardProfileProp {
  project: ShowcaseData;
  key: number;
  deleteProject: (projectId: number) => void;
}

const ShowcaseCardProfile: React.FC<ShowcaseCardProfileProp> = ({
  project,
  key,
  deleteProject,
}) => {
  const navigate = useNavigate();
  const [photoIndex, setPhotoIndex] = useState(0);
  const orderedPhotos = project.photos.sort((a, b) => a.order - b.order);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(project.post_date), {
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

  const renderOptions = (projectId: number) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            src={ThreeDots}
            alt="Option"
            className="h-7 w-7 hover:cursor-pointer p-1 rounded-full transition duration-300 ease-in-out"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuItem>
            <div
              className="flex gap-2 items-center hover:bg-gray-100 p-1 rounded-md"
              onClick={() => deleteProject(projectId)}
            >
              <img src={TrashIcon} alt="Delete" className="h-4 w-4" />
              <p className="text-xs">Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="relative" key={key}>
      <div className="group aspect-video relative hover:cursor-pointer transition duration-300 ease-in-out select-none">
        {project.photos.length > 0 ? (
          isPreloaded ? (
            <img
              src={preloadedImages[photoIndex]}
              alt="showcase-project"
              className="object-cover w-full h-full rounded-md"
              draggable="false"
              onClick={() => {
                navigate("/showcase-project/" + project.id);
              }}
            />
          ) : (
            <div className="w-full h-full rounded-md bg-gray-50"></div>
          )
        ) : (
          <div
            onClick={() => {
              navigate("/showcase-project/" + project.id);
            }}
            className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center"
          >
            <img src={NoPic} alt="placeholder" className="w-12 h-12" />
          </div>
        )}

        {photoIndex < project.photos.length - 1 && (
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
            className="  rounded-full absolute top-1/2 left-2 p-1.5 bg-white transform -translate-y-1/2 bg-opacity-50 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity duration-300 "
          >
            <ChevronLeft size={18} />
          </div>
        )}

        {
          <div className="absolute top-4 right-4">
            {renderOptions(project.id)}
          </div>
        }
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
