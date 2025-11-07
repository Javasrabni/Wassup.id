import React from "react";
import type { Metadata } from "next";
import { DataArtikel } from "@/lib/DataStatis";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Eye, MessageSquareTextIcon, UserRoundPenIcon } from "lucide-react";
import CommentBox from "@/components/CommentBox";
import ArtikelDataParsing from "@/components/ParsingDataArtikel";
import ArticleView from "@/models/ArticleView";

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
    title: `${data.title} - Wassup.id`,
    description: data.description,
    authors: data.author ? [{ name: data.author }] : [],
    openGraph: {
      type: "article",
      title: data.title,
      description: data.description,
      authors: data.author ? [data.author] : [],
      publishedTime: data.date,
    },
  };
}

async function ReadDetailArticle({ params }: ArticleParams) {
  const { slug } = params;

  const data = DataArtikel.find(
    (i) => i.slug.replace("?", "") == slug.replace("?", "")
  );

  if (!data) notFound();

  // SEO
  const webUrl = "https://wassup-id.xyz";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: `https://wassup.id${data.thumbnail}`,
    url: `https://wassup.id/read/${params.category}/${params.slug}`,
    mainEntityOfPage: `https://wassup.id/read/${params.category}/${params.slug}`,
    author: data.author ? { "@type": "Person", name: data.author } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Wassup.id",
      logo: "https://wassup.id/logo.png",
    },
    // datePublished: new Date(data.date).toISOString(),
  };


  return (
    <>
      {/* Schema JSON-LD untuk Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto pb-10 w-full flex flex-col gap-8">
        {/* CONTENT */}
        <div className="prose w-full prose-p:my-4 flex flex-col md:flex-row justify-between gap-8">
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
                <span className="flex flex-row gap-2 items-center">
                  <UserRoundPenIcon width={16} />
                  {data.author}, {data.date}
                </span>
              </p>
            </div>
            <div className="markdown-spacing-paragraph text-md prose prose-p:text-justify">
              <Markdown>{data.content}</Markdown>
            </div>
          </div>

          {/* SIDE FOOTER */}
          <div className="pt-12 flex flex-col gap-4 max-w-[19rem]">
            {/* Komentar */}
            <div className="flex flex-col gap-2 mb-4">
              <h1 className="text-xl font-bold">
                Kamu memiliki pandangan lain tentang topik ini?
              </h1>
              <span className="flex flex-row gap-4 text-stone-400 items-center">
                <MessageSquareTextIcon width={16} />
                <p className="text-sm text-stone-400">Komentar bersifat anonim.</p>
              </span>
            </div>

            {/* Comment box component */}
            <CommentBox slug={slug} />
          </div>
        </div>
        <div className="border-b border-gray-200 pt-4" /> {/* Line Border */}
        {/* Rekomendasi Topik lain */}
        <div>
          <ArtikelDataParsing
            judul="Baca juga topik lainnya"
            featured_article={false}
          />
        </div>
      </div>
    </>
  );
}

export default ReadDetailArticle;
