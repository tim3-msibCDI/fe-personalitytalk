import CardUnggul from "./cardunggul";

const CardUnggulList = () => {
  const cardData = [
    {
      path: "/icons/tes-mental.png", 
      text: "86% Pengguna merasa puas dengan layanan konsultasi",
    },
    {
      path: "/icons/tes-mental.png",
      text: "Topik yang disediakan sangat beragam",
    },
    {
      path: "/icons/tes-mental.png",
      text: "Telah dipercaya oleh 8K+ Pengguna",
    },
    {
      path: "/icons/tes-mental.png",
      text: "Ditangani oleh Psikolog & Konselor Bersertifikat",
    },
  ];

  return (
    <div>
      {cardData.map((item, index) => (
        <CardUnggul key={index} path={item.path} text={item.text} />
      ))}
    </div>
  );
};

export default CardUnggulList;
