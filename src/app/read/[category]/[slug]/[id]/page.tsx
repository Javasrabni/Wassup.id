import React from "react";
import type { Metadata } from "next";
import { DataArtikel } from "@/lib/DataStatis";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Eye, MessageSquareTextIcon, UserRoundPenIcon } from "lucide-react";
import CommentBox from "@/components/CommentBox";
import ArticleView from "@/models/ArticleView";

import DataUserPosts from "@/components/server/DataUserPosts";
import { GetArticleDetail } from "@/lib/user_article/getDetailPosts";
import { GetUserArticlePosts } from "@/lib/user_article/getAllPosts";
import Link from "next/link";

interface ArticleParams {
  params: {
    category: string;
    slug: string;
    id: any;
  };
}

export async function generateMetadata({
  params,
}: ArticleParams): Promise<Metadata> {
  const { slug, id } = params;
  const data = await GetArticleDetail({ slug, id });

  // const data = DataArtikel.find(
  //   (i) => i.slug.replace("?", "") == slug.replace("?", "")
  // );

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
      publishedTime: data.createdAt,
    },
  };
}

async function ReadDetailArticle({ params }: ArticleParams) {
  const { slug, id } = params;
  const data = await GetArticleDetail({ slug, id });
  console.log(data);
  const userArticle = await GetUserArticlePosts();

  if (!data) notFound();

  // SEO
  const webUrl = "https://wassup-id.xyz";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: `${webUrl}${data.thumbnail}`,
    url: `${webUrl}/read/${params.category}/${params.slug}`,
    mainEntityOfPage: `${webUrl}/read/${params.category}/${params.slug}`,
    author: data.author ? { "@type": "Person", name: data.author } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Wassup.id",
      logo: `${webUrl}/logo.png`,
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

      <div className="mx-auto w-full flex flex-col gap-8">
        {/* CONTENT */}
        <div className="prose w-full prose-p:my-4 flex flex-col md:flex-row justify-between gap-8">
          {/* Article viewed */}
          <div className="max-w-[39rem] w-full">
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
                  <Link
                    className="underline"
                    href={`/profile/${data.author.replaceAll(" ", "-")}/${data.authorID
                      }`}
                  >
                    {data.author},
                  </Link>
                  {new Date(data.updatedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
            <div className="markdown-spacing-paragraph text-md prose prose-p:text-justify">
              <Markdown>{data.content}</Markdown>
            </div>
          </div>

          {/* SIDE */}
          {/* Komentar */}
          <div className="pt-12 flex flex-col gap-4 max-w-[19rem] w-full shrink-0">
            {data.komentarField === "Aktif" ? (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <h1 className="text-xl font-bold">
                    Kamu memiliki pandangan lain tentang topik ini?
                  </h1>
                  <span className="flex flex-row gap-4 text-stone-400 items-center">
                    <MessageSquareTextIcon width={16} />
                    <p className="text-sm text-stone-400">
                      Komentar bersifat anonim.
                    </p>
                  </span>
                </div>

                {/* Comment box component */}
                <CommentBox slug={slug} articleId={data._id} />
              </>
            ) : (
              <h1 className="text-xl font-bold">
                Komentar Dinonaktifkan
              </h1>
            )}
          </div>

        </div>
        <div className="border-b border-gray-200 pt-4" /> {/* Line Border */}
        {/* Rekomendasi Topik lain */}
        <div>
          <DataUserPosts
            articles={userArticle}
            judul={"Baca juga topik lainnya"}
          />
        </div>
      </div>
    </>
  );
}

export default ReadDetailArticle;
