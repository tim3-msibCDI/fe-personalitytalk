import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chatId, setChatId] = useState(() => localStorage.getItem("chatId") || null);
  const [consulId, setConsulId] = useState(() => localStorage.getItem("consulId") || null);
  const [senderId, setSenderId] = useState(() => localStorage.getItem("senderId") || null);
  const [receiverId, setReceiverId] = useState(() => localStorage.getItem("receiverId") || null);

  useEffect(() => {
    localStorage.setItem("chatId", chatId);
    localStorage.setItem("consulId", consulId);
    localStorage.setItem("senderId", senderId);
    localStorage.setItem("receiverId", receiverId);
  }, [chatId, consulId, senderId, receiverId]);

  return (
    <ChatContext.Provider
      value={{ chatId, setChatId, consulId, setConsulId, senderId, setSenderId, receiverId, setReceiverId }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
