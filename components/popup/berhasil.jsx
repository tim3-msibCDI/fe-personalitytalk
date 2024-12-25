import Image from "next/image";

export default function Berhasil({ onClose, message }) {
  const handleClose = () => {
    onClose(); // Menjalankan fungsi onClose yang diteruskan
    window.location.reload(); // Memuat ulang halaman
  };

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
          onClick={handleClose}
        />
      </div>

      {/* Konten Utama */}
      <div className="flex flex-col justify-center items-center mt-10">
        <Image
          src="/image/icons/smile.svg"
          alt="Belum Mulai"
          width={150}
          height={150}
        />
        <h3 className="text-h3 mt-5 font-semibold text-center">Berhasil</h3>
        <p className="text-center text-sm text-gray-700 mt-4">
          {message || ""}
        </p>
      </div>
    </div>
  );
}
