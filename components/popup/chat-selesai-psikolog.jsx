import Image from "next/image";

export default function ChatSelesaiPsikolog({ onClose }) {
  return (
    <div className="px-6 py-4">
      {/* Tombol Close */}
      <div className="flex justify-end">
        <Image
          src="/image/icons/close-orange.svg"
          alt="Tutup"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>

      {/* Konten Utama */}
      <div className="flex flex-col justify-center items-center mt-10">
        <Image
          src="/image/icons/chat.png"
          alt="Belum Mulai"
          width={150}
          height={150}
        />
        <h3 className="text-h3 mt-5 font-semibold text-center">
          Sesi Konsultasi Selesai
        </h3>
        <p className="text-center text-sm text-gray-700 mt-4">
          Komisi Kamu akan diproses dalam waktu maksimal 24 jam. Jika ada
          pertanyaan, jangan ragu untuk menghubungi admin PersonalityTalk.
        </p>
      </div>
    </div>
  );
}
