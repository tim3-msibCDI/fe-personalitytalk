"use client";
import { useRouter } from 'next/navigation';
import { tesmental } from '@/constants';
import Image from 'next/image';

export default function DetailTesMental({ params }) {
  const { title } = params;
  const router = useRouter();

  // Ubah title dari URL kembali menjadi format aslinya
  const formattedTitle = title.replace(/-/g, ' ').toLowerCase();

  // Cari tes berdasarkan title
  const detailTes = tesmental.find(
    (item) => item.title.toLowerCase() === formattedTitle
  );

  // Ubah title ke format slug untuk URL (mengganti spasi dengan -)
  const slugTitle = detailTes.title.toLowerCase().replace(/\s+/g, '-');

  // Jika tes tidak ditemukan
  if (!detailTes) {
    return <div>Tes tidak ditemukan</div>;
  }

  return (
    <section>
      <div
        className="bg-primary flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/image/bg_tes.svg')" }}
      >
        <div className="flex mx-auto px-10 w-full">
          <div className="w-1/2 flex justify-center mt-20 w-82 h-72 relative">
            <Image
              src="/icons/b-tes.svg"
              alt="Background white for vector tes"
              width={300}
              height={300}
              className="absolute inset-0 w-full h-full object-contain z-0"
            />
            <Image
              src={detailTes.imageSrc}
              alt="Vector Tes"
              width={300}
              height={300}
              className="relative z-0 object-contain"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center text-center p-8 rounded-lg text-whitebg">
            <div className="ml-4 lg:ml-8 mr-4 lg:mr-8 mt-10 mb-12 flex flex-col justify-center items-center">
              <h1 className="text-h1 font-bold mb-4">{detailTes.title} Test</h1>
              <div>
                <button
                  className="flex items-center px-4 py-2 bg-whitebg text-primary rounded-lg gap-2"
                  aria-label="Mulai Tes"
                  onClick={() => router.push(`/tes-mental/${slugTitle}/1`)}
                >
                  <Image
                    src="/icons/arrow_right.png"
                    alt="Arrow Right"
                    width={24}
                    height={24}
                  />
                  <span className="mr-2 text-h3 font-semibold">Mulai Tes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4 px-6 md:px-8 lg:px-12 ml-4 lg:ml-8 mr-4 lg:mr-8">
        <hr className="border border-1 border-text2" />
        {/* Header Name */}
        <div className="mt-4 text-h2 font-bold">
          <h2>{detailTes.title} Test</h2>
        </div>
        {/* Konten */}
        <div className="p-4 text-m">
          <p>{detailTes.description}</p>
        </div>
      </div>
    </section>
  );
}
