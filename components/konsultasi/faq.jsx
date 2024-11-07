"use client";

import { useState } from "react";
import { faq } from "@/constants";
import Image from "next/image";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen px-6 md:px-8 lg:px-12">
            <div className="text-center mb-20">
                <h1 className="text-h1 font-semibold border-b-4 border-black inline-block pb-2 text-textcolor">
                    Frequently Asked Question
                </h1>
            </div>
            <div className="ml-4 lg:ml-8 mr-4 lg:mr-8">
                {faq.map((item, index) => (
                    <div key={item.id} className="mb-4 border-2 border-orange-500 rounded-md">
                        <div 
                            onClick={() => toggleFAQ(index)} 
                            className="cursor-pointer flex justify-between items-center p-4 bg-orange-500 text-white"
                        >
                            <h2>{item.name}</h2>
                            <Image
                                src="/icons/arrow_down.png"
                                alt="Arrow"
                                width={20}
                                height={20}
                                className={`transition-transform duration-300 ${
                                    activeIndex === index ? "rotate-180" : "rotate-0"
                                }`} // Animasi rotasi saat FAQ dibuka
                            />
                        </div>
                        {activeIndex === index && (
                            <div className="mt-3 p-4 bg-transparent rounded-md">
                                <p>{item.detail}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
