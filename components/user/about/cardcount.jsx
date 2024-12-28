export default function Cardcount({number, description}) {
  return (
    <div className="bg-whitebg rounded-lg shadow-md py-8 px-3.5 text-center w-80">
      <p className="lg:text-h1 text-h3 font-semibold">{number}</p>
      <p className="lg:text-h3 text-s">{description}</p>
    </div>
  )
}
