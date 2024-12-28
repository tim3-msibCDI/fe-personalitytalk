"use client";

import useSWR from "swr";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SkeletonTable } from "./skeleton-table";
import TableHead from "./table-head";
import TableBody from "./table-body";
import { getToken } from "@/lib/auth";
import Modal from "@/components/modals/modal";
import KeluhanPsikolog from "@/components/popup/keluhan-psikolog";
import InformasiTransaksi from "@/components/popup/info-transaksi";
import Image from "next/image";
import TerimaPembayaran from "@/components/popup/terima-bayar";
import Filter from "./filter";
import SearchBar from "./search-bar";
import Link from "next/link";
import KonsulBelumMulai from "@/components/popup/konsul-belum-mulai";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async (url) => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
};

const getStatusClass = (status) => {
  switch (status) {
    case "scheduled":
      return "bg-primary text-white text-s font-semibold";
    case "ongoing":
      return "bg-wait text-white text-s font-semibold";
    case "completed":
      return "bg-success text-white text-s font-semibold";
    default:
      return "";
  }
};

export default function TablePsikolog() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAscending, setIsAscending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  let searchPlaceholder = "Cari Data";
  const apiEndpoint =
    pathname === "/psikolog/transaksi"
      ? `${API_URL}/psikolog/transactions?page=${currentPage}`
      : `${API_URL}/psikolog/consultations?page=${currentPage}`;

  const { data, error } = useSWR(apiEndpoint, fetcher);

  if (error && error.message === "Unauthorized") {
    router.push("/login");
    return null;
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <SkeletonTable />;

  let transactions = data.data.data;

  const isTransactionPage = pathname === "/psikolog/transaksi";

  transactions = transactions
    .filter((item) => item.status !== "pending" && item.status !== "failed")
    .sort((a, b) => {
      // Sorting berdasarkan index asli
      if (isAscending) return a.id - b.id;
      return b.id - a.id;
    })
    .map((item, index) => ({
      ...item,
      number: isAscending ? index + 1 : transactions.length - index,
    }));

  const openModal = (complaint) => {
    console.log("Complaint data:", complaint); // Debugging log
    setCurrentComplaint(complaint);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentComplaint(null);
  };

  const openInformationModal = () => {
    setIsInformationModalOpen(true); // Buka modal informasi
  };

  const closeInformationModal = () => {
    setIsInformationModalOpen(false); // Tutup modal informasi
  };

  const openCheckModal = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setIsCheckModalOpen(true); // Buka modal informasi
  };

  const closeCheckModal = () => {
    setIsCheckModalOpen(false); // Tutup modal informasi
    setSelectedTransactionId(null);
  };

  // Fungsi untuk reload halaman
  const reloadPage = () => {
    if (typeof window !== "undefined") {
      window.location.reload(); // Reload seluruh halaman
    } else {
      router.replace(router.asPath || "/"); // Fallback ke root jika path tidak valid
    }
  };

  const tableHead = isTransactionPage
    ? [
      <div key="nomor" className="flex items-center justify-center gap-1">
        Nomor
        <button
          onClick={() => setIsAscending((prev) => !prev)}
          className="text-sm"
        >
          {isAscending ? "▲" : "▼"}
        </button>
      </div>,
      "Nama Klien",
      "Waktu Bayar",
      "Komisi",
      "Bukti Bayar",
      "Status",
      "Konfirmasi",
    ]
    : [
      <div key="nomor" className="flex items-center justify-center gap-1">
        Nomor
        <button
          onClick={() => setIsAscending((prev) => !prev)}
          className="text-sm"
        >
          {isAscending ? "▲" : "▼"}
        </button>
      </div>,
      "Nama Klien",
      "Topik",
      "Tanggal dan Waktu",
      "Status",
      "Tindakan",
    ];

  const columns = isTransactionPage
    ? [
      { key: "number" },
      { key: "client_name" },
      { key: "payment_date" },
      {
        key: "psikolog_comission",
        render: (value) => `Rp ${value.toLocaleString("id-ID")}`,
      },
      {
        key: "commission_transfer_proof",
        render: (proof) =>
          proof ? (
            <div className="flex justify-center">
              <Link
                href={`${process.env.NEXT_PUBLIC_IMG_URL}/${proof}`}
                passHref
                legacyBehavior
              >
                <a target="_blank" rel="noopener noreferrer">
                  <div className="w-full h-12 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}/${proof}`}
                      alt="Bukti Transfer"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </a>
              </Link>
            </div>
          ) : (
            "Tidak Ada"
          ),
      },
      { key: "commission_transfer_status" },
      {
        key: "confirm",
        render: (value, row) => (
          <div className="flex justify-center gap-2">
            {row.commission_transfer_status !== "Diterima" && (
              <>
                <button
                  className="bg-iconcheck p-2 rounded-lg"
                  onClick={() => openCheckModal(row.id)}
                >
                  <Image
                    src="/image/icons/psikolog/checklist.svg"
                    alt="Icon Checklist"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                  className="bg-iconinfo p-2 rounded-lg"
                  onClick={openInformationModal}
                >
                  <Image
                    src="/image/icons/psikolog/information.svg"
                    alt="Icon Informasi"
                    width={24}
                    height={24}
                  />
                </button>
              </>
            )}
          </div>
        ),
      },
    ]
    : [
      { key: "number" },
      { key: "client_name" },
      { key: "topic" },
      {
        key: "date",
        render: (value, row) => (
          <div className="flex flex-col">
            <span>{value}</span>
            <span>{`${row.start_hour}-${row.end_hour}`}</span>
          </div>
        ),
      },
      {
        key: "status",
        render: (status) => {
          let text = "";
          switch (status) {
            case "scheduled":
              text = "Dijadwalkan";
              break;
            case "ongoing":
              text = "Sedang Berlangsung";
              break;
            case "completed":
              text = "Selesai";
              break;
            default:
              text = "";
          }
          return (
            <span
              className={`px-3 py-2 rounded-md ${getStatusClass(status)}`}
            >
              {text}
            </span>
          );
        },
      },
      {
        key: "actions",
        render: (value, row) => (
          <div className="flex flex-col gap-2 py-1 px-10 items-center">
            <button
              onClick={() =>
                navigateToChat(
                  row.consul_id,
                  row.chat_session_id,
                  row.client_id,
                  row.psikolog_id,
                  row.status
                )
              }
              className="flex items-center justify-center gap-2 px-2 py-1 w-full bg-primary text-white text-s rounded-md"
            >
              <Image
                src="/image/icons/konsultasi.png"
                alt="Chat Icon"
                width={16}
                height={16}
              />
              Chat Client
            </button>
            <button
              className="flex items-center justify-center gap-2 px-2 py-1 w-full border border-primary text-primary text-s rounded-md"
              onClick={() => openModal(row.keluhan)}
            >
              <Image
                src="/image/icons/catatan.png"
                alt="Complaint Icon"
                width={16}
                height={16}
              />
              Lihat Keluhan
            </button>
          </div>
        ),
      },
    ];

  const maxVisiblePages = 5;
  const totalPages = data.data.last_page;
  const pageGroup = Math.floor((currentPage - 1) / maxVisiblePages);

  const getVisiblePages = () => {
    const startPage = pageGroup * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handlePagination = (direction) => {
    if (direction === "next" && data.data.next_page_url) {
      setCurrentPage((prev) => prev + 1);
    }
    if (direction === "previous" && data.data.prev_page_url) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPageGroup = () => {
    const nextGroupPage = (pageGroup + 1) * maxVisiblePages + 1;
    if (nextGroupPage <= totalPages) {
      setCurrentPage(nextGroupPage);
    }
  };

  const prevPageGroup = () => {
    const prevGroupPage = pageGroup * maxVisiblePages;
    if (prevGroupPage > 0) {
      setCurrentPage(prevGroupPage);
    }
  };

  // Tentukan opsi filter berdasarkan halaman
  const filterOptions =
    pathname === "/psikolog/chat"
      ? [
        { value: "scheduled", label: "Dijadwalkan" },
        { value: "ongoing", label: "Sedang Berlangsung" },
        { value: "completed", label: "Selesai" },
      ]
      : pathname === "/psikolog/transaksi"
        ? [
          { value: "pending", label: "Menunggu Konfirmasi" },
          { value: "completed", label: "Diterima" },
        ]
        : [];

  const navigateToChat = (
    consulId,
    chatSessionId,
    clientId,
    senderId,
    chatStatus
  ) => {
    localStorage.setItem(
      "psikologChatData",
      JSON.stringify({
        consulId,
        chatSessionId,
        clientId,
        senderId,
        chatStatus,
      })
    );
    router.push(`/psikolog/chat/${chatSessionId}`);
  };

  return (
    <div className="overflow-x-auto">
      {/* Filter dan Search */}
      <div className="flex items-center space-x-4 mb-4">
        <Filter
          options={filterOptions} // Mengirim data filter yang sesuai halaman
          selectedOption={filter}
          onChange={(value) => setFilter(value)} // Mengubah filter state
        />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={searchPlaceholder}
        />
      </div>
      {/* Tabel */}
      <table className="w-full min-w-max bg-primarylight2 border border-text2 text-center text-s">
        <TableHead heads={tableHead} />
        <TableBody rows={transactions} columns={columns} />
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 mb-10">
          {pageGroup > 0 && (
            <button
              className="px-3 mx-2 border border-primary"
              onClick={prevPageGroup}
            >
              <Image
                src="/image/icons/arrow_left.png"
                alt="Previous Page"
                width={20}
                height={20}
              />
            </button>
          )}
          {getVisiblePages().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 mx-2 ${pageNumber === currentPage
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
              <Image
                src="/image/icons/arrow_right.png"
                alt="Next Page"
                width={20}
                height={20}
              />
            </button>
          )}
        </div>
      )}
      {/* Modal Complain */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <KeluhanPsikolog onClose={closeModal} keluhan={currentComplaint} />
      </Modal>

      {/* Modal Informasi */}
      <Modal isOpen={isInformationModalOpen} onClose={closeInformationModal}>
        <InformasiTransaksi onClose={closeInformationModal} />
      </Modal>

      {/* Modal Terima */}
      <Modal isOpen={isCheckModalOpen} onClose={closeCheckModal}>
        <TerimaPembayaran
          onClose={closeCheckModal}
          transactionId={selectedTransactionId}
          onReload={reloadPage}
        />
      </Modal>
    </div>
  );
}