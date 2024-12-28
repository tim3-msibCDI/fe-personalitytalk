import Keunggulan from "../../components/section/keunggulan";
import Penjelasan from "../../components/section/penjelasan";
import Alasan from "../../components/section/alasan";
import Layanan from "../../components/section/layanan";
import Artikel from "@/components/section/artikel";
import { getToken } from "@/lib/auth";

export default function HomePage() {
  return (
    <div>
      <Keunggulan />
      <Penjelasan />
      <Alasan />
      <Layanan />
      <Artikel />
    </div>
  );
}
