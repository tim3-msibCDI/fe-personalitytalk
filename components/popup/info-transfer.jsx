import { transfer } from "@/constants";
import Image from "next/image";

export default function InfoTransfer({ onClose }) {
  return (
    <div className="modal-container">
      <div className="bg-primary text-whitebg px-6 py-4 rounded-t-lg flex justify-between items-center">
        <p className="text-m font-semibold">Informasi Bank Transfer</p>
        <Image
          src="/image/icons/close.png"
          alt="Tutup"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="px-6 py-3">
        <ul className="list-disc space-y-1 text-justify py-2 px-1">
          {transfer.map((item) => (
            <li
              key={item.id}
              className="leading-relaxed text-sm font-light ml-4"
            >
              {item.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
