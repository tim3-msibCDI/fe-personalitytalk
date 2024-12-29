"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modals/modal";
import Image from "next/image";
import { addDisease, editDisease } from "@/api/manage-artikel";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

export default function DiseaseForm({
  isEditMode = false,
  isAddMode = false,
  diseaseData,
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [disease_img, setDiseaseImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (diseaseData) {
      setName(diseaseData.disease_name || "");
      setContent(diseaseData.content || "");

      const linkPhoto =
        diseaseData.disease_img && diseaseData.disease_img.startsWith("http")
          ? diseaseData.disease_img
          : diseaseData.disease_img
          ? `${API_REAL}/${diseaseData.disease_img}`
          : "/image/upload_picture_long.png";

      setPreviewImage(linkPhoto);
      setDiseaseImg(linkPhoto); // Atur preview untuk gambar penyakit
    }
  }, [diseaseData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDiseaseImg(file);
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
        formData.append("disease_name", name);
        formData.append("content", content);
        formData.append("admin_id", 1); // Admin ID otomatis

        if (disease_img instanceof File) {
          formData.append("disease_img", disease_img);
        }
        response = await addDisease(formData);
        setMessageType("success");
        setMessage(response.message || "Penyakit berhasil ditambahkan");
      }

      if (isEditMode && diseaseData?.id) {
        const updatedData = {
          disease_name: name,
          content: content,
        };

        Object.keys(updatedData).forEach((key) => {
          if (updatedData[key] === diseaseData[key]) {
            delete updatedData[key]; // Hapus key yang tidak berubah
          }
        });

        if (disease_img instanceof File) {
          const formData = new FormData();
          Object.entries(updatedData).forEach(([key, value]) =>
            formData.append(key, value)
          );
          formData.append("disease_img", disease_img);

          response = await editDisease(diseaseData.id, formData);
        } else {
          response = await editDisease(diseaseData.id, updatedData);
        }
        setMessageType("success");
        setMessage(response.message || "Penyakit berhasil diubah");
      }

      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/admin/artikel/informasi-kesehatan");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat memproses data penyakit";
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
                Nama Penyakit
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan Nama Penyakit"
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Textarea for Content */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi Penyakit
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
            placeholder="Masukkan deskripsi panjang informasi penyakit..."
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
