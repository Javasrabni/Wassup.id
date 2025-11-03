'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, Instagram } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'



interface team {
    nama: string,
    id: number,
    role: string,
    image: string
    socialMedia: string
}

const ArrayTeam: team[] = [
    { nama: 'Idam Rizqullah Aji', id: 1, role: 'Initiator / ideator', image: '/team/idam.jpeg', socialMedia: 'https://www.instagram.com/rizqaji_' },
    { nama: 'Javas Anggaraksa Rabbani', id: 2, role: 'Full-Stack Developer', image: '/team/javas.jpg', socialMedia: 'https://javasrabni.my.id' },
    { nama: 'Amelia Ayeesha Zahra', id: 3, role: 'Graphic Designer', image: '/team/amel.jpeg', socialMedia: 'https://www.instagram.com/ameelyaaz' },
    { nama: 'M. Nafish Pallas', id: 4, role: 'Content Writter', image: '/team/nafish.jpeg', socialMedia: 'https://www.instagram.com/nafispallas' },
]

const AboutTeam = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        if (!scrollRef.current) return;
        if (window.innerWidth > 768) return; // jalan hanya di mobile

        let scrollAmount = 0;
        const interval = setInterval(() => {
            if (scrollRef.current && autoScroll) {
                scrollRef.current.scrollLeft += 1; // geser kanan 1px
                scrollAmount++;

                // kalau sudah mentok, balik ke awal (loop)
                if (
                    scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
                    scrollRef.current.scrollWidth
                ) {
                    scrollRef.current.scrollLeft = 0;
                }
            }
        }, 20); // kecepatan scroll

        return () => clearInterval(interval);
    }, [autoScroll]);
    return (
        <div className='flex w-full h-full items-center justify-center  gap-16 flex-col'>

            <div className='flex items-center justify-center flex-col text-center'>
                <h1 className='text-2xl'>People Behind the Work</h1>
                <p className='text-base max-w-[80%]'>Kolaborasi tim dibangun atas dasar profesionalisme, kepercayaan, dan tanggung jawab. Kami percaya bahwa kerja sama yang solid adalah kunci dalam mencapai tujuan bersama.</p>
            </div>

            <div className='w-full flex items-center justify-between overflow-x-auto gap-8' ref={scrollRef} onClick={()=> setAutoScroll(prev => !prev)}>
                {ArrayTeam.map(i =>
                    <div key={i.id} className='flex flex-col items-center justify-center gap-2 shrink-0 mb-4'>
                        <div className='relative w-[128px] h-[128px]'>
                            <Image
                                src={i.image}
                                alt='Gambar'
                                fill
                                className='rounded-full bg-gray-100 object-cover object-center'
                            />
                        </div>
                        <div className='flex flex-col items-center mt-4'>
                            <h1 className='text-xl'>{i.nama}</h1>
                            <p className='text-base text-gray-400'>{i.role}</p>
                            <span className='mt-4 text-gray-400 hover:text-black'>
                                {i.id == 2 ? (
                                    <Link href={i.socialMedia} target='_blank'>
                                        <span className='flex gap-2'>
                                            <Globe width={16} /> www.javasrabnii.my.id
                                        </span>
                                    </Link>
                                ) : (
                                    <Link href={i.socialMedia} target='_blank'>
                                        <span className='flex gap-2'>
                                            <Instagram width={16} />
                                            {i.socialMedia.replace('https://www.instagram.com/', '')}

                                        </span>
                                    </Link>
                                )}
                            </span>
                        </div>
                    </div>
                )}
            </div>


        </div>
    )
}

export default AboutTeam
