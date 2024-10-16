export default function SelectField({ label, options }) {
    return (
      <div className="pt-5">
        <label className="text-m font-normal text-textcolor">{label}</label>
        <select className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2 mr-4">
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
  