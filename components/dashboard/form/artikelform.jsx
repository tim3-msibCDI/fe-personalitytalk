"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modals/modal";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS tema Quill
import { editArticle, addArticle } from "@/api/manage-artikel";

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

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
  const [content, setContent] = useState("");
  const [article_img, setArticleImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (articleData) {
      setTitle(articleData.article_title || "");
      setCategory(articleData.category || "");
      setReviewedBy(articleData.publisher_name || "");
      setContent(articleData.content || "");

      const linkPhoto =
        articleData.article_img && articleData.article_img.startsWith("http")
          ? articleData.article_img
          : articleData.article_img
          ? `${API_REAL}/${articleData.article_img}`
          : "/image/upload_picture_long.png";

      setPreviewImage(linkPhoto);
      setArticleImg(linkPhoto); // Atur preview untuk artikel image
    }
  }, [articleData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleImg(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let response;

      if (isAddMode) {
        // Penambahan data menggunakan FormData
        const formData = new FormData();
        formData.append("article_title", title);
        formData.append("category_id", parseInt(category, 10));
        formData.append(
          "publication_date",
          new Date().toISOString().split("T")[0]
        );
        formData.append("content", content);
        formData.append("publisher_name", reviewedBy);

        if (article_img instanceof File) {
          formData.append("article_img", article_img);
        }

        formData.append("admin_id", 1); // Admin ID otomatis

        response = await addArticle(formData); // Kirim FormData
        setMessage(response.message || "Artikel berhasil ditambahkan");
      }
      if (isEditMode && articleData?.id) {
        const updatedData = {
          article_title: title,
          category_id: parseInt(category, 10),
          publication_date: new Date().toISOString().split("T")[0],
          content: content,
          publisher_name: reviewedBy,
        };

        // Hanya tambahkan key yang diubah
        Object.keys(updatedData).forEach((key) => {
          if (updatedData[key] === articleData[key]) {
            delete updatedData[key]; // Hapus key yang tidak berubah
          }
        });

        if (article_img instanceof File) {
          // Jika ada file baru, gunakan FormData
          const formData = new FormData();
          Object.entries(updatedData).forEach(([key, value]) =>
            formData.append(key, value)
          );
          formData.append("article_img", article_img);

          response = await editArticle(articleData.id, formData);
        } else {
          // Kirim data JSON jika tidak ada file baru
          response = await editArticle(articleData.id, updatedData);
        }

        setMessage(response.message || "Artikel berhasil diubah");
      }

      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/admin/artikel/artikel");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat memproses artikel";
      setMessage(errorMessage);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 bg-primarylight2 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          {/* Image Upload */}
          <div>
            <div className="relative w-full h-56 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
              <Image
                src={previewImage || "/image/upload_picture.png"}
                alt="Preview"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Pilih File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
            </div>
          </div>

          {/* Input Fields */}
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
                onChange={(e) => setCategory(parseInt(e.target.value, 10))} // Konversi ke number
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option value="" disabled>
                  Pilih Kategori Artikel
                </option>
                <option value={1}>Teknologi</option>
                <option value={2}>Kesehatan</option>
                <option value={3}>Pendidikan</option>
                <option value={4}>Bisnis</option>
                <option value={5}>Hiburan</option>
                <option value={6}>Olahraga</option>
                <option value={7}>Travel</option>
                <option value={8}>Gaya Hidup</option>
                <option value={14}>Politik</option>
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

        {/* Rich Text Editor for Long Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi Panjang
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            formats={formats}
            modules={modules}
            placeholder="Tulis konten artikel di sini..."
            className="bg-white h-64 pb-10"
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 text-center">
          <h2 className="text-h2 font-medium text-textcolor">{message}</h2>
        </div>
      </Modal>
    </>
  );
}
