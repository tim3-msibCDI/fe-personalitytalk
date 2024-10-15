<<<<<<< HEAD
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function UserLayout({ children }) {
  return (
    <div>
    <Navbar />
    {children}
    <Footer />
  </div>
=======
// app/layout.jsx
import Navbar from '../../components/Navbar';

export const metadata = {
  title: 'Personality Talk',
  description: 'Layanan Konsultasi Psikologi Profesional Online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
>>>>>>> 926c9f023eeda8154a13ecf050549d71138c07bc
  );
}
