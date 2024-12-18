"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modals/modal";
import { addArticle, editArticle } from "@/api/manage-dashboard";

const API_REAL = process.env.NEXT_PUBLIC_API_URL2;

export default function ArticleForm({
  isEditMode = false,
  isAddMode = false,
  isViewMode = false,
  articleData,
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [reviewedBy, setReviewedBy] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [img, setImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (articleData) {
      setTitle(articleData.title || "");
      setCategory(articleData.category || "");
      setReviewedBy(articleData.reviewedBy || "");
      setLongDescription(articleData.longDescription || "");

      const linkImage =
        articleData.img && articleData.img.startsWith("http")
          ? articleData.img
          : articleData.img
          ? `${API_REAL}${articleData.img}`
          : "/image/default-placeholder.png";

      setImg(linkImage);
      setPreviewImage(linkImage);
    }
  }, [articleData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setImg(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      category,
      reviewedBy,
      longDescription,
      img,
    };

    setLoading(true);
    try {
      let response;
      if (isAddMode) {
        response = await addArticle(formData);
        setMessage(response.message || "Artikel berhasil ditambahkan.");
      } else if (isEditMode) {
        response = await editArticle(articleData.id, formData);
        setMessage(response.message || "Artikel berhasil diperbarui.");
      } else {
        setMessage("Tidak ada perubahan.");
        return;
      }

      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/admin/articles");
      }, 3000);
    } catch (error) {
      setMessage(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 bg-primarylight2 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          {/* Image Upload */}
          <div>
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={previewImage || "/image/upload_picture_long.png"}
                alt="Preview"
                className="object-cover h-full w-full"
              />
            </div>
            {!isViewMode && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pilih File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm file:py-1 file:px-3 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>
            )}
          </div>

          {/* Right Side Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Judul Artikel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan Judul Artikel"
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option value="" disabled>
                  Pilih Kategori Artikel
                </option>
                <option value="Berita">Berita</option>
                <option value="Opini">Opini</option>
                <option value="Tutorial">Tutorial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ditinjau Oleh
              </label>
              <input
                type="text"
                value={reviewedBy}
                onChange={(e) => setReviewedBy(e.target.value)}
                placeholder="Masukkan nama peninjau"
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi Panjang
          </label>
          <textarea
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="Tuliskan Isi Artikel"
            rows="8"
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Simpan"}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 text-center">
          <img
            src="/icons/dashboard/sucess.svg"
            width={100}
            height={100}
            alt="success"
            className="mx-auto"
          />
          <h2 className="mt-4 text-lg font-semibold text-gray-700">
            {isAddMode
              ? "Artikel Berhasil Ditambahkan!"
              : "Artikel Berhasil Diperbarui!"}
          </h2>
        </div>
      </Modal>
    </>
  );
}
