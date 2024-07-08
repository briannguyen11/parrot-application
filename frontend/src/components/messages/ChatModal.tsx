import { useState, useEffect } from "react";
import ChatEmitter from "@/emitters/ChatEmitter";
import { BadgePlus, ChevronLeft, X } from "lucide-react";
import MessageDisplayCard from "./MessageDisplayCard";

const ChatModal = () => {
  const [showChat, setShowChat] = useState(true);
  const [tab, setTab] = useState("messages");

  const mockMessages = [
    {
      user_id: 1,
      avatar:
        "https://lh3.google.com/u/0/ogw/AF2bZyjJd4Z9I9UrOB8SOerUpFCZwKYY0rVJEjGTY1dif2zm6g=s32-c-mo",
      name: "John Doe",
      date: new Date().toISOString(),
    },
    {
      user_id: 2,
      avatar:
        "https://lh3.googleusercontent.com/ogw/AF2bZygvRLcesrceXNoYuwAiTfogAoJ8ai7K6yHtf2d6NrRazg=s32-c-mo",
      name: "Jane Smith",
      date: "2022-10-02",
    },

    // Add more mock messages here if needed
  ];

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
      className={`fixed rounded-t-[10px] md:right-12 right-5 bottom-0 bg-white shadow-2xl border-t border-x w-96 h-[60vh] transform transition-transform duration-300 ${
        showChat ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-b">
        <div className="flex justify-between p-3 font-raleway">
          <div className="flex items-center gap-2">
            {tab !== "messages" && (
              <button onClick={() => setTab("messages")}>
                <ChevronLeft size={20} />
              </button>
            )}
            <h1 className="font-semibold">
              {tab === "messages" && "Messages"} {tab === "create" && "Create"}{" "}
            </h1>
          </div>

          <div className="flex gap-3">
            {tab !== "create" && (
              <button onClick={() => setTab("create")}>
                <BadgePlus size={20} />
              </button>
            )}
            <button onClick={() => setShowChat(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 px-3 pb-4">
          <input
            type="text"
            placeholder="Search"
            className="text-sm w-full border-none bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex flex-col">
        {mockMessages.map((message, index) => (
          <MessageDisplayCard key={index} {...message} />
        ))}
      </div>
    </div>
  );
};

export default ChatModal;
