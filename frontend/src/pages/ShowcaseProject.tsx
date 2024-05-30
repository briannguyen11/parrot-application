import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

import LeftIcon from "@/assets/icons/left-arrow-backup-2-svgrepo-com.svg";
import RightIcon from "@/assets/icons/right-arrow-backup-2-svgrepo-com.svg";
import LinkIcon from "@/assets/icons/url-1424-svgrepo-com.svg";
import GithubIcon from "@/assets/icons/github.svg";
import HeartIcon from "@/assets/icons/heart-svgrepo-com.svg";
import SaveIcon from "@/assets/icons/bookmark-svgrepo-com.svg";

import api from "@/api";

import {
  CommentData,
  MinProfileData,
  PhotoData,
  ShowcaseData,
} from "@/components/interfaces";
import CommentInput from "@/components/comments/CommentInput";
import CommentList from "@/components/comments/CommentList";

const ShowcaseProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ShowcaseData>();
  const [profile, setProfile] = useState<MinProfileData>();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get(
          "/api/showcase-projects/projects/" + projectId + "/"
        );
        console.log(res);
        setProject(res.data);
        setProfile(res.data.profile);
        setComments(res.data.comments);

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
    Promise.all<string>(imagePromises).then((images) => {
      setPreloadedImages(images);
      setLoading(false);
    });
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
      ? "Posted " +
        formatDistanceToNow(new Date(project.post_date), {
          addSuffix: false,
        }) +
        " ago"
      : "Date not available";

  const handleDelete = () => {
    console.log("delete");
  };

  const handleLike = () => {
    setLiked(!liked);
    console.log("like");
  };

  const handleSave = () => {
    setSaved(!saved);
    console.log("saved");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4 w-full my-4 xs:w-[800px]">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <img
              src={profile?.profile_picture}
              alt="Profile Picture"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-medium font-medium">
              {profile?.first_name} {profile?.last_name}
            </p>
          </div>
          <button className="font-semibold text-xs md:text-sm text-parrotGreen border-2 border-parrot-green rounded-lg px-2 py-1 md:px-3 md:py-1.5">
            Follow
          </button>
        </div>
        <p className="text-slate-500 text-sm mt-2 md:mt-0">{timeAgo}</p>
      </div>
      <div className="relative">
        {preloadedImages.length > 0 ? (
          <img
            src={preloadedImages[photoIndex]}
            alt="placeholder"
            className="object-cover rounded-md w-full "
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

      <p className="text-sm text-slate-400 text-center">
        {project?.photos[photoIndex].caption}
      </p>
      <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between">
        <div className="flex flex-row gap-4 items-center">
          <h3 className="text-3xl sm:text-4xl font-semibold">
            {project?.project_name}
          </h3>
          <div className="flex flex-row gap-4">
            <a target="_blank" rel="noreferrer">
              <img src={LinkIcon} alt="link" className="w-5 h-5" />
            </a>
            <a target="_blank" rel="noreferrer">
              <img src={GithubIcon} alt="github" className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-inline gap-2">
          <button onClick={() => handleLike()}>
            <img
              src={HeartIcon}
              alt="Like"
              className={`p-2 rounded-full w-12 h-12 ${
                liked ? "bg-parrot-red" : "bg-transparent"
              }`}
            />
          </button>
          <button onClick={() => handleSave()}>
            <img
              src={SaveIcon}
              alt="Like"
              className={`p-2 rounded-full w-12 h-12 ${
                saved ? "bg-parrot-yellow" : "bg-transparent"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="text-md font-normal">{project?.description}</div>
      <CommentInput projectId={Number(projectId)} setComments={setComments} />
      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
};

export default ShowcaseProject;
