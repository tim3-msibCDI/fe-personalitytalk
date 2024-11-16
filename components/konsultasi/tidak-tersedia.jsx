import Image from "next/image";

export default function TidakTersedia() {
    return (
        <div className="mt-5 max-h-[400px] border border-primary rounded-md">
            <div className="p-6 flex flex-col items-center justify-center text-center">
                <Image
                    src="/icons/konsultasi/tidak_tersedia.svg"
                    alt="Vector Tidak Tersedia"
                    width={96}
                    height={96}
                />
                <h3 className="text-h3 font-semibold mt-4">Maaf tidak ada Psikolog tersedia saat ini</h3>
                <p className="text-s mt-1">Kami mohon maaf, saat ini tidak ada psikolog yang tersedia untuk pemesanan konsultasi pada tanggal ini. Silakan coba tanggal lainnya. </p>
            </div>
        </div>
    );
}