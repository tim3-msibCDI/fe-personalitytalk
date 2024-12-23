"use client";

import useSWR, { mutate } from "swr";
import TableHead from "./table-head";
import TableBody from "./table-body";
import { getToken } from "@/lib/auth";
import { SkeletonTable } from "./skeleton-table";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Pagination from "./pagenation";
import { ShowButton, EditButton, DeleteButton } from "./button/button";
import Filter from "./filter";
import SearchBar from "./search-bar";
import Modal from "@/components/modals/modal";
import AddPriceModal from "@/components/popup/addpricepsikolog";
import AddTopicModal from "@/components/popup/addtopic";
import RatingAdmin from "@/components/popup/ratingadmin";
import PaymentProofModal from "@/components/popup/open-payment-proof";

import { deleteUser } from "@/api/manage-user";
import { deleteMahasiswa } from "@/api/manage-mahasiswa";
import { deletePsikolog, deletePricePsikolog } from "@/api/manage-psikolog";
import { deleteTopic } from "@/api/manage-konsultasi";
import { deletePaymentMethod, deleteVoucher } from "@/api/manage-keuangan";
import { deletePartner } from "@/api/manage-dashboard";
import { deleteArticle, deleteDisease } from "@/api/manage-artikel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export default function Table() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedIdTransaksi, setSelectedIdTransaksi] = useState(null);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState(null); // Bukti bayar yang dipilih
  const [senderName, setSenderName] = useState(""); // Nama pengirim
  const [senderBank, setSenderBank] = useState(""); // Bank pengirim
  const [statusTransaksi, setStatusTransaksi] = useState(""); // Status transaksi
  const [failureReason, setFailureReason] = useState(""); // Alasan penolakan
  const [isModalPaymentOpen, setModalPaymentOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  // Fungsi untuk membuka modal edit dengan data yang ingin diedit
  const handleEdit = (data) => {
    setEditData(data); // Set data untuk modal edit
    setIsPriceModalOpen(true); // Buka modal edit
  };

  const handleTopicDataUpdated = async () => {
    try {
      // Memanggil mutate untuk memperbarui data setelah update berhasil
      await mutate(`${API_URL}${endpoint}`);
      setIsTopicModalOpen(false); // Tutup modal edit
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const handleDataUpdated = async () => {
    try {
      // Memanggil mutate untuk memperbarui data setelah update berhasil
      await mutate(`${API_URL}${endpoint}`);
      setIsPriceModalOpen(false); // Tutup modal edit
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  // Open delete modal
  const handleDeleteClick = (row) => {
    setSelectedRow(row); // Store the row to delete
    setModalOpen(true); // Open the delete confirmation modal
  };

  // Cancel delete operation
  const cancelDelete = () => {
    setModalOpen(false); // Close the delete modal
    setSelectedRow(null); // Clear the selected row
  };

  const handleRatingClose = () => {
    setIsRatingModalOpen(false);
    setSelectedConsultation(null);
    setSelectedPsychologist(null);
  };

  const confirmDelete = async () => {
    if (selectedRow) {
      try {
        if (pathname === "/admin/pengguna/umum") {
          const result = await deleteUser(selectedRow.id);
        } else if (pathname === "/admin/pengguna/mahasiswa") {
          const result = await deleteMahasiswa(selectedRow.id);
        } else if (pathname === "/admin/psikolog/daftar-psikolog") {
          const result = await deletePsikolog(selectedRow.id);
        } else if (pathname === "/admin/psikolog/daftar-konselor") {
          const result = await deletePsikolog(selectedRow.id);
        } else if (pathname === "/admin/psikolog/harga-psikolog") {
          const result = await deletePricePsikolog(selectedRow.id);
        } else if (pathname === "/admin/keuangan/transaksi") {
          const result = await deletePricePsikolog(selectedRow.id); //belum diperbaiki
        } else if (pathname === "/admin/konsultasi/topik-konsultasi") {
          const result = await deleteTopic(selectedRow.id);
        } else if (pathname === "/admin/konsultasi/jadwal-konsultasi") {
          const result = await deleteTopic(selectedRow.id);
        } else if (pathname === "/admin/keuangan/rekening") {
          const result = await deletePaymentMethod(selectedRow.id);
        } else if (pathname === "/admin/keuangan/voucher") {
          const result = await deleteVoucher(selectedRow.id);
        } else if (pathname === "/admin/lainnya/mitra") {
          const result = await deletePartner(selectedRow.id);
        } else if (pathname === "/admin/artikel/artikel") {
          const result = await deleteArticle(selectedRow.id);
        } else if (pathname === "/admin/artikel/informasi-kesehatan") {
          const result = await deleteDisease(selectedRow.id);
        }

        await mutate(`${API_URL}${endpoint}`);
      } catch (error) {
        console.error("Gagal menghapus data:", error.message);
      } finally {
        setModalOpen(false);
      }
    }
  };

  // Tentukan endpoint berdasarkan path
  let searchPlaceholder = "Cari Data";
  let endpoint;
  if (pathname === "/admin/pengguna/umum") {
    endpoint = `/admin/users?page=${currentPage}`;
    searchPlaceholder = "Cari Data Pengguna";
  } else if (pathname === "/admin/pengguna/mahasiswa") {
    endpoint = `/admin/mahasiswa?page=${currentPage}`;
    searchPlaceholder = "Cari Data Mahasiswa";
  } else if (pathname === "/admin/psikolog/daftar-psikolog") {
    endpoint = `/admin/psikolog?page=${currentPage}`;
    searchPlaceholder = "Cari Data Psikolog";
  } else if (pathname === "/admin/psikolog/daftar-konselor") {
    endpoint = `/admin/konselor?page=${currentPage}`;
    searchPlaceholder = "Cari Data Psikolog";
  } else if (pathname === "/admin/psikolog/kelola-psikolog") {
    endpoint = `/admin/psikolog-regis?page=${currentPage}`;
    searchPlaceholder = "Cari Data Psikolog";
  } else if (pathname === "/admin/psikolog/harga-psikolog") {
    endpoint = `/admin/psikolog-price?page=${currentPage}`;
    searchPlaceholder = "Cari Harga";
  } else if (pathname === "/admin/konsultasi/topik-konsultasi") {
    endpoint = `/admin/topics?page=${currentPage}`;
    searchPlaceholder = "Cari Topik Konsultasi";
  } else if (pathname === "/admin/konsultasi/jadwal-konsultasi") {
    endpoint = `/admin/consul-schedules/psikolog?page=${currentPage}`;
    searchPlaceholder = "Cari Nama Psikolog / Konselor";
  } else if (pathname === "/admin/konsultasi/riwayat-konsultasi") {
    endpoint = `/admin/consultation/history?page=${currentPage}`;
    searchPlaceholder = "Cari Nama Psikolog / Konselor";
  } else if (pathname === "/admin/keuangan/rekening") {
    endpoint = `/admin/payment-methods?page=${currentPage}`;
    searchPlaceholder = "Cari Topik Konsultasi";
  } else if (pathname === "/admin/keuangan/transaksi") {
    endpoint = `/admin/consultation/transactions?page=${currentPage}`;
    searchPlaceholder = "Cari Nama Client";
  } else if (pathname === "/admin/keuangan/transaksi/psikolog") {
    endpoint = `/admin/consultation/psikolog_commission?page=${currentPage}`;
    searchPlaceholder = "Cari Nama Psikolog";
  } else if (pathname === "/admin/keuangan/voucher") {
    endpoint = `/admin/vouchers?page=${currentPage}`;
    searchPlaceholder = "Cari Nama Voucher";
  } else if (pathname === "/admin/artikel/artikel") {
    endpoint = `/admin/articles?page=${currentPage}`;
    searchPlaceholder = "Cari Artikel";
  } else if (pathname === "/admin/artikel/informasi-kesehatan") {
    endpoint = `/admin/diseases?page=${currentPage}`;
    searchPlaceholder = "Cari Informasi Kesehatan";
  } else if (pathname === "/admin/lainnya/mitra") {
    endpoint = `/admin/mitra?page=${currentPage}`;
    searchPlaceholder = "Cari Mitra";
  } else {
    endpoint = null;
  }

  const { data, error } = useSWR(
    endpoint ? `${API_URL}${endpoint}` : null,
    fetcher
  );

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <SkeletonTable />;

  // Table Head
  const tableHead =
    pathname === "/admin/pengguna/umum"
      ? [
          "No",
          "Foto Profil",
          "Nama Pengguna",
          "Nomor Telepon",
          "Tanggal Lahir",
          "Gender",
          "Tindakan",
        ]
      : pathname === "/admin/pengguna/mahasiswa"
      ? [
          "No",
          "Foto Profil",
          "Nama Pengguna",
          "No Telpon",
          "Universitas",
          "Prodi",
          "Tindakan",
        ]
      : pathname === "/admin/psikolog/daftar-psikolog"
      ? [
          "No",
          "Nama Psikolog",
          "SIPP",
          "Mulai Praktik",
          "Topik Keahlian",
          "Tindakan",
        ]
      : pathname === "/admin/psikolog/daftar-konselor"
      ? ["No", "Nama Lengkap", "Mulai Praktik", "Topik Keahlian", "Tindakan"]
      : pathname === "/admin/psikolog/kelola-psikolog"
      ? ["No", "Foto Profil", "Nama Lengkap", "No SIPP", "Status", "Tindakan"]
      : pathname === "/admin/psikolog/harga-psikolog"
      ? ["No", "No SIPP", "Harga", "Tindakan"]
      : pathname === "/admin/konsultasi/topik-konsultasi"
      ? ["No", "Nama Topik Konsulltasi", "Tindakan"]
      : pathname === "/admin/konsultasi/jadwal-konsultasi"
      ? ["Id", "Nama", "Detail"]
      : pathname === "/admin/konsultasi/riwayat-konsultasi"
      ? [
          "Id Konsultasi",
          "Waktu",
          "Nama Psikolog",
          "Nama Client",
          "Status",
          "Detail",
        ]
      : pathname === "/admin/keuangan/rekening"
      ? ["No", "Nama Pemilik", "No Rekening", "Platform", "Tindakan"]
      : pathname === "/admin/keuangan/transaksi"
      ? [
          "No Pembayaran",
          "Waktu Bayar",
          "Nama Client",
          "Komisi",
          "Metode",
          "Status",
          "Bukti Pembayaran",
        ]
      : pathname === "/admin/keuangan/transaksi/psikolog"
      ? [
          "Id Konsultasi",
          "Waktu Bayar",
          "Nama Psikolog",
          "Metode",
          "Komisi",
          "Status",
          "Bukti Pembayaran",
        ]
      : pathname === "/admin/keuangan/voucher"
      ? [
          "Code",
          "Type",
          "Value",
          "Min. Pembelian",
          "Priode",
          "Edit Status Aktif",
          "Tindakan",
        ]
      : pathname === "/admin/artikel/artikel"
      ? ["No", "Foto", "Nama Artikel", "Tindakan"]
      : pathname === "/admin/artikel/informasi-kesehatan"
      ? ["No", "Nama Penyakit", "Tindakan"]
      : pathname === "/admin/lainnya/mitra"
      ? ["No", "Foto", "Nama Mitra", "Tindakan"]
      : [];

  const columns =
    pathname === "/admin/pengguna/umum"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          {
            key: "photo_profile",
            render: (photo) => {
              const linkphoto =
                photo && photo.startsWith("http")
                  ? photo
                  : photo
                  ? `${API_REAL}/${photo}`
                  : "/image/default-profile.jpg"; // URL foto default

              return (
                <Image
                  src={linkphoto}
                  alt="Foto Profil"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              );
            },
          },
          { key: "name" },
          { key: "phone_number" },
          { key: "date_birth" },
          {
            key: "gender",
            render: (gender) => (gender === "M" ? "Laki-laki" : "Perempuan"),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton
                  onClick={() =>
                    router.push(
                      `/admin/pengguna/umum/detail-pengguna?id=${row.id}`
                    )
                  }
                />
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/pengguna/umum/edit-pengguna?id=${row.id}`
                    )
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/pengguna/mahasiswa"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          {
            key: "photo_profile",
            render: (photo) => {
              const linkphoto =
                photo && photo.startsWith("http")
                  ? photo
                  : photo
                  ? `${API_REAL}/${photo}`
                  : "/image/default-profile.jpg"; // URL foto default

              return (
                <Image
                  src={linkphoto}
                  alt="Foto Profil"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              );
            },
          },
          { key: "name" },
          { key: "phone_number" },
          {
            key: "mahasiswa.universitas",
            render: (_, row) => row.mahasiswa?.universitas || "Tidak ada",
          },
          {
            key: "mahasiswa.jurusan",
            render: (_, row) => row.mahasiswa?.jurusan || "Tidak ada",
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton
                  onClick={() =>
                    router.push(
                      `/admin/pengguna/mahasiswa/detail-mahasiswa?id=${row.id}`
                    )
                  }
                />
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/pengguna/mahasiswa/edit-mahasiswa?id=${row.id}`
                    )
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/psikolog/daftar-psikolog"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          { key: "name" },
          { key: "sipp" },
          { key: "practice_start_date" },
          {
            key: "topics",
            render: (_, row) => (
              <div
                style={{
                  width: "100px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {row.topics ? row.topics.join(", ") : "-"}
              </div>
            ),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton
                  onClick={() =>
                    router.push(
                      `/admin/psikolog/daftar-psikolog/detail-psikolog?id=${row.id}`
                    )
                  }
                />
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/psikolog/daftar-psikolog/edit-psikolog?id=${row.id}`
                    )
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/psikolog/daftar-konselor"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          { key: "name" },
          { key: "practice_start_date" },
          {
            key: "topics",
            render: (_, row) => (
              <div
                style={{
                  width: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {row.topics ? row.topics.join(", ") : "-"}
              </div>
            ),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton
                  onClick={() =>
                    router.push(
                      `/admin/psikolog/daftar-konselor/detail-konselor?id=${row.id}`
                    )
                  }
                />
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/psikolog/daftar-konselor/edit-konselor?id=${row.id}`
                    )
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/psikolog/kelola-psikolog"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          {
            key: "photo_profile",
            render: (photo) => {
              const linkphoto =
                photo && photo.startsWith("http")
                  ? photo
                  : photo
                  ? `${API_REAL}/${photo}`
                  : "/image/default-profile.jpg"; // URL foto default

              return (
                <Image
                  src={linkphoto}
                  alt="Foto Profil"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              );
            },
          },
          {
            key: "name",
            render: (_, row) => row.user?.name || "-",
          },
          {
            key: "sipp",
            render: (_, row) => row.sipp || "-",
          },
          {
            key: "status",
            render: (_, row) => {
              const statusMap = {
                pending: { text: "Menunggu", bgColor: "bg-yellow-500" },
                rejected: { text: "Ditolak", bgColor: "bg-red-500" },
                approved: { text: "Diterima", bgColor: "bg-green-500" },
              };

              const { text, bgColor } = statusMap[row.status] || {
                text: "",
                bgColor: "",
              };

              return (
                <span
                  className={`inline-block px-3 py-2 text-white text-s font-medium rounded ${bgColor}`}
                >
                  {text}
                </span>
              );
            },
          },

          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/psikolog/kelola-psikolog/detail-informasi?id=${row.id_psikolog}`
                    )
                  }
                />
              </div>
            ),
          },
        ]
      : pathname === "/admin/psikolog/harga-psikolog"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          { key: "code" },
          { key: "price" },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <EditButton onClick={() => handleEdit(row)} />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/konsultasi/topik-konsultasi"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          { key: "topic_name" },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <EditButton
                  onClick={() => {
                    setEditData(row); // Set data for modal edit
                    setIsTopicModalOpen(true); // Open the modal for editing
                  }}
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/konsultasi/jadwal-konsultasi"
      ? [
          { key: "sipp" },
          {
            key: "name",
            render: (_, row) => row.user?.name || "-",
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/konsultasi/jadwal-konsultasi/${row.id_psikolog}/${row.user?.name}`
                    )
                  }
                />
              </div>
            ),
          },
        ]
      : pathname === "/admin/konsultasi/riwayat-konsultasi"
      ? [
          { key: "consul_id" },
          { key: "date" },
          { key: "psikolog_name" },
          { key: "client" },
          {
            key: "status",
            render: (_, row) => {
              const statusMap = {
                scheduled: { text: "Dijadwalkan", bgColor: "bg-yellow-500" },
                completed: { text: "Selesai", bgColor: "bg-green-500" },
              };

              const { text, bgColor } = statusMap[row.status] || {
                text: "",
                bgColor: "",
              };

              return (
                <span
                  className={`inline-block px-3 py-2 text-white text-s font-medium rounded ${bgColor}`}
                >
                  {text}
                </span>
              );
            },
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    console.log("Button clicked");
                    setSelectedConsultation(row.consul_id);
                    setSelectedPsychologist(row.psch_id);
                    setIsRatingModalOpen(true);
                  }}
                  className="rounded-md py-2 px-4 text-primary border border-primary bg-transparent font-medium text-s hover:bg-primarylight"
                >
                  Lihat Rating
                </button>
              </div>
            ),
          },
        ]
      : pathname === "/admin/keuangan/rekening"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          { key: "owner" },
          { key: "no_rek" },
          { key: "name" },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/keuangan/rekening/edit-rekening?id=${row.id}`
                    )
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/keuangan/transaksi"
      ? [
          {
            key: "payment_number",
          },
          { key: "payment_date" },
          { key: "client_name" },
          {
            key: "consul_fee_commission",
            render: (_, row) => {
              return (
                <div className="text-sm">
                  <div>
                    <strong>Harga Konsultasi:</strong>
                    <div>Rp {parseInt(row.consul_fee).toLocaleString()}</div>
                  </div>
                  <div className="mt-2">
                    <strong>Komisi Psikolog:</strong>
                    <div>
                      Rp {parseInt(row.psikolog_comission).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            },
          },
          { key: "payment_method" },
          {
            key: "status",
            render: (_, row) => {
              const statusMap = {
                completed: {
                  text: "Berhasil",
                  bgColor: "bg-green-500",
                },
                failed: {
                  text: "Gagal",
                  bgColor: "bg-red-500",
                },
                pending_confirmation: {
                  text: (
                    <>
                      Menunggu <br /> Konfirmasi
                    </>
                  ),
                  bgColor: "bg-gray-400",
                },
              };
              const { text, bgColor } = statusMap[row.status] || {
                text: "",
                bgColor: "",
              };
              return (
                <span
                  className={`inline-block px-3 py-2 text-white text-s font-medium rounded ${bgColor}`}
                >
                  {text}
                </span>
              );
            },
          },
          {
            key: "payment_proof",
            render: (_, row) => {
              if (!row.payment_proof) return null;

              return (
                <button
                  onClick={() => {
                    setSelectedIdTransaksi(row.id);
                    setSelectedPaymentProof(row.payment_proof);
                    setSenderName(row.sender_name);
                    setSenderBank(row.sender_bank);
                    setStatusTransaksi(row.status);
                    setFailureReason(row.failure_reason);
                    setModalPaymentOpen(true);
                  }}
                  title="Lihat Bukti Pembayaran"
                  className="bg-primary rounded-md p-2"
                >
                  <Image
                    src="/icons/open-picture.png" // Ganti dengan path ikon Anda
                    alt="Bukti Pembayaran"
                    width={25}
                    height={25}
                  />
                </button>
              );
            },
          },
        ]
      : pathname === "/admin/keuangan/transaksi/psikolog"
      ? [
          {
            key: "id",
          },
          { key: "payment_date" },
          { key: "psikolog_name" },
          { key: "payment_method" },
          { key: "psikolog_comission" },
          {
            key: "commission_transfer_status",
            render: (_, row) => {
              const statusMap = {
                Diterima: {
                  text: "Diterima",
                  bgColor: "bg-green-500",
                },
                "Menunggu Konfirmasi": {
                  text: (
                    <>
                      Menunggu <br /> Konfirmasi
                    </>
                  ),
                  bgColor: "bg-gray-400",
                },
              };
              const { text, bgColor } = statusMap[
                row.commission_transfer_status
              ] || {
                text: "",
                bgColor: "",
              };
              return (
                <span
                  className={`inline-block px-3 py-2 text-white text-s font-medium rounded ${bgColor}`}
                >
                  {text}
                </span>
              );
            },
          },
          {
            key: "commission_transfer_proof",
            render: (_, row) => {
              if (!row.commission_transfer_proof) return null;

              return (
                <button
                  onClick={() => {
                    setModalImageUrl(
                      `${process.env.NEXT_PUBLIC_IMG_URL}/${row.commission_transfer_proof}`
                    );
                    setImageModalOpen(true);
                  }}
                  title="Lihat Bukti Pembayaran"
                  className="bg-primary rounded-md p-2"
                >
                  <Image
                    src="/icons/open-picture.png" // Ganti dengan path ikon Anda
                    alt="Bukti Pembayaran"
                    width={25}
                    height={25}
                  />
                </button>
              );
            },
          },
        ]
      : pathname === "/admin/keuangan/voucher"
      ? [
          {
            key: "code",
          },
          { key: "voucher_type" },
          { key: "discount_value" },
          { key: "min_transaction_amount" },
          { key: "valid_from" },
          {
            key: "is_active",
            render: (_, row) => {
              const statusMap = {
                0: {
                  text: "Tidak Aktif",
                  bgColor: "bg-red-500",
                },
                1: {
                  text: "Aktif",
                  bgColor: "bg-green-500",
                },
              };

              const { text, bgColor, onClick } = statusMap[row.is_active] || {
                text: "",
                bgColor: "",
                onClick: null,
              };

              return (
                <button
                  className={`inline-block px-7 py-2 text-white text-s font-medium rounded ${bgColor}`}
                >
                  {text}
                </button>
              );
            },
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/artikel/artikel"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          {
            key: "article_img",
            render: (photo) => {
              if (!photo) return null; // Jika photo null atau tidak ada, tidak ditampilkan

              const linkphoto = photo.startsWith("http")
                ? photo
                : `${API_REAL}/${photo}`; // Pastikan URL lengkap jika photo bukan URL penuh

              return (
                <Image
                  src={linkphoto}
                  alt="Foto Profil"
                  width={250}
                  height={250}
                  className="mx-auto rounded-lg"
                />
              );
            },
          },
          {
            key: "article_title",
            render: (title) => (
              <div
                style={{
                  wordWrap: "break-word",
                  maxWidth: "400px",
                }}
              >
                {title}
              </div>
            ),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton
                  onClick={() =>
                    router.push(
                      `/admin/artikel/artikel/preview-artikel?id=${row.id}`
                    )
                  }
                />
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/artikel/artikel/edit-artikel?id=${row.id}`
                    )
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/artikel/informasi-kesehatan"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          { key: "disease_name" },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton
                  onClick={() =>
                    router.push(
                      `/admin/artikel/informasi-kesehatan/preview-informasi-kesehatan?id=${row.id}`
                    )
                  }
                />
                <EditButton
                  onClick={() =>
                    router.push(
                      `/admin/artikel/informasi-kesehatan/edit-informasi-kesehatan?id=${row.id}`
                    )
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : pathname === "/admin/lainnya/mitra"
      ? [
          {
            key: "index",
            render: (_, __, index) => data.data.from - 1 + index + 1,
          },
          {
            key: "img",
            render: (photo) => {
              if (!photo) return null; // Jika photo null atau tidak ada, tidak ditampilkan

              const linkphoto = photo.startsWith("http")
                ? photo
                : `${API_REAL}/${photo}`; // Pastikan URL lengkap jika photo bukan URL penuh

              return (
                <Image
                  src={linkphoto}
                  alt="Foto Profil"
                  width={250}
                  height={250}
                  className="mx-auto rounded-lg"
                />
              );
            },
          },
          {
            key: "name",
            render: (title) => (
              <div
                style={{
                  wordWrap: "break-word",
                  maxWidth: "400px",
                }}
              >
                {title}
              </div>
            ),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <EditButton
                  onClick={() =>
                    router.push(`/admin/lainnya/mitra/edit-mitra?id=${row.id}`)
                  }
                />
                <DeleteButton onClick={() => handleDeleteClick(row)} />
              </div>
            ),
          },
        ]
      : [];

  const filterOptions = [
    { value: "data1", label: "Data 1" },
    { value: "data2", label: "Data 2" },
    { value: "data3", label: "Data 3" },
  ];

  return (
    <div className="overflow-x-auto">
      {/* Filter dan Search */}
      <div className="flex items-center space-x-4 mb-4">
        <Filter
          options={filterOptions} // Mengirim data dummy sebagai options
          selectedOption={filter}
          onChange={(value) => setFilter(value)} // Mengubah filter state
        />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={searchPlaceholder}
        />
      </div>

      {/* Table */}
      <div className="relative">
        <div className="overflow-x-auto max-h-[calc(100vh-5rem)] overflow-y-auto">
          <table className="w-full bg-primarylight2 border border-text2 text-center text-s p-5">
            <TableHead heads={tableHead} />
            <TableBody rows={data.data.data} columns={columns} />
          </table>
        </div>
      </div>

      {/* Komponen Pagination */}
      <Pagination
        currentPage={data.data.current_page}
        totalPages={data.data.last_page}
        nextPageUrl={data.data.next_page_url}
        prevPageUrl={data.data.prev_page_url}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isTopicModalOpen && (
        <AddTopicModal
          isOpen={isTopicModalOpen} // Modal visibility controlled by state
          onClose={() => {
            setIsPriceModalOpen(false); // Close the modal
            setEditData(null); // Clear the edit data
          }}
          topicData={editData} // Pass the data to be edited
          modalType="edit" // Specify the modal type as "edit"
          onDataUpdated={handleTopicDataUpdated} // Callback function to refresh data
        />
      )}

      {/* AddPriceModal (Edit Mode) */}
      {isPriceModalOpen && (
        <AddPriceModal
          isOpen={isPriceModalOpen} // Use the boolean value directly
          onClose={() => {
            setIsPriceModalOpen(false); // Close the modal
            setEditData(null); // Clear the edit data
          }}
          priceData={editData}
          modalType="edit"
          onDataUpdated={handleDataUpdated} // Pass callback function
        />
      )}

      {isRatingModalOpen && (
        <RatingAdmin
          onClose={handleRatingClose}
          consul_id={selectedConsultation}
          psch_id={selectedPsychologist}
        />
      )}

      {/* PaymentProofModal */}
      <PaymentProofModal
        isOpen={isModalPaymentOpen}
        onClose={() => setModalPaymentOpen(false)}
        idTransaksi={selectedIdTransaksi}
        senderName={senderName}
        senderBank={senderBank}
        paymentProof={selectedPaymentProof}
        status={statusTransaksi}
        failureReason={failureReason}
      />

      {imageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setImageModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-4"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <Image
              src={modalImageUrl}
              alt="Bukti Pembayaran"
              width={500}
              height={500}
              className="rounded-lg"
            />
            <button
              onClick={() => setImageModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={cancelDelete}>
        <div className="p-6">
          <div className="my-24">
            <h2 className="text-lg font-semibold text-textcolor text-center">
              Apakah Anda yakin akan menghapus data ini?
            </h2>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="px-8 py-2 text-primary border border-primary rounded-md"
                onClick={cancelDelete}
              >
                Batal
              </button>
              <button
                className="px-8 py-2 bg-primary text-whitebg rounded-md"
                onClick={confirmDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
