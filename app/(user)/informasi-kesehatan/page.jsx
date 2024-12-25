"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Informasi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const [diseases, setDiseases] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 45;
  const itemsPerColumn = 15;
  const maxVisiblePages = 3;

  const router = useRouter();

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/diseases?page=${currentPage}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setDiseases(data.data.data);
          setTotalPages(data.data.last_page);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDiseases();
  }, [currentPage]);

  const filteredDiseases = diseases
    .filter((item) =>
      item.disease_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.disease_name.localeCompare(b.disease_name));

  const columns = [[], [], []];
  filteredDiseases.forEach((item, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn);
    if (columnIndex < 3) {
      columns[columnIndex].push(item);
    }
  });

  const getVisiblePages = () => {
    const start = pageGroup * maxVisiblePages;
    const end = Math.min(start + maxVisiblePages, totalPages);
    const pages = [];
    for (let i = start + 1; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const nextPageGroup = () => {
    if ((pageGroup + 1) * maxVisiblePages < totalPages) {
      setPageGroup(pageGroup + 1);
    }
  };

  const prevPageGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  const handleDiseaseClick = (id, name) => {
    // Simpan ID ke localStorage
    localStorage.setItem("diseaseId", id);
    // Navigasi ke halaman detail
    router.push(
      `/informasi-kesehatan/${encodeURIComponent(name.replace(/\s+/g, "-"))}`
    );
  };

  return (
    <section>
      <div className="px-8 py-4">
        <div className="relative flex ml-52 mr-52 mt-10 mb-12">
          <input
            type="search"
            className="relative m-0 -me-0.5 block flex-auto rounded-s-md border border-solid border-primary bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none placeholder:textsec"
            placeholder="Cari Informasi Penyakit"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="z-[2] inline-block rounded-e-md border-2 bg-primary border-primary px-6 pb-[6px] pt-2 font-medium text-white"
            type="button"
          >
            Cari
          </button>
        </div>
        <div className="grid grid-cols-3 gap-32 ml-4 lg:ml-8 mr-4 lg:mr-8 px-7">
          {columns.map((column, colIndex) => (
            <div key={colIndex}>
              {column.map((item, index) => (
                <div
                  key={index}
                  className="py-2 cursor-pointer"
                  onClick={() => handleDiseaseClick(item.id, item.disease_name)}
                >
                  <span className="text-blue-500 hover:underline">
                    {item.disease_name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 mb-10">
            {pageGroup > 0 && (
              <button
                className="px-3 mx-2 border border-primary"
                onClick={prevPageGroup}
              >
                <img
                  src="/image/icons/arrow_left.png"
                  alt="Previous Page"
                  className="w-5"
                />
              </button>
            )}
            {getVisiblePages().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-4 py-2 mx-2 ${
                  pageNumber === currentPage
                    ? "bg-primary text-white"
                    : "border border-primary text-primary"
                }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            {(pageGroup + 1) * maxVisiblePages < totalPages && (
              <button
                className="px-3 mx-2 border border-primary"
                onClick={nextPageGroup}
              >
                <img
                  src="/image/icons/arrow_right.png"
                  alt="Next Page"
                  className="w-5"
                />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
