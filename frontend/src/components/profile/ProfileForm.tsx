import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../auth/AuthWrapper";
import { ProfileData } from "../interfaces";
import api from "../../api";
import PhotoInput from "@/components/profile/PhotoInput";
import CloseIcon from "../../assets/icons/close-svgrepo-com.svg";

interface ProfileFormProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  setUpdateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  setProfile,
  setUpdateProfile,
}) => {
  const [newFirstName, setNewFirstName] = useState<string>(profile.first_name);
  const [newLastName, setNewLastName] = useState<string>(profile.last_name);
  const [newSchool, setNewSchool] = useState<string>(profile.school);
  const [newMajor, setNewMajor] = useState<string>(profile.major);
  const [newBio, setNewBio] = useState<string>(profile.bio);
  const [newResume, setNewResume] = useState<File>();
  const [newPfp, setNewPfp] = useState<File>();
  const [newLinkedin, setNewLinkedin] = useState<string>(profile.linkedin);
  const [newGithub, setNewGithub] = useState<string>(profile.github);

  const { setUserPfp } = useAuth();

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("first_name", newFirstName);
    formData.append("last_name", newLastName);
    formData.append("school", newSchool);
    formData.append("major", newMajor);
    formData.append("bio", newBio);
    formData.append("linkedin", newLinkedin);
    formData.append("github", newGithub);
    if (newResume) {
      formData.append("resume", newResume);
    }
    if (newPfp) {
      formData.append("profile_picture", newPfp);
    }

    try {
      const res = await api.patch(`/api/profiles/${profile.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data);
      setUserPfp(res.data.profile_picture);
      setUpdateProfile(false);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="shadow-light p-8 border border-border rounded-lg">
      <div className="flex-col items-center gap-5">
        <div className="flex justify-end">
          <img
            src={CloseIcon}
            alt="edit"
            className="w-6 h-6 hover:cursor-pointer"
            onClick={() => setUpdateProfile(false)}
          />
        </div>
        <div className="flex items-center justify-center">
          <PhotoInput pfp={profile.profile_picture} setPfp={setNewPfp} />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Your Name</h3>
          <div className="flex flex-col xl:flex-row gap-2">
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder={profile.first_name}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder={profile.last_name}
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
              placeholder={profile.school}
              onChange={(e) => setNewSchool(e.target.value)}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
            <input
              type="text"
              value={newMajor}
              placeholder={profile.major}
              onChange={(e) => setNewMajor(e.target.value)}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
          </div>
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Your Bio</h3>
          <textarea
            value={newBio}
            placeholder={profile.bio}
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
            placeholder={profile.linkedin}
            onChange={(e) => setNewLinkedin(e.target.value)}
            className="border border-border rounded-lg p-2 text-sm outline-none w-full"
          />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Github</h3>
          <input
            type="text"
            value={newGithub}
            placeholder={profile.github}
            onChange={(e) => setNewGithub(e.target.value)}
            className="border border-border rounded-lg p-2 text-sm outline-none w-full"
          />
        </div>
        <Button
          className="mt-4 w-full text-white"
          onClick={() => handleUpdate()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default ProfileForm;
