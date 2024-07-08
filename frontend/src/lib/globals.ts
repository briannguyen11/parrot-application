// NOTHING HERE WORKS YET, JUST TRYING TO SETUP GLOBALS

import ChatEmitter from "@/emitters/ChatEmitter";

interface Internal {
  chatEmitter: ChatEmitter;
}

declare global {
  interface Window {
    internal: Internal;
  }
}

const init_globals = () => {
  const internal: Internal = {
    chatEmitter: new ChatEmitter(),
  };
  const chatEmitter = ChatEmitter.default();
  internal.chatEmitter = chatEmitter;
  window.internal = internal;
};

export default init_globals;
