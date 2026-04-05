import React, { useState } from "react";

function ChatInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  return (
    <div className="absolute  w-full p-4  rounded-2xl mt-auto ">
      <div className="flex items-center gap-3">
        {/* Input */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-cyan-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 poppins-regular"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
