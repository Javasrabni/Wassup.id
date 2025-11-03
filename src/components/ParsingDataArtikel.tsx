import { DataArtikel } from "@/lib/DataStatis";
import Link from "next/link";
import Image from "next/image";
interface ArtikelParsing {
    judul: string,
    featured_article: boolean

}

export default function ArtikelDataParsing({ judul, featured_article }: ArtikelParsing) {
    const filteredData = DataArtikel.filter((i) => i.featured_article === featured_article)
    return (
        <div className={`${featured_article && 'mt-[-26px]'} flex flex-col gap-8`}>
            <h1 className="text-lg sm:text-xl font-bold font-['Inter']">{judul}</h1>
            {filteredData.map((i) => (
                <div key={i.id} className="flex gap-4 cursor-pointer">
                    <div className="relative w-[240px] h-[168px] shrink-0">
                        <Image
                            src={`${i.thumbnail}`}
                            alt={`Gambar - ${i.title}`}
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                    <div>
                        <p className="leading-6 text-base sm:text-lg font-bold overflow-hidden text-elipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">{i.title}</p>
                        
                        <p className="text-sm sm:text-base overflow-hidden text-elipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">{i.content}</p>

                        <div className="pt-4 w-fit">
                            <Link href={`/read/${i.category}/${i.slug}`}><p className="bg-gray-900 hover:bg-gray-200 text-white hover:text-gray-900 px-3 py-2 text-[10px] uppercase tracking-widest">Baca selengkapnya</p></Link>
                        </div>
                        {/* <p className="text-sm pt-4 text-gray-400">{i.date}</p> */}
                    </div>
                </div>
            ))}
        </div>
    )
}