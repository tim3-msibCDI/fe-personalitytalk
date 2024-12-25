"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addPartner, editPartner } from "@/api/manage-dashboard";
import Modal from "@/components/modals/modal";
import Image from "next/image";

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

export default function PartnerForm({
  isEditMode = false,
  isAddMode = false,
  isViewMode = false,
  partnerData,
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null); // Changed from 'image' to 'img'
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (partnerData) {
      setName(partnerData.name || "");
      setDescription(partnerData.description || "");

      const linkImage =
        partnerData.img && partnerData.img.startsWith("http")
          ? partnerData.img // If the image URL is complete
          : partnerData.img
          ? `${API_REAL}/${partnerData.img}` // Add `API_REAL` if the image path does not start with "http"
          : "/image/default-profile.jpg"; // Use a default image if `img` is missing

      setImg(linkImage);
      setPreviewImage(linkImage); // Set image preview
    }
  }, [partnerData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file); // Set file to state
      setPreviewImage(URL.createObjectURL(file)); // Image preview
    } else {
      setImg(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the formData object
    const formData = {
      name,
      description,
      img, // Use 'img' instead of 'image'
    };

    const updatedData = {};

    if (partnerData) {
      // Check if the name field has changed
      if (formData.name !== partnerData.name) {
        updatedData.name = formData.name;
      }

      // Check if the description field has changed
      if (formData.description !== partnerData.description) {
        updatedData.description = formData.description;
      }

      // Check if the image has changed or if a new image was uploaded
      if (img && img !== partnerData.img) {
        updatedData.img = img; // Send the image file (or URL) if changed
      } else if (!img && partnerData.img) {
        delete updatedData.img; // Avoid sending an empty 'img' field if no image is selected
      }
    }

    setLoading(true);
    try {
      let response;
      if (isAddMode) {
        // Only send formData when adding a new partner
        response = await addPartner(formData);
        setMessage(response.message || "Mitra berhasil ditambahkan");
      } else if (isEditMode && Object.keys(updatedData).length > 0) {
        // For editing, only send the updated fields
        response = await editPartner(partnerData.id, updatedData);
        setMessage(response.message || "Data mitra berhasil diubah");
      } else {
        setMessage("Tidak ada perubahan untuk disimpan.");
        return;
      }

      // Show success modal
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/admin/lainnya/mitra"); // Redirect after modal closes
      }, 3000); // Close modal after 3 seconds
    } catch (error) {
      setMessage(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return name.trim() && description.trim() && img; // Ensure 'img' is not null or undefined
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto bg-primarylight2 rounded-lg"
      >
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <Image
              src={previewImage || "/image/upload_picture.png"}
              alt="Profile"
              width={275}
              height={275}
              className="rounded-lg"
            />
            {!isViewMode && (isEditMode || isAddMode) && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-textcolor">
                  Unggah Gambar Mitra
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-textcolor file:mr-4 file:py-1 file:px-4 file:border file:border-textcolor file:text-sm file:font-medium file:bg-whitebg file:text-textcolor hover:file:bg-primarydark"
                />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4 border-l border-text2 pl-6">
            <div>
              <label>Nama Mitra</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isAddMode && !isEditMode}
                placeholder={isAddMode ? "Masukkan nama mitra" : ""}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>Deskripsi Mitra</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isAddMode && !isEditMode}
                placeholder={
                  isAddMode ? "Masukkan deskripsi mitra yang diperlukan" : ""
                }
                rows="9" // Set height with number of rows
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
          </div>
        </div>
        {!isViewMode && (isEditMode || isAddMode) && (
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md disabled:bg-disable disabled:cursor-not-allowed"
              disabled={!isFormValid() || loading}
            >
              <Image
                src="/image/icons/dashboard/save.svg"
                width={20}
                height={20}
                alt="sv"
              />
              {loading
                ? "Memproses..."
                : isAddMode
                ? "Simpan Data"
                : "Simpan Perubahan"}
            </button>
          </div>
        )}
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 text-center">
          <div className="py-16">
            <Image
              src="/image/icons/dashboard/sucess.svg"
              width={150}
              height={150}
              alt="success"
              className="mx-auto"
            />
            <h2 className="mt-4 text-h2 font-medium text-textcolor text-center">
              {isAddMode
                ? "Mitra Berhasil Ditambahkan."
                : isEditMode
                ? "Data Mitra Berhasil Diubah."
                : "Operasi Berhasil"}
            </h2>
          </div>
        </div>
      </Modal>
    </>
  );
}
