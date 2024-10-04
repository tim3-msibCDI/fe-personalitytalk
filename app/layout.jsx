// app/layout.jsx
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/footer'

export const metadata = {
  title: 'Konsultasi Psikologi',
  description: 'Layanan Konsultasi Psikologi Profesional Online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
