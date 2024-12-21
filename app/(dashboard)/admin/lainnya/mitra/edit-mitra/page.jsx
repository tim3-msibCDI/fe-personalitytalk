"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPartnerDetail, editPartner } from "@/api/manage-dashboard";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import PartnerForm from "@/components/dashboard/form/mitraform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function EditMitraPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [mitraData, setMitraData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch mitra data
  useEffect(() => {
    const fetchMitraData = async () => {
      if (id) {
        try {
          const { success, data, message } = await getPartnerDetail(id); // Use the mitra API
          if (success) {
            const dataMitra = data.data;
            setMitraData(dataMitra); // Set the mitra data
          } else {
            console.error("Error fetching mitra detail:", message);
          }
        } catch (error) {
          console.error("Error fetching mitra data:", error);
        } finally {
          setLoading(false); // Finish loading
        }
      }
    };

    fetchMitraData();
  }, [id]);

  // Handle partner data update after editing
  const handlePartnerUpdate = async (updatedData) => {
    setLoading(true);
    try {
      const response = await editPartner(id, updatedData);
      if (response.success) {
        // If update is successful, update the local data and reflect changes
        setMitraData(updatedData);
        // Optionally, you can re-fetch data here instead of updating manually
        setLoading(false);
        router.push("/admin/lainnya/mitra"); // Redirect to the partner list page after success
      } else {
        console.error("Error updating mitra data:", response.message);
      }
    } catch (error) {
      console.error("Error updating mitra data:", error);
      setLoading(false);
    }
  };

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

  // Error if no mitra data is found
  if (!mitraData) {
    return <p>Data mitra tidak ditemukan.</p>;
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper */}
      <div className="p-6">
        {/* MitraForm for editing mitra data */}
        <div className="bg-primarylight2 p-6 rounded-lg">
          <PartnerForm
            isEditMode={true}
            partnerData={mitraData}
            onUpdate={handlePartnerUpdate} // Pass the update handler
          />
        </div>
      </div>
    </>
  );
}
