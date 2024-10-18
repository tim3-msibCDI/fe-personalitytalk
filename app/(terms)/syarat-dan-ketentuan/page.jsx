import Image from "next/image";

export default function SyaratKetentuan() {
  return (
    <>
      <div className="mx-20 my-16 flex">
        <div className="w-7/12">
          <h1 className="text-h1 font-bold mt-12">Syarat dan Ketentuan</h1>
          <p className="text-h3 font-normal mt-8">
            Untuk memahami hak dan tanggung jawab Anda sebagai pengguna, silakan
            baca ketentuan kami di bawah ini. Ketentuan ini menjelaskan
            bagaimana Anda dapat menggunakan layanan kami serta kewajiban kami
            dalam menyediakan pengalaman yang aman dan nyaman.
          </p>
        </div>
        <div className="ml-28">
          <Image
            src="/image/ilustrasi/terms.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div>
          <hr />
        </div>
      </div>
    </>
  );
}
