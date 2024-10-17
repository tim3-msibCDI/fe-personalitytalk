import { penyakit } from "@/constants";

export default function DetailPenyakit({ params }) {
    const { penyakit: penyakitName } = params;

    // Ubah tanda hubung menjadi spasi untuk pencarian
    const formattedName = penyakitName.replace(/-/g, ' ');

    // Cari penyakit berdasarkan nama yang ada di URL
    const detailPenyakit = penyakit.find(
        (item) => item.name.toLowerCase() === formattedName.toLowerCase()
    );

    // Jika penyakit tidak ditemukan
    if (!detailPenyakit) {
        return <div>Penyakit tidak ditemukan</div>;
    }

    return (
        <section className="px-8 py-4">
            <div className="ml-20 mr-20 mt-10 mb-12">
                <h5 className="mb-4">Informasi Kesehatan</h5>
                <h1 className="text-3xl font-bold mb-4">{detailPenyakit.name}</h1>
                <p className="mb-4">Ditulis oleh <strong>{detailPenyakit.author}</strong></p>
                <img src={detailPenyakit.image} alt={detailPenyakit.name} className="w-full mb-4" />
                <p>{detailPenyakit.description}</p>
            </div>
        </section>
    );
}
