'use client'

import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface SearchInput {
    // value: string,
    // onchange: (val: string) => void,
    placeholder?: string,
    withButton: boolean
}

export default function SearchInput({ placeholder, withButton }: SearchInput) {
    const router = useRouter()

    const [searchInputValue, setSearchInputValue] = useState("");


    const SearchPath = () => {
        if (!searchInputValue || searchInputValue.trim() === '') return '/'
        return `/results?search=${searchInputValue.replace(/\s+/g, '+').toLowerCase()}`
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!searchInputValue || searchInputValue.trim() === '') return
        if (e.key === "Enter") {
            router.push(SearchPath())
        }
    }

    return (
        <div className={`${withButton && 'flex gap-2'} w-full`}>
            <input
                type="search"
                value={searchInputValue}
                placeholder={placeholder}
                className="border px-3 h-10 w-full outline-none bg-gray-100 text-black"
                onChange={(e) => setSearchInputValue(e.target.value)}
                onKeyDown={handleKeydown}
            />
            {withButton && (
                <button className="bg-gray-900 hover:bg-gray-200 text-white hover:text-gray-900 px-3 py-2 text-[10px] uppercase tracking-widest cursor-pointer" onClick={() => router.push(SearchPath())}>
                   <Search width={16} />
                </button>
            )}
        </div>

    )
}