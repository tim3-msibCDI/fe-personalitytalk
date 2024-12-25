import Image from "next/image";

export default function Psikolog({ data }) {
  if (!data) {
    return <p>Data psikolog tidak tersedia.</p>;
  }

  const {
    photo,
    name,
    category, // atau role
    rating,
    experience, // atau pengalaman
    status,
  } = data;

  return (
    <div className="flex gap-4">
      {/* Foto Psikolog */}
      <div className="w-28 h-28 rounded overflow-hidden">
        <Image
          className="object-cover w-full h-full"
          src={photo}
          alt={`Photo ${name}`}
          width={100}
          height={100}
        />
      </div>

      {/* Informasi Psikolog */}
      <div className="flex flex-col">
        <p className="text-m font-semibold">{name || "Nama tidak tersedia"}</p>
        {/* Rating, Pengalaman, dan Role */}
        <div className="flex items-center gap-3 mt-2">
          {/* Rating */}
          {rating && rating > 0 && (
            <>
              <div className="flex items-center">
                <Image
                  src="/image/icons/bintang.png"
                  alt="Icon Star"
                  width={18}
                  height={18}
                />
                <p className="ml-1">{rating}</p>
              </div>
              <span className="text-gray-400">|</span>
            </>
          )}
          {/* Pengalaman */}
          <div className="flex items-center">
            <Image
              src="/image/icons/i-konsultasi.png"
              alt="Icon Konsultasi"
              width={18}
              height={18}
            />
            <p className="ml-1">{experience || "0"} tahun</p>
          </div>
          <span className="text-gray-400">|</span>
          {/* Role */}
          <div className="flex items-center">
            <Image
              src="/image/icons/role.png"
              alt="Icon Role"
              width={18}
              height={18}
            />
            <p className="ml-1">{category || "Kategori tidak tersedia"}</p>
          </div>
        </div>

        {/* Status Pembayaran */}
        {status && (
          <div className="mt-3 flex items-center">
            <div
              className={`px-4 py-2 rounded-md text-white font-semibold text-sm ${
                status === "pending"
                  ? "bg-wait"
                  : status === "pending_confirmation"
                  ? "bg-text2"
                  : status === "completed"
                  ? "bg-success"
                  : status === "failed"
                  ? "bg-fail"
                  : "bg-gray-300"
              }`}
            >
              {status === "pending" && "Menunggu Pembayaran"}
              {status === "pending_confirmation" && "Menunggu Konfirmasi"}
              {status === "completed" && "Transaksi Berhasil"}
              {status === "failed" && "Transaksi Gagal"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
