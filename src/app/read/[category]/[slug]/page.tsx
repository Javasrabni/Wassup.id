import React from "react";
import type { Metadata } from "next";
import { DataArtikel } from "@/lib/DataStatis";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

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
    <div className="prose mx-auto py-10 prose-p:my-4">
      <div className="mb-4 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-sm text-stone-400">{data.author}, {data.date}</p>
      </div>
      <div className="markdown-spacing-paragraph text-md prose prose-p:text-justify">
        <Markdown>{data.content}</Markdown>
      </div>
    </div>
  );
}

export default ReadDetailArticle;
