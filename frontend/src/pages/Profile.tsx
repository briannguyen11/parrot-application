import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import OpenTable from "@/components/profile/OpenTable";
import ShowcaseGridProfile from "@/components/profile/ShowcaseGridProfile";
import DefaultBanner from "../assets/banners/slo_default.jpg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import GithubIcon from "../assets/icons/github.svg";
import ResumeIcon from "../assets/icons/resume.svg";
import DefaultProfile from "../assets/icons/person-crop-circle-fill-svgrepo-com.svg";
import LoadingIcon from "../assets/icons/loading.svg";

import {
  ProfileData,
  OpenData,
  // ApplyData,
  ShowcaseData,
} from "@/components/interfaces";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import PhotoInput from "@/components/profile/PhotoInput";


const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [tab, setTab] = useState<string>("showcase");
  const [openProjects, setOpenProjects] = useState<OpenData[]>([]);
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseData[]>([]);
  const [profileUpdating, setProfileUpdating] = useState<boolean>(false);

  const patchProfile = async (newProfile: Partial<ProfileData>) => {
    try {
      console.log(newProfile);
      if (Object.keys(newProfile).length === 0) {
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
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "View Profile";

    const fetchProfile = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const res = await api.get("/api/profiles/");
        // console.log(res);

        // set user
        const {
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
        });

        setShowcaseProjects(res.data[0].showcase_projects);
        setOpenProjects(res.data[0].open_projects);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    return `${month}/${day}/${year}`;
  };

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
            <img
              src={DefaultBanner}
              className="h-48 w-full object-cover rounded-2xl object-top"
            />
          ) : (
            <Skeleton className="h-48 w-full object-cover rounded-2xl" />
          )}

          <div className="h-40 w-40 rounded-full bg-white  absolute bottom-0 left-12">
            {!loading && (
              // <img
              //   src={profile?.profile_picture || DefaultProfile}
              //   alt="profile_picture"
              //   className="h-full w-full rounded-full object-cover border-4 border-white"
              // />
              <PhotoInput
                pfp={profile?.profile_picture || DefaultProfile}
                setPfp={setPfp}
              />
            )}
          </div>
        </div>
        <div className="mt-3 pb-6 border-b">
          <div className="flex items-start justify-between md:flex-row flex-col">
            <div className="flex flex-col">
              {!loading ? (
                <h1 className="text-4xl font-montserrat font-bold text-primary">
                  {profile?.first_name} {profile?.last_name}
                </h1>
              ) : (
                <Skeleton className="w-96 h-10" />
              )}

              {!loading ? (
                <h4 className="mt-2 text-sm font-raleway text-primary-foreground font-medium">
                  Profile Header Here
                </h4>
              ) : (
                <Skeleton className="mt-2 w-64 h-4" />
              )}
              {!loading ? (
                <div className="mt-1 flex items-center gap-5 text-sm font-raleway text-gray-400">
                  <p>500+ followers</p>
                  <p>
                    {openProjects.length + showcaseProjects.length} projects
                  </p>
                </div>
              ) : (
                <Skeleton className="mt-1 w-52 h-4" />
              )}

              {!loading ? (
                <div className="mt-3 flex items-center">
                  <EditProfileDialog
                    profile={profile}
                    patchProfile={patchProfile}
                  />
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
                  <a href={profile?.linkedin} target="_blank" rel="noreferrer">
                    <img
                      src={LinkedinIcon}
                      alt="linkedin"
                      className="w-6 h-6"
                    />
                  </a>

                  <a href={profile?.github} target="_blank" rel="noreferrer">
                    <img src={GithubIcon} alt="github" className="w-6 h-6" />
                  </a>

                  <a href={profile?.resume} target="_blank" rel="noreferrer">
                    <img src={ResumeIcon} alt="resume" className="w-6 h-6" />
                  </a>
                </div>

                <p className="mt-1 font-raleway text-secondary text-sm">
                  Connect with me{" "}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-7 text-sm">
          <button
            onClick={() => setTab("showcase")}
            className={`${tab === "showcase" && "underline"}`}
          >
            Showcase Projects ({showcaseProjects.length})
          </button>

          <button
            onClick={() => setTab("open")}
            className={`${tab === "open" && "underline"}`}
          >
            Open Projects ({openProjects.length})
          </button>
        </div>

        {tab === "showcase" && (
          <div className="mt-4">
            <ShowcaseGridProfile
              showcaseProjects={showcaseProjects}
              loading={loading}
            />
          </div>
        )}

        {tab === "open" && (
          <div className="mt-4">
            <OpenTable
              openProjects={openProjects}
              setOpenProjects={setOpenProjects}
              formatDate={formatDate}
            />
          </div>
        )}
      </div>

      {/* <div className="md:mx-7 mx-5 mt-16 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4">
            {renderAccountSkeletons()}
            {!loading && profile && !updateProfile && (
              <>
                <div className="mt-4 mx-4">
                  <ProfileCard
                    profile={profile}
                    setUpdateProfile={setUpdateProfile}
                  />
                </div>
              </>
            )}
            {!loading && profile && updateProfile && (
              <>
                <div className="mt-4 mx-4">
                  <ProfileForm
                    profile={profile}
                    setProfile={setProfile}
                    setUpdateProfile={setUpdateProfile}
                  />
                </div>
              </>
            )}
          </div>
          <div className="w-full lg:w-3/4 ">
            {renderProjectSkeletons()}
            {!loading && (
              <>
                <div className="mt-4 mx-4">
                  <ShowcaseTable
                    showcaseProjects={showcaseProjects}
                    setShowcaseProjects={setShowcaseProjects}
                    formatDate={formatDate}
                  />
                </div>
                <div className="mt-4 mx-4">
                  <OpenTable
                    openProjects={openProjects}
                    setOpenProjects={setOpenProjects}
                    formatDate={formatDate}
                  />
                </div>
                <div className="mt-4 mx-4">
                  <ApplyTable applyProjects={applyProjects} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
 */}
    </>
  );
};

export default Profile;
