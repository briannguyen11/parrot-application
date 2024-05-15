import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthWrapper";
import api from "../api";
import ProfilePictureInput from "@/components/profile/ProfilePictureInput";

const Onboard = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [resume, setResume] = useState<File>();
  const [profilePicture, setProfilePicture] = useState<File>();
  const [linkedin, setLinkedin] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [slide, setSlide] = useState(1);

  const navigate = useNavigate();

  const { setPfp } = useAuth();

  const handleSubmit = async () => {
    const profileData = new FormData();
    profileData.append("first_name", firstName);
    profileData.append("last_name", lastName);
    profileData.append("school", school);
    profileData.append("major", major);
    profileData.append("bio", bio);
    profileData.append("linkedin", linkedin);
    profileData.append("github", github);
    if (resume) {
      profileData.append("resume", resume);
    }
    if (profilePicture) {
      profileData.append("profile_picture", profilePicture);
    }

    try {
      const res = await api.post("/api/profiles/", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setPfp(res.data.profile_picture);
      navigate("/");
    } catch (error: any) {
      console.log(error.response);
      alert("Profile already exists");
      navigate("/profile");
    }
  };

  const renderInfoForm = () => {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-center">
          Welcome to Parrot
        </h2>
        <p className="text-slate-400 text-center mt-2">
          Lets's start your profile so you can connect with people with cool
          ideas or share your own!
        </p>
        <div className="mt-4">
          <ProfilePictureInput pfp={null} setPfp={setProfilePicture} />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Your Name *</h3>
          <div className="flex gap-2 my-1">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="border border-border rounded-lg p-2 text-sm outline-black w-full"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="border border-border rounded-lg p-2 text-sm outline-black w-full"
              required
            />
          </div>
        </div>
        <div className="flex-col mt-4">
          <h3 className="txext-md font-semibold"> School</h3>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="(Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="txext-md font-semibold"> Major</h3>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="(Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Bio</h3>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Something About Yourself (Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => {
            if (firstName !== "" && lastName !== "") {
              setSlide(slide + 1);
            } else {
              alert("Please enter first and last name");
            }
          }}
        >
          Next
        </Button>
      </div>
    );
  };

  const renderLinksForm = () => {
    return (
      <div className="w-full">
        <Button
          className="bg-transparent text-black text-md hover:underline p-0"
          onClick={() => setSlide(slide - 1)}
        >
          Back
        </Button>
        <h2 className="text-2xl font-semibold text-center">Additional Links</h2>
        <p className="text-slate-400 text-center mt-2">
          Add your resume and other links so people can get to know you better!
        </p>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Resume</h3>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setResume(e.target.files[0]);
              }
            }}
            accept=".pdf"
            className="border border-border rounded-lg p-2 text-sm  w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">LinkedIn</h3>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Enter link here (Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Github</h3>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="Enter link here (Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <Button className="w-full mt-4" onClick={() => handleSubmit()}>
          Finish
        </Button>
      </div>
    );
  };

  return (
    <div className="h-full w-full p-10">
      <div className="flex gap-2">
        <img
          src="../../icon.svg"
          alt="logo"
          className="w-8 h-8 object-cover select-none"
          onClick={() => navigate("/")}
        />
        <h1 className="text-[23px] font-medium text-primary lg:block hidden select-none">
          PARROT
        </h1>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="w-[600px]">
          <div className="mt-16">{slide === 1 && renderInfoForm()}</div>
          <div className="mt-16 ">{slide === 2 && renderLinksForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
