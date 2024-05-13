import DefaultProfile from "../assets/icons/person-crop-circle-fill-svgrepo-com.svg";
import Pencil from "../assets/icons/pencil-svgrepo-com.svg";
// import DocumentIcon from "../assets/icons/document-filled-svgrepo-com.svg";
// import LinkedinIcon from "../assets/icons/linkedin-svgrepo-com.svg";
// import GithubIcon from "../assets/icons/github-142-svgrepo-com.svg";

interface AccountCardProps {
  profilePicture: string;
  firstName: string;
  lastName: string;
  school: string;
  major: string;
  bio: string;
  resume: string;
  linkedin: string;
  github: string;
  setUpdateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountCard: React.FC<AccountCardProps> = ({
  profilePicture,
  firstName,
  lastName,
  school,
  major,
  bio,
  resume,
  linkedin,
  github,
  setUpdateAccount,
}) => {
  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex justify-end">
        <img
          src={Pencil}
          alt="edit"
          className="w-6 h-6 hover:cursor-pointer"
          onClick={() => setUpdateAccount(true)}
        />
      </div>

      <div className="flex flex-col items-center justify-between gap-1">
        <img
          src={profilePicture || DefaultProfile}
          alt="profile"
          className="w-28 h-28 rounded-full"
        />
        <h3 className="text-2xl font-bold text-center">
          {firstName} {lastName}
        </h3>
        {school && major ? (
          <h4 className="text-xl font-semibold text-center">
            {school} - {major}
          </h4>
        ) : null}
        {bio ? <p className="text-center">{bio}</p> : null}
      </div>

      <div className="flex flex-col justify-left gap-1 pt-4">
        <div className="mb-2">
          {resume ? (
            <>
              <h4 className="text-slate-400">Resume</h4>
              <a className="break-all text-blue-500" href={resume}>
                {firstName}
                {lastName}Resume.pdf
              </a>
            </>
          ) : null}
        </div>
        <div className="mb-2">
          {linkedin ? (
            <>
              <h4 className="text-slate-400">LinkedIn</h4>
              <a className="break-all text-blue-500" href={linkedin}>
                {linkedin}
              </a>
            </>
          ) : null}
        </div>
        <div>
          {github ? (
            <>
              <h4 className="text-slate-400">Github</h4>
              <a className="break-all text-blue-500" href={github}>
                {github}
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
