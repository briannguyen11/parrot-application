import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "@/auth/AuthContext";
import api from "../api";
import ProfilePictureInput from "@/components/profile/ProfilePictureInput";
import BannerInput from "@/components/profile/BannerInput";

const Onboard = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [resume, setResume] = useState<File>();
  const [pfp, setPfp] = useState<File>();
  const [banner, setBanner] = useState<File>();
  const [linkedin, setLinkedin] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const { setUserPfp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const profileData = new FormData();
    profileData.append("first_name", firstName);
    profileData.append("last_name", lastName);
    profileData.append("username", username);
    profileData.append("school", school);
    profileData.append("major", major);
    profileData.append("header", header);
    profileData.append("bio", bio);
    profileData.append("linkedin", linkedin);
    profileData.append("github", github);
    if (pfp) {
      profileData.append("profile_picture", pfp);
    }
    if (banner) {
      profileData.append("banner", banner);
    }
    if (resume) {
      profileData.append("resume", resume);
    }

    try {
      const res = await api.post("/api/profiles/private/", profileData);
      setUserPfp(res.data.profile_picture);
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      alert("Profile already exists");
      navigate("/profile");
    }
  };

  const introCard = () => {
    return (
      <div
        className="bg-white p-6 rounded-2xl shadow-light hover:cursor-pointer hover:shadow-light-hover hover:border-gray-400 
        transition duration-300 ease-in-outspace-y-2 space-y-2 w-full"
      >
        <div className="w-full">
          <div className="h-60 w-full object-cover rounded-2xl relative">
            <div className="h-48 w-full">
              <BannerInput banner={null} setBanner={setBanner} />
            </div>
            <div className="sm:h-40 sm:w-40 h-24 w-24 rounded-full bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <ProfilePictureInput pfp={null} setPfp={setPfp} />
            </div>
          </div>
        </div>
        <div className="flex-col">
          <h3 className="text-sm font-semibold font-montserrat">Name *</h3>
          <div className="flex sm:flex-row sm:space-y-0 sm:gap-2 flex-col space-y-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
              required
            />
          </div>
        </div>
        <div className="flex-col">
          <h3 className="text-sm font-semibold font-montserrat">Username *</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@usernmae"
            className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
          />
        </div>
      </div>
    );
  };

  const bioCard = () => {
    return (
      <div
        className="bg-white p-6 rounded-2xl shadow-light hover:cursor-pointer hover:shadow-light-hover hover:border-gray-400 
        transition duration-300 ease-in-outspace-y-2 space-y-2 w-full"
      >
        <h2 className="text-xl font-bold font-montserrat">About You</h2>
        <div className="flex-col">
          <h3 className="text-sm font-semibold font-montserrat">Header</h3>
          <input
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Computer Science Student @University"
            className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
          />
        </div>
        <div className="flex-col">
          <h3 className="text-sm font-semibold">Bio</h3>
          <textarea
            value={bio}
            rows={3}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Let others know about your interests"
            className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full resize-none"
          />
        </div>
      </div>
    );
  };

  const educationCard = () => {
    return (
      <div
        className="bg-white p-6 rounded-2xl shadow-light hover:cursor-pointer hover:shadow-light-hover hover:border-gray-400 
        transition duration-300 ease-in-outspace-y-2 space-y-2 w-full"
      >
        <h2 className="text-xl font-bold font-montserrat">Education</h2>
        <div className="flex-col mt-4">
          <h3 className="text-sm font-semibold font-montserrat">School</h3>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="Parrot University"
            className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-sm font-semibold">Major</h3>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="Computer Science"
            className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
          />
        </div>
      </div>
    );
  };

  const linksCard = () => {
    return (
      <div
        className="bg-white p-6 rounded-2xl shadow-light hover:cursor-pointer hover:shadow-light-hover hover:border-gray-400 
        transition duration-300 ease-in-outspace-y-2 space-y-2 w-full"
      >
        <h2 className="text-xl font-bold font-montserrat">Additional Links</h2>
        <div className="flex-col mt-4">
          <h3 className="text-sm font-semibold font-montserrat">Resume</h3>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setResume(e.target.files[0]);
              }
            }}
            accept=".pdf"
            className="border border-border rounded-sm p-2 text-xs w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-sm font-semibold font-montserrat">LinkedIn</h3>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Enter link here (Optional)"
            className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-sm font-semibold font-montserrat">Github</h3>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="Enter link here (Optional)"
            className="border border-border rounded-sm p-2 text-xs font-montserrat outline-black w-full"
          />
        </div>
      </div>
    );
  };

  return (
    <div className=" w-full h-full p-10 flex justify-center overflow-y-scroll ">
      <div className="sm:w-[600px] w-full">
        <div className="flex flex-col space-y-6 items-center">
          <img
            src="../../icon.svg"
            alt="logo"
            className="w-10 h-10 object-cover select-none"
          />
          <h2 className="text-2xl font-bold text-center font-montserrat mt-8">
            Create Your Parrot Profile
          </h2>
          {introCard()}
          {bioCard()}
          {educationCard()}
          {linksCard()}
          <Button
            className="w-full text-white bg-parrot-red hover:bg-red-600"
            onClick={() => handleSubmit()}
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
