import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
// import { formatDistanceToNow } from "date-fns";
import { UserAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

import LeftIcon from "@/assets/icons/left-arrow-backup-2-svgrepo-com.svg";
import RightIcon from "@/assets/icons/right-arrow-backup-2-svgrepo-com.svg";
import LinkIcon from "@/assets/icons/url-1424-svgrepo-com.svg";
import GithubIcon from "@/assets/icons/github.svg";
import { Skeleton } from "@/components/ui/skeleton";

import api from "@/api";

import {
  LikeData,
  SaveData,
  CommentData,
  MinProfileData,
  PhotoData,
  ShowcaseData,
} from "@/components/interfaces";
import CommentInput from "@/components/comments/CommentInput";
import CommentList from "@/components/comments/CommentList";

const ShowcaseProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = UserAuth();
  const [liked, setLiked] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ShowcaseData>();
  const [profile, setProfile] = useState<MinProfileData>();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
      try {
        const res = await api.get(
          "/api/showcase-projects/projects/" + projectId + "/"
        );
        setProject(res.data);
        setProfile(res.data.profile);
        setComments(res.data.comments);
        setLoading(false);

        // check if user liked current showcase
        const likeObject = res.data.likes.find(
          (like: LikeData) => like.user === user?.user
        );
        if (likeObject) {
          setLiked(likeObject.id);
        }

        // load images to render
        preloadImages(
          res.data.photos.sort(
            (a: PhotoData, b: PhotoData) => a.order - b.order
          )
        );

        document.title = `${res.data.project_name} | Parrot`;
      } catch (error) {
        console.error(error);
      }
    };

    const checkUserSaved = async () => {
      try {
        if (user?.user) {
          const res = await api.get(
            `/api/showcase-projects/saves/?user_id=${user?.user}`
          );
          const saveObject = res.data.find(
            (saved: SaveData) => saved.project.id === Number(projectId)
          );
          if (saveObject) {
            setSaved(saveObject.id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
    checkUserSaved();
  }, [projectId, user]);

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

  const handleLike = async () => {
    if (!liked) {
      try {
        const res = await api.post("/api/showcase-projects/likes/", {
          project: projectId,
        });
        setLiked(res.data.id);
      } catch (error) {
        console.error(error);
      }
    }
    if (liked) {
      try {
        await api.delete(`/api/showcase-projects/likes/${liked}/`);
        setLiked(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSave = async () => {
    if (!saved) {
      try {
        const res = await api.post("/api/showcase-projects/saves/", {
          project: projectId,
        });
        console.log(res);
        setSaved(res.data.id);
      } catch (error) {
        console.error(error);
      }
    }
    if (saved) {
      try {
        await api.delete(`/api/showcase-projects/saves/${saved}/`);
        setSaved(null);
      } catch (error) {
        console.error(error);
      }
    }
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

  return (
    <div className="mt-8 flex flex-col w-full my-4 lg:w-[800px] pb-20">
      <div className="flex flex-row justify-between md:items-center">
        {!loading ? (
          <div className="flex flex-row items-center gap-4">
            <div
              onClick={() => navigate(`/${profile?.username}`)}
              className="flex flex-row items-center gap-3 cursor-pointer"
            >
              <img
                src={profile?.profile_picture}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-raleway text-medium font-semibold text-primary">
                {profile?.first_name} {profile?.last_name}
              </p>
            </div>
            <button
              className={`text-sm font-raleway font-semibold  border-2 py-1 px-4 rounded-xl ${
                user?.user === profile?.user_id
                  ? "hover:bg-parrot-blue text-parrot-blue border-parrot-blue"
                  : "hover:bg-parrot-green text-parrot-green border-parrot-green"
              } hover:text-white`}
            >
              {user?.user === profile?.user_id ? "Edit" : "Follow"}
            </button>
          </div>
        ) : (
          <Skeleton className="w-64 h-8" />
        )}
        {!loading ? (
          <div className="flex flex-inline gap-2 items-center">
            <button className="w-7 h-7" onClick={() => handleLike()}>
              <svg
                className={`w-7 h-7 stroke-2 stroke-parrot-red  ${
                  liked && "fill-parrot-red"
                }`}
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
              </svg>
            </button>
            <button className="w-7 h-7" onClick={() => handleSave()}>
              <svg
                className={`w-7 h-7 stroke-2 stroke-parrot-blue ${
                  saved && "fill-parrot-blue stroke-parrot-blue"
                }`}
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" />
              </svg>
            </button>
          </div>
        ) : (
          <Skeleton className="w-32 h-6" />
        )}
      </div>
      <div className="relative mt-5">
        {!loading && preloadedImages.length > 0 && (
          <img
            src={preloadedImages[photoIndex]}
            alt="placeholder"
            className="object-cover rounded-md w-full aspect-video"
            draggable="false"
          />
        )}

        {!loading &&
          preloadedImages.length === 0 &&
          project?.photos.length !== 0 && (
            <div className="w-full rounded-md bg-gray-50 aspect-video"></div>
          )}

        {loading && <Skeleton className="w-full aspect-video rounded-md" />}

        <div className="absolute bottom-0 left-0 opacity-0 hover:opacity-100 h-full w-full">
          <div className="flex h-full items-center ">
            {project && photoIndex > 0 && prevPhotoButton()}
            {project &&
              photoIndex < project.photos.length - 1 &&
              nextPhotoButton()}
          </div>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-400 text-center">
        {project?.photos[photoIndex]?.caption}
      </p>

      {!loading ? (
        <div className="flex flex-row justify-between gap-2">
          <div className="mt-5 flex flex-row gap-4 items-center">
            <h3 className="text-2xl sm:text-4xl font-bold font-raleway">
              {project?.project_name}
            </h3>
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <a target="_blank" rel="noreferrer" className="cursor-pointer">
                <img src={LinkIcon} alt="link" className="w-5 h-5" />
              </a>
              <a target="_blank" rel="noreferrer" className="cursor-pointer">
                <img src={GithubIcon} alt="github" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className="mt-10 w-96 h-8" />
      )}
      <div className="mt-3 text-md font-montserrat text-gray-800">
        {project?.description}
      </div>

      {!loading ? (
        <h5 className="mt-10 mb-5 text-lg font-semibold font-raleway">
          Comments
        </h5>
      ) : (
        <Skeleton className="w-64 h-6 mb-10" />
      )}
      <CommentInput projectId={Number(projectId)} setComments={setComments} />
      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
};

export default ShowcaseProject;
