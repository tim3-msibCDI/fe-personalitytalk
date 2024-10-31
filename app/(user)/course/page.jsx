import Image from "next/image";
import CourseBox from "@/components/card/coursebox";
import Countlist from "@/components/user/about/countlist";
import CourseList from "@/components/card/courselist";

export default function Course() {
  return (
    <>
      {/* Hero */}
      <div className="flex px-20 py-9">
        <Image
          src="/image/ilustrasi/course1.png"
          alt=""
          width={500}
          height={500}
          className="ml-20"
        />
        <div className="text-textcolor mr-20 ml-9 my-auto">
          <h1 className="text-h1 font-semibold mb-6">Online Course</h1>
          <p>
            Platform pembelajaran online yang dirancang untuk memudahkan Anda
            mengakses kursus dari berbagai bidang, kapan saja dan di mana saja.
            Kami menyediakan beragam kursus dari para ahli profesional untuk
            membantu Anda mengembangkan keterampilan baru atau memperdalam
            pengetahuan yang sudah dimiliki.
          </p>
        </div>
      </div>

      {/* Daftar Fitur */}
      <div className="bg-primary p-6">
        <div className="flex justify-center">
          <div className="box flex flex-col items-center w-[289px]">
            <Image
              src="/image/ilustrasi/modul.png"
              alt="modul"
              width={160}
              height={150}
            />
            <p className="text-h3 text-whitebg font-medium py-4">
              Modul Belajar
            </p>
          </div>
          <div className="box flex flex-col items-center w-[289px]">
            <Image
              src="/image/ilustrasi/video.png"
              alt="modul"
              width={130}
              height={110}
            />
            <p className="text-h3 text-whitebg font-medium py-4 mb-5">
              Video Belajar
            </p>
          </div>
          <div className="box flex flex-col items-center w-[294px]">
            <Image
              src="/image/ilustrasi/kuis.png"
              alt="modul"
              width={130}
              height={110}
            />
            <p className="text-h3 text-whitebg font-medium py-4">
              Kuis dan Penilaian
            </p>
          </div>
          <div className="box flex flex-col items-center w-[289px]">
            <Image
              src="/image/ilustrasi/sertifikasi.png"
              alt="modul"
              width={160}
              height={160}
            />
            <p className="text-h3 text-whitebg font-medium py-4">
              Sertifikasi
            </p>
          </div>
        </div>
      </div>

      {/* Course Rekomendasi */}
      <div className="px-20 py-9 text-textcolor text-center">
        <h1 className="text-h1 font-semibold">Recomendation Course</h1>
        <p className="text-m">Rekomendasi Kursus untuk Kemajuan Perkembanganmu</p>
      </div>
      <div className="py-9">
        <CourseList />
      </div>

      {/* Daftar Course */}
      <div className="px-20 py-9 text-textcolor text-center">
        <h1 className="text-h1 font-semibold">All Course</h1>
        <p className="text-m">Temukan Kursus Apapun, Kembangkan Potensimu</p>
      </div>
      <div className="py-9">
        
      </div>
    </>
  );
}
