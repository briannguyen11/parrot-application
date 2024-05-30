import { useState } from "react";
import { useAuth } from "@/auth/AuthWrapper";
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
  const { pfp } = useAuth();
  const [comment, setComment] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "h-6";
    textarea.style.height = textarea.scrollHeight + "px";
  };

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
    <>
      <div className="flex flex-inline gap-2 items-center">
        {pfp ? (
          <img
            src={pfp}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <img src={PersonIcon} alt="Profile Picture" className="w-10 h-10" />
        )}
        <textarea
          className="text-sm w-full outline-none bg-transparent border-b-2 border-slate-200 focus:border-b-2 focus:border-black resize-none h-6 overflow-hidden"
          placeholder="Add a comment..."
          value={comment}
          onInput={handleInput}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      {comment.length > 0 && (
        <div className="flex flex-inline gap-2 ml-auto">
          <button
            className="px-2 border rounded-md text-sm"
            onClick={() => setComment("")}
          >
            Cancel
          </button>
          <button
            className="px-2 bg-slate-500 text-white rounded-md text-sm hover:bg-slate-400"
            onClick={() => handleSubmit()}
          >
            Comment
          </button>
        </div>
      )}
    </>
  );
};

export default CommentInput;
