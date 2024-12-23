"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getUserDetail } from "@/api/manage-user";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import UserForm from "@/components/dashboard/form/userform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function EditPenggunaPage() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (id && isClient) {
        try {
          const { success, data, message } = await getUserDetail(id);
          if (success) {
            setUserData(data.data); // Set the user data
          } else {
            console.error("Error fetching user detail:", message);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // Finish loading
        }
      }
    };

    fetchUserData();
  }, [id, isClient]);

  // Loading state
  if (loading) {
    return (
      <>
        {/* HeaderAdmin Layout */}
        <HeaderAdmin />

        {/* Main Content Wrapper */}
        <div className="p-6">
          {/* Skeleton table while loading */}
          <SkeletonTable />
        </div>
      </>
    );
  }

  // Error if no user data is found
  if (!userData) {
    return <p>Data pengguna tidak ditemukan.</p>;
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper */}
      <div className="p-6">
        {/* UserForm for editing user data */}
        <UserForm
          isEditMode={true} // Enable edit mode
          userData={userData} // Send the fetched user data to the form
        />
      </div>
    </>
  );
}
