"use client";
import React, { useEffect, useState } from "react";
import DefaultNonAvatar from "./defaultNonAvatar";
import Link from "next/link";

interface User {
  _id: string;
  username: string;
  email: string;
}

const ParsingAllUser = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function GetUsers() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data.success) {
          setAllUsers(data.data);
        } else {
          console.error("Gagal ambil data:", data.message);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    GetUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <>
          <div className="w-full h-8 bg-stone-200 animate-pulse rounded-xs" />
          <div
            className="w-[50%] h-8 bg-stone-200 animate-pulse rounded-xs"
            style={{ animationDelay: "0.4s" }}
          />
        </>
      ) : (
        <>
          {allUsers &&
            allUsers.map((v, idx) => (
              <Link
                key={idx}
                href={`/profile/${v.username.replaceAll(' ','-')}/${v._id}`}
                className="flex flex-row gap-4 items-center"
              >
                <DefaultNonAvatar username={v.username.toString()} />
                <p>{v.username}</p>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default ParsingAllUser;
