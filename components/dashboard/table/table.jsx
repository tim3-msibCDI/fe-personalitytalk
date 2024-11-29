"use client";

import useSWR from "swr";
import TableHead from "./table-head";
import TableBody from "./table-body";
import { getToken } from "@/lib/auth";
import { SkeletonTable } from "./skeleton-table";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Pagination from "./pagenation";
import { ShowButton, EditButton, DeleteButton } from "./button/button";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

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
            render: (photo) =>
              photo ? (
                <Image
                  src={`${API_REAL}/${photo}`}
                  alt="Foto Profil"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              ) : (
                <Image
                  src="/image/default-profile.jpg"
                  alt="Foto Profil"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              ),
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
                <ShowButton onClick={() => console.log("Show clicked", row)} />
                <EditButton onClick={() => console.log("Edit clicked", row)} />
                <DeleteButton
                  onClick={() => console.log("Delete clicked", row)}
                />
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
            render: (photo) =>
              photo ? (
                <Image
                  src={`${API_REAL}/${photo}`}
                  alt="Foto Profil"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              ) : (
                <Image
                  src="/image/default-profile.jpg"
                  alt="Foto Profil"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              ),
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
                <ShowButton onClick={() => console.log("Show clicked", row)} />
                <EditButton onClick={() => console.log("Edit clicked", row)} />
                <DeleteButton
                  onClick={() => console.log("Delete clicked", row)}
                />
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

  return (
    <div className="overflow-x-auto">
      {/* Filter dan Search */}
      <div className="flex items-center space-x-4 mb-4">
        <FilterDropdown value={filter} onChange={setFilter} />
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
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full">
      {/* Ikon Search */}
      <img
        src="/icons/dashboard/search.svg"
        alt="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
      />
    </div>
  );
}


function FilterDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg"
    >
      <option value="">Filter</option>
      <option value="L">Laki-laki</option>
      <option value="P">Perempuan</option>
    </select>
  );
}
