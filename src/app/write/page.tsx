"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const WritePage = () => {
  const router = useRouter();
  //   FIELD
  const [title, setTitle] = useState("Cara Menjadi Orang Baik");
  const [value, setValue] = useState<string | undefined>("Ketik disini ...");
  const [thumbnail, setThumbnail] = useState("1");
  const [category, setCategory] = useState("1");
  const [visibility, setVisibility] = useState(true);

  const { user, loading } = useUser();
  //   if (loading || !user) return <p>tunggu</p>;

  async function PostCreateArticle() {
    try {
      const res = await fetch("/api/create_article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: user?.username,
          email: user?.email,
          title,
          content: value,
          thumbnail,
          slug: title,
          // description: value,
          // featured_article,
          // view,
          category,
          visibility,
        }),
      });
      if (!res.ok) {
        console.error(new Error("Gagal mempublikasi."));
        return;
      } else {
        setTitle("");
        setValue("");
        setThumbnail("");
        setCategory("");
        setVisibility(true);
        router.replace(`/profile/${user?.username}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div data-color-mode="light" className="p-4">
        <MDEditor value={value} onChange={(e) => setValue(e)} height={500} />
      </div>
      <button onClick={PostCreateArticle}>SEND</button>
    </div>
  );
};

export default WritePage;
