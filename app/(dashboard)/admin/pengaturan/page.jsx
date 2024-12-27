"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminProfile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = getToken();
      if (!token) {
        alert("Anda perlu login untuk mengakses halaman ini.");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/profile/detail`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setAdminData(data.data);
            setFormData(data.data);
          } else {
            console.error("Failed to fetch admin profile:", data.message);
          }
        } else {
          const errorText = await response.text();
          console.error("Error fetching admin profile:", errorText);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    if (!adminData) {
      fetchAdminProfile();
    }
  }, [adminData, router]);

  if (!adminData) return <SkeletonTable />; // Loading state

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormData(adminData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/profile/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const data = await response.json();
      if (data.success) {
        setAdminData(dataToSend);
        setIsEditing(false);

        // Update LocalStorage
        localStorage.setItem("userName", formData.name);
        localStorage.setItem("userPhoto", formData.photo_profile);

        alert("Profil berhasil diperbarui!");
        window.location.reload(); // Reload page to reflect updated data
      } else {
        console.error("Failed to update profile:", data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start">
        <h3 className="text-h3 font-semibold pb-3">Biodata Admin</h3>
        {!isEditing && (
          <button
            className="inline-flex bg-primary text-white px-6 py-2 rounded-lg hover:bg-hover"
            onClick={toggleEdit}
          >
            <Image
              src="/image/icons/pencil-white.svg"
              width={20}
              height={20}
              alt="Edit Icon"
              className="mr-2"
            />
            Edit Biodata
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md p-2 border border-textcolor"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full border rounded-md p-2 border-textcolor"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nomor Telepon
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full border rounded-md p-2 border-textcolor"
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              onClick={() => setIsEditing(false)}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-hover"
            >
              Simpan
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
