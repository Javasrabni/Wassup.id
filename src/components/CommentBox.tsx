"use client";

import React, { useEffect, useState } from "react";
import { SendHorizonalIcon, User2Icon } from "lucide-react";

const CommentBox = ({ slug }: { slug: string }) => {
  // State Textarea
  const [textAreaValue, setTextAreaValue] = useState("");

  // Output API Comments Value
  const [openComments, setOpenComments] = useState(false); // Open & Close Comment Section
  const [listOutputCommentsArticel, setListOutputCommentsArticel] = useState<
    string[]
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
    const response = await fetch("/api/article_comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleSlug: slug,
        comment: textAreaValue,
      }),
    });

    if (!response.ok) {
      console.log(response.statusText);
    }
    setTextAreaValue("");
    loadComments();
    setOpenComments(true);

    const delay = setTimeout(() => {
      setNewCommentHighLight(true);
    }, 1000);
    return () => clearTimeout(delay);
  };

  //   Clear highlight
  useEffect(() => {
    const delay = setTimeout(() => {
      setNewCommentHighLight(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, [newCommentHighLight]);

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row h-full">
        <textarea
          className="w-full bg-stone-100 min-h-[10rem] p-4"
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
        <div className="flex flex-col gap-4 justify-center">
          {listOutputCommentsArticel.map((c, i) => (
            <div
              className={`${
                i == 0 && newCommentHighLight && "bg-stone-100"
              } flex flex-row gap-4`}
              key={i}
            >
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <User2Icon width={16} className="text-stone-400" />
              </div>
              <p className="text-sm mt-1">{c}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
