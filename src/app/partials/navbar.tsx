"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react'
import { NavbarData } from '@/lib/DataStatis'

const Navbar = () => {
    const pathname = usePathname()

    return (
        <div className='w-full h-20 border-b-1 border-gray-200 flex items-center justify-center px-8'>
            <div className='max-w-[60rem] w-full flex items-center justify-between'>
                <Link href={'/'}><h1 className='text-xl font-bold'>Wassup.id</h1></Link>
                <input
                    type="search"
                    // name="q"
                    placeholder="Cari artikel..."
                    className={`${pathname == '/' ? 'hidden' : 'hidden sm:flex'} border rounded px-3 h-10 w-xs outline-none `}
                />
                <ul className='hidden md:flex gap-8 '>
                    {NavbarData.map(i =>
                        <Link key={i.id} href={`${i.URL}${i.title.toLowerCase() === "berita" ? '/' : i.title.replace(/\s+/g, '-').toLowerCase()}`}><li>{i.title}</li></Link>
                    )}
                </ul>
                <div className='flex md:hidden'>
                    <Menu className='w-4 h-4' />
                </div>
                {/* <button type="submit" className="ml-2 px-3 py-2 bg-blue-600 text-white rounded">
                    Cari
                </button> */}
            </div>
        </div>
    )
}

export default Navbar
