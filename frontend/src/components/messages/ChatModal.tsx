import { useState, useEffect } from "react";
import ChatEmitter from "@/emitters/ChatEmitter";
import { ChevronDown } from "lucide-react";

const ChatModal = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const toggleChat = () => {
      setShowChat(!showChat);
    };

    const chatEmitter = ChatEmitter.default();
    chatEmitter.on("show", toggleChat);

    return () => {
      chatEmitter.off("show", toggleChat);
    };
  }, [showChat]);

  return (
    <div
      className={`fixed rounded-t-[10px] right-12 bottom-0 bg-white shadow-2xl border-t border-x w-80 h-[60vh] transform transition-transform duration-300 ${
        showChat ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-between p-3 border-b font-raleway">
        <h1 className="font-semibold">Messages</h1>
        <button onClick={() => setShowChat(false)}>
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
