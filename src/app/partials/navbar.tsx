"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, SquarePenIcon, Bell } from "lucide-react";
import { NavbarData } from "@/lib/DataStatis";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";

// Context
import { useUser } from "@/context/UserContext";
import DefaultNonAvatar from "@/components/defaultNonAvatar";

const Navbar = () => {
  const pathname = usePathname();
  const [searchInputValue, setSearchInputValue] = useState("");

  // ON PROFILE HOVER
  const [profileHover, setProfileHover] = useState(false);

  // Api/me
  const { user, loading } = useUser();
  if (loading) return null;

  return (
    <div className="w-full h-20 border-b-1 border-gray-200 flex items-center justify-center px-8">
      <div className="max-w-[60rem] w-full flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Wassup.id</h1>
        </Link>

        <span className={`${pathname == "/" ? "hidden" : "hidden sm:flex"}`}>
          <SearchInput
            // value={searchInputValue}
            // onchange={setSearchInputValue}
            placeholder="Cari artikel ..."
            withButton={false}
          />
        </span>

        <ul className="hidden md:flex md:items-center gap-8 ">
          {/* {NavbarData.slice(0, 1).map((i) => (
            <Link key={i.id} href={`/${i.URL}`}>
              <li className="hover:text-gray-400">{i.title}</li>
            </Link>
          ))} */}
          {user ? (
            <div className="flex flex-row gap-4 items-center">
              <div className="cursor-pointer">
                <Bell width={16}/>
              </div>
               <Link href={"/write"} className="w-fit h-8 gap-2 px-4 flex items-center justify-center bg-stone-100 rounded-full hover:outline-1 ">
                <SquarePenIcon width={16} />
                <p className="text-sm">Menulis</p>
              </Link>

              <Link
                href={`/profile/${user.username.replaceAll(" ", "-")}/${user.id}`}
                onClick={() => setProfileHover(false)}
                className="flex flex-col gap-4 relative"
                onMouseOver={() => setProfileHover(true)}
                onMouseLeave={() => setProfileHover(false)}
              >
                <DefaultNonAvatar username={user.username.toString()}/>

                {profileHover && (
                  <div className="absolute bottom-[-72px] w-42 shrink-0 right-0 bg-stone-900 px-4 py-2 ">
                    <p className="text-white text-xs">{user.username}</p>
                    <p className="text-xs text-stone-400">{user.email}</p>
                  </div>
                )}
              </Link>
             
            </div>
          ) : (
            <Link
              href={"/auth/login"}
              className="bg-stone-100 px-4 py-1 rounded-xs hover:outline-1"
            >
              <span className="flex flex-row gap-2 items-center">
                <Image
                  src={"/materials/google.png"}
                  alt="Google Icon"
                  width={16}
                  height={16}
                />
                <p className="font-newsreader font-semibold mt-[2.5px]">
                  Masuk
                </p>
              </span>
            </Link>
          )}
        </ul>
        <div className="flex md:hidden">
          <Menu className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
