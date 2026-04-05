import React from "react";

function MessageBubble({ message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex my-2 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          px-4 py-2 rounded-2xl max-w-xs poppins-regular
          ${
            isMe
              ? "bg-cyan-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }
        `}
      >
        {message.text}
      </div>
    </div>
  );
}

export default MessageBubble;
