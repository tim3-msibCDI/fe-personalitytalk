"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { slides, description } from "@/constants";

export default function Penjelasan() {
  // Ubah slide setiap 3 detik
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  // Ubah slide dengan dot
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-12 px-6 md:px-12 mb-20 sm:ml-4 ml-0 lg:ml-8">
      <div className="mb-8">
        <h1 className="lg:text-h1 text-h2 font-bold mb-4 text-center md:text-left">
          Apa itu PersonalityTalk?
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 flex flex-col items-center">
          <Image
            src={slides[currentSlide].imageSrc}
            alt="Slide Image"
            width={328}
            height={167}
            className="rounded-lg"
          />
          <div className="mt-2 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => handleDotClick(index)}
                className={`cursor-pointer w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-primary" : "bg-primarylight"
                }`}
              ></span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 items-center sm:mr-4 mr-0 lg:mr-8">
          <p className="sm:text-justify text-center text-m text-gray-700">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
