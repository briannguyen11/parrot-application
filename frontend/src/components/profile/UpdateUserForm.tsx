import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../auth/AuthWrapper";
import { UserData } from "./UserData";
import api from "../../api";
import ProfilePictureInput from "@/components/profile/ProfilePictureInput";

interface UpdateUserFormProps {
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  setUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  user,
  setUser,
  setUpdateUser,
}) => {
  const [newFirstName, setNewFirstName] = useState<string>(user.firstName);
  const [newLastName, setNewLastName] = useState<string>(user.lastName);
  const [newSchool, setNewSchool] = useState<string>(user.school);
  const [newMajor, setNewMajor] = useState<string>(user.major);
  const [newBio, setNewBio] = useState<string>(user.bio);
  const [newResume, setNewResume] = useState<File>();
  const [newPfp, setNewPfp] = useState<File>();
  const [newLinkedin, setNewLinkedin] = useState<string>(user.linkedin);
  const [newGithub, setNewGithub] = useState<string>(user.github);

  const { updatePfp } = useAuth();

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
      const res = await api.patch(
        `/api/profiles/${user.profileId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = res.data;
      const updatedUser: UserData = {
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
      setUser(updatedUser);
      updatePfp(data.profile_picture);
      setUpdateUser(false);
    } catch (error: any) {
      console.error(error.response);
    }
  };

  return (
    <div className="shadow-light p-8 border border-border rounded-lg">
      <div className="flex-col items-center gap-5">
        <div>
          <ProfilePictureInput pfp={user.profilePicture} setPfp={setNewPfp} />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Your Name</h3>
          <div className="flex flex-col xl:flex-row gap-2">
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder={user.firstName}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder={user.lastName}
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
              placeholder={user.school}
              onChange={(e) => setNewSchool(e.target.value)}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
            <input
              type="text"
              value={newMajor}
              placeholder={user.major}
              onChange={(e) => setNewMajor(e.target.value)}
              className="border border-border rounded-lg p-2 text-sm outline-none w-full"
            />
          </div>
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Your Bio</h3>
          <textarea
            value={newBio}
            placeholder={user.bio}
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
            placeholder={user.linkedin}
            onChange={(e) => setNewLinkedin(e.target.value)}
            className="border border-border rounded-lg p-2 text-sm outline-none w-full"
          />
        </div>
        <div className="flex-col mt-2">
          <h3 className="text-md font-semibold">Github</h3>
          <input
            type="text"
            value={newGithub}
            placeholder={user.github}
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
export default UpdateUserForm;
