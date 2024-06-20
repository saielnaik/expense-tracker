"use client"

import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';


function Header() {

  const {user, isSignedIn} = useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
            <h2 className='font-bold text-2xl text-primary bg-blue-100 flex justify-center p-3 border rounded-full shadow-sm hover:text-white hover:bg-blue-300'>Expense Tracker</h2>

      {isSignedIn?
      <UserButton/>: <Link href={'./sign-in'}> <Button>Get Started</Button> </Link> 
      }
    </div>
  )
}

export default Header
