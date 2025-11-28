"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {

  // Jika user sudah login redirect ke dashboard
  const {user, loading} = useUser() 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if(loading) return null
  if(user) {
    return window.location.replace(`/profile/${user?.username}`)
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/user_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      alert(message || "Login gagal.");
      console.log(message);
      return
    } else {
      window.location.href = `/`;
    }
  }

  return (
    <div className="w-full h-full min-h-[80vh] flex flex-col gap-16 items-center justify-center  ">
      <div className="flex flex-col gap-0 text-center">
        <h1 className="text-2xl">Masuk sebagai penulis</h1>
        <p className="text-base">Bagikan pengetahuan, tulis pendapatmu.</p>
      </div>
      <div className="flex flex-col gap-12 w-full max-w-[20rem]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Username atau email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-stone-100 rounded-xs p-2 w-full"
            />
         
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-stone-100 rounded-xs p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <button
              type="submit"
              className="bg-stone-900 text-sm px-8 py-1 text-white font-semibold cursor-pointer hover:bg-stone-100 hover:text-stone-900"
            >
              Masuk
            </button>
            <p className="text-sm text-">
              Belum memiliki akun?{" "}
              <span className="text-blue-400 underline cursor-pointer">
                <Link href={'/auth/register'}>Daftar</Link>
              </span>
            </p>
          </div>
        </form>

        <div className="flex flex-col gap-8">
          <div className="w-full flex flex-row gap-4 items-center">
            <div className="w-full h-[1px] bg-stone-200" />
            <p className="text-sm shrink-0">Atau</p>
            <div className="w-full h-[1px] bg-stone-200" />
          </div>
          <div className="w-full bg-stone-100 p-4 cursor-pointer hover:outline-1 rounded-full flex flex-row gap-4 items-center justify-center">
            <Image
              src={"/materials/google.png"}
              alt="Google Icon"
              width={24}
              height={24}
            />
            <p className="text-sm">Masuk dengan Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}
