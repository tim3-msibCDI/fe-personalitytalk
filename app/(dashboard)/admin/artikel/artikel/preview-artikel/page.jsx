"use client";

import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getArticleDetail } from "@/api/manage-artikel";
import Image from "next/image";

const API_REAL = process.env.NEXT_PUBLIC_API_URL2;

export default function PreviewArtikelPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (id) {
        const { success, data, message } = await getArticleDetail(id);
        if (success) {
          const dataArticle = data.data;
          setArticleData(dataArticle);
        } else {
          console.error("Error fetching article detail:", message);
        }
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!articleData) {
    return <div>No article data found</div>;
  }

  const photoPreview =
    articleData.article_img && articleData.article_img.startsWith("http")
      ? articleData.article_img
      : articleData.article_img
      ? `${API_REAL}${articleData.article_img}`
      : "/image/default-profile.jpg";

  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <div className="text-m font-normal">{articleData.category}</div>
        <h1 className="text-h1 font-semibold mb-1">
          {articleData.article_title}
        </h1>
        <div className="my-1 text-vs">{articleData.publication_date}</div>
        <div className="my-1 text-vs">
          <span className="font-semibold text-vs">Ditinjau Oleh: </span>
          {articleData.publisher_name}
        </div>
        {photoPreview && (
          <div className="mb-4">
            <Image
              src={photoPreview}
              alt="Article Image"
              width={600}
              height={300}
              className="rounded-md"
            />
          </div>
        )}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: articleData.content }}
        />
      </div>
    </>
  );
}
