import React from 'react'
import { NavbarData } from '@/lib/DataStatis'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
// nama file "i" maksudnya "info tentang wassup"
interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const data = NavbarData.find((i) => slug.toLowerCase().includes(i.title.replace(/\s+/g, '-').toLowerCase()))

    if (!data) {
        return {
            title: "Artikel tidak ditemukan - Wassup.id",
            description: 'NavData yang anda cari tidak tersedia atau tidak ditemukan.'
        }
    }

    return {
        title: `${data.title} - Wassup.id`,
        // description: `${NavData.content.replace(/\n/g, ' ').slice(0, 160)}`
    }
}


export default async function HalamanNavData({ params }: Props) {
    const { slug } = await params
    const data = NavbarData.find((i) => slug.toLowerCase().includes(i.title.replace(/\s+/g, '-').toLowerCase()))
    if (!slug) return notFound()

    if (!data) return notFound()




    return (
        <div>
            {data.id}
            {data.title}
        </div>
    )
}


