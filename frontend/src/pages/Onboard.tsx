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
  const [slide, setSlide] = useState(1);
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
      console.log(res);
      setUserPfp(res.data.profile_picture);
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      alert("Profile already exists");
      navigate("/profile");
    }
  };

  const statusIndicator = () => {
    const steps = [1, 2];
    return (
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step) => (
          <div
            key={step}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
              step <= slide
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    );
  };

  const firstStage = () => {
    return (
      <div className="w-full flex flex-col space-y-2">
        <div className="w-full">
          <div className="h-60 w-full object-cover rounded-2xl relative">
            <div className="h-48 w-full">
              <BannerInput banner={null} setBanner={setBanner} />
            </div>
            <div className="h-40 w-40 rounded-full bg-white  absolute bottom-0 left-12">
              <ProfilePictureInput pfp={null} setPfp={setPfp} />
            </div>
          </div>
        </div>

        <div className="flex-col">
          <h3 className="text-sm font-semibold">Your Name *</h3>
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
        <div className="flex-col">
          <h3 className="text-sm font-semibold">Username *</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@usernmae"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col">
          <h3 className="text-sm font-semibold">Header</h3>
          <input
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Computer Science Student @University"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col">
          <h3 className="text-sm font-semibold">Bio</h3>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Something About Yourself (Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full resize-none"
          />
        </div>
        <Button
          className="w-full bg-parrot-red text-white hover:bg-black"
          onClick={() => {
            if (firstName !== "" && lastName !== "" && username !== "") {
              setSlide(slide + 1);
            } else {
              alert("Please enter first, last name, and username");
            }
          }}
        >
          Next
        </Button>
      </div>
    );
  };

  const secondStage = () => {
    return (
      <div className="w-full">
        <Button
          className="bg-transparent text-black text-md hover:underline p-0"
          onClick={() => setSlide(slide - 1)}
        >
          Back
        </Button>

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
      <div className="flex items-center justify-center">
        <div className="w-[600px]">
          <h2 className="text-2xl font-semibold text-center">
            Let's Create Your Parrot Profile
          </h2>
          {statusIndicator()}
          {slide === 1 && firstStage()}
          {slide === 2 && secondStage()}
        </div>
      </div>
    </div>
  );
};

export default Onboard;
