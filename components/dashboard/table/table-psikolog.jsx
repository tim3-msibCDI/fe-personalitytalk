"use client";

import useSWR from "swr";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SkeletonTable } from "./skeleton-table";
import TableHead from "./table-head";
import TableBody from "./table-body";
import { getToken } from "@/lib/auth";

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

export default function TablePsikolog() {
    const pathname = usePathname(); // Mendapatkan path saat ini
    const router = useRouter(); // Untuk navigasi
    const [currentPage, setCurrentPage] = useState(1);

    // Bangun URL API secara eksplisit
    const apiEndpoint = `${API_URL}/psikolog/transactions?page=${currentPage}`;

    const { data, error } = useSWR(apiEndpoint, fetcher);

    // Redirect ke login jika token tidak valid
    if (error && error.message === "Unauthorized") {
        router.push("/login");
        return null;
    }

    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <SkeletonTable />;

    const transactions = data.data.data; // Ambil data transaksi atau chat dari JSON

    // Konfigurasi Header dan Kolom Berdasarkan Path
    const isTransactionPage = pathname === "/psikolog/transaksi";

    const tableHead = isTransactionPage
        ? ["ID Konsultasi", "Nama Klien", "Komisi", "Waktu Bayar", "Bukti Bayar", "Status"]
        : ["ID Konsultasi", "Nama Klien", "Topik", "Tanggal dan Waktu", "Status", "Tindakan"];

    const columns = isTransactionPage
        ? [
            { key: "id" },
            { key: "client_name" },
            {
                key: "psikolog_comission",
                render: (value) => `Rp ${value.toLocaleString("id-ID")}`,
            },
            { key: "payment_date" },
            {
                key: "commission_transfer_proof",
                render: (proof) =>
                    proof ? (
                        <div className="flex justify-center">
                            <img
                                src={`https://1522-125-166-225-192.ngrok-free.app/${proof}`}
                                alt="Bukti Transfer"
                                className="w-auto h-10"
                            />
                        </div>
                    ) : (
                        "Tidak Ada"
                    ),
            },
            { key: "commission_transfer_status" },
        ]
        : [
            { key: "id" },
            { key: "client_name" },
            { key: "topic" },
            { key: "date_time" },
            { key: "status" },
            {
                key: "actions",
                render: () => (
                    <div className="flex gap-2">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded">Chat</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
                    </div>
                ),
            },
        ];

    // Navigasi Pagination
    const handlePagination = (direction) => {
        if (direction === "next" && data.data.next_page_url) {
            setCurrentPage((prev) => prev + 1);
        }
        if (direction === "previous" && data.data.prev_page_url) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-max bg-primarylight2 border border-text2 text-center text-s">
                <TableHead heads={tableHead} />
                <TableBody rows={transactions} columns={columns} />
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => handlePagination("previous")}
                    disabled={!data.data.prev_page_url}
                    className={`px-4 py-2 rounded ${!data.data.prev_page_url ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                >
                    Previous
                </button>
                <span>
                    Page {data.data.current_page} of {data.data.last_page}
                </span>
                <button
                    onClick={() => handlePagination("next")}
                    disabled={!data.data.next_page_url}
                    className={`px-4 py-2 rounded ${!data.data.next_page_url ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
