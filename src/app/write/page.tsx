"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import UploadFile from "@/components/card/uploadFile";
import Image from "next/image";
import Markdown from "react-markdown";
import { InfoIcon } from "lucide-react";
import { EditArticle } from "./types";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const WritePage = (props: EditArticle) => {
  const router = useRouter();
  //   FIELD
  const [title, setTitle] = useState<string | undefined>("");
  const [value, setValue] = useState<string | undefined>("Mulai menulis ...");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null | undefined>(null);
  const [category, setCategory] = useState<string | undefined>("Diskusi Opini");
  const [visibility, setVisibility] = useState<string | undefined>("Publik");
  const [komentarField, setKomentarField] = useState<string | undefined>("Aktif")

  // KATEGORY LIST
  const ArticleCategory = [
    { id: 1, string: "Opini" },
    { id: 2, string: "Akademik" },
    { id: 3, string: "Sains" },
    { id: 4, string: "Hukum" },
    { id: 5, string: "Filsafat" },
    { id: 6, string: "Inovasi" },
    { id: 7, string: "Teknologi" },
    { id: 8, string: "Sosial" },
    { id: 9, string: "Kesehatan" },
  ]

  // DATA FROM ARTICLE FOR EDIT
  useEffect(() => {
    if (props.onEdit) {
      setTitle(props.titleEdit)
      setValue(props.valueEdit)
      setPreviewThumbnail(props.thumbnailEdit)
      setCategory(props.categoryEdit)
      setVisibility(props.visibilityEdit)
      setKomentarField(props.komentarFieldEdit)
    }
  }, [props])


  const { user, loading } = useUser();
  //   if (loading || !user) return <p>tunggu</p>;

  // UPLOAD IMAGE / THUMBNAIL
  async function uploadThumbnail(file: any) {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload_image_CLD', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    if (!data.success) return null

    return data.data.secure_url
  }

  // POST ARTICLE
  async function PostCreateArticle() {
    try {
      let thumbnailURL = null;

      if (thumbnail) {
        thumbnailURL = await uploadThumbnail(thumbnail);
      }

      const res = await fetch("/api/create_article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: user?.username,
          email: user?.email,
          title,
          content: value,
          thumbnail: thumbnailURL,
          slug: title,
          // description: value,
          // featured_article,
          // view,
          category: category,
          visibility: visibility,
          komentarField: komentarField
        }),
      });
      if (!res.ok) {
        console.error(new Error("Gagal mempublikasi."));
        return;
      } else {
        router.replace(`/profile/${user?.username.replaceAll(' ', '-')}/${user?.id}`);
        setTitle("");
        setValue("");
        setThumbnail(null);
        setCategory("");
        setVisibility("Publik");
        setKomentarField("Aktif")
      }
    } catch (error) {
      console.error(error);
    }
  }

  // PATCH ARTICLE
  async function PatchArticle() {
    try {
      const res = await fetch('/api/create_article', {
        method: "PATCH",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
          idArticle: props.idArticleEdit,
          title,
          content: value,
          // thumbnail: thumbnailURL,
          slug: title,
          // description: value,
          // featured_article,
          // view,
          category: category,
          visibility: visibility,
          komentarField: komentarField
        })
      })
       if (!res.ok) {
        console.error(new Error("Gagal menyimpan perubahan."));
        return;
      } else {
        router.replace(`/profile/${user?.username.replaceAll(' ', '-')}/${user?.id}`);
        setTitle("");
        setValue("");
        setThumbnail(null);
        setCategory("");
        setVisibility("Publik");
        setKomentarField("Aktif")
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-col gap-8">

      {/* Judul & Thumbnail */}
      <div className="w-full h-full flex flex-row gap-4 pt-16">
        <div className="flex flex-col gap-2">
          <div className="relative w-[240px] h-[168px] shrink-0">
            {previewThumbnail ? (
              <>
                <Image src={previewThumbnail} alt="Image Preview" fill className="object-cover rounded-md" />
              </>
            ) : (
              <UploadFile onFileSelect={(file) => { setThumbnail(file); setPreviewThumbnail(URL.createObjectURL(file)); }} />
            )}
          </div>
          <p className="text-sm text-center text-stone-400">Thumbnail / Gambar Sampul</p>
        </div>
        <div className="h-full flex flex-col gap-1 w-full pt-2">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className=" outline-none font-[inter] text-lg font-bold" autoFocus placeholder="Judul Tulisan" />
          <div className="markdown-spacing-paragraph line-clamp-3 text-sm sm:text-base w-full max-w-160">
            <Markdown>{value}</Markdown>
          </div>
        </div>
      </div>

      {/* More information */}
      <div className="w-full flex flex-row items-center gap-16">

        {/* Visibility */}
        <div className="w-fit flex flex-row gap-2 items-center">
          <p className="text-sm font-bold"><span className="flex flex-row gap-1 items-center"><InfoIcon width={12} /> Visibility: </span></p>
          <form className="flex flex-row gap-4" action={''}>
            <span className="flex flex-row gap-2 items-center">
              <input type="radio" name="visibility" id="Publik" value={"Publik"} checked={visibility === "Publik"} onChange={(e) => setVisibility(e.target.value)} />
              <label htmlFor="Publik" className="font-[inter] text-sm">Publik</label>
            </span>
            <span className="flex flex-row gap-2 items-center">
              <input type="radio" name="visibility" id="Privat" value={"Privat"} checked={visibility === "Privat"} onChange={(e) => setVisibility(e.target.value)} />
              <label htmlFor="Privat" className="font-[inter] text-sm">Privat</label>
            </span>
          </form>
        </div>

        {/* kategori */}
        <div className="w-fit flex flex-row gap-4 items-center">
          <p className="text-sm font-bold"><span className="flex flex-row gap-1 items-center"><InfoIcon width={12} /> Kategori: </span></p>
          {/* Dropdown */}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {ArticleCategory.map(c =>
              <option value={c.string} key={c.id}>{c.string}</option>
            )}
          </select>
        </div>

        {/* Status Komentar */}
        <div className="w-fit flex flex-row gap-2 items-center">
          <p className="text-sm font-bold"><span className="flex flex-row gap-1 items-center"><InfoIcon width={12} /> Komentar: </span></p>
          <div className="flex flex-row gap-4">
            <span className="flex flex-row gap-2 items-center">
              <input type="radio" name="komentarField" id="k-aktif" value={"Aktif"} checked={komentarField === "Aktif"} onChange={(e) => setKomentarField(e.target.value)} />
              <label htmlFor="k-aktif" className="font-[inter] text-sm">Aktif</label>
            </span>
            <span className="flex flex-row gap-2 items-center">
              <input type="radio" name="komentarField" id="k-nonaktif" value={"Nonaktif"} checked={komentarField === "Nonaktif"} onChange={(e) => setKomentarField(e.target.value)} />
              <label htmlFor="k-nonaktif" className="font-[inter] text-sm">Nonaktif</label>
            </span>
          </div>
        </div>
      </div>

      {/* Text editor */}
      <div data-color-mode="light" className="">
        <MDEditor value={value} onChange={(e) => setValue(e)} height={500} />
      </div>
      <button className="bg-stone-900 text-white w-fit px-4 py-1 font-[inter] text-sm rounded-sm hover:bg-stone-100 hover:text-stone-900 cursor-pointer" onClick={props.onEdit ? PatchArticle : PostCreateArticle}>{props.onEdit ? "Simpan" : "Publikasikan"}</button>
    </div>
  );
};

export default WritePage;
