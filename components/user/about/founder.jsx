import Image from "next/image";

export default function Founder() {
  let founder = {
    name: "Faris Fanani, M.Psi",
    jabatan: "Founder PersonalityTalk",
    ket: "Seorang Praktisi Bisnis Dan Konsultan SDM yang meraih gelar Sarjana Psikologi dari Universitas Diponegoro. Selain sebagai konselor dan psikoterapis pada Personality Talk. Beliau mendirikan dan menjabat sebagai CEO BISA Enterprise sebuah perusahaan yang bergerak dibidang Jasa MICE (Meeting, Incentive Travel, Congres/Convention, & Exhibition/Event). Juga CEO Campus Data Media, perusahaan yang bergerak dibidang Teknologi Informasi (Connectivity, Commerce, Content).",
  };
  return (
    <>
      <div className="py-14 px-24 text-textcolor bg-whitebg">
        <div>
          <h1 className="text-h1 font-medium text-center">Founder</h1>
        </div>
        <div className="flex mt-6">
          <Image src="/image/founder.png" alt="Founder" width={184.346} height={310} className="ml-14" />
          <div className="ml-28 my-7">
            <h1 className="text-h2 font-medium mb-3">{founder.name}</h1>
            <p className="text-m font-medium mb-3">{founder.jabatan}</p>
            <p className="text-m font-light">{founder.ket}</p>
          </div>
        </div>
      </div>
    </>
  );
}
