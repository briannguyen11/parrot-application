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

    // reset the height of the textarea
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "auto";
    }

  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
    setComment(e.target.value);
  };

  return (
    <div className="flex-col">
      <div className="flex flex-inline gap-4 items-center">
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
          className={`h-auto flex items-center mt-2 text-sm w-full outline-none bg-transparent border-b-2 border-slate-200 focus:border-b-2 focus:border-black resize-none break-words`}
          placeholder="Add a comment..."
          value={comment}
          rows={1}
          onInput={handleInput}
          onChange={(e) => setComment(e.target.value)}
       
        />
      </div>
      {comment.length > 0 && (
        <div className="flex flex-inline gap-2 justify-end mt-1 font-raleway">
          <button
            className="px-2 py-1 border rounded-md text-sm"
            onClick={() => setComment("")}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 bg-parrot-blue text-white rounded-md text-sm hover:bg-black"
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
