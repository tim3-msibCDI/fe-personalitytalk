import Image from "next/image";

export default function Founder() {
  let founder = {
    name: "Faris Fanani, M.Psi",
    jabatan: "Founder PersonalityTalk",
    ket: "Seorang Praktisi Bisnis Dan Konsultan SDM yang meraih gelar Sarjana Psikologi dari Universitas Diponegoro. Selain sebagai konselor dan psikoterapis pada Personality Talk. Beliau mendirikan dan menjabat sebagai CEO BISA Enterprise sebuah perusahaan yang bergerak dibidang Jasa MICE (Meeting, Incentive Travel, Congres/Convention, & Exhibition/Event). Juga CEO Campus Data Media, perusahaan yang bergerak dibidang Teknologi Informasi (Connectivity, Commerce, Content).",
  };
  return (
    <>
      <div className="py-14 lg:px-24 px-4 text-textcolor bg-whitebg">
        <div>
          <h1 className="text-h1 font-semibold text-center">Founder</h1>
        </div>
        <div className="lg:flex mt-6">
          <Image src="/image/founder1.png" alt="Founder" width={184.346} height={310} className="lg:ml-14 mx-auto" />
          <div className="lg:ml-28 my-7 text-center lg:text-left">
            <h1 className="text-h2 font-semibold mb-3">{founder.name}</h1>
            <p className="text-m font-medium mb-3">{founder.jabatan}</p>
            <p className="text-m font-light">{founder.ket}</p>
          </div>
        </div>
      </div>
    </>
  );
}
