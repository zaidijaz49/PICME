import React, { useState } from "react";
import Sidebar from "../../components/Features/Sidebar.Chat";
import ChatWindow from "../../components/Features/Chatwindow";

function PhotographerChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Look at how chocho sleep in my arms!", sender: "other" },
    { id: 2, text: "Looking nice dear", sender: "me" },
  ]);

  const sendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: "me",
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex  p-6 space-x-3">
      <div className="">
        {" "}
        <Sidebar />
      </div>
      <div className="w-full">
        <ChatWindow messages={messages} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default PhotographerChat;
