"use client";

import { useSearchParams } from 'next/navigation'
import { DataArtikel } from '@/lib/DataStatis'

export function SearchPage() {
    const searchParams = useSearchParams()
    const data: string = searchParams.get('search') ?? '';

    const matchData = DataArtikel.filter((i) => i.title.toLowerCase().includes(data.toLowerCase()) || i.content.toLowerCase().includes(data.toLowerCase()))
    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <p>Hasil untuk "<b>{data}</b>"</p>
            <div className='w-full h-full min-h-screen flex flex-col gap-8'>
                {matchData.length > 0 ? (
                    <>
                        {matchData.map(i =>
                            <div key={i.id} className=' w-[50%] h-fit rounded-md flex flex-col border border-gray-200'>
                                <h1 className='font-bold text-xl'>{i.title}</h1>
                                <p>{i.date}</p>
                                <p>{i.content}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Tidak ditemukan</p>
                )}
            </div>

        </div>
    )
}

export default SearchPage
