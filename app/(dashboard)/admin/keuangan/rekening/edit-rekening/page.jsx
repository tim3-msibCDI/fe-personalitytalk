"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getPaymentMethodDetails } from "@/api/manage-keuangan";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import PaymentForm from "@/components/dashboard/form/paymentform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function EditPaymentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch payment method data
  useEffect(() => {
    const fetchPaymentData = async () => {
      if (id) {
        try {
          const { success, data, message } = await getPaymentMethodDetails(id);
          if (success) {
            const dataRek = data.data;
            setPaymentData(dataRek);
          } else {
            console.error("Error fetching payment method detail:", message);
          }
        } catch (error) {
          console.error("Error fetching payment data:", error);
        } finally {
          setLoading(false); // Finish loading
        }
      }
    };

    fetchPaymentData();
  }, [id]);

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

  // Error if no payment data is found
  if (!paymentData) {
    return <p>Data rekening tidak ditemukan.</p>;
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper */}
      <div className="p-6">
        {/* PaymentForm for editing payment method data */}
        <PaymentForm isEditMode={true} paymentData={paymentData} />
      </div>
    </>
  );
}
