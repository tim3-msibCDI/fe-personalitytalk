"use client";

import React, { useEffect, useRef } from "react";
import { chatData } from "@/constants";

export default function ChatContent() {
  const chatEndRef = useRef(null);

  // Fungsi untuk scroll ke bagian bawah
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll otomatis ketika komponen dimuat atau data chat berubah
  }, [chatData]);

  return (
    <div className="px-6 md:px-8 lg:px-12 ml-4 lg:ml-8 py-5 mr-2 md:mr-4 overflow-y-auto h-[400px]">
      <div className="space-y-2">
        {chatData.map((chat) => (
          <div 
            key={chat.id}
            className={`flex ${chat.sender === "User" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-s text-textcolor ${
                chat.sender === "User" ? "bg-primarylight" : "bg-primarylight2"
              }`}
            >
              <p>{chat.message}</p>
              <span className="text-s text-textcolor flex justify-end">{chat.time}</span>
            </div>
          </div>
        ))}
        {/* Elemen referensi untuk scroll ke bagian bawah */}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
