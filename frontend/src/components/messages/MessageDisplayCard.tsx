const MessageDisplayCard = (message) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div
      className="flex justify-between items-center hover:bg-gray-100 cursor-pointer px-3 border-b"
      onClick={() => console.log(new Date())}
    >
      <div className="flex gap-3 items-center py-3">
        <img
          src={message.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h1 className="text-sm">{message.name}</h1>
        </div>
      </div>
      <p className="text-xs text-gray-400 font-light">
        {formatDate(message.date)}
      </p>
    </div>
  );
};

export default MessageDisplayCard;
