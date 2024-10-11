import Alasan from "@/components/section/alasan";
import Keunggulan from "@/components/section/keunggulan";
import Layanan from "@/components/section/layanan";
import Penjelasan from "@/components/section/penjelasan";


export default function HomePage() {
  return (
    <div>
      <Keunggulan />
      <Penjelasan />
      <Alasan />
      <Layanan />
    </div>
  );
}
