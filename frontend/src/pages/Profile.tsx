import { useEffect, useState } from "react";
import api from "../api";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar/Navbar";
import OpenProjectsTable from "@/components/profile/OpenProjectsTable";
import ShowcaseProjectsTable from "@/components/profile/ShowcaseProjectsTable";
import UserCard from "@/components/profile/UserCard";
import UpdateUserForm from "@/components/profile/UpdateUserForm";

import { UserData } from "@/components/profile/UserData";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [userOpenProjects, setUserOpenProjects] = useState([]);
  const [updateUser, setUpdateUser] = useState<boolean>(false);

  useEffect(() => {
    document.title = "View Profile";

    const fetchUserData = async () => {
      try {
        const data: UserData | undefined = await fetchProfile();
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
      const res = await api.get("/api/profiles/");
      const data = res.data[0];
      const fetchedUser: UserData = {
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
      setUser(fetchedUser);
      return fetchedUser;
    } catch (error) {
      throw error;
    }
  };

  const fetchUserOpenProjects = async (userId: string) => {
    try {
      const res = await api.get("/api/open-projects/projects/", {
        params: {
          user_id: userId,
        },
      });
      setUserOpenProjects(res.data.results);
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
            {!loading && user && !updateUser && (
              <>
                <div className="mt-4 mx-4">
                  <UserCard user={user} setUpdateUser={setUpdateUser} />
                </div>
              </>
            )}
            {!loading && user && updateUser && (
              <>
                <div className="mt-4 mx-4">
                  <UpdateUserForm
                    user={user}
                    setUser={setUser}
                    setUpdateUser={setUpdateUser}
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
