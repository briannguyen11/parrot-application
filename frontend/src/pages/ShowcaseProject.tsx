import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

import LeftIcon from "..//assets/icons/left-arrow-backup-2-svgrepo-com.svg";
import RightIcon from "../assets/icons/right-arrow-backup-2-svgrepo-com.svg";
import PersonIcon from "../assets/icons/person-crop-circle-fill-svgrepo-com.svg";

import api from "@/api";

import { PhotoData, ShowcaseData } from "@/components/interfaces";

const ShowcaseProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ShowcaseData>();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get(
          "/api/showcase-projects/projects/" + projectId + "/"
        );
        console.log(res);
        setProject(res.data);

        preloadImages(res.data.photos);

        document.title = `${res.data.project_name} | Parrot`;
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, [projectId]);

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
    Promise.all<string>(imagePromises).then((images) =>
      setPreloadedImages(images)
    );
  };

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
    project && project.post_date
      ? "posted " +
        formatDistanceToNow(new Date(project.post_date), {
          addSuffix: false,
        }) +
        " ago"
      : "Date not available";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-home overflow-scroll my-4 overflow-hidden">
      <p className="hover:underline" onClick={() => navigate("/showcase")}>
        {"<- back"}
      </p>
      <h3 className="text-lg mt-2">{project?.project_name}</h3>
      <div className="relative w-96 h-96 mt-2">
        {preloadedImages.length > 0 ? (
          <img
            src={preloadedImages[photoIndex]}
            alt="placeholder"
            className="object-cover rounded-xl w-full h-full"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full bg-gray-400 rounded-2xl"></div>
        )}
        <div className="absolute bottom-0 left-0 opacity-0 hover:opacity-100 h-full w-full">
          <div className="flex h-full items-center ">
            {project && photoIndex > 0 && prevPhotoButton()}
            {project &&
              photoIndex < project.photos.length - 1 &&
              nextPhotoButton()}
          </div>
        </div>
      </div>
      <div className="flex flex-inline gap-2 items-center mt-2">
        <img src={PersonIcon} alt="Profile Picture" className="w-12 h-12" />
        <p>Person name</p>
        <p className="text-slate-500">{timeAgo}</p>
      </div>
      <div className="mt-2">Description: {project?.description}</div>
      <div className="mt-2 flex flex-col">
        <h3 className="text-lg font-semibold">Add comment</h3>
        <textarea
          className="h-20 outline-none"
          placeholder="Say something cool here!"
        />
      </div>
      <button className="bg-blue-400 text-white rounded-lg p-3">Comment</button>
    </div>
  );
};

export default ShowcaseProject;
