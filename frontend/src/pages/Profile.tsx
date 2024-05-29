import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import OpenTable from "@/components/profile/OpenTable";
import ShowcaseGridProfile from "@/components/profile/ShowcaseGridProfile";
import DefaultBanner from "../assets/banners/slo_default.jpg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import GithubIcon from "../assets/icons/github.svg";
import ResumeIcon from "../assets/icons/resume.svg";

import {
  ProfileData,
  OpenData,
  // ApplyData,
  ShowcaseData,
} from "@/components/interfaces";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [tab, setTab] = useState<string>("showcase");
  // const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [openProjects, setOpenProjects] = useState<OpenData[]>([]);
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseData[]>([]);
  // const [applyProjects, setApplyProjects] = useState<ApplyData[]>([]);
  // const [liked, setLiked] = useState([]);
  // const [savedOpen, setSavedOpen] = useState([]);
  // const [savedShowcase, setSavedShowcase] = useState([]);

  useEffect(() => {
    document.title = "View Profile";

    const fetchProfile = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const res = await api.get("/api/profiles/");
        console.log(res);

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

        // set showcase projects
        setShowcaseProjects(res.data[0].showcase_projects);

        // set open projects
        setOpenProjects(res.data[0].open_projects);

        // set applied projects
        // setApplyProjects(res.data[0].applied_open_projects);

        // set liked
        // setLiked(res.data[0].likes);

        // // set saved open projects
        // setSavedOpen(res.data[0].saved_open_projects);

        // // set saved showcase projects
        // setSavedShowcase(res.data[0].saved_showcase_projects);

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
              <img
                src={profile?.profile_picture}
                alt="profile_picture"
                className="h-full w-full rounded-full object-cover border-4 border-white"
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
                  <button className="text-sm font-raleway font-semibold text-card-green border-2 border-card-green py-1 px-4 rounded-xl">
                    Follow
                  </button>
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
