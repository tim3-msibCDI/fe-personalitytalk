"use client";

import { useState } from "react";
import { cara_konsultasi } from "@/constants";
import Image from "next/image";

export default function Cara() {
  // State untuk menyimpan ID item yang terpilih, default ke ID 1
  const [selectedId, setSelectedId] = useState(1);

  // Handler untuk mengubah item yang dipilih
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="bg-gradient-to-b from-primarylight to-transparent min-h-screen px-6 md:px-8 lg:px-12 py-9">
      {/* Heading di tengah */}
      <div className="text-center mb-8">
        <h1 className="text-h1 font-semibold border-b-4 border-black inline-block pb-2 text-textcolor">
          Cara Berkonsultasi
        </h1>
      </div>

      {/* Layout dua kolom */}
      <div className="flex space-x-8 ml-12">
        {/* Kolom kanan (Daftar konsultasi) */}
        <div className="flex flex-col w-1/3 space-y-4">
          <div className="mt-4">
            {cara_konsultasi.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)} // Mengubah state saat item di-klik
                className={`cursor-pointer p-3 mb-2 flex items-center space-x-4 rounded-lg transition-colors duration-300 ${
                  selectedId === item.id
                    ? "bg-primary text-white"
                    : "bg-transparent text-black hover:bg-primary hover:text-white"
                }`}
              >
                {/* Lingkaran dengan ID */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    selectedId === item.id
                      ? "bg-primary border-white text-white"
                      : "bg-primary border-primary text-white group-hover:border-white"
                  }`}
                >
                  <span className="font-bold text-h3">{item.id}</span>
                </div>
                {/* Nama Item */}
                <span className="font-semibold text-m">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom kiri (Image berdasarkan item yang dipilih) */}
        <div className="w-2/3 flex items-center justify-center">
          {cara_konsultasi.map((item) => {
            if (item.id === selectedId) {
              return (
                <Image
                  key={item.id}
                  src={item.images}
                  alt={item.name}
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
