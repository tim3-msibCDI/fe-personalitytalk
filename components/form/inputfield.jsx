export default function InputField({
  type = "text",
  placeholder,
  id,
  label,
  required = false,
}) {
  return (
    <div className="pt-5">
      <label className="text-m font-normal text-textcolor">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        required={required}
        className="py-2 px-4 w-full rounded-lg text-s placeholder:text-textsec text-textcolor mt-1 font-light border-solid border border-text2 "
      />
    </div>
  );
}
