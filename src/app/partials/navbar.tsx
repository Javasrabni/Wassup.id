"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { NavbarData } from "@/lib/DataStatis";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [searchInputValue, setSearchInputValue] = useState("");
  return (
    <div className="w-full h-20 border-b-1 border-gray-200 flex items-center justify-center px-8">
      <div className="max-w-[60rem] w-full flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Opinion Journey</h1>
        </Link>

        <span className={`${pathname == "/" ? "hidden" : "hidden sm:flex"}`}>
          <SearchInput
            value={searchInputValue}
            onchange={setSearchInputValue}
            placeholder="Cari artikel ..."
            withButton={false}
          />
        </span>

        <ul className="hidden md:flex md:items-center gap-8 ">
          {NavbarData.slice(0, 1).map((i) => (
            <Link key={i.id} href={`/${i.URL}`}>
              <li className="hover:text-gray-400">{i.title}</li>
            </Link>
          ))}
          <Link
            href={""}
            className="bg-stone-100 px-4 py-1 rounded-xs hover:outline-1"
          >
            <span className="flex flex-row gap-2 items-center">
              <Image
                src={"/materials/google.png"}
                alt="Google Icon"
                width={16}
                height={16}
              />
              <p className="font-newsreader font-semibold mt-[2.5px]">Masuk</p>
            </span>
          </Link>
        </ul>
        <div className="flex md:hidden">
          <Menu className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
