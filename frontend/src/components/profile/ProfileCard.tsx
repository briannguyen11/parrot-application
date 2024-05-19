import DefaultProfile from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";
import Pencil from "../../assets/icons/pencil-svgrepo-com.svg";
// import DocumentIcon from "../..//assets/icons/document-filled-svgrepo-com.svg";
// import LinkedinIcon from "../../assets/icons/linkedin-svgrepo-com.svg";
// import GithubIcon from "../../assets/icons/github-142-svgrepo-com.svg";

import { ProfileData } from "../interfaces";

interface UserCardProps {
  profile: ProfileData;
  setUpdateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserCard: React.FC<UserCardProps> = ({ profile, setUpdateProfile }) => {
  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex justify-end">
        <img
          src={Pencil}
          alt="edit"
          className="w-6 h-6 hover:cursor-pointer"
          onClick={() => setUpdateProfile(true)}
        />
      </div>

      <div className="flex flex-col items-center justify-between gap-1">
        <img
          src={profile.profile_picture || DefaultProfile}
          alt="profile"
          className="w-28 h-28 rounded-full"
        />
        <h3 className="text-2xl font-bold text-center">
          {profile.first_name} {profile.last_name}
        </h3>
        {profile.school && profile.major ? (
          <h4 className="text-xl font-semibold text-center">
            {profile.school} - {profile.major}
          </h4>
        ) : null}
        {profile.bio ? <p className="text-center">{profile.bio}</p> : null}
      </div>

      <div className="flex flex-col justify-left gap-1 pt-4">
        <div className="mb-2">
          {profile.resume ? (
            <>
              <h4 className="text-slate-400">Resume</h4>
              <a className="break-all text-blue-500" href={profile.resume}>
                {profile.first_name}
                {profile.last_name}Resume.pdf
              </a>
            </>
          ) : null}
        </div>
        <div className="mb-2">
          {profile.linkedin ? (
            <>
              <h4 className="text-slate-400">LinkedIn</h4>
              <a className="break-all text-blue-500" href={profile.linkedin}>
                {profile.linkedin}
              </a>
            </>
          ) : null}
        </div>
        <div>
          {profile.github ? (
            <>
              <h4 className="text-slate-400">Github</h4>
              <a className="break-all text-blue-500" href={profile.github}>
                {profile.github}
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
