import { useState } from "react";
import { Button } from "../ui/button";
import api from "../../api";
import ProfilePictureInput from "@/components/profile/ProfilePictureInput";

interface AccountFormProps {
  profileId: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  school: string;
  major: string;
  bio: string;
  linkedin: string;
  github: string;
  setUpdateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountForm: React.FC<AccountFormProps> = ({
  profileId,
  profilePicture,
  firstName,
  lastName,
  school,
  major,
  bio,
  linkedin,
  github,
  setUpdateAccount,
}) => {
  const [newFirstName, setNewFirstName] = useState<string>(firstName);
  const [newLastName, setNewLastName] = useState<string>(lastName);
  const [newSchool, setNewSchool] = useState<string>(school);
  const [newMajor, setNewMajor] = useState<string>(major);
  const [newBio, setNewBio] = useState<string>(bio);
  const [newResume, setNewResume] = useState<File>();
  const [newPfp, setNewPfp] = useState<File>();
  const [newLinkedin, setNewLinkedin] = useState<string>(linkedin);
  const [newGithub, setNewGithub] = useState<string>(github);

  const handleUpdate = async () => {
    const profileData = new FormData();
    profileData.append("first_name", newFirstName);
    profileData.append("last_name", newLastName);
    profileData.append("school", newSchool);
    profileData.append("major", newMajor);
    profileData.append("bio", newBio);
    profileData.append("linkedin", newLinkedin);
    profileData.append("github", newGithub);
    if (newResume) {
      profileData.append("resume", newResume);
    }
    if (newPfp) {
      profileData.append("profile_picture", newPfp);
    }

    try {
      const res = await api.patch(`/api/profiles/${profileId}/`, profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setUpdateAccount(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-light p-8 border border-border rounded-lg">
      <div className="flex-col items-center gap-5">
        <div>
          <ProfilePictureInput pfp={profilePicture} setPfp={setNewPfp} />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Your Name</h3>
          <div className="flex flex-col xl:flex-row gap-2">
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder={firstName}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder={lastName}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
          </div>
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Your Academics</h3>
          <div className="flex flex-col xl:flex-row gap-2">
            <input
              type="text"
              value={newSchool}
              placeholder={school}
              onChange={(e) => setNewSchool(e.target.value)}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
            <input
              type="text"
              value={newMajor}
              placeholder={major}
              onChange={(e) => setNewMajor(e.target.value)}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
          </div>
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Your Bio</h3>
          <textarea
            value={newBio}
            placeholder={bio}
            onChange={(e) => setNewBio(e.target.value)}
            className="border border-border rounded-lg p-2 text-sm outline-none w-full"
          />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Resume</h3>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setNewResume(e.target.files[0]);
              }
            }}
            accept=".pdf"
            className="border border-border rounded-lg p-2 text-sm w-full"
          />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">LinkedIn</h3>
          <input
            type="text"
            value={newLinkedin}
            placeholder={linkedin}
            onChange={(e) => setNewLinkedin(e.target.value)}
            className="border border-border rounded-lg p-2 text-sm outline-none w-full"
          />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Github</h3>
          <input
            type="text"
            value={newGithub}
            placeholder={github}
            onChange={(e) => setNewGithub(e.target.value)}
            className="border border-border rounded-lg p-2 text-sm outline-none w-full"
          />
        </div>
        <Button className="mt-4 w-full " onClick={() => handleUpdate()}>
          Save
        </Button>
      </div>
    </div>
  );
};
export default AccountForm;
