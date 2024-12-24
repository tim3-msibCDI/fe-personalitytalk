"use client";

import { useEffect, useState } from "react";
import TransactionHistoryCard from "./cardprofiletransaksi";
import { getTransactionHistory } from "@/api/history_activity";
import Loading from "../loading/loading";
import Image from "next/image";

export default function Listransaksi() {
  const [transaksiData, setTransaksiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionHistory();
        setTransaksiData(response.data.data || []);
      } catch (err) {
        // console.error(err.message || "Gagal memuat data transaksi");
        setError(err.message || "Gagal memuat data transaksi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      {Array.isArray(transaksiData) && transaksiData.length > 0 ? (
        transaksiData.map((transaksi, index) => (
          <TransactionHistoryCard
            key={index}
            id_transaction={transaksi.transaction_id}
            name={transaksi.psikolog_name}
            status={transaksi.status}
            date={transaksi.date}
            price={transaksi.total_amount}
            psikolog_profile={transaksi.psikolog_profile}
            no_pemesanan={transaksi.no_pemesanan}
          />
        ))
      ) : (
        <div className="p-6 flex flex-col items-center justify-center text-center">
          <Image
            src="/icons/konsultasi/tidak_tersedia.svg"
            alt="Vector Tidak Tersedia"
            width={96}
            height={96}
          />
          <h3 className="text-h3 font-semibold mt-4">Anda belum mempunyai transaksi konsultasi</h3>
        </div>
      )}
    </div>
  );
}
