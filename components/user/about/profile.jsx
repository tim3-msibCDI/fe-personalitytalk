import Image from "next/image";

export default function Profile() {
  return (
    <>
      <div className="py-14 bg-whitebg">
        <div className="text-center">
          <h3 className="text-h3 font-medium">Tentang Kami</h3>
          <h1 className="sm:text-h1 text-h2 font-semibold mt-2">PersonalityTalk</h1>
        </div>
        <div className="lg:flex mx-4 sm:mx-28 sm:mt-12 mt-4">
          <Image
            src="/image/about1.png"
            alt="About"
            width={386.702}
            height={262}
            className="rounded-lg mx-auto"
          />
          <div className="lg:ml-20 ml-0 lg:mt-0 mt-4">
            <h2 className="lg:text-h2 text-h3 font-semibold sm:mb-8 mb-4 lg:text-left text-center">
              Apa itu PersonalityTalk?
            </h2>
            <p className="sm:text-m text-s font-light lg:text-left text-center">
              PersonalityTalk adalah lembaga yang bergerak di bidang jasa
              training, coaching, dan consulting dalam bidang psikologi. Berdiri
              sejak tahun 2014, Alhamdulillah PersonalityTalk telah membantu
              banyak orang dalam menyelesaikan permasalahan tentang kehidupan
              keluarga, karir, dan bisnis. Dengan para mentor yang berpengalaman
              di bidangnya menjadikan PersonalityTalk dipercaya menjadi media
              tempat belajar para Mahasiswa Psikologi, Praktisi SDM, Psikolog,
              Guru, Dosen, Praktisi NLP, Hypnoterapis, juga para Orang Tua yang
              ingin mendapatkan pembelajaran baik teori maupun praktik.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
