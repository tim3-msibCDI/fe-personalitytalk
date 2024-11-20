"use client";

import useSWR from "swr";
import TableHead from "./table-head";
import TableBody from "./table-body";
import { getToken } from "@/lib/auth";
import { SkeletonTable } from "./skeleton-table";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 10; // Jumlah item per halaman

  // Tentukan endpoint berdasarkan path
  let endpoint;
  if (pathname === "/admin/artikel/artikel") {
    endpoint = "/admin/articles";
  } else if (pathname === "/admin/artikel/kategori-artikel") {
    endpoint = "/article/categories";
  } else if (pathname === "/admin/pengguna/umum") {
    endpoint = "/user/all";
  } else {
    endpoint = null;
  }

  // Ambil semua data tanpa pagination dari backend
  const { data, error } = useSWR(endpoint ? `${API_URL}${endpoint}` : null, fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <SkeletonTable />;

  // Pagination manual: potong data berdasarkan halaman saat ini
  const paginatedData = data.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tableHead =
    pathname === "/admin/artikel/artikel"
      ? ["No", "Judul Artikel", "Gambar", "Tindakan"]
      : pathname === "/admin/artikel/kategori-artikel"
      ? ["No", "Nama Kategori", "Tindakan"]
      : pathname === "/admin/pengguna/umum"
      ? ["No", "Nama Pengguna", "Email", "Tanggal Bergabung", "Tindakan"]
      : [];

  const columns =
    pathname === "/admin/artikel/artikel"
      ? [
          {
            key: "index",
            render: (_, __, index) =>
              (currentPage - 1) * itemsPerPage + index + 1,
          },
          { key: "article_title" },
          {
            key: "article_img",
            render: (img) => (
              <Image
                src={`${API_REAL}/${img}`}
                alt="Artikel"
                width={200}
                height={200}
                className="w-20 h-12 object-cover rounded"
              />
            ),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <button className="bg-green-300 px-2 py-1 rounded hover:bg-green-400 w-8 h-8">
                  <Image
                    src="/icons/dashboard/eye-green.svg"
                    width={15}
                    height={15}
                    alt="View"
                  />
                </button>
                <button className="bg-orange-300 px-2 py-1 rounded hover:bg-orange-400 w-8 h-8">
                  <Image
                    src="/icons/dashboard/edit-yellow.svg"
                    width={15}
                    height={15}
                    alt="Edit"
                  />
                </button>
                <button className="bg-red-300 px-2 py-1 rounded hover:bg-red-400 w-8 h-8">
                  <Image
                    src="/icons/dashboard/trash-red.svg"
                    width={15}
                    height={15}
                    alt="Delete"
                  />
                </button>
              </div>
            ),
          },
        ]
      : pathname === "/admin/artikel/kategori-artikel"
      ? [
          {
            key: "index",
            render: (_, __, index) =>
              (currentPage - 1) * itemsPerPage + index + 1,
          },
          { key: "name", render: (name) => <span>{name}</span> },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <button className="bg-green-300 px-2 py-1 rounded hover:bg-green-400 w-8 h-8">
                  <Image
                    src="/icons/dashboard/eye-green.svg"
                    width={15}
                    height={15}
                    alt="View"
                  />
                </button>
                <button className="bg-orange-300 px-2 py-1 rounded hover:bg-orange-400 w-8 h-8">
                  <Image
                    src="/icons/dashboard/edit-yellow.svg"
                    width={15}
                    height={15}
                    alt="Edit"
                  />
                </button>
                <button className="bg-red-300 px-2 py-1 rounded hover:bg-red-400 w-8 h-8">
                  <Image
                    src="/icons/dashboard/trash-red.svg"
                    width={15}
                    height={15}
                    alt="Delete"
                  />
                </button>
              </div>
            ),
          },
        ]
      : [];

  // Navigasi pagination
  const handleNext = () => {
    if (currentPage < Math.ceil(data.data.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max bg-primarylight2 border border-text2 text-center text-s">
        <TableHead heads={tableHead} />
        <TableBody rows={paginatedData} columns={columns} />
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(data.data.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(data.data.length / itemsPerPage)}
          className={`px-4 py-2 rounded ${
            currentPage === Math.ceil(data.data.length / itemsPerPage)
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
