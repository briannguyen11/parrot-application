import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import PersonalInfoCard from "@/components/PersonalInfoCard";
import PersonalLinksCard from "@/components/PersonalLinksCard";
import OpenProjectsTable from "@/components/OpenProjectsTable";
import ShowcaseProjectsTable from "@/components/ShowcaseProjectsTable";
import { profile } from "console";

interface ProfileData {
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
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("api/profiles/");
        const data = res.data[0];
        const newProfileData: ProfileData = {
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

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
                  <OpenProjectsTable />
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
