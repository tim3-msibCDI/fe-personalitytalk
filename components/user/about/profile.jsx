import Image from "next/image";

export default function Profile() {
  return (
    <>
      <div className="py-14 bg-whitebg">
        <div className="text-center">
          <h3 className="text-h3 font-medium">Tentang Kami</h3>
          <h1 className="text-h1 font-semibold mt-2">PersonalityTalk</h1>
        </div>
        <div className="lg:flex mx-4 lg:mx-28 mt-12">
          <Image
            src="/image/about1.png"
            alt="About"
            width={386.702}
            height={262}
            className="rounded-lg mx-auto"
          />
          <div className="lg:ml-20 ml-0 lg:mt-0 mt-4">
            <h2 className="text-h2 font-semibold mb-8 lg:text-left text-center">
              Apa itu PersonalityTalk?
            </h2>
            <p className="text-m font-light lg:text-left text-center">
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
