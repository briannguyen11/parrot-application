import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import ShowcaseGridProfile from "@/components/profile/ShowcaseGridProfile";
import DefaultBanner from "../assets/banners/slo_default.jpg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import GithubIcon from "../assets/icons/github.svg";
import ResumeIcon from "../assets/icons/resume.svg";
import DefaultProfile from "../assets/icons/person-crop-circle-fill-svgrepo-com.svg";
import LoadingIcon from "../assets/icons/loading.svg";
import BannerInput from "@/components/profile/BannerInput";
import PhotoInput from "@/components/profile/PhotoInput";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { UserAuth } from "../auth/AuthContext";
import OpenListProfile from "@/components/profile/OpenListProfile";
import { useLocation } from "react-router-dom";
import { ProfileData, OpenData, ShowcaseData } from "@/components/interfaces";

const PublicProfile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [openProjectLoading, setOpenProjectLoading] = useState<boolean>(true);
  const [showcaseProjectLoading, setShowcaseProjectLoading] =
    useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [tab, setTab] = useState<string>("showcase");
  const [openProjects, setOpenProjects] = useState<OpenData[]>([]);
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseData[]>([]);
  const [profileUpdating, setProfileUpdating] = useState<boolean>(false);
  const { user, setUserPfp } = UserAuth();
  const location = useLocation();
  const user_name = location.pathname.split("/")[1];

  const patchProfile = async (newProfile: Partial<ProfileData>) => {
    try {
      console.log(newProfile);
      if (Object.keys(newProfile)?.length === 0) {
        return;
      }

      setProfileUpdating(true);
      const res = await api.patch(`/api/profiles/${profile?.id}/`, newProfile);

      console.log(res.data);
      window.scrollTo({ top: 0, behavior: "instant" });
      setProfileUpdating(false);
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setPfp = async (value: File) => {
    const formData = new FormData();
    formData.append("profile_picture", value);

    try {
      setProfileUpdating(true);
      const res = await api.patch(`/api/profiles/${profile?.id}/`, formData);

      // console.log(res.data);
      window.scrollTo({ top: 0, behavior: "instant" });
      setProfileUpdating(false);
      console.log(res.data.profile_picture);
      setUserPfp(res.data.profile_picture);
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setBanner = async (value: File) => {
    const formData = new FormData();
    formData.append("banner", value);

    try {
      setProfileUpdating(true);
      const res = await api.patch(`/api/profiles/${profile?.id}/`, formData);

      console.log(res.data);
      window.scrollTo({ top: 0, behavior: "instant" });
      setProfileUpdating(false);
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOpenProjects = async () => {
      const res = await api.get(
        `/api/open-projects/projects/?user_id=${profile?.user}`
      );
      console.log(res.data.results);
      setOpenProjects(res.data.results);
      setOpenProjectLoading(false);
    };

    if (profile) {
      fetchOpenProjects();
    }
  }, [profile]);

  useEffect(() => {
    document.title = "View Profile";
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchProfile = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const res = await api.get(`/api/profiles/public/?username=${user_name}`);
        // console.log(res);

        // set user
        const {
          user,
          username,
          id,
          first_name,
          last_name,
          school,
          major,
          bio,
          profile_picture,
          resume,
          linkedin,
          github,
          banner,
          header,
        } = res.data[0];
        setProfile({
          user,
          id,
          first_name,
          last_name,
          school,
          major,
          bio,
          profile_picture,
          resume,
          linkedin,
          github,
          banner,
          header,
          username,
        });

        setLoading(false);
      } catch (error) {
        // navigate("/");
        throw error;
      }
    };

    const fetchShowcaseProjects = async () => {
      const res = await api.get(
        `/api/showcase-projects/feed/?username=${user_name}`
      );
      console.log(res.data.results);
      setShowcaseProjects(res.data.results);
      setShowcaseProjectLoading(false);
    };

    fetchShowcaseProjects();

    fetchProfile();
  }, []);

  return (
    <>
      {profileUpdating && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white ${
            profileUpdating ? "opacity-100" : "opacity-0"
          } z-50 flex items-center justify-center transition duration-300 ease-in-out`}
        >
          <div className="flex items-center gap-4">
            <h4 className="font-montserrat text-lg font-medium">
              Saving your new profile...
            </h4>
            <div className="animate-spin rounded-full w-8 h-8 overflow-hidden">
              <img
                src={LoadingIcon}
                alt="logo"
                className="w-full h-full object-cover select-none"
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full pt-5 pb-10">
        <div className="h-60 w-full object-cover rounded-2xl relative">
          {!loading ? (
            <div className="h-48 w-full">
              {user?.user === profile?.user ? (
                <BannerInput
                  banner={profile?.banner || DefaultBanner}
                  setBanner={setBanner}
                />
              ) : (
                <img
                  src={profile?.banner || DefaultBanner}
                  className="h-48 w-full object-cover rounded-2xl object-top"
                />
              )}
            </div>
          ) : (
            <Skeleton className="h-48 w-full object-cover rounded-2xl" />
          )}

          <div className="h-40 w-40 rounded-full bg-white  absolute bottom-0 left-12">
            {!loading &&
              (user?.user === profile?.user ? (
                <PhotoInput
                  pfp={profile?.profile_picture || DefaultProfile}
                  setPfp={setPfp}
                />
              ) : (
                <img
                  src={profile?.profile_picture || DefaultProfile}
                  alt="profile_picture"
                  className="h-full w-full rounded-full object-cover border-4 border-white"
                />
              ))}
          </div>
        </div>
        <div className="mt-3 pb-6 border-b">
          <div className="flex items-start justify-between md:flex-row flex-col">
            <div className="flex flex-col">
              {!loading ? (
                <div className="flex md:flex-row md:items-end md:justify-start flex-col justify-end md:gap-2">
                  <h1 className="text-4xl font-montserrat font-bold text-primary">
                    {profile?.first_name} {profile?.last_name}
                  </h1>
                  <p className="font-montserrat text-sm text-secondary">
                    {profile?.username !== "empty"
                      ? `@${profile?.username}`
                      : ""}
                  </p>
                </div>
              ) : (
                <Skeleton className="w-96 h-10" />
              )}

              {!loading ? (
                <h4 className="mt-2 text-sm font-raleway text-primary-foreground font-medium">
                  {profile?.header !== "empty" ? profile?.header : ""}
                </h4>
              ) : (
                <Skeleton className="mt-2 w-64 h-4" />
              )}
              {!loading ? (
                <div className="mt-1 flex items-center gap-5 text-sm font-raleway text-gray-400">
                  <p>500+ followers</p>
                  {!openProjectLoading && !showcaseProjectLoading && (
                    <p>
                      {openProjects?.length + showcaseProjects?.length} projects
                    </p>
                  )}
                </div>
              ) : (
                <Skeleton className="mt-1 w-52 h-4" />
              )}

              {!loading ? (
                <div className="mt-3 flex items-center">
                  {user?.user === profile?.user ? (
                    <EditProfileDialog
                      profile={profile}
                      patchProfile={patchProfile}
                    />
                  ) : (
                    <button className="text-sm font-raleway font-semibold text-parrot-green border-2 border-parrot-green py-1 px-6 rounded-xl hover:bg-parrot-green hover:text-white">
                      Follow
                    </button>
                  )}
                </div>
              ) : (
                <Skeleton className="mt-3 w-40 h-8" />
              )}

              {!loading ? (
                <p className="mt-4 font-raleway text-primary-foreground text-base">
                  {profile?.bio}
                </p>
              ) : (
                <Skeleton className="mt-4 w-96 h-4" />
              )}
            </div>
            {!loading && (
              <div className="flex flex-col">
                <div className="flex gap-3 items-center md:justify-end md:mt-0 mt-6">
                  {profile?.linkedin && (
                    <a
                      href={profile?.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={LinkedinIcon}
                        alt="linkedin"
                        className="w-6 h-6"
                      />
                    </a>
                  )}

                  {profile?.github && (
                    <a href={profile?.github} target="_blank" rel="noreferrer">
                      <img src={GithubIcon} alt="github" className="w-6 h-6" />
                    </a>
                  )}

                  {profile?.resume && (
                    <a href={profile?.resume} target="_blank" rel="noreferrer">
                      <img src={ResumeIcon} alt="resume" className="w-6 h-6" />
                    </a>
                  )}
                </div>

                {(profile?.linkedin || profile?.github || profile?.resume) && (
                  <p className="mt-1 font-raleway text-secondary text-sm">
                    Connect with me{" "}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-7 text-base font-raleway font-semibold">
          <button
            onClick={() => setTab("showcase")}
            className={`${tab === "showcase" && "underline"}`}
          >
            Showcase Projects
          </button>

          <button
            onClick={() => setTab("open")}
            className={`${tab === "open" && "underline"}`}
          >
            Open Projects
          </button>
        </div>

        {tab === "showcase" && (
          <div className="mt-4">
            <ShowcaseGridProfile
              showcaseProjects={showcaseProjects}
              loading={showcaseProjectLoading}
            />
          </div>
        )}

        {tab === "open" && (
          <div className="mt-4">
            <OpenListProfile
              openProjects={openProjects}
              loading={openProjectLoading}
            />

            {/* <OpenTable
              openProjects={openProjects}
              setOpenProjects={setOpenProjects}
              formatDate={formatDate}
            /> */}
          </div>
        )}
      </div>
    </>
  );
};

export default PublicProfile;
