import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileData } from "../interfaces";
import { useState } from "react";

export function EditProfileDialog({
  profile,
  patchProfile,
}: {
  profile: ProfileData | null;
  patchProfile: (profile: Partial<ProfileData>) => void;
}) {
  const original_profile = profile;

  const [first_name, setFirstName] = useState(profile?.first_name || "");
  const [last_name, setLastName] = useState(profile?.last_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [github, setGithub] = useState(profile?.github || "");
  const [linkedin, setLinkedin] = useState(profile?.linkedin || "");
  const [header, setHeader] = useState(profile?.header || "");
  const [username, setUsername] = useState(profile?.username || "");

  const handlePatchProfile = () => {
    const patchData: Partial<ProfileData> = {};
    if (first_name.trim() !== original_profile?.first_name?.trim()) {
      patchData.first_name = first_name.trim();
    }
    if (last_name.trim() !== original_profile?.last_name?.trim()) {
      patchData.last_name = last_name.trim();
    }

    if (bio.trim() !== original_profile?.bio?.trim()) {
      patchData.bio = bio.trim();
    }

    if (github.trim() !== original_profile?.github?.trim()) {
      patchData.github = github.trim();
    }

    if (linkedin.trim() !== original_profile?.linkedin?.trim()) {
      patchData.linkedin = linkedin.trim();
    }

    if (header.trim() !== original_profile?.header?.trim()) {
      patchData.header = header.trim();
    }

    if (username.trim() !== original_profile?.username?.trim()) {
      patchData.username = username.trim();
    }

    // console.log(patchData);
    patchProfile(patchData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm font-raleway font-semibold text-parrot-blue border-2 border-parrot-blue py-1 px-4 rounded-xl hover:bg-parrot-blue hover:text-white">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 mb-10 max-h-[400px] overflow-scroll">
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="md:w-2/3 w-full flex flex-col gap-2">
              <h3 className="font-medium w-40">Username</h3>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-md w-full p-2 text-sm"
              />
            </div>

            <div className="md:w-2/3 w-full flex flex-col gap-2">
              <h3 className="font-medium w-40">First Name</h3>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-md w-full p-2 text-sm"
              />
            </div>

            <div className="md:w-2/3 w-full flex flex-col gap-2">
              <h3 className="font-medium w-40">Last Name</h3>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded-md w-full p-2 text-sm"
              />
            </div>
            <div className="md:w-2/3 w-full flex flex-col gap-2">
              <h3 className="font-medium w-40">Header</h3>
              <input
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                className="border rounded-md w-full p-2 text-sm"
              />
            </div>
            <div className="md:w-2/3 w-full flex flex-col gap-2">
              <h3 className="font-medium w-40">Bio</h3>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border rounded-md w-full p-2 text-sm"
              />
            </div>

            <div className="md:w-2/3 w-full flex flex-col gap-2">
              <h3 className="font-medium w-40">Github</h3>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="border rounded-md w-full p-2 text-sm"
              />
            </div>

            <div className="md:w-2/3 w-full flex flex-col gap-2">
              <h3 className="font-medium w-40">LinkedIn</h3>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="border rounded-md w-full p-2 text-sm"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              type="submit"
              className="text-white"
              onClick={handlePatchProfile}
            >
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
