import { tesmental } from '@/constants';
import Image from 'next/image';

export default function DetailTesMental({ params }) {
  const { title } = params;

  // Ubah title dari URL kembali menjadi format aslinya
  const formattedTitle = title.replace(/-/g, ' ').toLowerCase();

  // Cari tes berdasarkan title
  const detailTes = tesmental.find(
    (item) => item.title.toLowerCase() === formattedTitle
  );

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
        <div className="mx-20 flex">
          <div className="w-1/2 flex justify-center mt-20 w-82 h-72 relative">
            <Image
              src="/icons/b-tes.svg"
              alt="Ilustrasi Tes"
              width={300}
              height={300}
              className="absolute inset-0 w-full h-full object-contain z-0"
            />
            <Image
              src="/icons/tes-vector.svg"
              alt="Ilustrasi Tes Tumpang"
              width={240}
              height={240}
              className="relative z-0 object-contain"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center text-center p-8 rounded-lg text-whitebg">
            <div className="ml-20 mr-20 mt-10 mb-12">
              <h5 className="mb-4">Tes Mental</h5>
              <h1 className="text-3xl font-bold mb-4">{detailTes.title}</h1>
              <p>{detailTes.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
