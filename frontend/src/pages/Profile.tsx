import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import api from "../api";

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
  const tempPerson = {
    pfp: "https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI",
    name: "John Smith",
    school: "Cal Poly SLO",
    major: "Computer Science",
    bio: "Rising fourth year computer science student interested in AI and ML",
    resume: "resume link",
    github: "github link",
    linkedIn: "linkedIn link",
  };

  // const [profileData, setProfileData] = useState<ProfileData>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("api/profiles/");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const renderAccountInfo = () => {
    return (
      <div className="shadow-light p-8 border border-border rounded-lg ">
        <div className="flex flex-col items-center justify-between gap-1">
          <img
            src={tempPerson.pfp}
            alt="profile"
            className="w-24 h-24 rounded-full"
          />
          <h3 className="text-2xl font-bold text-center">{tempPerson.name}</h3>
          <h4 className="text-xl font-semibold text-center">
            {tempPerson.school}, {tempPerson.major}
          </h4>
          <p className="text-center">{tempPerson.bio}</p>
        </div>
      </div>
    );
  };

  const renderAccountLinks = () => {
    return (
      <div className="shadow-light p-8 border border-border rounded-lg ">
        <div className="flex flex-col justify-left gap-1">
          <h3 className="text-xl font-bold text-center">Your Links</h3>
          <div className="mb-2">
            <h4 className="text-slate-400">Resume</h4>
            <p>{tempPerson.resume}</p>
          </div>
          <div className="mb-2">
            <h4 className="text-slate-400">LinkedIn</h4>
            <p>{tempPerson.linkedIn}</p>
          </div>
          <div>
            <h4 className="text-slate-400">Github</h4>
            <p>{tempPerson.github}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderOpenProjects = () => {
    return (
      <div className="shadow-light p-8 border border-border rounded-lg ">
        <div className="flex flex-col justify-left gap-1">
          <p>Users Open Projects</p>
        </div>
      </div>
    );
  };

  const renderShowcaseProjects = () => {
    return (
      <div className="shadow-light p-8 border border-border rounded-lg ">
        <div className="flex flex-col justify-left gap-1">
          <p>Users Showcase Projects</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="md:mx-7 mx-5 mt-16 relative">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="mt-4 mx-4">{renderAccountInfo()}</div>
            <div className="mt-4 mx-4">{renderAccountLinks()}</div>
          </div>
          <div className="w-full md:w-2/3 ">
            <div className="mt-4 mx-4">{renderOpenProjects()}</div>
            <div className="mt-4 mx-4">{renderShowcaseProjects()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
