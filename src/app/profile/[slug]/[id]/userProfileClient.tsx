"use client"
import React from "react";
import { useUser } from "@/context/UserContext";
import DataUserPosts from "@/components/server/DataUserPosts";


function UserProfileClient({ profile, articles, lengthUserPosts }: { profile: any, articles: any[], lengthUserPosts: number | string }) {
  const { user, loading } = useUser()
  const isOwner = profile?.email === user?.email

  return (
    <div className="h-full min-h-screen w-full flex pt-16 items-center flex-col">
      {/* PROFILE */}
      <div className="w-full flex justify-center items-center flex-row gap-8 pb-16">
        <div className="w-24 h-24 rounded-full bg-stone-100 outline-1 outline-stone-300 flex items-center justify-center">
          <p className="text-sm font-semibold">
            {profile?.username.slice(0, 2).toUpperCase()}
          </p>
        </div>
        <div>
          <h1 className="text-xl">{profile?.username}</h1>
          <p className="text-sm text-stone-400">{profile?.email}</p>
          <div className="mt-2">
            <p className="text-sm"><b>{lengthUserPosts}</b> post</p>
          </div>
        </div>
      </div>

      {/* POSTS */}
      <div className="w-full border-t boder-1 border-stone-200">
        <DataUserPosts articles={articles} author={profile?.username} onProfilePage={isOwner ? true : false} userId={user?.id} />
      </div>

      {isOwner && <p>ini profile lu </p>}
    </div>
  )
}

export default UserProfileClient;
