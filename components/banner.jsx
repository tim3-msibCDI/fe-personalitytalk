"use client";

import { useRouter } from "next/navigation";

export default function BannerKonsultasi() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/konsultasi');
    };

    return (
        <div>
            <div className="flex items-center bg-primary px-10 py-6 rounded-tl-3xl rounded-br-3xl">
                <div>
                    <div className="text-whitebg">
                        <h1 className="text-h1 font-bold">Konsultasikan dengan Psikolog Kamu</h1>
                        <p className="text-m mb-4">Ungkapkan perasaan Kamu, bebaskan  pikiran, dan temukan solusi bersama psikolog untuk menjaga kesehatan mental kamu</p>
                    </div>
                    <button
                        onClick={handleClick}
                        className="px-4 py-2 bg-whitebg text-primary rounded-lg"
                    >
                        Coba Konsultasi
                    </button>
                </div>
                <div>
                    <img
                        src="/image/ilustrasi/konsultasi-img.svg"
                        alt="Ilustrasi Konsultasi"
                        width={315}
                        height={212}
                    />
                </div>
            </div>
        </div>
    );
}