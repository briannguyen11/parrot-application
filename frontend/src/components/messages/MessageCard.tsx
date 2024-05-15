import { Timestamp } from "firebase/firestore";

interface Message {
  uid: string;
  message: string;
  timestamp: Timestamp;
  photoUrl: string;
}
interface MessageCardProps {
  message: Message;
  owner: boolean;
}

const getTimeString = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  let hours = date.getHours();
  let suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} ${suffix}`;
};

const MessageCard: React.FC<MessageCardProps> = ({ message, owner }) => {
  return (
    <div className="flex-col ">
      <div
        className={`flex items-center gap-x-2  ${owner && "flex-row-reverse"}`}
      >
        <img
          src={message.photoUrl}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        <div
          className={`p-2 rounded-md max-w-96 ${
            owner ? "bg-cyan-500 text-white" : "bg-gray-100"
          }`}
        >
          <p>{message.message}</p>
        </div>

    
      </div>
      <p className={`mt-1 text-left text-xs text-secondary ${owner && "text-right"}`}>{getTimeString(message.timestamp)}</p>

    </div>
  );
};

export default MessageCard;
