import { NavbarData } from '@/lib/DataStatis'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params

  const data = NavbarData.find((i) =>
    slug.toLowerCase().includes(
      i.title.replace(/\s+/g, '-').toLowerCase()
    )
  )

  if (!data) {
    return {
      title: 'Artikel tidak ditemukan - Wassup.id',
      description: 'NavData yang anda cari tidak tersedia atau tidak ditemukan.',
    }
  }

  return {
    title: `${data.title} - Wassup.id`,
  }
}

export default async function HalamanNavData(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const data = NavbarData.find((i) =>
    slug.toLowerCase().includes(
      i.title.replace(/\s+/g, '-').toLowerCase()
    )
  )

  if (!slug || !data) return notFound()

  return <>{data.component}</>
}
