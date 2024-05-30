/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentData } from "../interfaces";
import { formatDistanceToNow } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ThreeDots from "@/assets/icons/three-dots-vertical-svgrepo-com.svg";
import TrashIcon from "@/assets/icons/trash-svgrepo-com.svg";

interface CommentListProps {
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const timeAgo = (date: string) => {
    return (
      "posted " +
      formatDistanceToNow(new Date(date), {
        addSuffix: false,
      }) +
      " ago"
    );
  };
  const handleDelete = () => {
    console.log("delete");
  };

  const renderOptions = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <img
            src={ThreeDots}
            alt="Option"
            className="h-4 hover:cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className="w-28 mr-10 ">
          <div
            className="flex flex-inline gap-2 items-center hover:bg-slate-200 hover:cursor-pointer p-1 rounded-sm"
            onClick={() => handleDelete()}
          >
            <img src={TrashIcon} alt="Delete" className="h-4" />
            <p className="text-xs">Delete</p>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      {comments
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_date).getTime() -
            new Date(a.created_date).getTime()
        )
        .map((comment: any, index: number) => (
          <div key={index}>
            <div className="flex flex-inline gap-2 items-center">
              <img
                src={comment.profile.profile_picture}
                alt="Person Icon"
                className="w-10 h-10 rounded-full"
              ></img>
              <div className="flex flex-col">
                <div className="flex flex-inline gap-2">
                  <p className="text-xs text-slate-400">
                    {comment.profile.first_name} {comment.profile.last_name}
                    {" • "}
                    {timeAgo(comment.created_date)}
                  </p>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
              <div className="ml-auto">{renderOptions()}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CommentList;
