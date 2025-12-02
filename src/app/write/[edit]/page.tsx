import React from 'react'
import WritePage from '../page'
import { GetArticleDetail } from '@/lib/user_article/getDetailPosts'

interface Props {
  params: {
    edit: string
  }
}

export default async function EditAricle({params}: Props){
  const {edit} = params
  const article = await GetArticleDetail({id: edit})
  return <WritePage onEdit idArticleEdit={edit ?? ""} titleEdit={article?.title ?? ""} valueEdit={article?.content ?? ""} thumbnailEdit={article?.thumbnail ?? ""} categoryEdit={article?.category ?? ""} visibilityEdit={article?.visibility ?? ""} komentarFieldEdit={article?.komentarField ?? ""}/>
}

