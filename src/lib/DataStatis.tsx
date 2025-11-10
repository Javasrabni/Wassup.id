import AboutTeam from "@/components/aboutteam";
import dedent from "dedent";

// DATA NAVBAR
export interface Navbar {
  id: string;
  title: string;
  URL: string;
  component?: React.ReactNode;
}

export const NavbarData: Navbar[] = [
  { id: "1", title: "Berita", URL: "" },
  { id: "2", title: "Tentang kami", URL: "inf/tentang-kami", component: <AboutTeam /> },
  // { id: '3', title: "Kontak", URL: '/inf/' },
];

// DATA CONTENT ARTIKEL
// export interface Trending {
//   id: number;
//   string: string;
// }

export const DataTopik = [
  { id: 1, string: "Hukum" },
  { id: 2, string: "Akademik" },
  { id: 3, string: "Teknologi" },
  { id: 4, string: "Diskusi Opini" },
  { id: 5, string: "Filsafat" },
  { id: 6, string: "Inovasi" },
  { id: 7, string: "Sains" },
  { id: 8, string: "Sains" },
] as const

export type CategoryType = typeof DataTopik[number]["string"];
export interface Data {
  id: string;
  featured_article: boolean;
  date: string;
  author: string;
  title: string;
  content: string;
  thumbnail: string;
  category: CategoryType;
  slug: string;
  description: string;
}

export const DataArtikel: Data[] = [
  {
    id: "1",
    featured_article: true,
    date: "01 November 2025",
    author: "Javas Anggaraksa Rabbani",
    title: "Apakah Rokok Herbal Lebih Sehat dari Rokok Konvensional?",
    slug: "apakah-rokok-herbal-sehat?",
    content: dedent`Apakah rokok herbal benar-benar lebih sehat dari rokok konvensional? perlu diketahui bahwa rokok herbal tidak menggunakan tembakau sebagai bahan bakunya, melainkan menggunakan campuran tanaman seperti cengkeh dan bunga mawar yang di haluskan sebagai bahan dasarnya. berbeda dengan rokok konvensional yang menggunakan tembakau sebagai bahan bakunya. Jadi apa yang membedakan antara rokok herbal dengan rokok konvensional?

    Apakah ketika anda mendengar kata "herbal" pada nama rokok tersebut, dalam benak pikiran anda mengatakan bahwa rokok terebut merupakan rokok yang sehat? sebenarnya dalam segi kesehatan tidak ada yang namanya rokok yang sehat jika rokok tersebut masih dibakar untuk menggunakannya. Perlu diketahui, hampir semua bahan yang berbahan organik jika dibakar akan menghasilkan zat Tar, zat karsinogenik atau zat pemicu kanker. Jika kamu pernah melihat informasi kandungan zat pada bungkus rokok, yaitu Tar dan Nikotin. Zat Tar inilah yang berbahaya bagi kesehatan karena zat pemicu kanker. Bukan hanya Tar saja yang berbahaya, melainkan juga Karbon Monoksida yang dihasilkan dari proses pembakaran rokok tersebut.
    `,

    thumbnail: "/thumbnail/topik-rokok-herbal.jpeg",
    category: "Sains",
    description:
      'Apakah ketika anda mendengar kata "herbal" pada nama rokok tersebut, dalam benak pikiran anda mengatakan bahwa rokok terebut merupakan rokok yang sehat? sebenarnya dalam segi kesehatan tidak ada yang namanya "rokok yang sehat" jika rokok tersebut masih dibakar untuk menggunakannya.',
  },
  {
    id: "2",
    featured_article: false,
    date: "40 Juni 2050",
    category: "Akademik",
    author: "icikiwir",
    title: "Bukti Bahwa Merokok Tidak Ada Manfaatnya Bagi Tubuh",
    slug: "bukti-bahwa-merokok-tidak-ada-manfaatnya-bagi-tubuh",
    content: `Terkadang merokok itu menenangkan tetapi dibalik ketenagan tersebut menyimpan bahaya yang perlahan menggerogoti kesehatan layaknya parasit.`,
    thumbnail: "/smok.jpg",
    description:
      "erkadang merokok itu menenangkan tetapi dibalik ketenagan tersebut menyimpan bahaya yang perlahan menggerogoti kesehatan layaknya parasit.",
  },
  {
    id: "3",
    featured_article: false,
    date: "40 Juni 2050",
    category: "Filsafat",
    author: "Icikiwir",
    title: "Bukti Bahwa Merokok Tidak Ada Manfaatnya Bagi Tubuh",
    slug: "bukti-bahwa-merokok-tidak-ada-manfaatnya-bagi-tubuh",
    content: `Terkadang merokok itu menenangkan tetapi dibalik ketenagan tersebut menyimpan bahaya yang perlahan menggerogoti kesehatan layaknya parasit.`,
    thumbnail: "/smok.jpg",
    description:
      "erkadang merokok itu menenangkan tetapi dibalik ketenagan tersebut menyimpan bahaya yang perlahan menggerogoti kesehatan layaknya parasit.",
  },
];
