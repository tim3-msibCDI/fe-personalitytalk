import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Footerrmhs from "@/components/footerrmhs";

export const metadata = {
  title: 'Personality Talk',
  description: 'Layanan Konsultasi Psikologi Profesional Online',
};

export default function UserLayout({ children }) {
  return (
    <div>
    <Navbar />
    {children}
    <Footerrmhs />
    <Footer />
  </div>
  );
}
