"use client";

import ChatNavigation from "@/components/konsultasi/chat/chat_nav";
import ChatContent from "@/components/konsultasi/chat/chat_content";
import ChatInput from "@/components/konsultasi/chat/chat_input";
import { fetchChatMessages, sendChatMessage, getPsikologInfo } from "@/api/chat";
import { useState, useEffect } from "react";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [psikologInfo, setPsikologInfo] = useState(null);
  const [consultationTime, setConsultationTime] = useState(null);
  const [notes, setNotes] = useState(null);

  // const { chatId, consulId, senderId, receiverId, chatStatus } = useChatContext();
  const [chatData, setChatData] = useState({
    chatId: null,
    consulId: null,
    senderId: null,
    psikologId: null,
    chatStatus: null,
  });

  // Ambil data dari localStorage saat komponen di-mount
  useEffect(() => {
    const storedData = localStorage.getItem("clientChatData");
    // console.log("Data from localStorage:", storedData); // Debugging log
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setChatData((prevData) => ({
        ...prevData,
        chatId: parsedData.chatSessionId || null, 
        consulId: parsedData.consulId || null,
        senderId: parsedData.senderId || null,
        receiverId: parsedData.psikologId || null, 
        chatStatus: parsedData.chatStatus || null,
      }));
    }
  }, []);
  
  // Memuat pesan chat
  const loadChats = async () => {
    if (!chatData.chatId) return; // Pastikan chatId ada
    try {
      const data = await fetchChatMessages(chatData.chatId);
      if (data.success) {
        const newChats = data.data;
  
        // Hanya update jika ada perubahan pada data
        if (JSON.stringify(newChats) !== JSON.stringify(chats)) {
          setChats(newChats);
        }
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
      if (data.success) {
        setChats((prevChats) => [...prevChats, data.data]); // Tambahkan pesan baru ke daftar chat
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // console.log("New message data:", newMessage);
    // console.log("Chat data state:", chatData);
  };

  // Memuat informasi psikolog dan waktu konsultasi
  const loadPsikologInfo = async () => {
    if (!chatData.consulId) return;
    try {
      const data = await getPsikologInfo(chatData.consulId);
      // console.log(data);
      if (data.success) {
        const { psikolog, time, notes } = data.data;
        setPsikologInfo(psikolog); 
        setConsultationTime(time); 
        setNotes(notes); 
      }
    } catch (error) {
      console.error("Error loading psikolog info:", error);
    }
  };
  
  useEffect(() => {
    loadChats(); // Memuat pesan saat komponen di-mount
    loadPsikologInfo(); // Memuat informasi psikolog saat komponen di-mount

    const interval = setInterval(loadChats, 3000); 
    return () => clearInterval(interval); 
  }, [chatData.chatId, chatData.consulId]); // chatId dan consulId sebagai dependensi

  return (
    <div>
      <ChatNavigation 
        psikologInfo={psikologInfo} 
        consultationTime={consultationTime} 
        notes={notes}
        chat_status={chatData.chatStatus}
      />
      <ChatContent 
        chats={chats} 
        sender={chatData.senderId}
        chat_status={chatData.chatStatus} 
        type="client"
        consulId={chatData.consulId}
        psikologId={chatData.receiverId}
        psikologInfo={psikologInfo} 
        consultationTime={consultationTime} 
      />
      <ChatInput
        onSendMessage={handleSendMessage} 
        chat_status={chatData.chatStatus}
        consultationTime={consultationTime}
      />
    </div>
  );
}
