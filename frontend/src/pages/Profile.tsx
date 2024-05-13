import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar/Navbar";
import AccountCard from "@/components/profile/AccountCard";
import OpenProjectsTable from "@/components/profile/OpenProjectsTable";
import ShowcaseProjectsTable from "@/components/profile/ShowcaseProjectsTable";
import AccountForm from "@/components/profile/AccountForm";

interface ProfileData {
  userId: string;
  profileId: string;
  firstName: string;
  lastName: string;
  school: string;
  major: string;
  bio: string;
  profilePicture: string;
  resume: string;
  linkedin: string;
  github: string;
}

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userOpenProjects, setUserOpenProjects] = useState([]);
  const [updateAccount, setUpdateAccount] = useState<boolean>(false);

  useEffect(() => {
    document.title = "View Profile";

    const fetchUserData = async () => {
      try {
        const data: ProfileData | undefined = await fetchProfile();
        if (data) {
          await fetchUserOpenProjects(data.userId);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [updateAccount]);

  const fetchProfile = async () => {
    try {
      const res = await api.get("api/profiles/");
      const data = res.data[0];
      const newProfileData: ProfileData = {
        userId: data.user,
        profileId: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        school: data.school,
        major: data.major,
        bio: data.bio,
        profilePicture: data.profile_picture,
        resume: data.resume,
        linkedin: data.linkedin,
        github: data.github,
      };
      setProfileData(newProfileData);
      return newProfileData;
    } catch (error) {
      throw error;
    }
  };

  const fetchUserOpenProjects = async (userId: string) => {
    try {
      const res = await api.get("api/open-projects/projects/", {
        params: {
          user_id: userId,
        },
      });
      setUserOpenProjects(res.data);
    } catch (error) {
      throw error;
    }
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
      <Navbar />
      <div className="md:mx-7 mx-5 mt-16 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3">
            {renderAccountSkeletons()}
            {!loading && profileData && !updateAccount && (
              <>
                <div className="mt-4 mx-4">
                  <AccountCard
                    {...profileData}
                    setUpdateAccount={setUpdateAccount}
                  />
                </div>
              </>
            )}
            {!loading && profileData && updateAccount && (
              <>
                <div className="mt-4 mx-4">
                  <AccountForm
                    {...profileData}
                    setUpdateAccount={setUpdateAccount}
                  />
                </div>
              </>
            )}
          </div>
          <div className="w-full lg:w-2/3 ">
            {renderProjectSkeletons()}
            {!loading && (
              <>
                <div className="mt-4 mx-4">
                  <OpenProjectsTable userOpenProjects={userOpenProjects} />
                </div>
                <div className="mt-4 mx-4">
                  <ShowcaseProjectsTable />
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
