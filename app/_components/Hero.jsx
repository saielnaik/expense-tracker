"use client"

import React from 'react'
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
function Hero() {

  const {user, isSignedIn} = useUser();

  return (
    <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Manage Yor Expense
        <strong className="font-extrabold text-primary sm:block"> Control Your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Creating Your Budget And Save Ton Of Money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
      {isSignedIn?
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-primary sm:w-auto"
          href="/dashboard"
        >
          Get Started
        </a>:
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-primary sm:w-auto"
          href="/dashboard"
        >
          Get Started
        </a>}
      </div>
    </div>
  </div>
  <Image src={'/dashboard.png'} 
  width={1000}
  height={700}
  className='-mt-9 rounded-xl border-2'
  alt='dashboard'
  />
</section>
  )
}

export default Hero
