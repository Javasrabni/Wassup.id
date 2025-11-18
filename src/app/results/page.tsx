"use client";

import { useSearchParams } from "next/navigation";
import { GetUserArticlePosts } from "@/lib/user_article/getAllPosts";
import { useEffect, useState } from "react";
import DataUserPosts from "@/components/server/DataUserPosts";

interface Article {
    id: string;
    title: string;
    date: string;
    content: string;
}

export function SearchPage() {
    const searchParams = useSearchParams();
    const data: string = searchParams.get("search") ?? "";
    const [parsingOutputData, setparsingOutputData] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDataArticleBySearch() {
            try {
                const res = await fetch(`/api/create_article?search=${data}`);
                if (res.ok) {
                    const getDataRes = await res.json();
                    setparsingOutputData(getDataRes.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getDataArticleBySearch();
    }, [data]);
    const matchData = parsingOutputData.filter(
        (i) =>
            i.title.toLowerCase().includes(data.toLowerCase()) ||
            i.content.toLowerCase().includes(data.toLowerCase())
    );
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <span className="text-sm flex flex-row gap-2 w-full justify-center">
                <p>Hasil untuk "<b>{data}</b>"</p>
                <p>({matchData.length})</p>
            </span>
            <div className="w-full h-full flex flex-col gap-8">
                {!loading ? (
                    <>
                        <DataUserPosts articles={matchData} />
                    </>
                ) : (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-row gap-8 w-full">
                            <div className="w-60 h-42 bg-stone-100 animate-pulse rounded-xs shrink-0" />
                            <div className="flex flex-col gap-4 w-full">
                                <div
                                    className="w-[70%] h-8 bg-stone-100 animate-pulse rounded-xs"
                                    style={{ animationDelay: "0.4s" }}
                                />
                                <div
                                    className="w-[50%] h-4 bg-stone-100 animate-pulse rounded-xs"
                                    style={{ animationDelay: "0.4s" }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
