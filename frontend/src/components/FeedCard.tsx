import Tag from "./Tag";
import { formatDistanceToNow } from "date-fns";
import PersonIcon from "../assets/icons/person.svg";

type FeedCardProps = {
  title: string;
  postedTime: string;
  userBio: string;
  profilePicture: string;
  name: string;
  description: string;
  tags: string[];
  groupSize: number;
};

const FeedCard: React.FC<FeedCardProps> = ({
  title,
  postedTime,
  userBio,
  profilePicture,
  name,
  description,
  tags,
  groupSize,
}) => {
  const timeAgo =
    "posted " +
    formatDistanceToNow(new Date(postedTime), {
      addSuffix: false,
    }) +
    " ago";
  return (
    <div className="shadow-light p-7 px-10  w-full  max-w-screen-sm border border-border rounded-lg hover:cursor-pointer hover:shadow-light-hover hover:border-gray-400  transition duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>

          <div className="flex items-center gap-1">
            <p className="text-gray-400 text-sm">{groupSize}</p>
            <img src={PersonIcon} alt="person" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="text-secondary py-1 px-6 border rounded-full border-gray-300 hover:bg-primary hover:text-white hover:border-transparent transition duration-300 ease-in-out">
          Join
        </h4>
      </div>
      <p className="text-sm font-extralight text-secondary-foreground">
        {timeAgo}
      </p>

      <div className="mt-6 flex items-center gap-x-3 border-b pb-4">
        <img
          src={profilePicture}
          alt="profile"
          className="w-7 h-7 rounded-full"
        />

        <div className="flex items-center gap-3 whitespace-nowrap overflow-scroll no-scrollbar">
          <h4 className="text-sm  font-medium text-secondary">{name}</h4>

          <p className="text-md font-light text-secondary-foreground">|</p>

          <p className="text-sm font-light text-secondary-foreground">
            {userBio}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-secondary">{description}</p>
      </div>

      <div className="flex items-center gap-x-4 mt-6">
        {tags.map((tag) => (
          <Tag name={tag} key={tag} />
        ))}
      </div>
    </div>
  );
};

export default FeedCard;
