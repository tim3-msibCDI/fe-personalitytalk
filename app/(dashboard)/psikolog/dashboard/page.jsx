import React from 'react';
import { dashboard } from '@/constants';

export default function PsikologDashboard() {
    return (
        <div className="grid grid-cols-4 gap-5 px-4 py-5">
            {dashboard.map((item, index) => (
                <div 
                    key={index} 
                    className="flex items-center rounded-lg p-4 shadow-md bg-primarylight2"
                >
                    <div className="w-12 h-12 mr-4">
                        <img
                            src={item.icon}
                            alt={`${item.label} Icon`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-h2 font-semibold">{item.value}</h2>
                        <p className="text-s">{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
