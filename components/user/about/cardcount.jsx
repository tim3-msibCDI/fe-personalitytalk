export default function Cardcount({number, description}) {
  return (
    <div className="bg-whitebg rounded-lg shadow-md py-8 px-3.5 text-center w-80">
      <p className="text-h1 font-semibold">{number}</p>
      <p className="text-h3">{description}</p>
    </div>
  )
}
