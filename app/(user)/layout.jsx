import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Personality Talk",
  description: "Layanan Konsultasi Psikologi Profesional Online",
};

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
