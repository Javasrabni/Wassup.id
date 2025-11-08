import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

// Partials
import Navbar from "./partials/navbar";
import Content from "./partials/content";
import Sidebar from "./partials/sidebar";
import Footer from "./partials/footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  // weight: ["400", "700"], // jika butuh variasi
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "Wassup.id",
  description:
    "Ngobrolin dunia ala gaya kita!, Tempat lo dapet kabar terkini, dibahas dengan cara paling santai. Nggak ribet, nggak kaku - karena berita tuh harusnya kayak ngobrol sama temen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${newsreader.variable} ${inter.variable}`}>
      <body className={`antialiased`}>
        <Navbar />
        <div className="w-full flex flex-col">
          <div className="w-full max-w-[60rem] mx-auto p-8">
            <Content>{children}</Content>
          </div>
          <div className="w-full max-w-[60rem] mx-auto">
            <Footer />
          </div>
        </div>

        <div className="flex md:hidden">
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
