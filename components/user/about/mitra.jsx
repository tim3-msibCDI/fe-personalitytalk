"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const mitras = [
  {
    name: "SMK Yayasan Pharmasi Semarang",
    image: "/image/mitra/1.png",
  },
  {
    name: "SMK Telkom Purwokerto",
    image: "/image/mitra/2.png",
  },
  {
    name: "SMK Muhammadiyah 1 Semarang",
    image: "/image/mitra/3.png",
  },
];

export default function Mitra() {
  const scrollAmount = 200;

  const handleScroll = (direction) => {
    const container = document.getElementById("scroll-container");
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    const interval = setInterval(() => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
    <div className="pt-14 bg-whitebg">
        <h1 className="text-h1 font-medium text-center">Mitra</h1>
    </div>
      <div className="flex items-center justify-center pb-14 bg-whitebg">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 z-10 bg-whitebg p-2 rounded-full shadow-lg"
        >
          {"<"}
        </button>
        <div
          id="scroll-container"
          className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {mitras.map((mitra, index) => (
            <div
              key={index}
              className="bg-whitebg rounded-lg p-4 shadow-top flex flex-col items-center justify-center min-w-[350px]"
            >
              <Image
                src={mitra.image}
                alt={mitra.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-center mt-2">{mitra.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-lg"
        >
          {">"}
        </button>
      </div>
    </>
  );
}
