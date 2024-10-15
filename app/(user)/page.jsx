import Alasan from "@/components/section/alasan";
import Keunggulan from "@/components/section/keunggulan";
import Layanan from "@/components/section/layanan";
import Penjelasan from "@/components/section/penjelasan";
import Artikel from "@/components/section/artikel";


export default function HomePage() {
  return (
    <div>
      <Keunggulan />
      <Penjelasan />
      <Alasan />
      <Layanan />
      <Artikel/>
    </div>
  );
}
