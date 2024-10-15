"use client";

import { useState } from 'react';
import { penyakit } from '@/constants';
import Link from 'next/link';

export default function Informasi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const itemsPerPage = 45;
  const itemsPerColumn = 15;
  const maxVisiblePages = 3;

  const filteredPenyakit = penyakit
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPenyakit.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPenyakit.length / itemsPerPage);

  const columns = [[], [], []];
  currentItems.forEach((item, index) => {
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

  return (
    <section>
      <div className="px-8 py-4">
        <div className="relative flex ml-52 mr-52 mt-10 mb-12">
          <input
            type="search"
            className="relative m-0 -me-0.5 block flex-auto rounded-s-md border border-solid border-primary bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none placeholder:textsec"
            placeholder="Cari Informasi Penyakit"
            aria-label="Search"
            id="exampleFormControlInput3"
            aria-describedby="button-addon3"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="z-[2] inline-block rounded-e-md border-2 bg-primary border-primary px-6 pb-[6px] pt-2 font-medium text-white"
            data-twe-ripple-init
            data-twe-ripple-color="white"
            type="button"
            id="button-addon3"
          >
            Cari
          </button>
        </div>
        <div className="grid grid-cols-3 gap-32 ml-20 mr-20">
          {columns.map((column, colIndex) => (
            <div key={colIndex}>
              {column.map((item, index) => (
                <div key={index} className="py-2">
                  <Link href={`/informasi-penyakit-mental/${encodeURIComponent(item.name.replace(/\s+/g, '-'))}`}>
                    <span className="text-blue-500 hover:underline">{item.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        {filteredPenyakit.length > itemsPerPage && (
          <div className="flex justify-center mt-6 mb-20">
            {pageGroup > 0 && (
              <button className="px-3 mx-2 border border-primary" onClick={prevPageGroup}>
                <img
                  src="/icons/arrow_left.png"
                  alt="Previous Page"
                  className="w-5"
                />
              </button>
            )}
            {getVisiblePages().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-4 py-2 mx-2 ${pageNumber === currentPage ? 'bg-primary text-white' : 'border border-primary text-primary'
                  }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            {(pageGroup + 1) * maxVisiblePages < totalPages && (
              <button className="px-3 mx-2 border border-primary" onClick={nextPageGroup}>
                <img
                  src="/icons/arrow_right.png"
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
