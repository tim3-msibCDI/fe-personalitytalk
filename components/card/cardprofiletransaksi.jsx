import { useRouter } from "next/navigation";
import Image from "next/image";

const formatRupiah = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export default function TransactionHistoryCard({
  id_transaction,
  name,
  status,
  date,
  price,
  psikolog_profile,
  no_pemesanan,
}) {
  const router = useRouter();
  const getStatusBgColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "pending_confirmation":
        return "bg-gray-500";
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  const getKet = () => {
    switch (status) {
      case "pending":
        return (
          <>
            <span className="sm:inline hidden">Menunggu </span>
            <span>Pembayaran</span>
          </>
        );
      case "pending_confirmation":
        return (
          <>
            <span className="sm:inline hidden">Menunggu </span>
            <span>Konfirmasi</span>
          </>
        );
      case "completed":
        return (
          <>
            <span className="sm:inline hidden">Transaksi </span>
            <span>Berhasil</span>
          </>
        );
      case "failed":
        return (
          <>
            <span className="sm:inline hidden">Transaksi </span>
            <span>Gagal</span>
          </>
        );
      default:
        return "Status";
    }
  };

  const navigateToDetailTransaksi = ({ idTransaction, noPemesanan }) => {
    localStorage.setItem("id_transaction", idTransaction);
    router.push(`/detail-transaksi/${no_pemesanan}`);
  };

  return (
    <div
      className="w-full h-[124px] p-4 bg-primarylight rounded-lg border border-primary justify-between items-center inline-flex mb-2 cursor-pointer"
      onClick={() =>
        navigateToDetailTransaksi({
          idTransaction: id_transaction,
          noPemesanan: no_pemesanan,
        })
      }
    >
      <div className="justify-start items-center gap-3 flex">
        <div className="h-20 rounded-lg justify-start items-center gap-2.5 flex">
          <Image
            className="grow shrink basis-0 rounded-lg hidden sm:inline"
            src={
              psikolog_profile
                ? `${process.env.NEXT_PUBLIC_IMG_URL}/${psikolog_profile}`
                : "/default-profile.jpg" // Gambar default jika `psikolog_profile` kosong
            }
            alt={`${name}'s profile picture`}
            height={100}
            width={100}
          />
        </div>
        <div className="self-stretch flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-textcolor lg:text-base text-s font-semibold">
            {name}
          </div>
          <div
            className={`h-5 px-4 py-2 ${getStatusBgColor()} rounded-lg justify-center items-center gap-2.5 inline-flex`}
          >
            <div className="text-neutral-50 text-xs font-semibold">
              {getKet()}
            </div>
          </div>
        </div>
      </div>
      <div className="h-11 justify-end items-center gap-4 flex">
        <div className="flex-col justify-center items-start gap-2 inline-flex">
          <div className="justify-start items-center gap-2 inline-flex">
            <Image
              src="/image/icons/chat-primary.svg"
              width={15}
              height={15}
              alt="icons"
            />
            <div className="text-textcolor text-vs font-semibold">{date}</div>
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <Image
              src="/image/icons/coins-primary.svg"
              width={15}
              height={15}
              alt="icons"
            />
            <div className="text-textcolor text-vs font-semibold">
              {formatRupiah(price)}
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/image/icons/arrow-activity.svg"
            width={20}
            height={20}
            alt="icons"
          />
        </div>
      </div>
    </div>
  );
}
