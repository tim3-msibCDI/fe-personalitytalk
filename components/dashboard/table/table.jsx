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

  // Tentukan endpoint berdasarkan path
  let endpoint;
  if (pathname === "/admin/pengguna/umum") {
    endpoint = `/admin/users?page=${currentPage}`;
  } else if (pathname === "/admin/pengguna/mahasiswa") {
    endpoint = `/admin/mahasiswa?page=${currentPage}`;
  } else if (pathname === "/admin/psikolog/daftar-psikolog") {
    endpoint = `/admin/psikolog?page=${currentPage}`;
  } else if (pathname === "/admin/artikel/informasi-kesehatan") {
    endpoint = `/admin/diseases?page=${currentPage}`;
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
          "Nama Pengguna",
          "Nomor Telepon",
          "Tanggal Lahir",
          "Gender",
          "Foto Profil",
          "Tindakan",
        ]
      : pathname === "/admin/pengguna/mahasiswa"
      ? [
          "No",
          "Nama Pengguna",
          "No Telpon",
          "Universitas",
          "Prodi",
          "Foto Profil",
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
          { key: "name" },
          { key: "phone_number" },
          { key: "date_birth" },
          {
            key: "gender",
            render: (gender) => (gender === "M" ? "Laki-laki" : "Perempuan"),
          },
          {
            key: "photo_profile",
            render: (photo) =>
              photo ? (
                <Image
                  src={`${API_REAL}/${photo}`}
                  alt="Foto Profil"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <span>Tidak ada</span>
              ),
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
            key: "photo_profile",
            render: (photo) =>
              photo ? (
                <Image
                  src={`${API_REAL}/${photo}`}
                  alt="Foto Profil"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <span>Tidak ada</span>
              ),
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
            key: "photo_profile",
            render: (photo) =>
              photo ? (
                <Image
                  src={`${API_REAL}/${photo}`}
                  alt="Foto Profil"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <span>Tidak ada</span>
              ),
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
