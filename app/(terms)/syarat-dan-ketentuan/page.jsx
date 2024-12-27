"use client";
import ButtonPrimary from "@/components/button/buttonprimary";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SyaratKetentuan() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="mx-20 my-9 ">
        <div className="flex">
          <div className="w-7/12">
            <h1 className="text-h1 font-bold mt-12">Syarat dan Ketentuan</h1>
            <p className="text-h3 font-normal mt-8">
              Untuk memahami hak dan tanggung jawab Anda sebagai pengguna,
              silakan baca ketentuan kami di bawah ini. Ketentuan ini
              menjelaskan bagaimana Anda dapat menggunakan layanan kami serta
              kewajiban kami dalam menyediakan pengalaman yang aman dan nyaman.
            </p>
          </div>
          <div className="ml-28">
            <Image
              src="/image/ilustrasi/terms.png"
              alt="Login Image"
              width={350}
              height={0}
            />
          </div>
        </div>
        <div className="w-full py-4">
          <hr className="bg-textsec" />
        </div>
        <div className="text-s leading-8">
          <ul className="list-disc">
            <li>
              PersonalityTalk berfungsi sebagai sarana untuk menyediakan konten
              terkait kesehatan mental.
            </li>
            <li>
              PersonalityTalk memiliki beberapa layanan yang dapat digunakan.
              Layanan yang tersedia adalah:
              <ol className="list-[upper-roman] ml-10">
                <li>Konsultasi</li>
                <li>Course Psikologi</li>
                <li>Tes Mental</li>
                <li>Layanan lain yang dapat bertambah dari waktu ke waktu</li>
              </ol>
            </li>
            <li>
              Dalam layanan Konsultasi, PersonalityTalk menghadirkan
              Konselor/Psikolog Profesional dan Berlisensi.
            </li>
            <li>
              Dengan memasukkan alamat email ke PersonalityTalk, menandakan
              bahwa setuju untuk menerima komunikasi dari kami secara
              elektronik.
            </li>
            <li>
              Pengguna setuju bahwa semua perjanjian, pemberitahuan,
              pengungkapan dan komunikasi lainnya yang kami sediakan untuk
              pengguna secara elektronik memenuhi segala persyaratan hukum yang
              dibuat secara tertulis dan memiliki kekuatan hukum yang sama.
            </li>
            <li>
              Pengguna wajib dan akan menanggung seluruh tanggung jawab atas
              tindakan yang dilakukan dan hasil mereka pada layanan ini.
            </li>
            <li>
              Pengguna setuju untuk menggunakan layanan sesuai dengan hukum yang
              berlaku di Indonesia.
            </li>
            <li>
              Kami tidak secara tersurat maupun tersirat menjamin bahwa layanan
              (termasuk konten) bebas dari de facto atau cacat hukum.
            </li>
            <li>
              Harap berhati-hati terhadap segala bentuk penipuan, pemerasan,
              pemalsuan identitas dan tindakan kejahatan lain yang dilakukan
              oleh orang atau pihak yang mengatasnamakan PersonalityTalk.
            </li>
            <li>
              Semua data pribadi yang diberikan pada kami akan dikumpulkan,
              digunakan dan disimpan dan diproses sesuai dengan layanan
              PersonalityTalk. Dengan menerima Syarat dan Ketentuan ini.
              Pengguna memberi wewenang untuk memberikan izin sesuai yang
              dibutuhkan dibawah kebijakan PersonalityTalk.
            </li>
            <li>
              PersonalityTalk berhak mengubah Syarat dan Ketentuan ini kapan
              saja. Pengguna akan diberitahu tentang perubahan melalui email
              atau notifikasi di platform.
            </li>
          </ul>
        </div>
        <div className="mt-5 flex justify-center">
          <ButtonPrimary onClick={handleBack}>Kembali</ButtonPrimary>
        </div>
      </div>
    </>
  );
}
