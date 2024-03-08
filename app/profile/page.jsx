'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    
    const userData = useSelector(state=>state.auth.userData)
    const router = useRouter()
    if(!userData)  router.push('/')

    return (
    <div>
        Welcome
        <h1>{userData?.name}</h1>
        <p>{userData?.email}</p>
        <p>{userData?.phone}</p>
    </div>
  )
}

export default Profile
