"use client";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";
import TableHead from "../dashboard/table/table-head";
import TableBody from "../dashboard/table/table-body";
import Pagination from "../dashboard/table/pagenation";
import { DeleteButton } from "../dashboard/table/button/button";
import Modal from "../modals/modal";
import Image from "next/image";

// Fetcher function
const fetcher = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "ngrok-skip-browser-warning": "69420",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export default function AddCategoryModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
    per_page: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk kontrol modal konfirmasi
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Menyimpan ID kategori yang akan dihapus

  useEffect(() => {
    if (isOpen) fetchCategories(currentPage);
  }, [isOpen, currentPage]);

  const fetchCategories = async (page) => {
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/article/categories?page=${page}`
      );
      setCategories(response.data.data || []);
      setPagination(response.data || pagination);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      setCategories([]); // Fallback jika terjadi error
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    setLoading(true);
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/article/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ name: newCategory }),
        }
      );

      if (response.success) {
        fetchCategories(currentPage);
        setNewCategory("");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error adding category:", error.message);
      alert("Failed to add category.");
    }
    setLoading(false);
  };

  // Fungsi untuk membuka modal konfirmasi
  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setIsModalOpen(true); // Menampilkan modal konfirmasi
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/article/categories/${categoryToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.success) {
        fetchCategories(currentPage); // Refresh daftar kategori
        setIsModalOpen(false); // Menutup modal setelah hapus berhasil
      } else {
        alert(response.message || "Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Gagal menghapus data:", error.message);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  // Fungsi untuk membatalkan penghapusan
  const cancelDelete = () => {
    setCategoryToDelete(null);
    setIsModalOpen(false); // Menutup modal konfirmasi
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tableheads = ["No", "Nama Kategori", "Tindakan"];

  const columns = [
    {
      key: "no",
      render: (_, __, index) =>
        index + 1 + (currentPage - 1) * (pagination.per_page || 10),
    },
    { key: "name" },
    {
      key: "actions",
      render: (_, row) => (
        <DeleteButton onClick={() => handleDeleteCategory(row.id)} />
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-[60%] h-auto max-h-[90vh] overflow-y-auto zoom-fade-in`}
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-primary p-4 rounded-t-md">
          <div className="py-1">
            <h2 className="text-whitebg text-m font-semibold">
              Pengaturan Kategori
            </h2>
            <p className="text-s font-light text-whitebg">Masukan Kategori</p>
          </div>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold focus:outline-none"
          >
            X
          </button>
        </div>

        {/* Input Section */}
        <div className="p-4 bg-white">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Tuliskan Nama Kategori Tambahan"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 border p-2 rounded-md text-gray-700 text-s"
            />
            <button
              onClick={handleAddCategory}
              disabled={loading}
              className="px-6 py-2 text-white bg-primary rounded-lg flex items-center space-x-2 hover:bg-primarydark"
            >
              <Image
                src="/icons/dashboard/add-data.svg"
                alt="Tambah"
                width={16} height={16}
              />
              <span>{loading ? "Menambah..." : "Tambahkan"}</span>
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse text-center text-sm bg-primarylight2">
            <TableHead heads={tableheads} />
            <TableBody rows={categories} columns={columns} />
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pagination?.current_page || 1} // Tambahkan fallback
          totalPages={pagination?.last_page || 1} // Tambahkan fallback
          onPageChange={handlePageChange}
          nextPageUrl={pagination?.next_page_url}
          prevPageUrl={pagination?.prev_page_url}
        />

        {/* Footer */}
        <div className="p-4 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Delete */}
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
