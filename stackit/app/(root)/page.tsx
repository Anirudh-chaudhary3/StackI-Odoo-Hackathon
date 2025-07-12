import AnswerCard from '@/components/AnswerCard'
import Navbar from '@/components/Navbar'
import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <>

      <div className="relative w-full min-h-[100vh]">
        <Navbar />
 
        <AnswerCard />

      </div>




    </>
  )
}

export default page 