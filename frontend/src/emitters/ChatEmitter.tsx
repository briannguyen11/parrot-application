import EventEmitter from "eventemitter3";

let singleton = null;

class ChatEmitter extends EventEmitter {
  constructor() {
    super();
    this.show = this.show.bind(this);
  }

  show(commands) {
    console.log("showing chat");
    this.emit("show", commands);
  }

  static default() {
    if (singleton) {
      return singleton;
    }

    singleton = new ChatEmitter();
    return singleton;
  }
}

export default ChatEmitter;
