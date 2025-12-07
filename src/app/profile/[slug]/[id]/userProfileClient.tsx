"use client"
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import DataUserPosts from "@/components/server/DataUserPosts";
import { CameraIcon, Edit2Icon, Edit3Icon } from "lucide-react";


function UserProfileClient({ profile, articles, lengthUserPosts, lengthUserPostsPrivate }: { profile: any, articles: any[], lengthUserPosts: number | string, lengthUserPostsPrivate: number | string }) {
  const { user, loading } = useUser()
  const isOwner = profile?.email === user?.email

  const [onEditProfile, setOnEditProfile] = useState<boolean>(false)

  return (
    <div className={`h-full min-h-screen w-full flex pt-16 items-center flex-col`}>
      {/* PROFILE */}
      <div className="w-full flex justify-center items-center flex-row gap-8 pb-16 relative">
        <div className="flex items-center flex-col">
          <div className={`w-24 h-24 rounded-full ${onEditProfile ? 'bg-stone-900 cursor-pointer outline-blue-400' : 'bg-stone-100 outline-stone-300'} outline-1  flex items-center justify-center`}>
            {onEditProfile ? (
              <CameraIcon width={24} className="text-blue-400" />
            ) : (
              <p className="text-sm font-semibold">
                {profile?.username.slice(0, 2).toUpperCase()}
              </p>
            )}
          </div>
          {onEditProfile && (
            <div className="relative top-2">
              <p className="text-xs text-blue-400">Ganti foto profil</p>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-xl"><span className="flex flex-row gap-4 items-center">{profile?.username} {onEditProfile && (<Edit3Icon className="text-blue-400 cursor-pointer" width={16} />)}</span></h1>
          <p className="text-sm text-stone-400">{profile?.email}</p>
          <div className="mt-2 flex flex-row gap-4">
            <p className="text-sm">Publik: <b>{lengthUserPosts}</b> {Number(lengthUserPosts) <= 1 ? "post" : "posts"}</p>
            <p className="text-sm">Privat: <b>{lengthUserPostsPrivate}</b> {Number(lengthUserPostsPrivate) <= 1 ? "post" : "posts"}</p>
            {isOwner && (
              <div className="absolute bottom-10">
                <button onClick={() => setOnEditProfile(prev => !prev)} className={`text-xs text-blue-400 bg-gray-100 px-4 py-1 text-gray-900 font-[inter] cursor-pointer ${onEditProfile && ''}`}>
                  {!onEditProfile ? "Edit Profil" : "Selesai"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* POSTS */}
      <div className={`w-full border-t boder-1 border-stone-200 ${onEditProfile && 'blur-0'} pt-8`}>
        <DataUserPosts articles={articles} author={profile?.username} onProfilePage={isOwner ? true : false} userId={user?.id} userUsernameCookie={user?.username} emptyMessage={`${profile?.username} belum memiliki postingan.`} />
      </div>

    </div>
  )
}

export default UserProfileClient;
