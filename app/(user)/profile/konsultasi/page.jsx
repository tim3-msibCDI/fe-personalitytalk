"use client"
import { useState } from "react";
import ListKonsultasi from "@/components/card/listkonsultasi";
import ListTransaksi from "@/components/card/listtransaksi";

export default function KonsultasiUserPage() {
  const [activeTab, setActiveTab] = useState("konsultasi"); // State untuk tab aktif

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch mb-9">
        <h3 className="text-h3 font-semibold">Konsultasi Saya</h3>
      </div>
      <div className="">
        <ul className="flex space-x-4">
          <li
            className={`py-2 px-4 cursor-pointer text-primary sm:text-base text-s ${
              activeTab === "konsultasi" ? "bg-primarylight rounded-t-lg font-semibold" : ""
            }`}
            onClick={() => setActiveTab("konsultasi")}
          >
            Riwayat Konsultasi
          </li>
          <li
            className={`py-2 px-4 cursor-pointer text-primary sm:text-base text-s ${
              activeTab === "transaksi" ? "bg-primarylight rounded-t-lg font-semibold" : ""
            }`}
            onClick={() => setActiveTab("transaksi")}
          >
            Riwayat Transaksi
          </li>
        </ul>
        <div
          className={`bg-primarylight p-2 max-h-[26rem] overflow-y-auto ${
            activeTab === "konsultasi" ? "rounded-tr-lg rounded-br-lg" : "rounded-lg"
          }`}
        >
          {activeTab === "konsultasi" && <ListKonsultasi />}
          {activeTab === "transaksi" && <ListTransaksi />}
        </div>
      </div>
    </div>
  );
}
