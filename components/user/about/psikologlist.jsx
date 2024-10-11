import Cardpsikologi from "./cardpsikologi";

export default function Psikologlist() {
    const data = [
      { name: 'Dewi Rahmadhani, M.Psi.', image: '/image/psikolog/1.png', title: 'Psikolog', tags: ['Kognitif', 'Mood Booster', 'Personality'] },
      { name: 'Citra Anindita, S.Psi.', image: '/image/psikolog/2.png', title: 'Konsultan', tags: ['Narcissistic', 'Marriage', 'Umum 25+'] },
      { name: 'Rama Syahputra, M.Psi.', image: '/image/psikolog/3.png', title: 'Psikolog', tags: ['Expectation', 'Personality', 'Career'] },
      { name: 'Nadia Permata, S.Kom.', image: '/image/psikolog/4.png', title: 'Konsultan', tags: ['Anxiety', 'Mood Booster', 'Personality'] },
    ];
  
    return (
      <div className="bg-whitebg py-12">
        <h2 className="text-h1 font-medium text-center p-2">Psikolog PersonalityTalk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-20">
          {data.map((person, index) => (
            <Cardpsikologi key={index} name={person.name} image={person.image} title={person.title} tags={person.tags} />
          ))}
        </div>
      </div>
  )
}
