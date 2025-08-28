// DATA NAVBAR
export interface Navbar {
    id: string,
    title: string,
    URL: string
}

export const NavbarData: Navbar[] = [
    { id: '1', title: "Berita", URL: '/inf/' },
    { id: '2', title: "Tentang kami", URL: '/inf/' },
    { id: '3', title: "Kontak", URL: '/inf/' },
]

// DATA CONTENT ARTIKEL
export interface Data {
    id: string,
    date: string,
    title: string,
    content: string

}

export const DataArtikel: Data[] = [
    { id: '1', date: '20 Desember 2025', title: 'Testing artikel judul', content: `Testing 1` }
]