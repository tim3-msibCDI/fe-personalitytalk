"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "@/components/modals/modal";
import Image from "next/image";
import { editArticle, addArticle } from "@/api/manage-artikel";
import { getToken } from "@/lib/auth";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ArticleForm({
  isEditMode = false,
  isAddMode = false,
  articleData,
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [reviewedBy, setReviewedBy] = useState("");
  const [content, setContent] = useState("");
  const [article_img, setArticleImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
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
      setArticleImg(linkPhoto);
    }
  }, [articleData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/admin/article-categories`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
        formData.append("admin_id", 1);

        response = await addArticle(formData);
        setMessageType("success");
        setMessage(response.message || "Artikel berhasil ditambahkan");
      }

      if (isEditMode && articleData?.id) {
        const updatedData = {
          article_title: title,
          category_id: parseInt(category, 10),
          publication_date: new Date().toISOString().split("T")[0],
          content,
          publisher_name: reviewedBy,
        };

        if (article_img instanceof File) {
          const formData = new FormData();
          Object.entries(updatedData).forEach(([key, value]) =>
            formData.append(key, value)
          );
          formData.append("article_img", article_img);

          response = await editArticle(articleData.id, formData);
        } else {
          response = await editArticle(articleData.id, updatedData);
        }
        setMessageType("success");
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
      setMessageType("error");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 bg-primarylight2 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
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
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
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

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi Panjang
          </label>
          <SunEditor
            setOptions={{
              height: 800,
              buttonList: [
                ["bold", "italic", "underline", "strike"],
                ["font", "fontSize", "formatBlock"],
                ["align", "list", "table"],
                ["fontColor", "hiliteColor"],
                ["removeFormat"],
              ],
            }}
            setContents={content}
            onChange={(value) => setContent(value)}
            placeholder="Masukkan deskripsi panjang artikel"
          />
        </div>

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
          <Image
            src={`/image/icons/dashboard/${
              messageType === "error" ? "fail" : "sucess"
            }.svg`}
            width={150}
            height={150}
            alt={messageType === "error" ? "fail" : "success"}
            className="mx-auto"
          />
          <h2 className="text-h2 font-medium mt-4 text-textcolor">{message}</h2>
        </div>
      </Modal>
    </>
  );
}
