import { useState } from "react";
import { UserAuth } from "@/auth/AuthContext";
import { CommentData } from "../interfaces";
import api from "@/api";
import PersonIcon from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";

interface CommentInputProps {
  projectId: number;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

const CommentInput: React.FC<CommentInputProps> = ({
  projectId,
  setComments,
}) => {
  const { user } = UserAuth();
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    const data = {
      project: projectId,
      content: comment,
    };
    try {
      const res = await api.post("/api/showcase-projects/comments/", data);
      setComments((prevComments) => [...prevComments, res.data]);
      setComment("");
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex flex-inline gap-2 items-center">
        {user && user.profile_picture ? (
          <img
            src={user.profile_picture}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <img src={PersonIcon} alt="Profile Picture" className="w-10 h-10" />
        )}
        <textarea
          className={`text-sm w-full outline-none bg-transparent border-b-2 border-slate-200 focus:border-b-2 focus:border-black resize-none h-auto`}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2} //TODO: make dynamic
        />
      </div>
      {comment.length > 0 && (
        <div className="flex flex-inline gap-2 justify-end mt-1">
          <button
            className="px-2 border rounded-md text-sm"
            onClick={() => setComment("")}
          >
            Cancel
          </button>
          <button
            className="px-2 bg-parrot-blue text-white rounded-md text-sm hover:bg-black"
            onClick={() => handleSubmit()}
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
