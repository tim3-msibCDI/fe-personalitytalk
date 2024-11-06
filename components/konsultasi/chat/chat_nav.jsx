"use client";

import Image from "next/image";
import { jadwalPsikolog } from "@/constants";
import { useState } from "react";

export default function ChatNavigation() {

    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]);

    return (
        <div className="bg-primarylight2">
            <div className="px-6 md:px-8 lg:px-12 ml-12 py-5 flex justify-between">
                <div className="flex items-center gap-4">
                    {/* Tombol back */}
                    <div>
                        <Image
                            src="/icons/arrow_back.png"
                            alt="Kembali"
                            width={9}
                            height={14}
                        />
                    </div>
                    {/* Profil Psikolog */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                                src={selectedPsikolog.photos}
                                alt={`Photo ${selectedPsikolog.name}`}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div>
                            <p className="text-m font-semibold">{selectedPsikolog.name}</p>
                            <div className="text-s">
                                <p>Online</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mr-4 md:mr-8">
                    <button className="bg-disable flex items-center text-whitebg text-m font-semibold gap-2 px-4 rounded-lg">
                        <Image
                            src="/icons/white-catatan.png"
                            alt="Icon Catatan"
                            width={24}
                            height={24}
                        />
                        <span>Catatan Psikolog</span>
                    </button>
                    <div className="bg-primary rounded-lg text-s font-semibold text-whitebg flex items-center px-4">
                        <p>50.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}