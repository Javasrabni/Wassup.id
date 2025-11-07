import ArtikelDataParsing from '@/components/ParsingDataArtikel'
import React from 'react'

const CategoryListPage = ({params}: {params: {category: string}}) => {
    const {category} = params
    const findKey = category.replace('-', ' ')

  return (
    <div>
      <ArtikelDataParsing featured_article={false} category={findKey} />
    </div>
  )
}

export default CategoryListPage
