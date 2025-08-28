import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Inter, Poppins } from "next/font/google";
import "./globals.css";

// Partials
import Navbar from "./partials/navbar";
import Content from "./partials/content";
import Sidebar from "./partials/sidebar";

const newsreader = Newsreader({
  variable: "--font-Newsreader-serif"
})

export const metadata: Metadata = {
  title: "Wassup.id",
  description: "Ngobrolin dunia ala gaya kita!, Tempat lo dapet kabar terkini, dibahas dengan cara paling santai. Nggak ribet, nggak kaku - karena berita tuh harusnya kayak ngobrol sama temen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} antialiased`}
      >
        <Navbar />
        <Content>{children}</Content>
        <div className="flex md:hidden">
          <Sidebar />
        </div>

      </body>
    </html>
  );
}
