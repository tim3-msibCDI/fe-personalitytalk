export default function Founder() {
  let founder = {
    name: "Faris Fanani, M.Psi",
    jabatan: "Founder PersonalityTalk",
    ket: "Seorang Praktisi Bisnis Dan Konsultan SDM yang meraih gelar Sarjana Psikologi dari Universitas Diponegoro. Selain sebagai konselor dan psikoterapis pada Personality Talk. Beliau mendirikan dan menjabat sebagai CEO BISA Enterprise sebuah perusahaan yang bergerak dibidang Jasa MICE (Meeting, Incentive Travel, Congres/Convention, & Exhibition/Event). Juga CEO Campus Data Media, perusahaan yang bergerak dibidang Teknologi Informasi (Connectivity, Commerce, Content).",
  };
  return (
    <>
      <div>
        <div>
          <h1>Founder</h1>
        </div>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <h1>{founder.name}</h1>
            <p>{founder.jabatan}</p>
            <p>{founder.ket}</p>
          </div>
        </div>
      </div>
    </>
  );
}
