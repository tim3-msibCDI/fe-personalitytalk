"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SkeletonTable } from "../dashboard/table/skeleton-table";
import Link from "next/link";

export default function Artikel() {
  const router = useRouter();

  const [articles, setArticles] = useState([]); // State untuk menyimpan data artikel
  const [loading, setLoading] = useState(true); // State untuk memantau loading state
  const [error, setError] = useState(null); // State untuk memantau error

  useEffect(() => {
    // Fungsi untuk fetch data artikel
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/landing-page/articles/recommendation`,
          {
            method: "GET",
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const result = await response.json();

        if (result.success) {
          setArticles(result.data);
        } else {
          throw new Error(result.message || "Gagal mengambil data artikel");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section id="artikel" className="mb-20">
        <div className="flex justify-center items-center h-64">
          <SkeletonTable/>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="artikel" className="mb-20">
        <div className="flex justify-center items-center h-64">
          <p className="text-m text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="artikel" className="mb-20">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-h1 text-textcolor font-bold">Artikel</h1>
        <p className="text-m text-textcolor text-center mt-2">
          Menyediakan berbagai informasi berkaitan dengan Psikologi dan
          Kehidupan sehari-hari yang terbaru
        </p>
      </div>
      {/* Card Artikel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-20">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/article/${item.article_title
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            passHref
          >
            <div className="bg-primarylight2 rounded-lg shadow-md p-4 cursor-pointer flex flex-col h-full">
              <div className="w-full h-56 overflow-hidden rounded-t-lg relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.article_img}`}
                  alt={item.article_title || "Gambar artikel"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="py-4 flex flex-col flex-grow">
                <h5
                  className="text-m font-bold text-textcolor truncate"
                  title={item.article_title}
                >
                  {item.article_title || "Judul Artikel"}
                </h5>
                <p className="text-s text-textcolor mt-2">
                  {item.publication_date || "Tanggal tidak tersedia"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/article")}
          className="flex items-center bg-primary text-h3 text-white py-2 px-4 rounded-md"
        >
          Lihat Artikel Lainnya
          <Image
            src="/image/icons/arrow.png"
            alt="Arrow"
            width={15}
            height={15}
            className="ml-2"
          />
        </button>
      </div>
    </section>
  );
}
