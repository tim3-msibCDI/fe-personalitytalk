import React from "react";
import Image from "next/image";

export default function KeluhanPsikolog({ keluhan, onClose }) {
    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg px-6 py-4 rounded-t-lg flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-m font-semibold">Lihat Keluhan</p>
                    <p className="text-s font-light">
                        Keluhan dari client yang dirasakan
                    </p>
                </div>
                <Image
                    src="/icons/close.png"
                    alt="Tutup"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="p-6">
                {keluhan ? (
                    <textarea
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={keluhan}
                    ></textarea>
                ) : (
                    <textarea
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value="Tidak ada keluhan yang diajukan."
                    ></textarea>
                )} 

            </div>
        </div>
    );
}