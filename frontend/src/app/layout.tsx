import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from "./components/Navbar";


export const metadata: Metadata = {
  title: "Local Services Booking Kujawsko-Pomorskie",
  description: "Website about services and locals in Poland Kujawsko-Pomorskie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
