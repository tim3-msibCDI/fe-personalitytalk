// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Konsultasi Psikologi',
  description: 'Layanan Konsultasi Psikologi Profesional Online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
