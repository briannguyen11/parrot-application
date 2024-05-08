import PersonIcon from "../assets/icons/person.svg";

type PersonalInfoCardProps = {
  profilePicture?: string;
  firstName: string;
  lastName: string;
  school: string;
  major: string;
  bio: string;
};

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  profilePicture,
  firstName,
  lastName,
  school,
  major,
  bio,
}) => {
  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex flex-col items-center justify-between gap-1">
        <img
          src={profilePicture || PersonIcon}
          alt="profile"
          className="w-24 h-24 rounded-full"
        />
        <h3 className="text-2xl font-bold text-center">
          {firstName ?? "First"} {lastName ?? "Last"}{" "}
        </h3>
        <h4 className="text-xl font-semibold text-center">
          {school ?? "School"}, {major ?? "Major"}
        </h4>
        <p className="text-center">{bio ?? "Bio"}</p>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
