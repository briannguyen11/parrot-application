import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar/Navbar";
import PersonalInfoCard from "@/components/PersonalInfoCard";
import PersonalLinksCard from "@/components/PersonalLinksCard";
import OpenProjectsTable from "@/components/OpenProjectsTable";
import ShowcaseProjectsTable from "@/components/ShowcaseProjectsTable";

interface ProfileData {
  userId: string;
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
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("api/profiles/");
      const data = res.data[0];
      const newProfileData: ProfileData = {
        userId: data.user,
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
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            {renderAccountSkeletons()}
            {!loading && profileData && (
              <>
                <div className="mt-4 mx-4">
                  <PersonalInfoCard {...profileData} />
                </div>
                <div className="mt-4 mx-4">
                  <PersonalLinksCard {...profileData} />
                </div>
              </>
            )}
          </div>
          <div className="w-full md:w-2/3 ">
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
