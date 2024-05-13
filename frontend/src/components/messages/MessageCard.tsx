interface Message {
  id: number;
  message: string;
  timestamp: string;
  photoUrl: string;
}
interface MessageCardProps {
  message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={message.photoUrl}
        alt="profile"
        className="w-8 h-8 rounded-full"
      />
      <div className="bg-gray-100 p-2 rounded-md">
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default MessageCard;
