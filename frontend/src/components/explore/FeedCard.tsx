import Tag from "./Tag";
import { formatDistanceToNow } from "date-fns";
import PersonIcon from "../../assets/icons/person.svg";
import { useNavigate } from "react-router-dom";

interface tag {
  tag: string;
  id: number;
  project: number;
}

type FeedCardProps = {
  id?: number;
  project_name: string;
  description: string;
  level: string;
  post_date: string;
  group_size: number;
  user: string;
  tags?: tag[];
  previewTags?: string[];
};

const FeedCard: React.FC<FeedCardProps> = ({
  id,
  project_name,
  description,
  post_date,
  group_size,
  user,
  tags,
  previewTags,
}) => {
  const timeAgo =
    "posted " +
    formatDistanceToNow(new Date(post_date), {
      addSuffix: false,
    }) +
    " ago";

  if (previewTags) {
    tags = previewTags.map((tag) => {
      return { tag: tag, id: 0, project: 0 };
    });
  }

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/project/" + id)}
      className="shadow-light p-7 px-10  w-full bg-white max-w-screen-sm border border-border rounded-lg hover:cursor-pointer hover:shadow-light-hover hover:border-gray-400  transition duration-300 ease-in-out"
    >
      <div className="flex items-center gap-x-5 justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-primary sm:max-w-full xs:max-w-64 whitespace-nowrap overflow-scroll">
            {project_name}
          </h2>

          <div className="flex items-center gap-1">
            <p className="text-gray-400 text-sm">{group_size}</p>
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
        <img src={PersonIcon} alt="profile" className="w-7 h-7 rounded-full" />

        <div className="flex items-center gap-3 whitespace-nowrap overflow-scroll no-scrollbar">
          <h4 className="text-sm  font-medium text-secondary">
            Query Name using user_id = {user}
          </h4>

          <p className="text-md font-light text-secondary-foreground">|</p>

          <p className="text-sm font-light text-secondary-foreground">
            {"Fetch Bio using user_id and put it here"}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-secondary w-full break-words">{description}</p>
      </div>

      <div className="flex items-center gap-x-4 mt-6">
        {tags?.map((tag) => (
          <Tag name={tag.tag} key={tag.tag} />
        ))}
      </div>
    </div>
  );
};

export default FeedCard;
