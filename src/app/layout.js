import Navbar from "@/components/Navbar";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Zentra | Sprint Management",
  description: "Lightweight sprint-based development management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}