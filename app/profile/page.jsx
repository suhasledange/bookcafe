'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const userData = useSelector(state => state.auth.userData)
  const GData = useSelector(state => state.auth.Gdata)
  const email = GData?.emailAddresses[0]?.value;
  const name = GData?.names[0]?.displayName;
  const photo = GData?.photos[0]?.url;
  const router = useRouter()
  if (!userData) router.push('/')

  return (
    <div>
      Welcome
      <>
        <div className='w-12 h-12 flex items-center justify-center mb-5'>
          <Image className='rounded-full' src={GData ? `${photo}` : '/DefaultProfile.svg'} alt="noimg" width={500} height={500} />
        </div>
        <h1>{GData ? name : userData?.name}</h1>
        <p>{GData ? email : userData?.email}</p>
        <p>{userData?.phone}</p>
      </>
    </div>
  )
}

export default Profile
