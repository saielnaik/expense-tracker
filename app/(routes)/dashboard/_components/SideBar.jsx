"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, Receipt, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideBar() {
    const menuList = [
        {
            id:1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id:2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budget'
        },
        {
            id:3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/allexpenses'
        },
        {
            id:4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }

    ]
    const path = usePathname();
    useEffect (() => {
    }, [])
  return (
    <div className='h-screen p-5 border shadow-sm'>
       <h2 className='font-bold text-2xl text-primary bg-blue-100 flex justify-center p-3 border rounded-full shadow-sm hover:text-white hover:bg-blue-300'>Expense Tracker</h2>
      <div className='mt-5'>
        {menuList.map((menu, index) =>(
            <Link href={menu.path}>
            <h2 className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${path == menu.path&&'text-primary bg-blue-100'}`}>
                <menu.icon/>
                {menu.name}
            </h2>
            </Link>
        ))}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2 items-center text-gray-500 font-medium'>
        <UserButton/>
        Profile
      </div>
    </div>
  )
}

export default SideBar
