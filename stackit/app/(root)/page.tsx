import AnswerCard from '@/components/AnswerCard'
import Navbar from '@/components/Navbar'
import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <>

      <div className="relative w-full min-h-[100vh] bg-gradient-to-tr from-cyan-300 to-orange-200">
        <Navbar />
 
        <AnswerCard />

      </div>




    </>
  )
}

export default page 