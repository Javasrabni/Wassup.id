// "use client";

import { GetUserArticlePosts } from "@/lib/user_article/getAllPosts";
import DataUserPosts from "@/components/server/DataUserPosts";

import SearchInput from "@/components/SearchInput";
import { DataTopik } from "@/lib/DataStatis";
// import { useState } from "react";
import Link from "next/link";
import ParsingAllUser from "@/components/parsingAllUser";


export default async function Home() {
  const userArticles = await GetUserArticlePosts()
  
  return (
    <div className="w-full flex flex-col gap-8">
      {/* BANNER */}
      <div className="relative w-full h-60 rounded-none overflow-hidden flex items-center justify-center border-b border-gray-200">
        {/* <Image src={'/bg.jpg'} alt="Banner" fill priority quality={90} className="object-cover blur-[2px]" /> */}
        {/* <div className="absolute inset-0 bg-black/20" /> */}

        <div className="relative w-full max-w-[32rem] flex flex-col gap-4 items-center justify-center p-4">
          <h1 className="text-xl sm:text-2xl text-center select-none">
            Ngobrolin dunia ala gaya kita!
          </h1>
          <SearchInput
            // value={searchInputValue}
            // onchange={setSearchInputValue}
            placeholder="Pengetahuan hari ini ..."
            withButton={true}
          />
        </div>
      </div>

      {/* TRENDING */}
      <div className="w-full flex flex-row gap-8">
        <p className="text-black text-xs mt-[2.5px] font-bold uppercase tracking-widest shrink-0 select-none">
          TOPIK
        </p>
        <ul className="gap-8 w-full pl-8 flex flex-row items-center overflow-x-auto pb-4">
          {DataTopik.map((i, idx) => (
            <div key={i.id} className="flex gap-8 shrink-0">
              <Link href={`/read/${i.string.toLowerCase().replace(" ", "-")}`}>
                <li className="cursor-pointer hover:text-gray-400">
                  {i.string}
                </li>
              </Link>
              {idx < DataTopik.length - 1 && <div> |</div>}
            </div>
          ))}
        </ul>
      </div>

      {/* ARTIKEL */}
      <div className="flex flex-col md:flex-row w-full justify-between gap-8 mt-[-1rem]">
        {/* MAIN CONTENT DISPLAY*/}
        <div className="mt-0 flex flex-col gap-8">
          <DataUserPosts articles={userArticles} onProfilePage={false} emptyMessage={''}/>
          {/* <ArtikelDataParsing judul="" featured_article /> */}
          {/* <ArtikelDataParsing judul="Terbaru" featured_article={false} /> */}
        </div>

        {/* SIDE CONTENT DISPLAY*/}
        <div className="w-full border-t border-gray-200 md:max-w-[16rem] mt-8 shrink-0 flex flex-col sm:flex-row md:flex-col gap-8">
          <p className="w-full md:w-fit text-justify text-sm pt-4 md:pt-0">
            Kami percaya bahwa berbagi pengetahuan adalah langkah kecil menuju perubahan besar. Mari berdiskusi dengan baik.
          </p>
          <div className="w-full md:w-fit text-sm flex flex-col gap-4">
            <h1 className="font-semibold">Terkoneksi dengan pengguna lain</h1>
            <ParsingAllUser />
          </div>
        </div>
      </div>
    </div>
  );
}
