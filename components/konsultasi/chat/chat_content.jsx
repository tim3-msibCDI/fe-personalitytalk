"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatSelesai from "./chat-selesai";
import Modal from "@/components/modals/modal";
import ChatSelesaiPsikolog from "@/components/popup/chat-selesai-psikolog";

export default function ChatContent({ 
  chats, 
  sender, 
  chat_status, 
  type, 
  consulId, 
  psikologId,
  psikologInfo,
  consultationTime,
}) {
  const chatEndRef = useRef(null);
  const prevChatsLength = useRef(chats.length);
  const [isPsikologModalOpen, setIsPsikologModalOpen] = useState(false);
  const [isChatCompleted, setIsChatCompleted] = useState(false);
  const [hasOpenedModal, setHasOpenedModal] = useState(false); // State untuk mencegah modal dibuka lebih dari sekali

  // Periksa waktu konsultasi
  useEffect(() => {
    if (!consultationTime) return;

    const checkConsultationEndTime = () => {
      const currentTime = new Date();
      const consultationEndTime = new Date(
        `${consultationTime.date}T${consultationTime.end_time}:00`
      );

      if (currentTime > consultationEndTime && !hasOpenedModal) {
        setIsChatCompleted(true);
        if (type === "psikolog") {
          setIsPsikologModalOpen(true);
          setHasOpenedModal(true); // Pastikan modal hanya terbuka sekali
        }
      }
    };

    const interval = setInterval(checkConsultationEndTime, 5000);
    checkConsultationEndTime();

    return () => clearInterval(interval);
  }, [consultationTime, type, hasOpenedModal]);

  // Pantau perubahan chat_status
  useEffect(() => {
    if (chat_status === "completed" && !hasOpenedModal) {
      setIsChatCompleted(true);
      if (type === "psikolog") {
        setIsPsikologModalOpen(true);
        setHasOpenedModal(true); // Pastikan modal hanya terbuka sekali
      }
    }
  }, [chat_status, type, hasOpenedModal]);

  useEffect(() => {
    if (chats.length > prevChatsLength.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevChatsLength.current = chats.length;
  }, [chats]);

  const closePsikologModal = () => {
    setIsPsikologModalOpen(false);
  };

  return (
    <div className="flex flex-col px-6 md:px-8 lg:px-12 ml-4 lg:ml-8 py-5 mr-2 md:mr-4 overflow-y-auto h-[67vh]">
      <div className="flex-1 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${
              chat.sender_id === Number(sender) ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg text-s text-textcolor whitespace-pre-line ${
                chat.sender_id === Number(sender)
                  ? "bg-primarylight"
                  : "bg-primarylight2"
              }`}
            >
              <p>{chat.message}</p>
              <span className="text-xs text-gray-500 flex justify-end">
                {new Date(chat.created_at).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {/* Referensi untuk scroll otomatis ke bawah */}
        <div ref={chatEndRef} />
      </div>

      {/* Tampilkan ChatSelesai untuk client */}
      {isChatCompleted && type === "client" && (
        <ChatSelesai
          consulId={consulId}
          psikologId={psikologId}
          psikologInfo={psikologInfo}
          consultationTime={consultationTime}
        />
      )}

      {/* Modal ChatSelesai untuk psikolog */}
      <Modal isOpen={isPsikologModalOpen} onClose={closePsikologModal}>
        <ChatSelesaiPsikolog onClose={closePsikologModal} />
      </Modal>
    </div>
  );
}
