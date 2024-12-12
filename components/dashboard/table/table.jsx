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

import { deleteUser } from "@/api/manage-user";
import { deleteMahasiswa } from "@/api/manage-mahasiswa";
import { deletePsikolog, deletePricePsikolog } from "@/api/manage-psikolog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_REAL = process.env.NEXT_PUBLIC_API_URL2;

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

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
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
        }

        await mutate(`${API_URL}${endpoint}`);
      } catch (error) {
        console.error("Gagal menghapus data:", error.message);
      } finally {
        setModalOpen(false);
      }
    }
  };

  const cancelDelete = () => {
    setSelectedRow(null);
    setModalOpen(false);
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
    searchPlaceholder = "Cari Data Psikolog";
  } else if (pathname === "/admin/konsultasi/topik-konsultasi") {
    endpoint = `/admin/topics?page=${currentPage}`; //belum ada pagination
    searchPlaceholder = "Cari Topik Konsultasi";
  } else if (pathname === "/admin/keuangan/rekening") {
    endpoint = `/admin/payment-methods?page=${currentPage}`;
    searchPlaceholder = "Cari Topik Konsultasi";
  } else if (pathname === "/admin/keuangan/transaksi") {
    endpoint = `/admin/consultation/transactions?page=${currentPage}`;
    searchPlaceholder = "Cari Nama Client";
  } else if (pathname === "/admin/keuangan/voucher") {
    endpoint = `/admin/vouchers?page=${currentPage}`;
    searchPlaceholder = "Cari Nama Client";
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

  // Ambil data dari backend
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
                  ? `${API_REAL}${photo}`
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
                  ? `${API_REAL}${photo}`
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
                  ? `${API_REAL}${photo}`
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
                <EditButton onClick={() => console.log("Edit clicked", row)} />
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
                <ShowButton onClick={() => console.log("Show clicked", row)} />
                <EditButton onClick={() => console.log("Edit clicked", row)} />
                <DeleteButton
                  onClick={() => console.log("Delete clicked", row)}
                />
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
                <EditButton onClick={() => console.log("Edit clicked", row)} />
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
          { key: "consul_fee" },
          { key: "payment_method" },
          {
            key: "status",
            render: (_, row) => {
              const statusMap = {
                completed: { text: "Berhasil", bgColor: "bg-green-500" },
                failed: { text: "Gagal", bgColor: "bg-red-500" },
                pending_confirmation: {
                  text: "Diterima",
                  bgColor: "bg-yellow-500",
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
            render: (photo) => {
              if (!photo) return null; // Jika photo null atau tidak ada, tidak ditampilkan

              const linkphoto = photo.startsWith("http")
                ? photo
                : `${API_REAL}${photo}`; // Pastikan URL lengkap jika photo bukan URL penuh

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
          { key: "is_active" },
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
                : `${API_REAL}${photo}`; // Pastikan URL lengkap jika photo bukan URL penuh

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
                <ShowButton onClick={() => console.log("Show clicked", row)} />
                <EditButton onClick={() => console.log("Edit clicked", row)} />
                <DeleteButton
                  onClick={() => console.log("Delete clicked", row)}
                />
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
                : `${API_REAL}${photo}`; // Pastikan URL lengkap jika photo bukan URL penuh

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
      <table className="w-full min-w-max bg-primarylight2 border border-text2 text-center text-s p-5">
        <TableHead heads={tableHead} />
        <TableBody rows={data.data.data} columns={columns} />
      </table>

      {/* Komponen Pagination */}
      <Pagination
        currentPage={data.data.current_page}
        totalPages={data.data.last_page}
        nextPageUrl={data.data.next_page_url}
        prevPageUrl={data.data.prev_page_url}
        onPageChange={(page) => setCurrentPage(page)}
      />

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
