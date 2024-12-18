import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <Image
        src="/image/ilustrasi/404.svg"
        width={400}
        height={400}
        alt="Image 404"
        className="mx-auto"
      />
      <h1 className="text-h1 font-semibold text-center mt-6">
        Oops! Halaman Tidak Ditemukan
      </h1>
      <p className="text-m text-center">
        Halaman yang kamu cari tidak tersedia. Klik tombol di bawah untuk
        kembali ke halaman utama.
      </p>
      <div className="w-full flex justify-center">
        <Link
          href="/"
          className="px-7 py-2 text-whitebg font-semibold bg-primary rounded-lg"
        >
          Halaman Utama
        </Link>
      </div>
    </div>
  );
}
