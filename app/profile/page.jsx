'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Container from '../components/Container'
import LeftSection from './pages/LeftSection'
import RightSection from './pages/RightSection'

const Profile = () => {

  const userData = useSelector(state => state.auth.userData)
  
  const router = useRouter()
  if (!userData) router.push('/')


  const [selectedLink, setSelectedLink] = useState(1);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <Container className="px-3 md:px-3 max-w-screen-xl flex flex-col md:flex-row mt-5 md:mt-8 mb-8 md:space-x-4 gap-3">
        <LeftSection onLinkClick={handleLinkClick} className=" md:flex-[0.2]"/>
        <RightSection selectedLink={selectedLink} className="md:flex-[0.8]"/>
    </Container>
  )
}

export default Profile
