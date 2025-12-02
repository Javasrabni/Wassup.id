"use client"
import React from "react";
import Link from "next/link";

import { useState } from "react";

const Footer = () => {
  const [feedbackValue, setFeedBackValue] = useState("")

  async function handleSubmit() {
    try {
      if(feedbackValue.length < 20 || feedbackValue.length > 350) {
        alert("Melebihi batas/terlalu sedikit")
        return
      }

      const res = await fetch('/api/feedback_post', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({value: feedbackValue})
      })
      if(!res.ok) {
        const {message} = await res.json()
        alert(message)
        console.error(message)
        return
      } else {
        setFeedBackValue("")
        alert("Terimakasih atas masukan/sarannya!")
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="max-w-[60rem] w-full m-auto h-64 py-8 gap-8 flex flex-col border-t border-gray-200 ">
      <div className="w-full h-full gap-16 flex flex-row items-center justify-between">
        {/* Brand */}
        <div className="shrink-0 flex flex-col gap-4 w-72 h-full">
          <h1 className="text-xl ">Wassup.id</h1>
          <p className="text-sm">
            Kami percaya bahwa berbagi pengetahuan adalah langkah kecil menuju
            perubahan besar. Mari berdiskusi dengan santun dan saling
            menghargai.
          </p>
        </div>

        {/* Navigasi */}
        <div className="shrink-0 flex flex-col gap-4 h-full w-72">
          <h1 className="text-xl ">Navigasi</h1>

          {/* LIST */}
          <div className="flex flex-row gap-8 w-full text-sm">
            <div className="flex flex-col gap-2">
              <Link href={"/inf/tentang-kami"} className="hover:text-stone-400">
                Tentang Kami
              </Link>
              <Link href={""} className="text-black hover:text-stone-400">
                Kontak
              </Link>
              <Link href={"/"} className="text-black hover:text-stone-400">
                Artikel
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-black hover:text-stone-400 ">
              <Link href={""} className="text-black hover:text-stone-400">
                Bergabung menjadi penulis
              </Link>
              <Link href={""} className="text-black hover:text-stone-400">
                Kebijakan Privasi
              </Link>
              <Link href={""} className="text-black hover:text-stone-400">
                Ketentuan Layanan
              </Link>
            </div>
          </div>
        </div>

        {/* FEED BACK */}
        <div className="h-full w-72 flex flex-col gap-4">
          <h1 className="text-xl">Umpan Balik</h1>
          <div className="flex flex-col gap-2">
            <textarea className="w-full h-full bg-stone-100 min-h-18 p-2 text-sm h-full resize-none" placeholder="Masukan Anda sangat berarti bagi kami." maxLength={350} onChange={(e)=> setFeedBackValue(e.target.value)} value={feedbackValue}/>
            <button className="w-fit text-sm text-stone-900 underline hover:text-stone-400 cursor-pointer" onClick={handleSubmit}>Kirim</button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-stone-400">
        &copy; Wassup.id {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
