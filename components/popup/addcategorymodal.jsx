"use client"
import { useState, useEffect } from "react";
import Modal from "../modals/modal";
import { getAllCategories, deleteCategory, addCategory } from "@/api/manage-artikel";
import TableHead from "../dashboard/table/table-head";
import TableBody from "../dashboard/table/table-body";

export default function AddCategoryModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all categories on modal open
  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  const fetchCategories = async () => {
    const response = await getAllCategories();
    if (response.success) setCategories(response.data);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    setLoading(true);
    const response = await addCategory({ category_name: newCategory });

    if (response.success) {
      fetchCategories();
      setNewCategory("");
    } else {
      alert(response.message);
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    const response = await deleteCategory(id);

    if (response.success) {
      fetchCategories();
    } else {
      alert(response.message);
    }
  };

  const tableheads = ["No", "Nama Kategori", "Tindakan"];


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-md shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center bg-orange-500 p-4 rounded-t-md">
          <h2 className="text-white text-lg font-semibold">Pengaturan Kategori</h2>
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
              className="flex-1 border p-2 rounded-md text-gray-700"
            />
            <button
              onClick={handleAddCategory}
              disabled={loading}
              className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            >
              {loading ? "Menambah..." : "Tambah"}
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse text-center text-sm">
            <TableHead heads={tableheads}/>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category.id}
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200"
                >
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{category.category_name}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 border border-red-500 rounded p-1 hover:bg-red-500 hover:text-white"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-gray-500">
                    Tidak ada kategori tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}
