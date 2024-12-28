"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSendMessage, chat_status, consultationTime }) {
  const [input, setInput] = useState("");
  const [isChatCompleted, setIsChatCompleted] = useState(false); // State untuk status waktu selesai
  const textareaRef = useRef(null);

  // Periksa waktu konsultasi
  useEffect(() => {
    if (!consultationTime) return; // Pastikan consultationTime tidak null
  
    const checkConsultationEndTime = () => {
      const currentTime = new Date();
      const consultationEndTime = new Date(
        `${consultationTime.date}T${consultationTime.end_time}:00`
      );
  
      if (currentTime > consultationEndTime) {
        setIsChatCompleted(true);
      }
    };
  
    const interval = setInterval(checkConsultationEndTime, 5000); // Periksa setiap 5 detik
    checkConsultationEndTime();
  
    return () => clearInterval(interval);
  }, [consultationTime]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput(""); // Reset input setelah terkirim

    // Reset tinggi textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="bg-primarylight2 w-full fixed bottom-0">
      <div className="px-6 md:px-8 lg:px-12 py-3 flex gap-2">
        <textarea
          ref={textareaRef}
          rows="1"
          placeholder={
            isChatCompleted || chat_status === "completed"
              ? "Sesi konsultasi anda telah selesai"
              : "Ketik di sini"
          }
          className="flex-1 p-2 rounded-lg border border-gray-300 resize-none overflow-y-auto"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          style={{
            maxHeight: "150px",
          }}
          disabled={isChatCompleted || chat_status === "completed"} // Disable textarea jika chat selesai atau waktu berakhir
        />
        <Image
          src="/image/icons/send.svg"
          alt="Icon Send"
          width={48}
          height={43}
          onClick={handleSend}
          className={`cursor-pointer ${
            isChatCompleted || chat_status === "completed" ? "opacity-50" : "opacity-100"
          }`} // Adjust opacity to indicate it's disabled
          style={{
            pointerEvents: isChatCompleted || chat_status === "completed" ? "none" : "auto", // Disable pointer events
            filter: isChatCompleted || chat_status === "completed" ? "grayscale(100%)" : "none", // Grayscale jika disable
          }}
        />
      </div>
    </div>
  );
}
