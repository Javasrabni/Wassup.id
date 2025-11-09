'use client'
import React, { useEffect, useState } from 'react'

const UserDashboard = () => {
    const [user, setUser] = useState<any>(null)

    useEffect(()=> {
        async function fetchUser(){
            const res = await fetch('/api/me')
            if(res.ok) {
                const data = await res.json()
                setUser(data.user)
            }
        }
        fetchUser()
    }, [])

    if(!user) return <p>Loading ...</p>

    return (
        <div>
            <p>{user.username}</p>
            <p>Join pas tanggal {new Date(user.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: "long",
                year: "numeric"
            })}</p>
        </div>
    )
}

export default UserDashboard
