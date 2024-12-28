import Cardcount from "./cardcount";

export default function Countlist() {
  return (
    <>
      <div className="bg-primary p-6">
        <div className="lg:my-16 my-4">
          <h2 className="lg:text-h1 text-h2 font-bold mb-4 text-center text-whitebg">
            PersonalityTalk dalam Angka
          </h2>
          <div className="flex justify-center space-x-4 mt-9">
            <Cardcount number="+5K" description="Total Pengguna 2024" />
            <Cardcount number="+20" description="Modul Course" />
            <Cardcount number="+30" description="Psikologi & Konsulen" />
          </div>
        </div>
      </div>
    </>
  );
}
