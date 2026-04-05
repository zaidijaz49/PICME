import React from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./Chatinput";
import Avatar from "../../assets/avatar.png";
function ChatWindow({ messages, sendMessage }) {
  return (
    <div className="flex-1 p-4 h-screen  rounded-2xl shadow-2xl bg-white ">
      <div className="flex items-center space-x-2">
        <img src={Avatar} className="w-20" />
        <h3 className="text-2xl font-bold poppins-medium">Marvin McKinney</h3>
      </div>

      {/* Messages */}
      <div>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="relative  p-6">
        {" "}
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow;
