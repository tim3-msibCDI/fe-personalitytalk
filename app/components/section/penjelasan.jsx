"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { slides, description } from '../../constants';

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
        <section className="py-12 px-6 md:px-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Apa itu PersonalityTalk?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 flex flex-col items-center">
                    <Image
                        src={slides[currentSlide].imageSrc}
                        alt="Slide Image"
                        width={400}
                        height={240}
                        className="rounded-lg"
                    />
                    <div className="mt-2 flex justify-center space-x-2">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`cursor-pointer w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                            ></span>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <p className="text-lg text-gray-700">{description}</p>
                </div>
            </div>
        </section>
    );
}
