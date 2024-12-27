import CardUnggul from "./cardunggul";

const CardUnggulList = () => {
  const cardData = [
    {
      path: "/image/icons/konsultasi/puas.png",
      text: (
        <>
          <span className="font-bold">86%</span> Pengguna merasa puas dengan
          layanan konsultasi
        </>
      ),
    },
    {
      path: "/image/icons/konsultasi/beragam.png",
      text: (
        <>
          Topik yang disediakan sangat{" "}
          <span className="font-bold">beragam</span>
        </>
      ),
    },
    {
      path: "/image/icons/konsultasi/pengguna.png",
      text: (
        <>
          Telah dipercaya oleh <span className="font-bold">8K+</span> Pengguna
        </>
      ),
    },
    {
      path: "/image/icons/konsultasi/psikolog.png",
      text: (
        <>
          Ditangani oleh{" "}
          <span className="font-bold">Psikolog & Konselor Bersertifikat</span>
        </>
      ),
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
