"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Mitra() {
  const [mitras, setMitras] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch mitra data
  useEffect(() => {
    const fetchMitras = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/landing-page/mitra`,
          {
            method: "GET",
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch mitra data");
        }
        const result = await response.json();
        if (result.success) {
          setMitras(result.data);
        }
      } catch (error) {
        console.error("Error fetching mitra data:", error);
      }
    };

    fetchMitras();
  }, []);

  useEffect(() => {
    const container = document.getElementById("scroll-container");

    // Infinite scroll effect
    const handleInfiniteScroll = () => {
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    };

    container.addEventListener("scroll", handleInfiniteScroll);

    const interval = setInterval(() => {
      if (!isHovered) {
        container.scrollBy({ left: 1, behavior: "smooth" });
      }
    }, 10);

    return () => {
      clearInterval(interval);
      container.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [isHovered]);

  return (
    <>
      <div className="pt-14 bg-whitebg">
        <h1 className="text-h1 font-medium text-center">Mitra</h1>
      </div>
      <div className="flex items-center justify-center pb-14 bg-whitebg">
        <div
          id="scroll-container"
          className="flex overflow-x-hidden space-x-4 p-4 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {mitras.length > 0 &&
            [...mitras, ...mitras].map((mitra, index) => (
              <div
                key={index}
                className="bg-whitebg rounded-lg p-4 shadow-top flex flex-row items-center justify-center min-w-[350px]"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${mitra.img}`}
                  alt={mitra.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <p className="text-center mt-2">{mitra.name}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
