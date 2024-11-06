import AktivitasCard from "./cardprofile";

export default function Listransaksi() {
  const aktivitasData = [
    {
      name: "Dr. Andi Setiawan",
      status: "Selesai",
      date: "28 Okt 2024",
      time: "12:30",
    },
    {
      name: "Dr. Bella Anindya",
      status: "Dalam Proses",
      date: "28 Okt 2024",
      time: "14:00",
    },
    {
      name: "Dr. Chandra Budi",
      status: "Belum Dimulai",
      date: "29 Okt 2024",
      time: "10:00",
    },
    {
      name: "Dr. Diana Kartika",
      status: "Selesai",
      date: "27 Okt 2024",
      time: "09:00",
    },
  ];

  return (
    <div>
      {aktivitasData.map((aktivitas, index) => (
        <AktivitasCard
          key={index}
          name={aktivitas.name}
          status={aktivitas.status}
          date={aktivitas.date}
          time={aktivitas.time}
        />
      ))}
    </div>
  );
}
