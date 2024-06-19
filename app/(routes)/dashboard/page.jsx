"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

function page() {
  const {user} = useUser();
  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what happening with your money. Lets manage your expense</p>
    </div>
  )
}

export default page
