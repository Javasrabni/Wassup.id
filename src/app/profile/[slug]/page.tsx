"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { notFound, useParams } from "next/navigation";

const UserProfile = () => {
  const { user, loading } = useUser();
  const { slug } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const safeSlug = typeof slug === "string" ? slug : slug?.[0];
  if (!safeSlug) return;

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/user/${encodeURIComponent(safeSlug.replaceAll("-", " "))}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat profil");
        return res.json();
      })
      .then((data) => setProfile(data.user))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (loading || !profile) return <p>Loading ... / ga ada profilnye</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="h-full min-h-screen w-full flex pt-16 items-center flex-col">
      {/* PROFILE */}
      <div className="w-full flex justify-center items-center flex-row gap-8 pb-16">
        <div className="w-24 h-24 rounded-full bg-stone-100 outline-1 outline-stone-300 flex items-center justify-center">
          <p className="text-sm font-semibold">
            {profile.username.slice(0, 2).toUpperCase()}
          </p>
        </div>
        <div>
          <h1 className="text-xl">{profile.username}</h1>
          <p className="text-sm">{profile.email}</p>
        </div>
      </div>

      {/* POSTS */}
      <div className="w-full border-t boder-1 border-stone-200">

      </div>

      {profile?.email === user?.email && <p>ini profile lu </p>}
    </div>
  );
};

export default UserProfile;
