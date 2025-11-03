"use client";

import ArtikelDataParsing from "@/components/ParsingDataArtikel";
import SearchInput from "@/components/SearchInput";
import { DataTrending } from "@/lib/DataStatis";
import { useState } from "react";

export default function Home() {
  const [searchInputValue, setSearchInputValue] = useState('')

  return (
    <div className="w-full flex flex-col gap-8">

      {/* BANNER */}
      <div className="relative w-full h-60 rounded-none overflow-hidden flex items-center justify-center border-b border-gray-200">
        {/* <Image src={'/bg.jpg'} alt="Banner" fill priority quality={90} className="object-cover blur-[2px]" /> */}
        {/* <div className="absolute inset-0 bg-black/20" /> */}

        <div className="relative w-full max-w-[32rem] flex flex-col gap-4 items-center justify-center p-4">
          <h1 className="text-xl sm:text-2xl text-center select-none">Ngobrolin dunia ala gaya kita!</h1>
          <SearchInput value={searchInputValue} onchange={setSearchInputValue} placeholder="Pengetahuan hari ini ..." withButton={true} />
        </div>
      </div>

      {/* TRENDING */}
      <div className="w-full flex items-center justify-between gap-8">
        <p className="text-black py-2 text-xs font-bold uppercase tracking-widest shrink-0 select-none">TOPIK</p>
        <div className="w-full pl-8 overflow-x-auto">
          <ul className="flex gap-8 w-fit shrink-0">
            {DataTrending.map((i, idx) =>
              <div key={i.id} className="flex gap-8 ">
                <li  className="shrink-0 cursor-pointer hover:text-gray-400">
                  {i.string}
                </li>
                {idx < DataTrending.length - 1 && <div>  |</div>}
              </div>

            )}
          </ul>
        </div>
      </div>

      {/* ARTIKEL */}
      <div className="flex w-full justify-between gap-4 mt-[-2.5rem]">
        {/* MAIN CONTENT DISPLAY*/}
        <div className="mt-8 flex flex-col gap-8">
          <ArtikelDataParsing judul="" featured_article={true} />
          <ArtikelDataParsing judul="Terbaru" featured_article={false} />
        </div>

        {/* SIDE CONTENT DISPLAY*/}
        <div className="max-w-[16rem] mt-8 shrink-0">
          <p className="text-justify text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem eveniet, quod pariatur sunt voluptas numquam est esse error dolore possimus qui obcaecati nam, labore explicabo nemo deserunt harum. Possimus, natus.</p>
          <ul className="list-decimal pl-6 mt-4 gap-4 flex flex-col">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Quod eligendi error debitis aliquam quibusdam vitae dignissimos maiores aspernatur harum.</li>
          </ul>
        </div>

      </div>

    </div>
  );

}
