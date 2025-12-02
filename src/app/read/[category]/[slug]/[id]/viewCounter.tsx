"use client"
import { useEffect } from "react"

export default function ViewCount({articleId} : {articleId: string}){
    useEffect(()=> {
        const key = "vi3d_artcl"
        let store:string[] = JSON.parse(localStorage.getItem(key) || "[]")

        if(store.includes(articleId)) {
            return
        }

        async function updateView(){
            fetch('/api/view_article', {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({articleId})
            })
        }

        updateView()

        store.push(articleId)
        localStorage.setItem(key, JSON.stringify(store))


    }, [articleId])

    return null
}