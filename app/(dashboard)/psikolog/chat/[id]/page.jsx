"use client";

import ChatNavigationPsikolog from "@/components/konsultasi/chat/chat_nav_psi";
import ChatContent from "@/components/konsultasi/chat/chat_content";
import ChatInput from "@/components/konsultasi/chat/chat_input";
import { fetchChatMessages, sendChatMessage, getClientInfo } from "@/api/chat";
import { useState, useEffect } from "react";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [clientInfo, setClientInfo] = useState(null);
  const [consultationTime, setConsultationTime] = useState(null);
  const [notes, setNotes] = useState(null);

  const [chatData, setChatData] = useState({
    chatId: null,
    consulId: null,
    senderId: null,
    receiverId: null,
    chatStatus: null,
  });

  // Ambil data dari localStorage saat komponen di-mount
  useEffect(() => {
    const storedData = localStorage.getItem("psikologChatData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setChatData((prevData) => ({
        ...prevData,
        chatId: parsedData.chatSessionId || null, 
        consulId: parsedData.consulId || null,
        senderId: parsedData.senderId || null,
        receiverId: parsedData.clientId || null, 
        chatStatus: parsedData.chatStatus || null,
      }));
    }
  }, []);
  

  // Memuat pesan chat
  const loadChats = async () => {
    if (!chatData.chatId) {
        console.log("No chatId found, skipping fetch.");
        return;
    }
    try {
        const data = await fetchChatMessages(chatData.chatId);
        if (data.success) {
        setChats((prevChats) => {
            const newChats = data.data;
            return JSON.stringify(newChats) !== JSON.stringify(prevChats)
            ? newChats
            : prevChats;
        });
        }
    } catch (error) {
        console.error("Error loading chats:", error);
    }
    };  


  // Mengirim pesan baru
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const newMessage = {
      chat_session_id: chatData.chatId,
      receiver_id: chatData.receiverId,
      message,
    };

    try {
      const data = await sendChatMessage(newMessage);
      console.log("Message sent:", data); // Debugging log
      if (data.success) {
        setChats((prevChats) => [...prevChats, data.data]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Memuat informasi psikolog dan waktu konsultasi
  const loadPsikologInfo = async () => {
    if (!chatData.consulId) {
      console.log("No consulId found, skipping client info fetch.");
      return;
    }
    try {
      const data = await getClientInfo(chatData.consulId);
      if (data.success) {
        const { client, time, notes } = data.data;
        setClientInfo(client);
        setConsultationTime(time);
        setNotes(notes);
      }
    } catch (error) {
      console.error("Error loading client info:", error);
    }

  };

  useEffect(() => {
    // Load chats and psikolog info when chatData changes
    if (chatData.chatId) loadChats();
    if (chatData.consulId) loadPsikologInfo();

    // Set interval for fetching chats every 3 seconds
    const interval = setInterval(loadChats, 3000);

    return () => clearInterval(interval);
  }, [chatData.chatId, chatData.consulId]);

  return (
    <div>
      <ChatNavigationPsikolog
        clientInfo={clientInfo}
        consultationTime={consultationTime}
        notes={notes}
        setNotes={setNotes} // Pass setNotes here
        chat_status={chatData.chatStatus}
        consul_id={chatData.consulId}
      />
      <ChatContent
        chats={chats}
        sender={chatData.senderId}
        chat_status={chatData.chatStatus}
        type="psikolog"
      />
      <ChatInput
        onSendMessage={handleSendMessage}
        chat_status={chatData.chatStatus}
      />
    </div>
  );
}
