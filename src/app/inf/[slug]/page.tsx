import React from 'react'
import { NavbarData } from '@/lib/DataStatis'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Component } from 'lucide-react'
// nama file "i" maksudnya "info tentang wassup"
interface Props {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params
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


export default function HalamanNavData({ params }: Props) {
    const { slug } = params
    const data = NavbarData.find((i) => slug.toLowerCase().includes(i.title.replace(/\s+/g, '-').toLowerCase()))
    if (!slug) return notFound()

    if (!data) return notFound()




    return (
        <>
            {data.component}
        </>
    )
}


