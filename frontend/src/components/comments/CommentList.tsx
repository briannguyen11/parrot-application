import { CommentData } from "../interfaces";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "@/auth/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import api from "@/api";
import ThreeDots from "@/assets/icons/three-dots-vertical-svgrepo-com.svg";
import TrashIcon from "@/assets/icons/trash-svgrepo-com.svg";

interface CommentListProps {
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

const CommentList: React.FC<CommentListProps> = ({ comments, setComments }) => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const timeAgo = (date: string) => {
    return (
      "posted " +
      formatDistanceToNow(new Date(date), {
        addSuffix: false,
      }) +
      " ago"
    );
  };

  const handleDelete = async (commentId: number) => {
    try {
      const res = await api.delete(
        `/api/showcase-projects/comments/${commentId}/`
      );
      if (res.status === 204) {
        setComments((prevComments: CommentData[]) =>
          prevComments.filter(
            (comment: CommentData) => comment.id !== commentId
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderOptions = (commentId: number) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            src={ThreeDots}
            alt="Option"
            className="h-4 min-h-4 w-4 min-w-4 hover:cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuItem>
            <div
              className="flex gap-2 items-center"
              onClick={() => handleDelete(commentId)}
            >
              <img src={TrashIcon} alt="Delete" className="h-4 w-4" />
              <p className="text-xs">Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="mt-4">
      {comments
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_date).getTime() -
            new Date(a.created_date).getTime()
        )
        .map((comment: CommentData, index: number) => (
          <div key={index}>
            <div className="mt-7 flex flex-row gap-4 items-start">
              <img
                onClick={() => navigate(`/${comment.profile.username}`)}
                src={comment.profile.profile_picture}
                alt="Person Icon"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col">
                <p className="text-sm text-primary font-medium">
                  {comment.profile.first_name} {comment.profile.last_name}
                  <span className="ml-1.5 text-gray-400 font-light text-xs">
                    {timeAgo(comment.created_date)}
                  </span>
                </p>
                <p
                  className={`text-sm text-primary-foreground font-light ${
                    comment.content.includes(" ") ? "break-words" : "break-all"
                  }`}
                >
                  {comment.content}
                </p>
              </div>
              {user?.user === comment.user && (
                <div className="ml-auto">{renderOptions(comment.id)}</div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentList;
