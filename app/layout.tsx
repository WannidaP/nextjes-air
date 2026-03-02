import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomTabs from "@/components/BottomTabs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <BottomTabs />
      </body>
    </html>
  );
}