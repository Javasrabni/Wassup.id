import React from 'react'

interface ArtikelType {
    data: string
}
const KontenArtikel = ({ data }: ArtikelType) => {
    return <p className='whitespace-pre-wrap text-justify'>{data}</p>
}

export default KontenArtikel
