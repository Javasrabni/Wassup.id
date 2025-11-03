import React from 'react'
import Link from 'next/link'
import { NavbarData } from '@/lib/DataStatis'

const Sidebar = () => {
    return (
        <div>
            <ul>
                {NavbarData.map(i =>
                    <Link key={i.id} href={`${i.URL}${i.title.toLowerCase() === "berita" ? '/' : i.title.replace(/\s+/g, '-').toLowerCase()}`}><li>{i.title}</li></Link>
                )}
            </ul>
        </div>
    )
}

export default Sidebar
