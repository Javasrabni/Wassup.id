"use client";

import React, { useEffect, useState } from "react";
import { SendHorizonalIcon, User2Icon } from "lucide-react";

interface CommentData {
  comment: string;
  date: string;
}

const CommentBox = ({ slug }: { slug: string }) => {
  // State Textarea
  const [textAreaValue, setTextAreaValue] = useState("");

  // Output API Comments Value
  const [openComments, setOpenComments] = useState(true); // Open & Close Comment Section
  const [listOutputCommentsArticel, setListOutputCommentsArticel] = useState<
    CommentData[]
  >([]);

  const [lengthComments, setLengtComments] = useState(0); // Length of Comments
  const [newCommentHighLight, setNewCommentHighLight] = useState(false);

  const loadComments = async () => {
    const res = await fetch(`/api/article_comments?articleSlug=${slug}`);
    const data = await res.json();
    setListOutputCommentsArticel(data ?? []);
    setLengtComments(data?.length ?? 0);
  };

  const submitComments = async () => {
    try {
      const response = await fetch("/api/article_comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleSlug: slug,
          comment: textAreaValue,
        }),
      });

      loadComments();

      if (!response.ok) {
        console.log(response.statusText);
        alert("Terjadi kesalahan server.");
        return;
      }

      setTextAreaValue("");
      setOpenComments(true);

      const delay = setTimeout(() => {
        setNewCommentHighLight(true);
      }, 500);
      return () => clearTimeout(delay);
    } catch (error) {
      console.error(error);
    }
  };

  //   Clear highlight
  useEffect(() => {
    const delay = setTimeout(() => {
      setNewCommentHighLight(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, [newCommentHighLight]);

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row h-full">
        <textarea
          className="w-full bg-stone-100 min-h-[10rem] p-4 resize-none"
          placeholder="Komentar kamu terkait topik ini ..."
          onChange={(v) => setTextAreaValue(v.target.value)}
          value={textAreaValue}
          />
        <button
          className="h-full w-fit px-2 bg-gray-900 text-white cursor-pointer hover:bg-gray-200 hover:text-gray-900"
          onClick={submitComments}
          >
          <SendHorizonalIcon width={16} />
        </button>
      </div>

      <p
        className="text-sm text-stone-400 underline cursor-pointer select-none"
        onClick={() => setOpenComments((prev) => !prev)}
      >
        {openComments ? "Tutup" : "Lihat"} Komentar ({lengthComments})
      </p>

      {openComments && (
        <div className="flex flex-col gap-4 max-h-[35rem] overflow-auto h-full shrink-0">
            {listOutputCommentsArticel.length > 0 ? listOutputCommentsArticel.map((c, i) => (
            <div
              className={`transition duration-500 ${
                i == 0 && newCommentHighLight && "bg-stone-100 "
              } flex flex-col gap-0`}
              key={i}
            >
              <span className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <User2Icon width={16} className="text-stone-400" />
                </div>
                <p className="text-sm ">
                  Anonim ·{" "}
                  <span className="text-gray-400">{new Date(c.date).toLocaleDateString("id-ID", {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </p>
              </span>

              <span className="ml-12">
                <p className="text-sm mt-1">{c.comment}</p>
              </span>
            </div>
          )): (
            // SKELETON LOADING
            <>
            <div className="w-full h-8 bg-stone-200 animate-pulse rounded-xs"/>
            <div className="w-[50%] h-8 bg-stone-200 animate-pulse rounded-xs" style={{ animationDelay: "0.4s" }}/>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
