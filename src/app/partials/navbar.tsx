"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react'
import { NavbarData } from '@/lib/DataStatis'
import SearchInput from '@/components/SearchInput';

const Navbar = () => {
    const pathname = usePathname()
    const [searchInputValue, setSearchInputValue] = useState('')
    return (
        <div className='w-full h-20 border-b-1 border-gray-200 flex items-center justify-center px-8'>
            <div className='max-w-[60rem] w-full flex items-center justify-between'>
                <Link href={'/'}><h1 className='text-xl font-bold'>Opinion Journey</h1></Link>

                <span className={`${pathname == '/' ? 'hidden' : 'hidden sm:flex'}`}>
                    <SearchInput value={searchInputValue} onchange={setSearchInputValue} placeholder="Cari artikel ..." withButton={false} />
                </span>

                <ul className='hidden md:flex gap-8 '>
                    {NavbarData.map(i =>
                        <Link key={i.id} href={`${i.URL}${i.title.toLowerCase() === "berita" ? '/' : i.title.replace(/\s+/g, '-').toLowerCase()}`}><li className='hover:text-gray-400'>{i.title}</li></Link>
                    )}
                </ul>
                <div className='flex md:hidden'>
                    <Menu className='w-4 h-4' />
                </div>

            </div>
        </div>
    )
}

export default Navbar
