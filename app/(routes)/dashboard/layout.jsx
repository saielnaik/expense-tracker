"use client"

import DashboardHeader from './_components/DashboardHeader';
import SideBar from './_components/SideBar';
import React, { useEffect } from 'react';
import {Budget} from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import {eq} from 'drizzle-orm';
import { db } from '@/utils/dbConfig';
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {

  const router = useRouter();
  const {user} = useUser();


  useEffect(() => {
    user&&checkUserBudget();
  }, [user])

  const checkUserBudget= async () => {
    const result = await db.select()
    .from(Budget)
    .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    if(result?.length==0){
      router.replace('/dashboard/budget');
    }
  }

  
  return (
    <div>
      <div className='fixed md:w-64 hidden md:block'>
        <SideBar />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader/>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
