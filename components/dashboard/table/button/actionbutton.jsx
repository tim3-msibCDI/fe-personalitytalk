import Image from "next/image";

export default function ActionButton({
  color,
  hoverColor,
  iconSrc,
  alt,
  onClick,
}) {
  return (
    <button
      className={`${color} px-2 py-1 rounded ${hoverColor} w-8 h-8`}
      onClick={onClick}
    >
      <Image src={iconSrc} width={15} height={15} alt={alt} />
    </button>
  );
}
