import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UserProvider } from "@/constants/UserContext";

export const metadata = {
  title: "Personality Talk",
  description: "Layanan Konsultasi Psikologi Profesional Online",
};

export default function UserLayout({ children }) {
  return (
    <UserProvider>
      <Navbar />
      {children}
    <Footer />
    </UserProvider>
  );
}
