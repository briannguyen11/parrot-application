import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import OpenTable from "@/components/profile/OpenTable";
import ApplyTable from "@/components/profile/ApplyTable";
import ShowcaseTable from "@/components/profile/ShowcaseTable";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileForm from "@/components/profile/ProfileForm";

import {
  ProfileData,
  OpenData,
  ApplyData,
  ShowcaseData,
} from "@/components/interfaces";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [openProjects, setOpenProjects] = useState<OpenData[]>([]);
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseData[]>([]);
  const [applyProjects, setApplyProjects] = useState<ApplyData[]>([]);
  const [liked, setLiked] = useState([]);
  const [savedOpen, setSavedOpen] = useState([]);
  const [savedShowcase, setSavedShowcase] = useState([]);

  useEffect(() => {
    document.title = "View Profile";

    const fetchProfile = async () => {
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
        setApplyProjects(res.data[0].applied_open_projects);

        // set liked
        setLiked(res.data[0].likes);

        // set saved open projects
        setSavedOpen(res.data[0].saved_open_projects);

        // set saved showcase projects
        setSavedShowcase(res.data[0].saved_showcase_projects);

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

  const renderAccountSkeletons = () => {
    if (loading) {
      return (
        <>
          <Skeleton className="h-[300px] mt-4 mx-4 rounded-xl" />
          <Skeleton className="h-[300px] mt-4 mx-4 rounded-xl" />
        </>
      );
    }
    return null;
  };

  const renderProjectSkeletons = () => {
    if (loading) {
      return (
        <>
          <Skeleton className="h-[300px] mt-4 mx-4 rounded-xl" />
          <Skeleton className="h-[300px] mt-4 mx-4 rounded-xl" />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="md:mx-7 mx-5 mt-16 relative">
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
    </>
  );
};

export default Profile;
