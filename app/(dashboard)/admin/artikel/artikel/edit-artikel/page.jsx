"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getArticleDetail, editArticle } from "@/api/manage-artikel";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import ArticleForm from "@/components/dashboard/form/artikelform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function EditArticlePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Ambil ID artikel dari query parameter
  const router = useRouter();

  const [articleData, setArticleData] = useState(null); // State untuk data artikel
  const [loading, setLoading] = useState(true); // State untuk loading

  // Fetch data artikel
  useEffect(() => {
    const fetchArticleData = async () => {
      if (id) {
        try {
          const response = await getArticleDetail(id);
          const { success, data, message } = response;

          if (success) {
            const dataArtikel = data.data;
            console.log(dataArtikel);
            setArticleData(dataArtikel);
          } else {
            console.error("Error fetching article detail:", message);
          }
        } catch (error) {
          console.error("Error fetching article data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticleData();
  }, [id]);

  // Handle update artikel
  const handleArticleUpdate = async (updatedData) => {
    setLoading(true);
    try {
      const response = await editArticle(id, updatedData); // Gunakan API edit artikel
      if (response.success) {
        // Jika berhasil, perbarui state lokal
        setArticleData(updatedData);
        setLoading(false);
        router.push("/admin/artikel/artikel"); // Redirect ke daftar artikel
      } else {
        console.error("Error updating article data:", response.message);
      }
    } catch (error) {
      console.error("Error updating article data:", error);
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        {/* HeaderAdmin Layout */}
        <HeaderAdmin />

        {/* Wrapper Utama */}
        <div className="p-6">
          <SkeletonTable />
        </div>
      </>
    );
  }

  // Jika data artikel tidak ditemukan
  if (!articleData) {
    return <p>Data artikel tidak ditemukan.</p>;
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Wrapper Utama */}
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          {/* Gunakan ArticleForm */}
          <ArticleForm
            isEditMode={true} // Mode edit
            articleData={articleData} // Data artikel yang akan di-edit
            onUpdate={handleArticleUpdate} // Handler untuk update
          />
        </div>
      </div>
    </>
  );
}
