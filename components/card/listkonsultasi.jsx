"use client";

import { useEffect, useState } from "react";
import ConsultationHistoryCard from "./cardprofilekonsultasi";
import { getConsultationHistory } from "@/api/history_activity";
import Loading from "../loading/loading";

export default function ListKonsultasi() {
  const [consultasiData, setConsultasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConsultationHistory();
        // console.log("Response from API:", response.data); 
        setConsultasiData(response.data.data || []); 
      } catch (err) {
        // console.error(err.message || "Gagal memuat data konsultasi");
        setError(err.message || "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {Array.isArray(consultasiData) && consultasiData.length > 0 ? (
        consultasiData.map((consultasi, index) => (
          <ConsultationHistoryCard
            key={index}
            chat_sessions_id={consultasi.chat_session_id}
            consultation_id={consultasi.consultation_id}
            name={consultasi.psikolog_name} 
            status={consultasi.status} 
            date={consultasi.date} 
            time={consultasi.time} 
            psikolog_profile={consultasi.psikolog_profile}
            sender_id={consultasi.client_id}
            receiver_id={consultasi.psikolog_id}
          />
        ))
      ) : (
        <p>Data tidak tersedia</p>
      )}
    </div>
  );
}
