import Footerrmhs from "@/components/footerrmhs";
import Countlist from "@/components/user/about/countlist";
import Founder from "@/components/user/about/founder";
import Mitra from "@/components/user/about/mitra";
import Profile from "@/components/user/about/profile";
import Psikologlist from "@/components/user/about/psikologlist";
import { getToken } from "@/lib/auth";


export default function About() {
  const isLoggedIn = !!getToken(); // Periksa apakah token tersedia (user login)

  return (
    <>
      <Profile />
      <Countlist />
      <Founder />
      <Psikologlist />
      <Mitra />
      {!isLoggedIn && <Footerrmhs />} {/* Footer hanya muncul jika belum login */}
    </>
  );
}
