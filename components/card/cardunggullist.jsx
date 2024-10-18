import CardUnggul from "./cardunggul";

const CardUnggulList = () => {
  const cardData = [
    {
      path: "/icons/konsultasi/puas.png", 
      text: "86% Pengguna merasa puas dengan layanan konsultasi",
    },
    {
      path: "/icons/konsultasi/beragam.png",
      text: "Topik yang disediakan sangat beragam",
    },
    {
      path: "/icons/konsultasi/pengguna.png",
      text: "Telah dipercaya oleh 8K+ Pengguna",
    },
    {
      path: "/icons/konsultasi/psikolog.png",
      text: "Ditangani oleh Psikolog & Konselor Bersertifikat",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4">
      {cardData.map((item, index) => (
        <CardUnggul key={index} path={item.path} text={item.text} />
      ))}
    </div>
  );
};

export default CardUnggulList;
