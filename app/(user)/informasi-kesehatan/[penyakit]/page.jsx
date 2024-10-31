import { tesmental } from '@/constants';

export default function DetailTesMental({ params }) {
  const { tesmental: tesMentalId } = params;

  // Cari tes berdasarkan ID
  const detailTes = tesmental.find((item) => item.id === Number(tesMentalId));

  // Jika tes tidak ditemukan
  if (!detailTes) {
    return <div>Tes tidak ditemukan</div>;
  }

  return (
    <section className="px-8 py-4">
      <div className="ml-20 mr-20 mt-10 mb-12">
        <h5 className="mb-4">Tes Mental</h5>
        <h1 className="text-3xl font-bold mb-4">{detailTes.title}</h1>
        <p>{detailTes.description}</p>
      </div>
    </section>
  );
}
