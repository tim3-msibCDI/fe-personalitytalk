"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { slides, description } from '@/constants';

export default function Penjelasan() {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="py-12 px-6 md:px-12 ml-20 mb-20">
            <div className="mb-8">
                <h1 className="text-h1 font-bold mb-4 text-center md:text-left">Apa itu PersonalityTalk?</h1>
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
                                className={`cursor-pointer w-2 h-2 rounded-full ${currentSlide === index ? 'bg-primary' : 'bg-primarylight'}`}
                            ></span>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2 items-center mr-20">
                    <p className="text-justify text-m text-gray-700">{description}</p>
                </div>
            </div>
        </section>
    );
}
