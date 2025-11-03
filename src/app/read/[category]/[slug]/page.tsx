import React from "react";
import type { Metadata } from "next";
import { DataArtikel } from "@/lib/DataStatis";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Eye, MessageSquareTextIcon } from "lucide-react";

interface ArticleParams {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ArticleParams): Promise<Metadata> {
  const { slug } = params;

  const data = DataArtikel.find(
    (i) => i.slug.replace("?", "") == slug.replace("?", "")
  );

  if (!data) {
    return {
      title: "Artikel tidak ditemukan - Wassup.id",
      description: "Artikel yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: data.title + " - Wassup.id",
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
    },
  };
}

async function ReadDetailArticle({ params }: ArticleParams) {
  const { slug } = params;

  const data = DataArtikel.find(
    (i) => i.slug.replace("?", "") == slug.replace("?", "")
  );

  if (!data) notFound();

  return (
    <div className="prose mx-auto pb-10 w-full prose-p:my-4 flex flex-row justify-between gap-8">
      {/* Article viewed */}
      <div className="max-w-[39rem]">
        <div className="flex flex-row items-center gap-4 mb-8">
          <Eye width={16} className="text-stone-400" />
          <p className="text-sm">
            Dilihat oleh <b>12</b> orang
          </p>
        </div>

        {/* ARTICLE CONTENT */}
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-sm text-stone-400">
            {data.author}, {data.date}
          </p>
        </div>
        <div className="markdown-spacing-paragraph text-md prose prose-p:text-justify">
          <Markdown>{data.content}</Markdown>
        </div>
      </div>

      {/* SIDE FOOTER */}
      {/* <div className="border-b border-gray-200 pt-4"/> */}

      <div className="pt-12 flex flex-col gap-4 max-w-[19rem]">
        {/* Komentar */}
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-xl font-bold">
            Kamu memiliki pandangan lain tentang topik ini?
          </h1>
          <span className="flex flex-row gap-4 text-stone-400 items-center">
            <MessageSquareTextIcon width={16} />
            <p className="text-sm text-stone-400">Komentar secara anonim</p>
          </span>
        </div>

        <div>
          <textarea
            className="w-full bg-stone-100 min-h-[10rem] p-4"
            placeholder="Komentar kamu terkait topik ini ..."
          />
        </div>
      </div>
    </div>
  );
}

export default ReadDetailArticle;
