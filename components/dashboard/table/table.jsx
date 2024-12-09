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
  } else if (pathname === "/admin/psikolog/kelola-psikolog") {
    endpoint = `/admin/psikolog/psikolog-regis`;
    searchPlaceholder = "Cari Data Psikolog";
  } else if (pathname === "/admin/artikel/informasi-kesehatan") {
    endpoint = `/admin/diseases?page=${currentPage}`;
    searchPlaceholder = "Cari Informasi Kesehatan";
  } else if (pathname === "/admin/konsultasi/topik-konsultasi") {
    endpoint = `/admin/diseases?page=${currentPage}`;
    searchPlaceholder = "Cari Informasi Kesehatan"; //belum dibetulkan
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
      : pathname === "/admin/artikel/informasi-kesehatan"
      ? ["No", "Nama Penyakit", "Tindakan"]
      : pathname === "/admin/konsultasi/topik-konsultasi"
      ? ["No", "Nama Penyakit", "Tindakan"]
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
                    router.push(`/admin/pengguna/mahasiswa/detail-mahasiswa?id=${row.id}`)
                  }
                />
                <EditButton
                  onClick={() =>
                    router.push(`/admin/pengguna/mahasiswa/edit-mahasiswa?id=${row.id}`)
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
            render: (_, row) => (row.topics ? row.topics.join(", ") : "-"), // Gabungkan array dengan koma
          },
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
