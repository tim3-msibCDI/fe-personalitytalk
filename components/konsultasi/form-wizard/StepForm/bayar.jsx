import Image from "next/image";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Modal from "@/components/modals/modal";
import SyaratKetentuan from "@/components/popup/snk";
import VoucherGagal from "@/components/popup/voucher-gagal";
import Loading from "@/components/loading/loading";

export default function FormBayar({ onBack }) {
  const router = useRouter();
  const [selectedPsikolog, setSelectedPsikolog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //State untuk modal voucher
  const [isVoucherGagalOpen, setIsVoucherGagalOpen] = useState(false);
  const openVoucherGagalModal = () => setIsVoucherGagalOpen(true);
  const closeVoucherGagalModal = () => setIsVoucherGagalOpen(false);

  //State untuk checkbox syarat dan ketentuan
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  //State untuk mengubah warna button ketika sudah menginput
  const [inputValue, setInputValue] = useState("");

  //Simpan voucher
  const [voucherData, setVoucherData] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Token tidak tersedia");
      }

      const psi_id = localStorage.getItem("selectedPsikologId");
      const psch_id = localStorage.getItem("selectedPschId");
      const topic_id = localStorage.getItem("selectedTopic");

      if (!psi_id || !psch_id || !topic_id) {
        throw new Error("Data ID tidak lengkap di localStorage");
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/consultation/preview-before-payment?psi_id=${psi_id}&psch_id=${psch_id}&topic_id=${topic_id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal memuat data dari API");
      }

      const { data } = await response.json();
      setSelectedPsikolog(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Token tidak tersedia");
      }
  
      // Ambil data dari localStorage
      const psi_id = localStorage.getItem("selectedPsikologId");
      const psch_id = localStorage.getItem("selectedPschId");
      const topic_id = localStorage.getItem("selectedTopic");  // Periksa kunci yang benar
      const voucher_code = voucherData?.voucher_code || " ";
  
      // Periksa apakah data ID lengkap
      if (!psi_id || !psch_id || !topic_id) {
        throw new Error("Data ID tidak lengkap di localStorage");
      }
  
      const body = {
        psi_id,
        psch_id,
        topic_id,
        payment_method_id: 2,
      };
  
      // Jika voucher_code tersedia, tambahkan ke body
      if (voucher_code) {
        body.voucher_code = voucher_code;
      }
  
      const url = `${process.env.NEXT_PUBLIC_API_URL}/consultation/create-transaction`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal membuat transaksi");
      }
  
      // Mendapatkan data transaksi dari response
      const {
        id_transaction,
        transaction, // Ambil objek transaction
      } = result.data;
      
      const { no_pemesanan } = transaction; // Akses no_pemesanan dari transaction      
  
      // Menyimpan data transaksi dan psikolog ke localStorage
      localStorage.setItem("transactionData", JSON.stringify({
        id_transaction,
        no_pemesanan,
    }));
  
      return { no_pemesanan, id_transaction };
    } catch (err) {
      console.error("Create Transaction Error:", err.message);
      setErrorMessage(err.message || "Gagal membuat transaksi");
      throw err;
    }
  };
  

  // Fungsi tuk redeem voucher
  const redeemVoucher = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Token tidak tersedia");
      }

      const psi_id = localStorage.getItem("selectedPsikologId");
      if (!psi_id) {
        throw new Error("Psi_id tidak tersedia di localStorage");
      }

      if (!inputValue) {
        throw new Error("Kode voucher belum diisi");
      }

      // Susun URL dengan query string
      const url = `${process.env.NEXT_PUBLIC_API_URL}/consultation/voucher-redeem?code=${inputValue}&psi_id=${psi_id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal redeem voucher");
      }
      // state voucherData
      setVoucherData(result.data);
    } catch (error) {
      console.error("Redeem Error:", error.message);
      setErrorMessage(error.message || "Terjadi kesalahan saat redeem voucher");
      setIsVoucherGagalOpen(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading/>;
  if (error && !isVoucherGagalOpen) return <p>Error: {error}</p>;

  //Fungsi kalkulasi durasi konsultasi
  function calculateDuration(consultationTime) {
    if (!consultationTime) return 0;

    try {
      // Memisahkan waktu mulai dan waktu selesai
      const [startTime, endTime] = consultationTime.split(" - ");

      // Memecah jam dan menit dari waktu mulai
      const [startHour, startMinute] = startTime.split(":").map(Number);

      // Memecah jam dan menit dari waktu selesai
      const [endHour, endMinute] = endTime.split(":").map(Number);

      // Mengubah waktu ke dalam format Date
      const startDate = new Date(0, 0, 0, startHour, startMinute);
      const endDate = new Date(0, 0, 0, endHour, endMinute);

      // Menghitung durasi dalam menit
      const duration = (endDate - startDate) / (1000 * 60);

      return duration > 0 ? duration : 0; // Pastikan durasi tidak negatif
    } catch (error) {
      console.error("Error saat menghitung durasi:", error);
      return 0; // Kembalikan 0 jika ada error
    }
  }

  // Format harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price).replace('Rp', 'Rp ');
  };

  //Simpan voucher code ke localstorag
  const handleVoucherInput = (value) => {
    setInputValue(value);
    localStorage.setItem("voucher_code", value);
  }

  const handleSubmit = async () => {
    try {
      const { no_pemesanan, id_transaction } = await createTransaction();

      // Redirect langsung ke halaman konsultasi berdasarkan no_pemesanan
      router.push(`/konsultasi/${no_pemesanan}`);
    } catch (err) {
      console.error("Error saat submit:", err.message);
    }
  };


  return (
    <div className="py-6">
      <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
        <Image src="/icons/arrow_back.png" alt="icon kembali" width={9} height={14} />
        <p className="text-m font-bold">Kembali</p>
      </div>
      <div className="flex gap-8 mt-6">
        {/* Detail Konsultasi */}
        <div className="w-2/5">
          <div className="py-4">
            <h3 className="text-h3 font-semibold text-textcolor mb-2">Pemesanan</h3>
            <p className="text-s text-textcolor mb-4">Lakukan pembayaran agar pemesanan sesi konsultasi kamu dapat dijadwalkan</p>
            <div className="bg-primarylight2 rounded-md">
              <div className="p-4">
                <div className="flex gap-4">
                  <div className="w-28 h-28 rounded overflow-hidden">
                    <Image
                      className="object-cover w-full h-full"
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}/${selectedPsikolog.photo_profile}`}
                      alt={`Photo ${selectedPsikolog.psikolog_name}`}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-m font-semibold">{selectedPsikolog.psikolog_name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      {selectedPsikolog.rating && selectedPsikolog.rating > 0 && (
                        <>
                          <div className="flex items-center">
                            <Image src="/icons/bintang.png" alt="Icon Star" width={18} height={18} />
                            <p className="ml-1">{selectedPsikolog.rating}</p>
                          </div>
                          <span className="text-gray-400">|</span>
                        </>
                      )}
                      <div className="flex items-center">
                        <Image src="/icons/i-konsultasi.png" alt="Icon Konsultasi" width={18} height={18} />
                        <p className="ml-1">{selectedPsikolog.years_of_experience} tahun</p>
                      </div>
                      <span className="text-gray-400">|</span>
                      <div className="flex items-center">
                        <Image src="/icons/role.png" alt="Icon Role" width={18} height={18} />
                        <p className="ml-1">{selectedPsikolog.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border-1 border-black mb-4 mt-2" />
                <div className="text-m gap-2">
                  <p className="font-semibold mb-2">Detail Konsultasi</p>
                  <div className="grid grid-cols-2 gap-y-2 text-m text-textcolor">
                    <p>Topik Konsultasi</p>
                    <p>: {selectedPsikolog.topic}</p>
                    <p>Durasi Konsultasi</p>
                    <p>: {calculateDuration(selectedPsikolog.consultation_time)} menit</p>
                    <p>Jadwal Konsultasi</p>
                    <p>: {selectedPsikolog.consultation_date}</p>
                    <p>Waktu Konsultasi</p>
                    <p>: {selectedPsikolog.consultation_time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Masukkan voucher, snk */}
        <div className="w-3/5">
          <div className="bg-primarylight2 rounded-lg p-4 mb-6">
            <h3 className="text-h3 font-semibold mb-4">Pembayaran</h3>
            <p className="text-m mb-4">Metode Pembayaran yang tersedia: <b>Transfer BANK BSI</b></p>

            <hr className="border-1 border-black mb-4 mt-2" />
            {/* Voucher */}
            <div>
              <label htmlFor="voucher" className="block mb-2 text-m font-semibold text-textcolor">
                Voucher
              </label>
              <div className="flex flex-1 gap-2">
                <input
                  type="text"
                  id="voucher"
                  aria-describedby="voucher-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-text2 text-s rounded-lg block w-full p-2.5"
                  placeholder="Masukkan Voucher Anda"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  onClick={redeemVoucher}
                  className={`rounded-lg text-whitebg text-s px-4 ${inputValue ? "bg-primary" : "bg-disable"}`}
                  disabled={!inputValue}
                >
                  Reedem
                </button>
              </div>
            </div>
            {/* Harga */}
            <div className="text-m mt-3 space-y-2">
              <div className="flex justify-between">
                <p>Total Harga Konsultasi</p>
                <p>
                  <b>
                    {voucherData ? formatPrice(voucherData.consul_fee) : formatPrice(selectedPsikolog.price)}
                  </b>
                </p>
              </div>
              <div className="flex justify-between">
                <p>Total Diskon Voucher</p>
                <p><b>{voucherData ? formatPrice(voucherData?.discount_value) : "Rp 0,00"}</b></p>
              </div>
            </div>
            <hr className="border-1 border-black mb-4 mt-2" />
            <div className="text-h3 font-semibold flex justify-between">
              <p>Total Biaya</p>
              <p>{voucherData ? formatPrice(voucherData?.final_amount) : formatPrice(selectedPsikolog.price)}</p>
            </div>
            {/* SNK */}
            <div className="mt-4">
              <div className="flex items-center mb-4">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                  checked={isTermsChecked} // Kontrol berdasarkan state
                  onChange={(e) => setIsTermsChecked(e.target.checked)} // Update state saat checkbox berubah
                />
                <label htmlFor="checkbox" className="ml-2 text-sm font-medium text-gray-900">
                  Saya telah membaca dan menyetujui{" "}
                  <span
                    className="text-primary cursor-pointer underline"
                    onClick={openModal}
                  >
                    Syarat & Ketentuan
                  </span>
                </label>
              </div>
            </div>
            {/* Button bayar */}
            <button
              onClick={handleSubmit}
              className={`text-m w-full py-2 rounded-md font-semibold text-whitebg ${isTermsChecked ? "bg-primary" : "bg-disable"
                }`}
              disabled={!isTermsChecked}
            >
              Bayar
            </button>
          </div>
          {/* Modal component */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <SyaratKetentuan onClose={closeModal} /> {/* Mengirim fungsi closeModal sebagai prop */}
          </Modal>
          {/* Modal Gagal */}
          <Modal isOpen={isVoucherGagalOpen} onClose={closeVoucherGagalModal}>
            <VoucherGagal onClose={closeVoucherGagalModal} message={errorMessage} /> {/* Mengirim fungsi closeModal sebagai prop */}
          </Modal>
        </div>
      </div>
    </div>
  );
}