import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MinProfileData } from "../interfaces";
import { useNavigate } from "react-router-dom";
import PersonIcon from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";

const ProfileHover = ({ profile }: { profile: MinProfileData }) => {
  const navigate = useNavigate();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <img
          onClick={() => navigate(`/${profile.username}`)}
          src={profile.profile_picture || PersonIcon}
          alt="pfp"
          className="w-9 h-9 rounded-full cursor-pointer"
        />
      </HoverCardTrigger>
      <HoverCardContent
        className="w-80 cursor-pointer"
        onClick={() => navigate(`/${profile.username}`)}
      >
        <div className="flex font-raleway">
          <img
            src={profile.profile_picture || PersonIcon}
            alt="pfp"
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-3 flex flex-col">
            <h1 className="font-bold text-lg">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-sm text-gray-500">@{profile.username}</p>
            <p className="text-sm text-gray-500">{profile.header}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileHover;
