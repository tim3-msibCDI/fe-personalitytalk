import AktivitasCard from "./cardprofile";

export default function ListKonsultasi() {
  const aktivitasData = [
    {
      name: "Dr. Andi Setiawan",
      status: "3",
      date: "28 Okt 2024",
      time: "12:30",
    },
    {
      name: "Dr. Bella Anindya",
      status: "2",
      date: "28 Okt 2024",
      time: "14:00",
    },
    {
      name: "Dr. Chandra Budi",
      status: "1",
      date: "29 Okt 2024",
      time: "10:00",
    },
    {
      name: "Dr. Diana Kartika",
      status: "3",
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
