import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpenTextIcon, Edit2Icon, LockKeyholeIcon, Trash2Icon } from "lucide-react";
import deleteArticle from "@/lib/actions/deleteArticle";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
// import ConfirmPopup from "../popup/confirmPopup";
interface ArticleData {
  _id?: string;
  author?: string;
  category?: string;
  content?: string;
  createdAt?: string;
  description?: string;
  email?: string;
  featured_article?: boolean;
  slug?: string;
  thumbnail?: string;
  title?: string;
  updatedAt?: string;
  view?: string;
  visibility?: string;
}

interface Props {
  articles: ArticleData[];
  judul?: string;
  category?: string;
  author?: string;
  onProfilePage?: boolean;
  userId?: string;
  userUsernameCookie?: string | undefined;
  emptyMessage: string | null | undefined
}



export default function DataUserPosts({ articles, judul, category, author, onProfilePage, userId, userUsernameCookie, emptyMessage}: Props) {
  let filteredArticle = articles
  if (category) {
    filteredArticle = filteredArticle.filter((v) => v.category?.toLowerCase() === category.toLowerCase())
  }
  if (author) {
    filteredArticle = filteredArticle.filter((v) => v.author === author)
  }

  // ON DELETE ARTICLE
  async function onDelete(articleId: string | undefined, articleAuthor: string | undefined) {
    const confirm = window.confirm("Yakin ingin menghapus?")
    if (!confirm) {
      return
    } else {
      await deleteArticle(articleId)
      redirect(`/profile/${articleAuthor?.replaceAll(' ', '-')}/${userId}`)
    }
  }

  return (
    <div className={`flex flex-col gap-8`}>
      {/* <ConfirmPopup title={"Yakin ingin mengapus?"} onOk={onDelete} /> */}
      <h1 className="text-lg sm:text-xl font-bold font-['Inter']">{judul}</h1>

      {filteredArticle.length > 0 ? (
        filteredArticle.map((i) => {

          const isOwner = userUsernameCookie == i.author;
          const isPrivate = i.visibility === "Privat"

          if (isPrivate && !isOwner) return null
          return (
            <div key={i._id} className="flex gap-4">
              <div className="relative w-[240px] h-[168px] shrink-0">
                {i?.thumbnail ? (
                  <Image
                    src={`${i.thumbnail ?? '/'}`}
                    alt={`Gambar - ${i.title?.slice(0, 50)}`}
                    fill
                    className="object-cover object-center rounded-sm"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 rounded-sm flex items-center justify-center">
                    <BookOpenTextIcon width={24} className="text-stone-900"/>
                  </div>
                )}
              </div>
              <div>

                <p className="leading-6 text-base sm:text-lg font-bold overflow-hidden text-elipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {i.title}
                </p>

                <div className="markdown-spacing-paragraph text-sm sm:text-base overflow-hidden line-clamp-3">
                  <Markdown>{i.content}</Markdown>
                </div>

                <div className="pt-4 w-fit flex flex-row gap-4 items-center">
                  {/* PRIVATE LABEL */}
                  {i.visibility === "Privat" && (
                    <div className="bg-stone-100 w-fit px-2 py-1">
                      <p className="uppercase text-xs tracking-widest"><span className="flex flex-row gap-2 items-center"><LockKeyholeIcon width={16}/> PRIVAT</span></p>
                    </div>
                  )}
                  <Link href={`/read/${i.category?.toLowerCase()}/${i.slug}/${i._id}`}>
                    <p className="bg-gray-900 hover:bg-gray-200 text-white hover:text-gray-900 px-3 py-2 text-[10px] uppercase tracking-widest">
                      Baca selengkapnya
                    </p>
                  </Link>

                  {/* {!onProfilePage && ( */}
                  <p className="text-stone-400 text-sm">• {i.category}</p>
                  {/* )} */}

                  {onProfilePage && (
                    <>
                      <Link href={`/write/${i._id}`}>
                        <p className="bg-gray-100 hover:bg-gray-200 text-stone-900 hover:text-gray-900 px-3 py-1 text-xs  ">
                          <span className={'flex flex-row gap-2 items-center'}>
                            <Edit2Icon width={12} />
                            Edit
                          </span>
                        </p>
                      </Link>

                      <div className="cursor-pointer" onClick={() => onDelete(i._id, i.author)}>
                        <Trash2Icon width={16} color="tomato" />
                      </div>
                    </>
                  )}

                </div>
                {/* <p className="text-sm pt-4 text-gray-400">{i.date}</p> */}
              </div>
            </div>
          )
        })
      ) : (
        <p>{emptyMessage ?? `Kategori belum tersedia.`}</p>
      )}
    </div>
  );
}


