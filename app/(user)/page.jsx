import Keunggulan from '../../components/section/keunggulan';
import Penjelasan from '../../components/section/penjelasan';
import Alasan from '../../components/section/alasan';
import Layanan from '../../components/section/layanan';
import Artikel from '@/components/section/artikel';
import Footerrmhs from '@/components/footerrmhs';
import { getToken } from '@/lib/auth';

export default function HomePage() {
  const isLoggedIn = !!getToken(); // Periksa apakah token tersedia (user login)

  return (
    <div>
      <Keunggulan />
      <Penjelasan />
      <Alasan />
      <Layanan />
      <Artikel/>
      {!isLoggedIn && <Footerrmhs />} {/* Footer hanya muncul jika belum login */}
    </div>
  );
}
