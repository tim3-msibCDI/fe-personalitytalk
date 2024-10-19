"use client";

import { useState } from "react";
import { faq } from "@/constants";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen px-6 md:px-8 lg:px-12">
            <div className="text-center mb-8">
                <h1 className="text-h1 font-semibold border-b-4 border-black inline-block pb-2 text-textcolor">
                    Frequently Asked Question
                </h1>
            </div>
            <div className="ml-12 mr-12">
                {faq.map((item, index) => (
                    <div key={item.id} className="mb-4">
                        <div 
                            onClick={() => toggleFAQ(index)} 
                            className="cursor-pointer flex justify-between items-center p-4 bg-orange-500 text-white rounded-md"
                        >
                            <h2>{item.name}</h2>
                            {activeIndex === index ? (
                                <span>&#9650;</span> // Icon arrow up
                            ) : (
                                <span>&#9660;</span> // Icon arrow down
                            )}
                        </div>
                        {activeIndex === index && (
                            <div className="mt-3 p-4 border-2 border-orange-500 bg-transparent rounded-md">
                                <p>{item.detail}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
