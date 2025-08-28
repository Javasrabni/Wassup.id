"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react'
import { NavbarData } from '@/lib/DataStatis'

const Navbar = () => {
    const pathname = usePathname()

    return (
        <div className='w-full h-20 bg-gray-100 flex gap-8 items-center justify-between px-8'>
            <Link href={'/'}><h1 className='text-xl font-bold'>Wassup.id</h1></Link>
            <ul className='hidden md:flex gap-8 '>
                {NavbarData.map(i =>
                    <Link key={i.id} href={`${i.URL}${i.title.replace(/\s+/g, '-').toLowerCase()}`}><li>{i.title}</li></Link>
                )}
            </ul>
            <input
                type="search"
                // name="q"
                placeholder="Cari artikel..."
                className={`${pathname == '/' ? 'hidden' : 'hidden sm:flex'} border rounded px-3 h-10 w-xs outline-none `}
            />
            <div className='flex md:hidden'>
                <Menu className='w-4 h-4' />
            </div>
            {/* <button type="submit" className="ml-2 px-3 py-2 bg-blue-600 text-white rounded">
                    Cari
                </button> */}
        </div>
    )
}

export default Navbar
